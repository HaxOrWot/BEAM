"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  UserProfile,
  getStoredIdentity,
  saveIdentity,
  createSocialIdentity,
  createAnonymousIdentity,
  normalizeUsername,
} from "@/lib/p2p/identity";
import { P2PConnectionManager, ActiveStreamState } from "@/lib/p2p/webrtc";
import { StreamDescriptor } from "@/lib/p2p/protocol";

export interface RegisteredPeerInfo {
  username: string;
  callsign: string;
  publicKey: string;
  authProvider: string;
  online: boolean;
  lastSeen: number;
}

interface P2PContextType {
  identity: UserProfile;
  activePeer: string | null;
  connectionStatus: "IDLE" | "CONNECTING" | "CONNECTED" | "ERROR";
  activeOutboundStream: ActiveStreamState | null;
  activeInboundStream: ActiveStreamState | null;
  activePeers: RegisteredPeerInfo[];
  incomingPrompt: StreamDescriptor | null;
  connectToPeer: (username: string) => Promise<boolean>;
  sendFile: (file: File) => Promise<boolean>;
  loginWithSocial: (provider: "google" | "github", email: string, name: string, avatar?: string) => void;
  updateUsername: (newUsername: string) => void;
  dismissIncomingPrompt: () => void;
  logout: () => void;
}

const P2PContext = createContext<P2PContextType | undefined>(undefined);

export const P2PProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [identity, setIdentity] = useState<UserProfile>(() => getStoredIdentity());
  const [activePeer, setActivePeer] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"IDLE" | "CONNECTING" | "CONNECTED" | "ERROR">("IDLE");
  const [activeOutboundStream, setActiveOutboundStream] = useState<ActiveStreamState | null>(null);
  const [activeInboundStream, setActiveInboundStream] = useState<ActiveStreamState | null>(null);
  const [activePeers, setActivePeers] = useState<RegisteredPeerInfo[]>([]);
  const [incomingPrompt, setIncomingPrompt] = useState<StreamDescriptor | null>(null);

  const managerRef = useRef<P2PConnectionManager | null>(null);

  useEffect(() => {
    // Instantiate P2P connection manager with current identity
    const manager = new P2PConnectionManager(identity.username);
    managerRef.current = manager;

    manager.onStateChange = (status: any, remotePeer) => {
      setConnectionStatus(status);
      setActivePeer(remotePeer);
    };

    manager.onStreamUpdate = (stream) => {
      if (stream.direction === "outbound") {
        setActiveOutboundStream({ ...stream });
      } else {
        setActiveInboundStream({ ...stream });
      }
    };

    manager.onIncomingStreamPrompt = (descriptor) => {
      setIncomingPrompt(descriptor);
    };

    // Polling active peers from presence registry for the peers page
    const fetchPeers = async () => {
      try {
        const res = await fetch("/api/presence/list");
        const data = await res.json();
        if (data.peers) {
          setActivePeers(data.peers);
        }
      } catch (e) {}
    };

    fetchPeers();
    const peerPollInterval = setInterval(fetchPeers, 5000);

    return () => {
      clearInterval(peerPollInterval);
      manager.destroy();
    };
  }, [identity.username]);

  const connectToPeer = async (username: string): Promise<boolean> => {
    if (!managerRef.current) return false;
    return await managerRef.current.connectToPeer(username);
  };

  const sendFile = async (file: File): Promise<boolean> => {
    if (!managerRef.current) return false;
    return await managerRef.current.sendFile(file);
  };

  const loginWithSocial = (provider: "google" | "github", email: string, name: string, avatar?: string) => {
    const newProfile = createSocialIdentity(provider, email, name, avatar);
    saveIdentity(newProfile);
    setIdentity(newProfile);
    if (managerRef.current) {
      managerRef.current.updateLocalUsername(newProfile.username);
    }
  };

  const updateUsername = (newUsername: string) => {
    const clean = normalizeUsername(newUsername);
    if (!clean) return;
    const updated = { ...identity, username: clean };
    saveIdentity(updated);
    setIdentity(updated);
    if (managerRef.current) {
      managerRef.current.updateLocalUsername(clean);
    }
  };

  const dismissIncomingPrompt = () => {
    setIncomingPrompt(null);
  };

  const logout = () => {
    const anon = createAnonymousIdentity();
    saveIdentity(anon);
    setIdentity(anon);
    if (managerRef.current) {
      managerRef.current.updateLocalUsername(anon.username);
    }
  };

  return (
    <P2PContext.Provider
      value={{
        identity,
        activePeer,
        connectionStatus,
        activeOutboundStream,
        activeInboundStream,
        activePeers,
        incomingPrompt,
        connectToPeer,
        sendFile,
        loginWithSocial,
        updateUsername,
        dismissIncomingPrompt,
        logout,
      }}
    >
      {children}
    </P2PContext.Provider>
  );
};

export const useP2P = (): P2PContextType => {
  const context = useContext(P2PContext);
  if (!context) {
    throw new Error("useP2P must be used within a P2PProvider");
  }
  return context;
};
