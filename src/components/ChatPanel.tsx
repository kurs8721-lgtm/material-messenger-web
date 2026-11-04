import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Video,
  Info,
  ArrowLeft,
  Paperclip,
  Smile,
  Mic,
  Send,
  CheckCheck,
  Check,
  Play,
  Pause,
  Reply,
  Heart,
  Star,
  Trash2,
  Copy,
  Image as ImageIcon,
  FileText,
  Volume2,
  Square,
  Search,
  Download,
  X
} from 'lucide-react';
import { Conversation, Message, User } from '../types';
import { QUICK_EMOJIS, SAMPLE_ATTACHMENTS } from '../data/mockData';

interface ChatPanelProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string, media?: Message['media'], replyTo?: Message['replyTo']) => void;
  onBackMobile: () => void;
  onToggleDetails: () => void;
  isDetailsOpen: boolean;
  onStartCall: (type: 'voice' | 'video') => void;
  onReact: (messageId: string, emoji: string) => void;
  onDeleteMessage: (messageId: string) => void;
  onStarMessage: (messageId: string) => void;
  isMobile: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  conversation,
  messages,
  currentUser,
  onSendMessage,
  onBackMobile,
  onToggleDetails,
  isDetailsOpen,
  onStartCall,
  onReact,
  onDeleteMessage,
  onStarMessage,
  isMobile,
}) => {
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState<Record<string, number>>({});
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [searchInChatOpen, setSearchInChatOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<number | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, conversation.typingUser]);

  // Handle voice recording simulation
  useEffect(() => {
    if (isRecordingAudio) {
      setRecordingSeconds(0);
      recordingTimerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }
    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecordingAudio]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    onSendMessage(
      inputText.trim(),
      undefined,
      replyingTo
        ? {
            id: replyingTo.id,
            senderName: replyingTo.senderName,
            text: replyingTo.content,
          }
        : undefined
    );

    setInputText('');
    setReplyingTo(null);
    setShowEmojiPicker(false);
  };

  const handleSendRecordedAudio = () => {
    setIsRecordingAudio(false);
    onSendMessage('Voice message', {
      type: 'audio',
      url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
      duration: Math.max(recordingSeconds, 3),
      name: `Voice memo (${recordingSeconds}s)`,
    });
    setRecordingSeconds(0);
  };

  const handleSendSampleAttachment = (att: typeof SAMPLE_ATTACHMENTS[0]) => {
    setShowAttachmentMenu(false);
    onSendMessage(att.type === 'image' ? 'Sent an image attachment' : 'Sent a project document', {
      type: att.type,
      url: att.url,
      name: att.name,
      size: att.size,
    });
  };

  const toggleAudioPlay = (msgId: string) => {
    if (activeAudioPlaying === msgId) {
      setActiveAudioPlaying(null);
    } else {
      setActiveAudioPlaying(msgId);
      // Simulate progress advancement
      let prog = 0;
      const interval = setInterval(() => {
        prog += 5;
        if (prog >= 100) {
          clearInterval(interval);
          setActiveAudioPlaying(null);
          setAudioProgress((p) => ({ ...p, [msgId]: 0 }));
        } else {
          setAudioProgress((p) => ({ ...p, [msgId]: prog }));
        }
      }, 200);
    }
  };

  const filteredMessages = chatSearchQuery.trim()
    ? messages.filter((m) =>
        m.content.toLowerCase().includes(chatSearchQuery.toLowerCase())
      )
    : messages;

  return (
    <div className="h-full flex flex-col bg-m3-surface relative overflow-hidden">
      {/* Top App Bar (Level 2 elevation when scrolled, height 64px, surface-container-high) */}
      <header className="h-16 px-3 sm:px-4 bg-m3-surface-container-high border-b border-m3-outline-variant/30 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Mobile Back Button */}
          {isMobile && (
            <button
              onClick={onBackMobile}
              className="p-2 -ml-1 rounded-full text-m3-on-surface hover:bg-m3-surface-container-highest transition-colors"
              title="Back to conversation list"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          {/* Avatar & Online status indicator */}
          <div
            className="relative cursor-pointer shrink-0"
            onClick={onToggleDetails}
            title="View details"
          >
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-black/5"
            />
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-m3-surface-container-high" />
            )}
          </div>

          {/* Conversation Title & Subtitle */}
          <div
            className="cursor-pointer truncate"
            onClick={onToggleDetails}
          >
            <h2 className="text-sm sm:text-base font-semibold text-m3-on-surface truncate">
              {conversation.name}
            </h2>
            <p className="text-xs text-m3-on-surface-variant truncate">
              {conversation.typingUser ? (
                <span className="text-m3-primary font-medium animate-pulse">
                  {conversation.typingUser} is typing...
                </span>
              ) : conversation.isGroup ? (
                `${conversation.members?.length || 4} members • Active now`
              ) : conversation.isOnline ? (
                'Online'
              ) : (
                `Last seen ${conversation.lastSeen || 'recently'}`
              )}
            </p>
          </div>
        </div>

        {/* Action icons: Calls, Search, Details Drawer Toggle */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => setSearchInChatOpen(!searchInChatOpen)}
            className={`p-2 rounded-full transition-colors ${
              searchInChatOpen
                ? 'bg-m3-secondary-container text-m3-on-secondary-container'
                : 'text-m3-on-surface-variant hover:bg-m3-surface-container-highest'
            }`}
            title="Search inside this chat"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => onStartCall('voice')}
            className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-highest hover:text-m3-primary transition-colors"
            title="Voice call"
          >
            <Phone className="w-5 h-5" />
          </button>

          <button
            onClick={() => onStartCall('video')}
            className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-surface-container-highest hover:text-m3-primary transition-colors"
            title="Video call"
          >
            <Video className="w-5 h-5" />
          </button>

          <button
            onClick={onToggleDetails}
            className={`p-2 rounded-full transition-colors ${
              isDetailsOpen
                ? 'bg-m3-secondary-container text-m3-on-secondary-container'
                : 'text-m3-on-surface-variant hover:bg-m3-surface-container-highest'
            }`}
            title="Conversation details"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* In-chat search banner if open */}
      {searchInChatOpen && (
        <div className="px-4 py-2 bg-m3-surface-container border-b border-m3-outline-variant/30 flex items-center gap-2 z-10">
          <Search className="w-4 h-4 text-m3-on-surface-variant shrink-0" />
          <input
            type="text"
            value={chatSearchQuery}
            onChange={(e) => setChatSearchQuery(e.target.value)}
            placeholder="Search in this chat..."
            className="w-full bg-transparent text-sm text-m3-on-surface focus:outline-none"
            autoFocus
          />
          {chatSearchQuery && (
            <button
              onClick={() => setChatSearchQuery('')}
              className="text-m3-on-surface-variant hover:text-m3-on-surface p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Chat Messages Stream (Level 0 canvas surface) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Date divider pill */}
        <div className="flex items-center justify-center my-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-m3-surface-container-high text-m3-on-surface-variant shadow-xs">
            Today
          </span>
        </div>

        {filteredMessages.map((msg, index) => {
          const prevMsg = filteredMessages[index - 1];
          const isSameSender = prevMsg && prevMsg.senderId === msg.senderId;
          const isOutgoing = msg.isOutgoing;

          // Asymmetric corner radii:
          // Outgoing: 16px 16px 4px 16px (unless consecutive: 16px 16px 16px 16px)
          // Incoming: 16px 16px 16px 4px (unless consecutive: 16px 16px 16px 16px)
          const bubbleShape = isOutgoing
            ? isSameSender
              ? 'rounded-2xl'
              : 'rounded-2xl rounded-br-[4px]'
            : isSameSender
            ? 'rounded-2xl'
            : 'rounded-2xl rounded-bl-[4px]';

          return (
            <div
              key={msg.id}
              className={`flex flex-col group relative ${
                isOutgoing ? 'items-end' : 'items-start'
              }`}
            >
              {/* Sender Name in group chats for incoming messages */}
              {!isOutgoing && conversation.isGroup && !isSameSender && (
                <div className="flex items-center gap-2 mb-1 ml-1">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span className="text-[11px] font-semibold text-m3-primary">
                    {msg.senderName}
                  </span>
                </div>
              )}

              {/* Message Bubble Container with Action Hover menu */}
              <div className="flex items-center gap-2 max-w-[85%] sm:max-w-[75%] relative">
                {/* Outgoing hover action toolbar (shows to the left of outgoing bubble) */}
                {isOutgoing && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-m3-surface-container-highest/90 backdrop-blur-xs px-2 py-1 rounded-full shadow-sm text-m3-on-surface-variant text-xs">
                    <button
                      onClick={() => setReplyingTo(msg)}
                      className="p-1 hover:text-m3-primary rounded-full transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onStarMessage(msg.id)}
                      className={`p-1 rounded-full transition-colors ${
                        msg.isStarred ? 'text-amber-500' : 'hover:text-amber-500'
                      }`}
                      title={msg.isStarred ? 'Starred' : 'Star message'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => onDeleteMessage(msg.id)}
                      className="p-1 hover:text-m3-error rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* The Message Bubble itself */}
                <div
                  className={`px-4 py-2.5 m3-elevation-1 transition-all ${bubbleShape} ${
                    isOutgoing
                      ? 'bg-m3-primary text-m3-on-primary'
                      : 'bg-m3-surface-container text-m3-on-surface'
                  }`}
                >
                  {/* Quoted reply inside bubble */}
                  {msg.replyTo && (
                    <div
                      className={`mb-2 p-2 rounded-lg text-xs border-l-3 transition-colors ${
                        isOutgoing
                          ? 'bg-white/15 border-white/80 text-white'
                          : 'bg-m3-surface-container-highest border-m3-primary text-m3-on-surface-variant'
                      }`}
                    >
                      <span className="font-semibold block">{msg.replyTo.senderName}</span>
                      <p className="truncate opacity-90">{msg.replyTo.text}</p>
                    </div>
                  )}

                  {/* Media Content: Image */}
                  {msg.media?.type === 'image' && (
                    <div className="mb-2 overflow-hidden rounded-xl cursor-pointer">
                      <img
                        src={msg.media.url}
                        alt={msg.media.name || 'Attachment'}
                        onClick={() => setZoomedImage(msg.media?.url || null)}
                        className="max-h-64 w-full object-cover hover:scale-102 transition-transform duration-200"
                      />
                      {msg.media.name && (
                        <div className="flex items-center justify-between text-[11px] pt-1.5 opacity-80">
                          <span className="truncate">{msg.media.name}</span>
                          <span className="shrink-0">{msg.media.size}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Media Content: Audio Voice Note */}
                  {msg.media?.type === 'audio' && (
                    <div
                      className={`flex items-center gap-3 py-1 px-1 rounded-xl mb-1 ${
                        isOutgoing ? 'text-white' : 'text-m3-on-surface'
                      }`}
                    >
                      <button
                        onClick={() => toggleAudioPlay(msg.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
                          isOutgoing
                            ? 'bg-white text-m3-primary shadow-xs'
                            : 'bg-m3-primary text-white shadow-xs'
                        }`}
                        title="Play audio note"
                      >
                        {activeAudioPlaying === msg.id ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="flex-1 min-w-[140px]">
                        {/* Audio Waveform simulation bars */}
                        <div className="flex items-center gap-0.5 h-6">
                          {[30, 60, 40, 85, 95, 50, 70, 45, 90, 65, 30, 80, 55, 75, 40, 60, 90, 35].map(
                            (height, i) => {
                              const prog = audioProgress[msg.id] || 0;
                              const isActiveBar = (i / 18) * 100 <= prog;
                              return (
                                <div
                                  key={i}
                                  className={`w-1 rounded-full transition-all duration-150 ${
                                    isActiveBar
                                      ? isOutgoing
                                        ? 'bg-white'
                                        : 'bg-m3-primary'
                                      : isOutgoing
                                      ? 'bg-white/40'
                                      : 'bg-m3-outline-variant'
                                  }`}
                                  style={{ height: `${height}%` }}
                                />
                              );
                            }
                          )}
                        </div>
                        <div className="flex items-center justify-between text-[10px] opacity-75 mt-0.5">
                          <span>0:{String(msg.media.duration || 15).padStart(2, '0')}</span>
                          <span className="flex items-center gap-1">
                            <Volume2 className="w-3 h-3" /> Voice Memo
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media Content: File attachment */}
                  {msg.media?.type === 'file' && (
                    <div
                      className={`flex items-center gap-3 p-2.5 rounded-xl mb-2 ${
                        isOutgoing ? 'bg-white/15' : 'bg-m3-surface-container-high'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-m3-primary-container text-m3-on-primary-container flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{msg.media.name}</p>
                        <p className="text-[10px] opacity-75">{msg.media.size || 'Document'}</p>
                      </div>
                      <button
                        className="p-1.5 rounded-full hover:bg-black/10 transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Message Text Content */}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>

                  {/* Metadata: Timestamp & Read Receipts */}
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[11px] ${
                      isOutgoing ? 'text-white/70' : 'text-m3-on-surface-variant'
                    }`}
                  >
                    {msg.isStarred && (
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                    )}
                    <span>{msg.timestamp}</span>
                    {isOutgoing && (
                      <span title={msg.status}>
                        {msg.status === 'read' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-m3-primary-container" />
                        ) : msg.status === 'delivered' ? (
                          <CheckCheck className="w-3.5 h-3.5 text-white/70" />
                        ) : (
                          <Check className="w-3.5 h-3.5 text-white/70" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Incoming hover action toolbar (shows to the right of incoming bubble) */}
                {!isOutgoing && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-m3-surface-container-highest/90 backdrop-blur-xs px-2 py-1 rounded-full shadow-sm text-m3-on-surface-variant text-xs">
                    <button
                      onClick={() => setReplyingTo(msg)}
                      className="p-1 hover:text-m3-primary rounded-full transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onReact(msg.id, '❤️')}
                      className="p-1 hover:text-rose-500 rounded-full transition-colors"
                      title="Heart"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onStarMessage(msg.id)}
                      className={`p-1 rounded-full transition-colors ${
                        msg.isStarred ? 'text-amber-500' : 'hover:text-amber-500'
                      }`}
                      title={msg.isStarred ? 'Starred' : 'Star message'}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                )}
              </div>

              {/* Message Reactions Cluster under bubble */}
              {msg.reactions && msg.reactions.length > 0 && (
                <div
                  className={`flex flex-wrap items-center gap-1 mt-1 ${
                    isOutgoing ? 'mr-1 justify-end' : 'ml-1 justify-start'
                  }`}
                >
                  {msg.reactions.map((react, rIdx) => {
                    const hasMyReact = react.users.includes(currentUser.name);
                    return (
                      <button
                        key={rIdx}
                        onClick={() => onReact(msg.id, react.emoji)}
                        className={`h-6 px-2 rounded-full text-xs flex items-center gap-1 border transition-all ${
                          hasMyReact
                            ? 'bg-m3-primary-container border-m3-primary/30 text-m3-on-primary-container font-semibold'
                            : 'bg-m3-surface-container border-m3-outline-variant/40 text-m3-on-surface-variant hover:bg-m3-surface-container-high'
                        }`}
                        title={react.users.join(', ')}
                      >
                        <span>{react.emoji}</span>
                        <span className="text-[10px]">{react.count}</span>
                      </button>
                    );
                  })}
                  {/* Quick add reaction button */}
                  <button
                    onClick={() => onReact(msg.id, '👍')}
                    className="h-6 w-6 rounded-full bg-m3-surface-container border border-m3-outline-variant/40 text-m3-on-surface-variant hover:bg-m3-surface-container-high flex items-center justify-center text-xs"
                    title="Add reaction"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Live Typing Indicator */}
        {conversation.typingUser && (
          <div className="flex items-center gap-2 text-xs text-m3-on-surface-variant pl-2 py-1">
            <div className="flex items-center gap-1 bg-m3-surface-container px-3 py-1.5 rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-m3-primary animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-m3-primary animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-m3-primary animate-bounce" />
            </div>
            <span className="font-medium text-m3-primary">{conversation.typingUser} is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Composer Area */}
      <footer className="p-3 sm:p-4 bg-m3-surface shrink-0 border-t border-m3-outline-variant/20 relative z-20">
        {/* Quoted reply banner if active */}
        {replyingTo && (
          <div className="mb-2 p-2.5 rounded-2xl bg-m3-surface-container-high flex items-center justify-between border-l-4 border-m3-primary">
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-m3-primary block">
                Replying to {replyingTo.senderName}
              </span>
              <p className="text-xs text-m3-on-surface-variant truncate">
                {replyingTo.content}
              </p>
            </div>
            <button
              onClick={() => setReplyingTo(null)}
              className="p-1 rounded-full text-m3-on-surface-variant hover:bg-m3-outline-variant/30 ml-2"
              title="Cancel reply"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Voice recording live bar or standard message composer */}
        {isRecordingAudio ? (
          <div className="flex items-center justify-between h-14 rounded-full bg-rose-50 px-4 border border-rose-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="text-sm font-semibold text-rose-800">
                Recording audio: {recordingSeconds}s
              </span>
              <span className="text-xs text-rose-600 hidden sm:inline">
                (Simulated microphone capture)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecordingAudio(false)}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRecordedAudio}
                className="px-4 py-1.5 rounded-full bg-rose-600 text-white text-xs font-semibold shadow-xs hover:bg-rose-700 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Send Audio
              </button>
            </div>
          </div>
        ) : (
          <div className="relative flex items-center gap-1.5 sm:gap-2">
            {/* Main Composer Pill Container: surface-container-highest */}
            <div className="flex-1 flex items-center h-14 rounded-full bg-m3-surface-container-highest px-3 transition-all focus-within:ring-2 focus-within:ring-m3-primary/40">
              {/* Emoji Picker toggle button */}
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className={`p-2 rounded-full transition-colors ${
                  showEmojiPicker
                    ? 'text-m3-primary bg-m3-surface-container-high'
                    : 'text-m3-on-surface-variant hover:bg-m3-outline-variant/30'
                }`}
                title="Choose emoji or sticker"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Text input field */}
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 bg-transparent px-2 text-m3-on-surface placeholder:text-m3-on-surface-variant text-sm sm:text-base focus:outline-none"
              />

              {/* Attachment Picker button */}
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className={`p-2 rounded-full transition-colors ${
                  showAttachmentMenu
                    ? 'text-m3-primary bg-m3-surface-container-high'
                    : 'text-m3-on-surface-variant hover:bg-m3-outline-variant/30'
                }`}
                title="Add attachment"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Voice recording trigger button */}
              <button
                onClick={() => setIsRecordingAudio(true)}
                className="p-2 rounded-full text-m3-on-surface-variant hover:bg-m3-outline-variant/30 transition-colors"
                title="Record voice note"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>

            {/* M3 Primary Send Button (Filled Button / Pill) */}
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all m3-elevation-2 active:scale-95 ${
                inputText.trim()
                  ? 'bg-m3-primary text-m3-on-primary hover:m3-elevation-3 cursor-pointer'
                  : 'bg-m3-surface-container-highest text-m3-on-surface-variant/40 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </div>
        )}

        {/* Emoji & Quick Reactions Dropdown Menu */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 bg-m3-surface-container-high p-3 rounded-2xl m3-elevation-3 border border-m3-outline-variant/40 z-30 w-72">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-m3-outline-variant/30">
              <span className="text-xs font-semibold text-m3-on-surface">Quick Reactions</span>
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="p-1 text-m3-on-surface-variant hover:text-m3-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2 text-2xl text-center">
              {QUICK_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setInputText((prev) => prev + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }}
                  className="p-2 rounded-xl hover:bg-m3-surface-container-highest transition-colors active:scale-90"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Options Dropdown Menu */}
        {showAttachmentMenu && (
          <div className="absolute bottom-20 right-16 sm:right-20 bg-m3-surface-container-high p-3 rounded-2xl m3-elevation-3 border border-m3-outline-variant/40 z-30 w-72 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-m3-outline-variant/30">
              <span className="text-xs font-semibold text-m3-on-surface">Select Attachment</span>
              <button
                onClick={() => setShowAttachmentMenu(false)}
                className="p-1 text-m3-on-surface-variant hover:text-m3-on-surface"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1">
              {SAMPLE_ATTACHMENTS.map((att, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendSampleAttachment(att)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-m3-surface-container-highest text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-m3-secondary-container text-m3-on-secondary-container flex items-center justify-center shrink-0">
                    {att.type === 'image' ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-m3-on-surface truncate">{att.name}</p>
                    <p className="text-[10px] text-m3-on-surface-variant">{att.size}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </footer>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={zoomedImage}
              alt="Enlarged media"
              className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
