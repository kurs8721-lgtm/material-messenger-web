import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, Volume2, Sparkles } from 'lucide-react';
import { Conversation } from '../types';

interface CallsModalProps {
  conversation: Conversation;
  type: 'voice' | 'video';
  onEndCall: () => void;
}

export const CallsModal: React.FC<CallsModalProps> = ({
  conversation,
  type,
  onEndCall,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'voice');

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* M3 Elevation Level 5 Modal dialog with 28px rounded corners */}
      <div className="w-full max-w-md bg-m3-surface-container-high rounded-[28px] m3-elevation-5 overflow-hidden flex flex-col items-center p-6 sm:p-8 text-center border border-m3-outline-variant/30 relative">
        {/* Call Type Indicator Chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-m3-primary-container text-m3-on-primary-container text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{type === 'video' ? 'M3 HD Video Call' : 'M3 Spatial Voice Call'}</span>
        </div>

        {/* Video feed simulation or Avatar wave */}
        {type === 'video' && !isVideoOff ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black mb-6 shadow-md border border-m3-outline-variant/30">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
              alt="Video call peer"
              className="w-full h-full object-cover"
            />
            {/* Small Self view in corner */}
            <div className="absolute bottom-3 right-3 w-20 aspect-video rounded-lg overflow-hidden border-2 border-white shadow-lg bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Self video"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="relative mb-6">
            {/* Pulsing ring animation for voice */}
            <div className="w-28 h-28 rounded-full bg-m3-primary/20 animate-ping absolute inset-0 -m-2 opacity-40" />
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-m3-primary relative z-10 shadow-lg"
            />
          </div>
        )}

        <h3 className="text-xl font-medium text-m3-on-surface tracking-tight">
          {conversation.name}
        </h3>
        <p className="text-xs text-m3-on-surface-variant mt-1 font-mono tracking-wider">
          {formatDuration(seconds)}
        </p>

        {/* In-Call Controls bar */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-m3-error text-m3-on-error'
                : 'bg-m3-surface text-m3-on-surface hover:bg-m3-surface-container-highest'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video Toggle button */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isVideoOff
                ? 'bg-m3-surface text-m3-on-surface hover:bg-m3-surface-container-highest'
                : 'bg-m3-primary-container text-m3-on-primary-container'
            }`}
            title={isVideoOff ? 'Turn on camera' : 'Turn off camera'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Speaker button */}
          <button
            className="w-12 h-12 rounded-full bg-m3-surface text-m3-on-surface hover:bg-m3-surface-container-highest flex items-center justify-center transition-colors"
            title="Speakerphone"
          >
            <Volume2 className="w-5 h-5" />
          </button>

          {/* End Call button (M3 error container filled) */}
          <button
            onClick={onEndCall}
            className="w-12 h-12 rounded-full bg-m3-error text-m3-on-error flex items-center justify-center hover:bg-red-700 transition-colors shadow-md active:scale-95"
            title="End call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
