import React, { useState } from 'react';
import { Search, X, Pin, Plus, Check, MessageSquareDashed, BellOff } from 'lucide-react';
import { Conversation, Message } from '../types';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  messages: Record<string, Message[]>;
  onOpenNewChat: () => void;
  showMobileFAB?: boolean;
}

type FilterCategory = 'all' | 'unread' | 'direct' | 'groups' | 'work';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  messages,
  onOpenNewChat,
  showMobileFAB = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');

  const filterChips: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'direct', label: 'Direct' },
    { id: 'groups', label: 'Groups' },
    { id: 'work', label: 'Work' },
  ];

  const filteredConversations = conversations.filter((conv) => {
    // Filter by category
    if (selectedFilter === 'unread' && conv.unreadCount === 0) return false;
    if (selectedFilter === 'direct' && conv.isGroup) return false;
    if (selectedFilter === 'groups' && !conv.isGroup) return false;
    if (selectedFilter === 'work' && conv.category !== 'work') return false;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = conv.name.toLowerCase().includes(q);
      const lastMsgMatch = messages[conv.id]?.some((m) => m.content.toLowerCase().includes(q));
      return nameMatch || lastMsgMatch;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-m3-surface relative overflow-hidden select-none">
      {/* Search Bar & Header Area */}
      <div className="p-4 pb-2 space-y-3 bg-m3-surface z-10 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal text-m3-on-surface tracking-tight">
            Messages
          </h1>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-m3-secondary-container text-m3-on-secondary-container">
            {conversations.length} chats
          </span>
        </div>

        {/* M3 Search Bar: 56px height, pill shape, surface-container-high */}
        <div className="relative flex items-center h-14 w-full rounded-full bg-m3-surface-container-high px-4 transition-all focus-within:ring-2 focus-within:ring-m3-primary/40 focus-within:bg-m3-surface-container-highest">
          <Search className="w-5 h-5 text-m3-on-surface-variant shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations & media..."
            className="w-full bg-transparent text-m3-on-surface placeholder:text-m3-on-surface-variant text-base focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-m3-on-surface-variant hover:bg-m3-outline-variant/30"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* M3 Filter Chips: 32px height, full rounded pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {filterChips.map((chip) => {
            const isSelected = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`h-8 px-3 rounded-full text-xs font-medium tracking-wide flex items-center gap-1.5 shrink-0 transition-all m3-state-layer ${
                  isSelected
                    ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold shadow-xs'
                    : 'bg-m3-surface border border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-container'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversation Items List */}
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-m3-surface-container-high flex items-center justify-center text-m3-on-surface-variant mb-3">
              <MessageSquareDashed className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-m3-on-surface">No conversations found</p>
            <p className="text-xs text-m3-on-surface-variant mt-1">
              Try adjusting your search query or active filter chips.
            </p>
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const convMsgs = messages[conv.id] || [];
            const lastMsg = convMsgs[convMsgs.length - 1];
            const isSelected = selectedId === conv.id;

            return (
              <div
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={`h-[72px] px-3 rounded-2xl flex items-center gap-3.5 cursor-pointer transition-all relative group m3-state-layer ${
                  isSelected
                    ? 'bg-m3-primary-container text-m3-on-primary-container shadow-xs'
                    : 'hover:bg-m3-surface-container text-m3-on-surface'
                }`}
              >
                {/* 40px Circular Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={conv.avatar}
                    alt={conv.name}
                    className="w-10 h-10 rounded-full object-cover shadow-xs ring-1 ring-black/5"
                  />
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-m3-surface" />
                  )}
                  {conv.isGroup && (
                    <span className="absolute -bottom-0.5 -right-0.5 bg-m3-surface-container-highest text-m3-on-surface-variant text-[9px] font-bold px-1 rounded-full ring-1 ring-m3-surface">
                      GRP
                    </span>
                  )}
                </div>

                {/* Content info: Title & Last Message Snippet */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3
                      className={`text-sm truncate font-medium ${
                        isSelected
                          ? 'text-m3-on-primary-container font-semibold'
                          : 'text-m3-on-surface'
                      }`}
                    >
                      {conv.name}
                    </h3>
                    <span
                      className={`text-[11px] shrink-0 font-normal ${
                        isSelected
                          ? 'text-m3-on-primary-container/80'
                          : 'text-m3-on-surface-variant'
                      }`}
                    >
                      {lastMsg ? lastMsg.timestamp : 'New'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={`text-xs truncate ${
                        isSelected
                          ? 'text-m3-on-primary-container/90'
                          : conv.unreadCount > 0
                          ? 'text-m3-on-surface font-medium'
                          : 'text-m3-on-surface-variant'
                      }`}
                    >
                      {conv.typingUser ? (
                        <span className="text-m3-primary font-medium animate-pulse">
                          {conv.typingUser} is typing...
                        </span>
                      ) : lastMsg ? (
                        `${lastMsg.isOutgoing ? 'You: ' : ''}${lastMsg.content}`
                      ) : (
                        'No messages yet'
                      )}
                    </p>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {conv.pinned && (
                        <Pin
                          className={`w-3.5 h-3.5 rotate-45 ${
                            isSelected ? 'text-m3-on-primary-container' : 'text-m3-outline'
                          }`}
                        />
                      )}
                      {conv.muted && (
                        <BellOff
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-m3-on-primary-container' : 'text-m3-outline'
                          }`}
                        />
                      )}
                      {conv.unreadCount > 0 && (
                        <span
                          className={`min-w-4 h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center ${
                            isSelected
                              ? 'bg-m3-primary text-m3-on-primary'
                              : 'bg-m3-primary text-m3-on-primary'
                          }`}
                        >
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Button (FAB) at bottom-right */}
      {showMobileFAB && (
        <button
          onClick={onOpenNewChat}
          className="absolute right-5 bottom-5 w-14 h-14 rounded-2xl bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center m3-elevation-3 hover:m3-elevation-4 active:scale-95 transition-all z-20 m3-state-layer"
          title="Start new conversation"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
