import React, { useState } from 'react';
import {
  X,
  Bell,
  BellOff,
  Image as ImageIcon,
  FileText,
  Link2,
  Users,
  ShieldCheck,
  Search,
  Trash2,
  ExternalLink,
  Lock,
  Download
} from 'lucide-react';
import { Conversation, User } from '../types';

interface DetailsDrawerProps {
  conversation: Conversation;
  onClose: () => void;
  onClearChat: () => void;
  onToggleMute: () => void;
  onStartCall: (type: 'voice' | 'video') => void;
}

export const DetailsDrawer: React.FC<DetailsDrawerProps> = ({
  conversation,
  onClose,
  onClearChat,
  onToggleMute,
}) => {
  const [activeTab, setActiveTab] = useState<'media' | 'files' | 'links' | 'members'>('media');

  const sharedAssets = conversation.sharedAssets || [];
  const mediaItems = sharedAssets.filter((a) => a.type === 'image');
  const fileItems = sharedAssets.filter((a) => a.type === 'file');
  const linkItems = sharedAssets.filter((a) => a.type === 'link');

  return (
    <aside
      className="w-full sm:w-[360px] h-full bg-m3-surface-container flex flex-col border-l border-m3-outline-variant/30 shrink-0 z-30 select-none overflow-hidden"
      aria-label="Conversation Details"
    >
      {/* Top Header */}
      <div className="h-16 px-4 bg-m3-surface-container-high border-b border-m3-outline-variant/30 flex items-center justify-between shrink-0">
        <h3 className="text-base font-medium text-m3-on-surface">Details</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-highest transition-colors"
          title="Close details drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Profile Card Hero */}
        <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-m3-surface-container-high m3-elevation-1">
          <div className="relative mb-3">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-m3-primary/20 shadow-md"
            />
            {conversation.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>

          <h2 className="text-lg font-semibold text-m3-on-surface tracking-tight">
            {conversation.name}
          </h2>
          <p className="text-xs text-m3-on-surface-variant mt-0.5 max-w-[260px] leading-relaxed">
            {conversation.statusText || 'Material Design 3 collaborator'}
          </p>

          {conversation.description && (
            <div className="mt-3 p-3 rounded-2xl bg-m3-surface-container text-xs text-m3-on-surface text-left w-full border border-m3-outline-variant/20">
              <span className="font-semibold text-m3-primary block mb-1 text-[11px] uppercase tracking-wider">
                About & Purpose
              </span>
              <p className="leading-relaxed">{conversation.description}</p>
            </div>
          )}

          {/* Quick Action Pills */}
          <div className="flex items-center gap-2 mt-4 w-full justify-center">
            <button
              onClick={onToggleMute}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium transition-all ${
                conversation.muted
                  ? 'bg-m3-secondary-container text-m3-on-secondary-container'
                  : 'bg-m3-surface text-m3-on-surface hover:bg-m3-surface-container-highest'
              }`}
            >
              {conversation.muted ? (
                <>
                  <BellOff className="w-3.5 h-3.5" /> Muted
                </>
              ) : (
                <>
                  <Bell className="w-3.5 h-3.5" /> Mute
                </>
              )}
            </button>

            <button
              onClick={onClearChat}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium bg-m3-surface text-m3-error hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Security & Encryption Banner */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-m3-surface border border-m3-outline-variant/30">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-m3-on-surface">End-to-End Encrypted</p>
            <p className="text-[11px] text-m3-on-surface-variant">
              Messages and calls are secured with M3 cryptographic tokens.
            </p>
          </div>
        </div>

        {/* Shared Assets Navigation Tabs */}
        <div className="space-y-3">
          <div className="flex items-center border-b border-m3-outline-variant/30 pb-1 gap-1">
            <button
              onClick={() => setActiveTab('media')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === 'media'
                  ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                  : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
              }`}
            >
              Media ({mediaItems.length})
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === 'files'
                  ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                  : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
              }`}
            >
              Files ({fileItems.length})
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeTab === 'links'
                  ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                  : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
              }`}
            >
              Links ({linkItems.length})
            </button>
            {conversation.isGroup && (
              <button
                onClick={() => setActiveTab('members')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-full transition-all ${
                  activeTab === 'members'
                    ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                    : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
                }`}
              >
                Members
              </button>
            )}
          </div>

          {/* Media tab content */}
          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-2">
              {mediaItems.length === 0 ? (
                <div className="col-span-3 text-center py-6 text-xs text-m3-on-surface-variant">
                  No shared photos or videos
                </div>
              ) : (
                mediaItems.map((item) => (
                  <div
                    key={item.id}
                    className="aspect-square rounded-xl overflow-hidden bg-m3-surface-container-highest cursor-pointer hover:opacity-90 transition-opacity"
                    title={item.title}
                  >
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          )}

          {/* Files tab content */}
          {activeTab === 'files' && (
            <div className="space-y-2">
              {fileItems.length === 0 ? (
                <div className="text-center py-6 text-xs text-m3-on-surface-variant">
                  No shared documents
                </div>
              ) : (
                fileItems.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-m3-surface border border-m3-outline-variant/30"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-m3-secondary-container text-m3-on-secondary-container flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-m3-on-surface truncate">
                          {f.title}
                        </p>
                        <p className="text-[10px] text-m3-on-surface-variant">
                          {f.size} • {f.date}
                        </p>
                      </div>
                    </div>
                    <button className="p-1 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Links tab content */}
          {activeTab === 'links' && (
            <div className="space-y-2">
              {linkItems.length === 0 ? (
                <div className="text-center py-6 text-xs text-m3-on-surface-variant">
                  No shared links
                </div>
              ) : (
                linkItems.map((l) => (
                  <a
                    key={l.id}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-m3-surface border border-m3-outline-variant/30 hover:bg-m3-surface-container-high transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center shrink-0">
                        <Link2 className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-semibold text-m3-on-surface truncate">
                          {l.title}
                        </p>
                        <p className="text-[10px] text-m3-primary truncate">{l.url}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-m3-on-surface-variant shrink-0" />
                  </a>
                ))
              )}
            </div>
          )}

          {/* Group Members tab content */}
          {activeTab === 'members' && conversation.isGroup && (
            <div className="space-y-2">
              {conversation.members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-m3-surface transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium text-m3-on-surface">{member.name}</p>
                      <p className="text-[10px] text-m3-on-surface-variant">
                        {member.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  {member.role === 'admin' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-m3-primary-container text-m3-on-primary-container">
                      Admin
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
