import React, { useState } from 'react';
import { Search, MessageSquare, Phone, Video, UserPlus, Mail } from 'lucide-react';
import { User, Conversation } from '../types';
import { ALL_CONTACTS } from '../data/mockData';

interface ContactsScreenProps {
  onStartChatWithContact: (contact: User) => void;
  onStartCallWithContact: (contact: User, type: 'voice' | 'video') => void;
}

export const ContactsScreen: React.FC<ContactsScreenProps> = ({
  onStartChatWithContact,
  onStartCallWithContact,
}) => {
  const [search, setSearch] = useState('');

  const filtered = ALL_CONTACTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.statusText?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-m3-surface overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-normal text-m3-on-surface">Contacts</h1>
          <p className="text-xs text-m3-on-surface-variant">Team directory & collaborators</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center h-12 px-4 rounded-full bg-m3-surface-container-high mb-6 border border-m3-outline-variant/30">
        <Search className="w-4 h-4 text-m3-on-surface-variant mr-3 shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, or email..."
          className="w-full bg-transparent text-sm text-m3-on-surface placeholder:text-m3-on-surface-variant focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-m3-surface hover:bg-m3-surface-container transition-colors border border-m3-outline-variant/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover shadow-xs"
                />
                {contact.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-m3-on-surface">{contact.name}</h3>
                <p className="text-xs text-m3-on-surface-variant">{contact.statusText}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-m3-primary mt-0.5">
                  <Mail className="w-3 h-3" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onStartChatWithContact(contact)}
                className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-primary-container hover:text-m3-on-primary-container transition-colors"
                title="Send Message"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
              <button
                onClick={() => onStartCallWithContact(contact, 'voice')}
                className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high hover:text-m3-primary transition-colors"
                title="Voice Call"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => onStartCallWithContact(contact, 'video')}
                className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high hover:text-m3-primary transition-colors"
                title="Video Call"
              >
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
