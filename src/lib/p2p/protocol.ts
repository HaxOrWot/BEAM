// PROTO/TCP Binary Framing & CRC32 Protocol Layer

export const PROTO_MAGIC = 0x50544350; // "PTCP" in ASCII
export const HEADER_SIZE = 16;
export const DEFAULT_CHUNK_SIZE = 64 * 1024; // 64 KiB
export const BUFFER_HIGH_WATERMARK = 1024 * 1024; // 1 MiB backpressure cap
export const BUFFER_LOW_WATERMARK = 256 * 1024;   // 256 KiB resume threshold

// Standard CRC32 table & calculator
const CRC32_TABLE = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  CRC32_TABLE[i] = c;
}

export function computeCRC32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export interface StreamDescriptor {
  type: "STREAM_INIT";
  streamId: string;
  sender: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  totalChunks: number;
  chunkSize: number;
  digest: string;
}

export interface StreamControlMessage {
  type: "STREAM_ACK" | "STREAM_COMPLETE" | "STREAM_CANCEL" | "STREAM_REJECT";
  streamId: string;
  reason?: string;
}

export interface ChunkPacket {
  chunkIndex: number;
  totalChunks: number;
  crc32: number;
  payload: Uint8Array;
}

// Encodes [MAGIC(4), CHUNK_INDEX(4), TOTAL_CHUNKS(4), CRC32(4)] + payload
export function serializeChunkPacket(
  chunkIndex: number,
  totalChunks: number,
  payload: Uint8Array
): ArrayBuffer {
  const crc = computeCRC32(payload);
  const buffer = new ArrayBuffer(HEADER_SIZE + payload.byteLength);
  const view = new DataView(buffer);

  view.setUint32(0, PROTO_MAGIC, false); // big-endian
  view.setUint32(4, chunkIndex, false);
  view.setUint32(8, totalChunks, false);
  view.setUint32(12, crc, false);

  const uint8 = new Uint8Array(buffer);
  uint8.set(payload, HEADER_SIZE);

  return buffer;
}

// Decodes ArrayBuffer back into ChunkPacket, validating MAGIC and CRC32
export function deserializeChunkPacket(buffer: ArrayBuffer): ChunkPacket | null {
  if (buffer.byteLength < HEADER_SIZE) return null;

  const view = new DataView(buffer);
  const magic = view.getUint32(0, false);
  if (magic !== PROTO_MAGIC) return null;

  const chunkIndex = view.getUint32(4, false);
  const totalChunks = view.getUint32(8, false);
  const expectedCrc = view.getUint32(12, false);

  const payload = new Uint8Array(buffer, HEADER_SIZE);
  const actualCrc = computeCRC32(payload);

  if (actualCrc !== expectedCrc) {
    console.warn(`[PROTO/TCP] CRC32 mismatch on chunk #${chunkIndex}: exp ${expectedCrc}, got ${actualCrc}`);
    return null;
  }

  return { chunkIndex, totalChunks, crc32: actualCrc, payload };
}
