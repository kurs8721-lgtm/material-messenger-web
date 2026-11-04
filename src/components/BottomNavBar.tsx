import React from 'react';
import { MessageSquare, Phone, Users, Settings } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  unreadTotal: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  unreadTotal,
}) => {
  const destinations = [
    { id: 'chats' as NavTab, label: 'Chats', icon: MessageSquare, badge: unreadTotal },
    { id: 'calls' as NavTab, label: 'Calls', icon: Phone },
    { id: 'contacts' as NavTab, label: 'Contacts', icon: Users },
    { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
  ];

  return (
    <div
      className="h-20 bg-m3-surface-container border-t border-m3-outline-variant/30 flex items-center justify-around px-4 shrink-0 z-30 select-none"
      role="navigation"
      aria-label="Bottom Navigation Bar"
    >
      {destinations.map((dest) => {
        const Icon = dest.icon;
        const isActive = activeTab === dest.id;

        return (
          <button
            key={dest.id}
            onClick={() => onTabChange(dest.id)}
            className="flex flex-col items-center justify-center gap-1 group py-1 relative focus:outline-none"
          >
            {/* Active Pill Indicator (32px x 64px) */}
            <div
              className={`h-8 w-16 rounded-full flex items-center justify-center transition-all duration-200 relative ${
                isActive
                  ? 'bg-m3-secondary-container text-m3-on-secondary-container shadow-xs scale-100'
                  : 'text-m3-on-surface-variant hover:bg-m3-surface-container-high'
              }`}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-105" />

              {/* Badge */}
              {dest.badge && dest.badge > 0 ? (
                <span className="absolute -top-1 -right-1 bg-m3-error text-m3-on-error text-[10px] font-bold rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                  {dest.badge > 99 ? '99+' : dest.badge}
                </span>
              ) : null}
            </div>

            {/* Label */}
            <span
              className={`text-[12px] font-medium tracking-wide transition-colors ${
                isActive ? 'text-m3-on-surface font-semibold' : 'text-m3-on-surface-variant'
              }`}
            >
              {dest.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
