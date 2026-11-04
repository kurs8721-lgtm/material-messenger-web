export interface User {
  id: string;
  name: string;
  avatar: string;
  role?: 'admin' | 'member';
  statusText?: string;
  isOnline?: boolean;
  lastSeen?: string;
  email?: string;
  phone?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface MediaAttachment {
  type: 'image' | 'audio' | 'file';
  url: string;
  name?: string;
  size?: string;
  duration?: number; // seconds for audio
  aspectRatio?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string; // formatted time string
  rawTime: number; // for chronological sorting & grouping
  isOutgoing: boolean;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: {
    id: string;
    senderName: string;
    text: string;
  };
  media?: MediaAttachment;
  reactions?: Reaction[];
  isStarred?: boolean;
}

export interface SharedAsset {
  id: string;
  type: 'image' | 'file' | 'link';
  title: string;
  url: string;
  date: string;
  size?: string;
  previewUrl?: string;
}

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  avatar: string;
  unreadCount: number;
  isOnline?: boolean;
  lastSeen?: string;
  statusText?: string;
  pinned?: boolean;
  muted?: boolean;
  draft?: string;
  category: 'all' | 'unread' | 'direct' | 'groups' | 'work';
  members?: User[];
  sharedAssets?: SharedAsset[];
  description?: string;
  typingUser?: string;
}

export type ThemePalette = 'lavender' | 'ocean' | 'sage' | 'amber';

export interface ThemeConfig {
  id: ThemePalette;
  name: string;
  primary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  surfaceContainer: string;
}

export type NavTab = 'chats' | 'calls' | 'contacts' | 'settings';
export type ViewportMode = 'responsive' | 'mobile' | 'tablet' | 'desktop';
