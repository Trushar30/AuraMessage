
export interface Workspace {
  id: string;
  name: string;
  icon: string; // Icon name from Heroicons
  color: string; // Hex or CSS color
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  isPrivate: boolean;
  status?: string;
  bio?: string;
  email?: string;
  phone?: string;
  emotion?: string;
  aiFeatures?: {
    toxicClassifier: boolean;
    faceEmotionDetection: boolean;
    phishingSentinel: boolean;
    oracleVoice: boolean;
  };
  workspaces?: Workspace[];
}

export interface GroupMetadata {
  id: string;
  name: string;
  memberCount: number;
  color: string;
  description?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  senderName?: string; // For groups
}

export interface ChatSession {
  id: string;
  isGroup: boolean;
  partner?: User; // Present if 1-on-1
  groupMetadata?: GroupMetadata; // Present if group
  lastMessage?: Message;
  unreadCount: number;
  workspaceIds: string[];
}

export enum NavigationTab {
  CHATS = 'chats',
  SEARCH = 'search',
  CALLS = 'calls',
  REQUESTS = 'requests',
  SETTINGS = 'settings',
  PROFILE = 'profile'
}

export type AuthMode = 'landing' | 'login' | 'signup';

export type UIMode = 'aura' | 'midnight' | 'nordic' | 'nebula' | 'forest' | 'terminal' | 'snow' | 'parchment' | 'glacier';
export type AccentColor = 'blue' | 'indigo' | 'emerald' | 'rose' | 'amber';
