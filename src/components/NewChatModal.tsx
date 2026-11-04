import React, { useState } from 'react';
import { X, Search, Check, Users, MessageSquarePlus } from 'lucide-react';
import { User, Conversation } from '../types';
import { ALL_CONTACTS } from '../data/mockData';

interface NewChatModalProps {
  onClose: () => void;
  onCreateChat: (newConv: Partial<Conversation>) => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  onClose,
  onCreateChat,
}) => {
  const [tab, setTab] = useState<'direct' | 'group'>('direct');
  const [searchQuery, setSearchQuery] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  const filteredContacts = ALL_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectContact = (id: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartDirectChat = (contact: User) => {
    onCreateChat({
      name: contact.name,
      isGroup: false,
      avatar: contact.avatar,
      unreadCount: 0,
      isOnline: contact.isOnline,
      statusText: contact.statusText,
      category: 'direct',
      members: [contact],
    });
    onClose();
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedContactIds.length === 0) return;

    const members = ALL_CONTACTS.filter((c) => selectedContactIds.includes(c.id));

    onCreateChat({
      name: groupName.trim(),
      isGroup: true,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=256&h=256&q=80',
      unreadCount: 0,
      statusText: `${members.length} members`,
      category: 'groups',
      members,
      description: `Group created for collaboration with ${members.map((m) => m.name).join(', ')}.`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-m3-surface-container-high rounded-[28px] m3-elevation-5 overflow-hidden flex flex-col border border-m3-outline-variant/30">
        {/* Modal Header */}
        <div className="p-5 pb-3 flex items-center justify-between border-b border-m3-outline-variant/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center">
              <MessageSquarePlus className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-medium text-m3-on-surface">New Conversation</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-highest"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Direct Chat vs Create Group */}
        <div className="flex items-center p-3 gap-2 border-b border-m3-outline-variant/20 bg-m3-surface-container">
          <button
            onClick={() => setTab('direct')}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${
              tab === 'direct'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold shadow-xs'
                : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
            }`}
          >
            Direct Message
          </button>
          <button
            onClick={() => setTab('group')}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium transition-all ${
              tab === 'group'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold shadow-xs'
                : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
            }`}
          >
            Create Group
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {tab === 'group' && (
            <div>
              <label className="text-xs font-medium text-m3-on-surface block mb-1.5">
                Group Name
              </label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Design Systems Guild"
                className="w-full h-11 px-4 rounded-xl bg-m3-surface border border-m3-outline-variant text-sm text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none focus:ring-2 focus:ring-m3-primary/40"
              />
            </div>
          )}

          {/* Search Contacts Bar */}
          <div className="relative flex items-center h-11 px-3 rounded-full bg-m3-surface border border-m3-outline-variant">
            <Search className="w-4 h-4 text-m3-on-surface-variant mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search people..."
              className="w-full bg-transparent text-xs sm:text-sm text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
            />
          </div>

          {/* Contacts List */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-m3-primary uppercase tracking-wider block px-1">
              Suggested Contacts
            </span>
            {filteredContacts.map((contact) => {
              const isSelected = selectedContactIds.includes(contact.id);

              return (
                <div
                  key={contact.id}
                  onClick={() => {
                    if (tab === 'direct') {
                      handleStartDirectChat(contact);
                    } else {
                      toggleSelectContact(contact.id);
                    }
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-m3-primary-container text-m3-on-primary-container'
                      : 'hover:bg-m3-surface-container text-m3-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs opacity-75">{contact.statusText}</p>
                    </div>
                  </div>

                  {tab === 'group' && (
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-m3-primary border-m3-primary text-white'
                          : 'border-m3-outline text-transparent'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer with Actions */}
        {tab === 'group' && (
          <div className="p-4 bg-m3-surface border-t border-m3-outline-variant/30 flex items-center justify-between">
            <span className="text-xs text-m3-on-surface-variant">
              {selectedContactIds.length} members selected
            </span>
            <button
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedContactIds.length === 0}
              className="h-10 px-6 rounded-full bg-m3-primary text-m3-on-primary font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-m3-primary/90 transition-all shadow-xs"
            >
              Create Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
