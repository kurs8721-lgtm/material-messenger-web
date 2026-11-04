import React from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Video, Plus } from 'lucide-react';
import { Conversation } from '../types';

interface CallsScreenProps {
  onStartCall: (conv: Conversation, type: 'voice' | 'video') => void;
  conversations: Conversation[];
}

export const CallsScreen: React.FC<CallsScreenProps> = ({
  onStartCall,
  conversations,
}) => {
  const recentCalls = [
    {
      id: 'call-1',
      conv: conversations[1] || conversations[0],
      type: 'voice' as const,
      direction: 'incoming' as const,
      timestamp: 'Today, 9:30 AM',
      duration: '14 min',
      missed: false,
    },
    {
      id: 'call-2',
      conv: conversations[2] || conversations[0],
      type: 'video' as const,
      direction: 'missed' as const,
      timestamp: 'Yesterday, 4:15 PM',
      missed: true,
    },
    {
      id: 'call-3',
      conv: conversations[0],
      type: 'voice' as const,
      direction: 'outgoing' as const,
      timestamp: 'Nov 2, 2:10 PM',
      duration: '32 min',
      missed: false,
    },
    {
      id: 'call-4',
      conv: conversations[3] || conversations[0],
      type: 'video' as const,
      direction: 'incoming' as const,
      timestamp: 'Oct 31, 11:00 AM',
      duration: '8 min',
      missed: false,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-m3-surface overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-normal text-m3-on-surface">Calls</h1>
          <p className="text-xs text-m3-on-surface-variant">Recent voice & video conversations</p>
        </div>
      </div>

      <div className="space-y-2">
        {recentCalls.map((call) => {
          return (
            <div
              key={call.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-m3-surface hover:bg-m3-surface-container transition-colors border border-m3-outline-variant/20"
            >
              <div className="flex items-center gap-3">
                <img
                  src={call.conv.avatar}
                  alt={call.conv.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <h3
                    className={`text-sm font-medium ${
                      call.missed ? 'text-m3-error' : 'text-m3-on-surface'
                    }`}
                  >
                    {call.conv.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-m3-on-surface-variant mt-0.5">
                    {call.direction === 'incoming' && (
                      <PhoneIncoming className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    {call.direction === 'outgoing' && (
                      <PhoneOutgoing className="w-3.5 h-3.5 text-m3-primary" />
                    )}
                    {call.direction === 'missed' && (
                      <PhoneMissed className="w-3.5 h-3.5 text-m3-error" />
                    )}
                    <span>{call.timestamp}</span>
                    {call.duration && <span>• {call.duration}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onStartCall(call.conv, 'voice')}
                  className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high hover:text-m3-primary transition-colors"
                  title="Voice call"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onStartCall(call.conv, 'video')}
                  className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-high hover:text-m3-primary transition-colors"
                  title="Video call"
                >
                  <Video className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
