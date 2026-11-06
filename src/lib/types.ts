export interface StagedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  hash: string;
  file?: File;
  addedAt: number;
}

export interface TransferRecord {
  id: string;
  recipientHandle: string;
  senderHandle: string;
  files: {
    name: string;
    size: number;
    type: string;
    hash: string;
  }[];
  totalBytes: number;
  status: "pending" | "streaming" | "completed" | "expired";
  progress: number;
  speedMBs?: number;
  etaSeconds?: number;
  ttlHours: number;
  passkeyLock: boolean;
  burnOnDownload: boolean;
  maxDownloads: number;
  downloadCount: number;
  createdAt: number;
  expiresAt: number;
}

export interface UserAccount {
  handle: string;
  fullName: string;
  email: string;
  plan: "free" | "pro";
  nodeId: string;
  gatewayNode: string;
  storageLimitBytes: number;
  storageUsedBytes: number;
  avatarUrl: string;
  isLoggedIn: boolean;
}
