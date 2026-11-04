import React from 'react';
import { MessageSquare, Phone, Users, Settings, Plus, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavTab, User } from '../types';

interface NavigationRailProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadTotal: number;
  currentUser: User;
  onOpenNewChat: () => void;
  onOpenSettings: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  activeTab,
  onTabChange,
  unreadTotal,
  currentUser,
  onOpenNewChat,
  onOpenSettings,
  isExpanded,
  onToggleExpand,
}) => {
  const destinations = [
    { id: 'chats' as NavTab, label: 'Chats', icon: MessageSquare, badge: unreadTotal },
    { id: 'calls' as NavTab, label: 'Calls', icon: Phone },
    { id: 'contacts' as NavTab, label: 'Contacts', icon: Users },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <nav
      className={`h-full bg-m3-surface-container flex flex-col justify-between shrink-0 transition-all duration-300 border-r border-m3-outline-variant/30 ${
        isExpanded ? 'w-64 px-4 py-5' : 'w-20 px-2 py-4'
      }`}
      aria-label="App Navigation Rail"
    >
      {/* Top section: Logo & App Title & FAB */}
      <div className="flex flex-col items-center w-full gap-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-m3-primary text-m3-on-primary flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {isExpanded && (
              <div className="overflow-hidden">
                <span className="font-semibold text-base tracking-tight text-m3-on-surface whitespace-nowrap block">
                  Material Web
                </span>
                <span className="text-xs text-m3-on-surface-variant font-medium whitespace-nowrap block">
                  M3 Messenger
                </span>
              </div>
            )}
          </div>
          {/* Rail expansion toggle on wider screens */}
          <button
            onClick={onToggleExpand}
            className="hidden lg:flex p-1.5 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high transition-colors"
            title={isExpanded ? 'Collapse rail' : 'Expand rail'}
          >
            {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Floating Action Button (FAB) in Rail */}
        <button
          onClick={onOpenNewChat}
          className={`flex items-center justify-center gap-3 bg-m3-primary-container text-m3-on-primary-container font-medium rounded-2xl m3-elevation-2 hover:m3-elevation-3 active:scale-95 transition-all m3-state-layer ${
            isExpanded ? 'w-full h-12 px-4' : 'w-12 h-12'
          }`}
          title="Start new conversation"
        >
          <Plus className="w-6 h-6 shrink-0" />
          {isExpanded && <span className="text-sm tracking-wide">New Chat</span>}
        </button>

        {/* Navigation Destinations */}
        <div className="flex flex-col items-center w-full gap-2 mt-2">
          {destinations.map((dest) => {
            const Icon = dest.icon;
            const isActive = activeTab === dest.id;

            return (
              <button
                key={dest.id}
                onClick={() => {
                  if (dest.id === 'settings') {
                    onOpenSettings();
                  } else {
                    onTabChange(dest.id);
                  }
                }}
                className={`group flex items-center gap-3 w-full rounded-full transition-colors relative py-1 ${
                  isExpanded ? 'px-3 justify-start' : 'flex-col justify-center'
                }`}
                title={dest.label}
              >
                {/* M3 Active Indicator Pill (32px x 56px or 64px) */}
                <div
                  className={`relative flex items-center justify-center transition-all duration-200 rounded-full ${
                    isActive
                      ? 'bg-m3-secondary-container text-m3-on-secondary-container shadow-xs'
                      : 'text-m3-on-surface-variant group-hover:bg-m3-surface-container-high'
                  } ${isExpanded ? 'w-10 h-10 shrink-0' : 'w-14 h-8'}`}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-105" />

                  {/* Badge */}
                  {dest.badge && dest.badge > 0 ? (
                    <span className="absolute -top-1 -right-1 bg-m3-error text-m3-on-error text-[11px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center shadow-xs">
                      {dest.badge > 99 ? '99+' : dest.badge}
                    </span>
                  ) : null}
                </div>

                {/* Text Label */}
                <span
                  className={`text-xs transition-colors font-medium truncate ${
                    isActive ? 'text-m3-on-surface font-semibold' : 'text-m3-on-surface-variant'
                  } ${isExpanded ? 'text-sm' : 'text-[11px]'}`}
                >
                  {dest.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom section: Current User Profile Chip */}
      <div className="w-full pt-4 border-t border-m3-outline-variant/30 flex items-center justify-center">
        <button
          onClick={onOpenSettings}
          className={`group flex items-center gap-3 rounded-full hover:bg-m3-surface-container-high p-1.5 transition-colors w-full ${
            isExpanded ? 'justify-start px-2' : 'justify-center'
          }`}
          title="Account profile & settings"
        >
          <div className="relative shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-m3-primary/30"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-m3-surface-container ${
                currentUser.isOnline ? 'bg-emerald-500' : 'bg-m3-outline'
              }`}
            />
          </div>
          {isExpanded && (
            <div className="text-left overflow-hidden">
              <p className="text-xs font-semibold text-m3-on-surface truncate">{currentUser.name}</p>
              <p className="text-[11px] text-m3-on-surface-variant truncate">Active now</p>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
};
