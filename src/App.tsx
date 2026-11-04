import React, { useState, useEffect } from 'react';
import {
  CURRENT_USER,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  THEME_PALETTES
} from './data/mockData';
import {
  Conversation,
  Message,
  NavTab,
  ThemePalette,
  ViewportMode,
  User
} from './types';
import { NavigationRail } from './components/NavigationRail';
import { BottomNavBar } from './components/BottomNavBar';
import { ConversationList } from './components/ConversationList';
import { ChatPanel } from './components/ChatPanel';
import { DetailsDrawer } from './components/DetailsDrawer';
import { CallsModal } from './components/CallsModal';
import { NewChatModal } from './components/NewChatModal';
import { SettingsModal } from './components/SettingsModal';
import { CallsScreen } from './components/CallsScreen';
import { ContactsScreen } from './components/ContactsScreen';
import { Monitor, Smartphone, Tablet, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [selectedConvId, setSelectedConvId] = useState<string>('conv-1');
  const [activeTab, setActiveTab] = useState<NavTab>('chats');
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRailExpanded, setIsRailExpanded] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePalette>('lavender');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Modals
  const [activeCall, setActiveCall] = useState<{
    conversation: Conversation;
    type: 'voice' | 'video';
  } | null>(null);
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Responsive device simulation mode: 'responsive' | 'mobile' | 'tablet' | 'desktop'
  const [viewportMode, setViewportMode] = useState<ViewportMode>('responsive');
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute effective layout form factor
  const effectiveWidth =
    viewportMode === 'mobile'
      ? 480
      : viewportMode === 'tablet'
      ? 768
      : viewportMode === 'desktop'
      ? 1200
      : windowWidth;

  const isMobile = effectiveWidth < 600;
  const isTablet = effectiveWidth >= 600 && effectiveWidth < 840;
  const isDesktop = effectiveWidth >= 840;

  // On mobile, whether we are viewing a specific chat thread
  const [mobileViewingChat, setMobileViewingChat] = useState(false);

  // Active conversation object
  const activeConversation =
    conversations.find((c) => c.id === selectedConvId) || conversations[0];
  const activeMessages = messages[selectedConvId] || [];

  // Update dynamic theme CSS variables on root element
  useEffect(() => {
    const palette = THEME_PALETTES[activeTheme];
    if (palette) {
      const root = document.documentElement;
      root.style.setProperty('--color-m3-primary', palette.primary);
      root.style.setProperty('--color-m3-primary-container', palette.primaryContainer);
      root.style.setProperty('--color-m3-on-primary-container', palette.onPrimaryContainer);
      root.style.setProperty('--color-m3-secondary', palette.secondary);
      root.style.setProperty('--color-m3-secondary-container', palette.secondaryContainer);
      root.style.setProperty('--color-m3-surface-container', palette.surfaceContainer);
    }
  }, [activeTheme]);

  // Total unread messages across conversations
  const unreadTotal = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  // Send message handler with simulated peer response
  const handleSendMessage = (
    content: string,
    media?: Message['media'],
    replyTo?: Message['replyTo']
  ) => {
    const newMsgId = `msg-${Date.now()}`;
    const newMsg: Message = {
      id: newMsgId,
      conversationId: selectedConvId,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderAvatar: CURRENT_USER.avatar,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      rawTime: Date.now(),
      isOutgoing: true,
      status: 'sent',
      media,
      replyTo,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedConvId]: [...(prev[selectedConvId] || []), newMsg],
    }));

    // Mark conversation unread as 0
    setConversations((prev) =>
      prev.map((c) => (c.id === selectedConvId ? { ...c, unreadCount: 0 } : c))
    );

    // Simulate peer typing & response after 1.8 seconds
    const targetConv = activeConversation;
    const peerName = targetConv.isGroup ? 'Maya Lin' : targetConv.name;
    const peerAvatar = targetConv.isGroup
      ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80'
      : targetConv.avatar;

    // Show typing indicator
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, typingUser: peerName } : c))
      );
    }, 800);

    // Append reply
    setTimeout(() => {
      // Clear typing indicator
      setConversations((prev) =>
        prev.map((c) => (c.id === selectedConvId ? { ...c, typingUser: undefined } : c))
      );

      const replies = [
        `Thanks Alex! The Material Design 3 tonal hierarchy looks exceptionally balanced.`,
        `Checked that out. The elevation level and tactile state feedback are working nicely!`,
        `Agreed! The adaptive layout handles this smoothly across mobile, tablet, and desktop.`,
        `Sounds great. Let's merge these token updates into the design system branch.`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const peerMsg: Message = {
        id: `reply-${Date.now()}`,
        conversationId: selectedConvId,
        senderId: 'peer',
        senderName: peerName,
        senderAvatar: peerAvatar,
        content: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        rawTime: Date.now(),
        isOutgoing: false,
        status: 'read',
      };

      setMessages((prev) => ({
        ...prev,
        [selectedConvId]: [...(prev[selectedConvId] || []), peerMsg],
      }));
    }, 2400);
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConvId(id);
    if (isMobile) {
      setMobileViewingChat(true);
    }
    // Clear unread badge
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleToggleReaction = (messageId: string, emoji: string) => {
    setMessages((prev) => {
      const currentList = prev[selectedConvId] || [];
      const updated = currentList.map((m) => {
        if (m.id !== messageId) return m;

        const currentReactions = m.reactions || [];
        const existing = currentReactions.find((r) => r.emoji === emoji);

        if (existing) {
          const userHasReacted = existing.users.includes(CURRENT_USER.name);
          if (userHasReacted) {
            // Remove reaction
            const newUsers = existing.users.filter((u) => u !== CURRENT_USER.name);
            if (newUsers.length === 0) {
              return {
                ...m,
                reactions: currentReactions.filter((r) => r.emoji !== emoji),
              };
            }
            return {
              ...m,
              reactions: currentReactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count - 1, users: newUsers } : r
              ),
            };
          } else {
            // Add reaction
            return {
              ...m,
              reactions: currentReactions.map((r) =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, CURRENT_USER.name] }
                  : r
              ),
            };
          }
        } else {
          // New reaction entry
          return {
            ...m,
            reactions: [
              ...currentReactions,
              { emoji, count: 1, users: [CURRENT_USER.name] },
            ],
          };
        }
      });

      return { ...prev, [selectedConvId]: updated };
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => ({
      ...prev,
      [selectedConvId]: (prev[selectedConvId] || []).filter((m) => m.id !== messageId),
    }));
  };

  const handleStarMessage = (messageId: string) => {
    setMessages((prev) => ({
      ...prev,
      [selectedConvId]: (prev[selectedConvId] || []).map((m) =>
        m.id === messageId ? { ...m, isStarred: !m.isStarred } : m
      ),
    }));
  };

  const handleClearChat = () => {
    setMessages((prev) => ({
      ...prev,
      [selectedConvId]: [],
    }));
  };

  const handleToggleMute = () => {
    setConversations((prev) =>
      prev.map((c) => (c.id === selectedConvId ? { ...c, muted: !c.muted } : c))
    );
  };

  const handleCreateNewChat = (newConvData: Partial<Conversation>) => {
    const newId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      name: newConvData.name || 'New Chat',
      isGroup: !!newConvData.isGroup,
      avatar:
        newConvData.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      unreadCount: 0,
      category: newConvData.category || 'direct',
      statusText: newConvData.statusText || 'Active conversation',
      isOnline: true,
      members: newConvData.members || [],
      description: newConvData.description,
      sharedAssets: [],
    };

    setConversations((prev) => [newConv, ...prev]);
    setSelectedConvId(newId);
    setMessages((prev) => ({
      ...prev,
      [newId]: [
        {
          id: `msg-welcome-${Date.now()}`,
          conversationId: newId,
          senderId: 'system',
          senderName: 'System',
          senderAvatar: newConv.avatar,
          content: newConv.isGroup
            ? `Group "${newConv.name}" created with ${newConv.members?.length} members.`
            : `Started a new conversation with ${newConv.name}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          rawTime: Date.now(),
          isOutgoing: false,
          status: 'read',
        },
      ],
    }));

    if (isMobile) {
      setMobileViewingChat(true);
    }
  };

  const handleStartChatWithContact = (contact: User) => {
    const existing = conversations.find(
      (c) => !c.isGroup && c.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (existing) {
      handleSelectConversation(existing.id);
    } else {
      handleCreateNewChat({
        name: contact.name,
        isGroup: false,
        avatar: contact.avatar,
        statusText: contact.statusText,
        isOnline: contact.isOnline,
        category: 'direct',
        members: [contact],
      });
    }
    setActiveTab('chats');
  };

  const handleResetData = () => {
    setConversations(INITIAL_CONVERSATIONS);
    setMessages(INITIAL_MESSAGES);
    setSelectedConvId('conv-1');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-m3-surface text-m3-on-surface overflow-hidden font-sans">
      {/* Top Testing & Adaptability Control Bar */}
      <header className="h-10 bg-m3-surface-container-high border-b border-m3-outline-variant/30 px-3 sm:px-4 flex items-center justify-between text-xs shrink-0 select-none z-30">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-m3-primary animate-pulse" />
          <span className="font-semibold text-m3-on-surface tracking-tight hidden sm:inline">
            Material Web Messenger
          </span>
          <span className="text-[11px] text-m3-on-surface-variant font-mono bg-m3-surface-container px-2 py-0.5 rounded-full">
            M3 • Roboto Flex
          </span>
        </div>

        {/* Viewport Form Factor Switcher so user can test all responsive views */}
        <div className="flex items-center gap-1 bg-m3-surface-container p-0.5 rounded-full border border-m3-outline-variant/30">
          <button
            onClick={() => setViewportMode('responsive')}
            className={`px-2 py-1 rounded-full text-[11px] font-medium transition-all ${
              viewportMode === 'responsive'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                : 'text-m3-on-surface-variant hover:text-m3-on-surface'
            }`}
            title="Auto-adapt to browser window width"
          >
            Auto ({Math.round(windowWidth)}px)
          </button>
          <button
            onClick={() => {
              setViewportMode('mobile');
              setMobileViewingChat(false);
            }}
            className={`p-1 px-1.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewportMode === 'mobile'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                : 'text-m3-on-surface-variant hover:text-m3-on-surface'
            }`}
            title="Mobile Screen (<600dp)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-1 px-1.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewportMode === 'tablet'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                : 'text-m3-on-surface-variant hover:text-m3-on-surface'
            }`}
            title="Tablet Screen (600-839dp)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-1 px-1.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewportMode === 'desktop'
                ? 'bg-m3-secondary-container text-m3-on-secondary-container font-semibold'
                : 'text-m3-on-surface-variant hover:text-m3-on-surface'
            }`}
            title="Desktop Screen (≥840dp)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop</span>
          </button>
        </div>

        {/* Quick Theme Switcher Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-m3-surface hover:bg-m3-surface-container border border-m3-outline-variant/40 text-m3-on-surface transition-colors"
            title="Theme & settings"
          >
            <Sparkles className="w-3.5 h-3.5 text-m3-primary" />
            <span className="text-[11px] font-medium capitalize hidden sm:inline">
              {activeTheme}
            </span>
          </button>
        </div>
      </header>

      {/* Main Responsive Canvas Container */}
      <div className="flex-1 flex overflow-hidden justify-center bg-black/5">
        <div
          className={`h-full flex overflow-hidden transition-all duration-300 bg-m3-surface ${
            viewportMode === 'mobile'
              ? 'w-full max-w-[430px] border-x border-m3-outline-variant/30 shadow-2xl'
              : viewportMode === 'tablet'
              ? 'w-full max-w-[800px] border-x border-m3-outline-variant/30 shadow-2xl'
              : 'w-full'
          }`}
        >
          {/* Navigation Rail for Tablet (80px) and Desktop (80px or 256px) */}
          {!isMobile && (
            <NavigationRail
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
              }}
              unreadTotal={unreadTotal}
              currentUser={CURRENT_USER}
              onOpenNewChat={() => setIsNewChatOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              isExpanded={isRailExpanded}
              onToggleExpand={() => setIsRailExpanded(!isRailExpanded)}
            />
          )}

          {/* Central Working Area */}
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* View Routing based on active Tab */}
            {activeTab === 'calls' ? (
              <CallsScreen
                conversations={conversations}
                onStartCall={(conv, type) => setActiveCall({ conversation: conv, type })}
              />
            ) : activeTab === 'contacts' ? (
              <ContactsScreen
                onStartChatWithContact={handleStartChatWithContact}
                onStartCallWithContact={(contact, type) => {
                  const conv = conversations.find(
                    (c) => c.name.toLowerCase() === contact.name.toLowerCase()
                  ) || {
                    id: `temp-${contact.id}`,
                    name: contact.name,
                    isGroup: false,
                    avatar: contact.avatar,
                    unreadCount: 0,
                    category: 'direct',
                  };
                  setActiveCall({ conversation: conv, type });
                }}
              />
            ) : (
              /* Chats View: Adaptive multi-pane layout */
              <div className="flex-1 flex h-full overflow-hidden relative">
                {/* Mobile View: Single Pane Stack */}
                {isMobile ? (
                  mobileViewingChat ? (
                    <div className="w-full h-full flex">
                      <ChatPanel
                        conversation={activeConversation}
                        messages={activeMessages}
                        currentUser={CURRENT_USER}
                        onSendMessage={handleSendMessage}
                        onBackMobile={() => setMobileViewingChat(false)}
                        onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
                        isDetailsOpen={isDetailsOpen}
                        onStartCall={(type) =>
                          setActiveCall({ conversation: activeConversation, type })
                        }
                        onReact={handleToggleReaction}
                        onDeleteMessage={handleDeleteMessage}
                        onStarMessage={handleStarMessage}
                        isMobile={true}
                      />
                      {isDetailsOpen && (
                        <div className="absolute inset-0 z-40 bg-m3-surface">
                          <DetailsDrawer
                            conversation={activeConversation}
                            onClose={() => setIsDetailsOpen(false)}
                            onClearChat={handleClearChat}
                            onToggleMute={handleToggleMute}
                            onStartCall={(type) =>
                              setActiveCall({ conversation: activeConversation, type })
                            }
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full">
                      <ConversationList
                        conversations={conversations}
                        selectedId={selectedConvId}
                        onSelect={handleSelectConversation}
                        messages={messages}
                        onOpenNewChat={() => setIsNewChatOpen(true)}
                        showMobileFAB={true}
                      />
                    </div>
                  )
                ) : (
                  /* Tablet / Desktop Multi-Pane Canvas */
                  <>
                    {/* Master Conversation List: fixed 320dp on tablet, 360-380dp on desktop */}
                    <div
                      className={`h-full border-r border-m3-outline-variant/30 shrink-0 ${
                        isTablet ? 'w-[320px]' : 'w-[360px] lg:w-[380px]'
                      }`}
                    >
                      <ConversationList
                        conversations={conversations}
                        selectedId={selectedConvId}
                        onSelect={handleSelectConversation}
                        messages={messages}
                        onOpenNewChat={() => setIsNewChatOpen(true)}
                        showMobileFAB={false}
                      />
                    </div>

                    {/* Active Chat Panel: Flex dynamic */}
                    <div className="flex-1 h-full min-w-0">
                      <ChatPanel
                        conversation={activeConversation}
                        messages={activeMessages}
                        currentUser={CURRENT_USER}
                        onSendMessage={handleSendMessage}
                        onBackMobile={() => setMobileViewingChat(false)}
                        onToggleDetails={() => setIsDetailsOpen(!isDetailsOpen)}
                        isDetailsOpen={isDetailsOpen}
                        onStartCall={(type) =>
                          setActiveCall({ conversation: activeConversation, type })
                        }
                        onReact={handleToggleReaction}
                        onDeleteMessage={handleDeleteMessage}
                        onStarMessage={handleStarMessage}
                        isMobile={false}
                      />
                    </div>

                    {/* Collapsible Details Drawer on Desktop/Tablet: 360dp */}
                    {isDetailsOpen && (
                      <DetailsDrawer
                        conversation={activeConversation}
                        onClose={() => setIsDetailsOpen(false)}
                        onClearChat={handleClearChat}
                        onToggleMute={handleToggleMute}
                        onStartCall={(type) =>
                          setActiveCall({ conversation: activeConversation, type })
                        }
                      />
                    )}
                  </>
                )}
              </div>
            )}

            {/* Mobile Bottom Navigation Bar (80px height, docked at bottom) */}
            {isMobile && (!mobileViewingChat || activeTab !== 'chats') && (
              <BottomNavBar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  setMobileViewingChat(false);
                }}
                unreadTotal={unreadTotal}
              />
            )}
          </div>
        </div>
      </div>

      {/* Voice & Video Call Modal */}
      {activeCall && (
        <CallsModal
          conversation={activeCall.conversation}
          type={activeCall.type}
          onEndCall={() => setActiveCall(null)}
        />
      )}

      {/* Start New Chat / Create Group Modal */}
      {isNewChatOpen && (
        <NewChatModal
          onClose={() => setIsNewChatOpen(false)}
          onCreateChat={handleCreateNewChat}
        />
      )}

      {/* Settings & Material You Palette Modal */}
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          currentUser={CURRENT_USER}
          activeTheme={activeTheme}
          onSelectTheme={setActiveTheme}
          density={density}
          onToggleDensity={setDensity}
          onResetData={handleResetData}
        />
      )}
    </div>
  );
}
