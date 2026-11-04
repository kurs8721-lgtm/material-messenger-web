import { Conversation, Message, User, ThemeConfig } from '../types';

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Alex Rivera',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  role: 'member',
  statusText: 'Designing Material You components 🎨',
  isOnline: true,
  email: 'alex.rivera@material.design',
  phone: '+1 (555) 382-9014'
};

export const THEME_PALETTES: Record<string, ThemeConfig> = {
  lavender: {
    id: 'lavender',
    name: 'Material Purple (Default)',
    primary: '#6750a4',
    primaryContainer: '#eaddff',
    onPrimaryContainer: '#21005d',
    secondary: '#625b71',
    secondaryContainer: '#e8def8',
    surfaceContainer: '#f3edf7',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Teal',
    primary: '#00677d',
    primaryContainer: '#b5ebff',
    onPrimaryContainer: '#001f28',
    secondary: '#4c626b',
    secondaryContainer: '#cfe6f1',
    surfaceContainer: '#edf4f7',
  },
  sage: {
    id: 'sage',
    name: 'Botanical Sage',
    primary: '#3b6939',
    primaryContainer: '#bcf1b4',
    onPrimaryContainer: '#002204',
    secondary: '#53634f',
    secondaryContainer: '#d6e8ce',
    surfaceContainer: '#eef4ed',
  },
  amber: {
    id: 'amber',
    name: 'Sunset Amber',
    primary: '#855318',
    primaryContainer: '#ffddb8',
    onPrimaryContainer: '#2a1700',
    secondary: '#705b41',
    secondaryContainer: '#fce0be',
    surfaceContainer: '#f9f2eb',
  },
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Design Systems Guild',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 3,
    statusText: '14 designers & engineers active',
    pinned: true,
    category: 'work',
    description: 'Core discussion for Material Design 3 tokens, component library updates, and accessible UI kits.',
    typingUser: undefined,
    members: [
      {
        id: 'user-maya',
        name: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
        role: 'admin',
        statusText: 'Reviewing M3 token specs',
        isOnline: true,
        email: 'maya.lin@material.design'
      },
      {
        id: 'user-aris',
        name: 'Dr. Aris Thorne',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
        role: 'admin',
        statusText: 'Deep dive in token architecture',
        isOnline: true,
        email: 'aris.thorne@material.design'
      },
      {
        id: 'user-elena',
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
        role: 'member',
        statusText: 'Prototyping responsive rails',
        isOnline: false,
        lastSeen: '15m ago',
        email: 'elena.rostova@material.design'
      },
      {
        id: 'user-marcus',
        name: 'Marcus Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
        role: 'member',
        statusText: 'Implementing motion curves',
        isOnline: true,
        email: 'marcus.chen@material.design'
      }
    ],
    sharedAssets: [
      {
        id: 'asset-1',
        type: 'image',
        title: 'M3 Tonal Elevation Specs',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        date: 'Today, 10:45 AM',
        size: '1.4 MB'
      },
      {
        id: 'asset-2',
        type: 'file',
        title: 'Material-3-Tokens-v2.json',
        url: '#',
        date: 'Yesterday',
        size: '240 KB'
      },
      {
        id: 'asset-3',
        type: 'link',
        title: 'Material Design 3 Guidelines',
        url: 'https://m3.material.io',
        date: 'Nov 2'
      }
    ]
  },
  {
    id: 'conv-2',
    name: 'Maya Lin',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 0,
    isOnline: true,
    pinned: true,
    statusText: 'Lead Design Architect • Product Systems',
    category: 'direct',
    description: 'Lead Design Architect at Material Lab. Focus on adaptive layouts and cross-platform design tokens.',
    members: [],
    sharedAssets: [
      {
        id: 'asset-maya-1',
        type: 'image',
        title: 'Navigation Rail States.png',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        date: 'Yesterday',
        size: '890 KB'
      }
    ]
  },
  {
    id: 'conv-3',
    name: 'Dr. Aris Thorne',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 1,
    isOnline: true,
    statusText: 'AI Systems & Accessibility Research',
    category: 'work',
    description: 'Senior Researcher exploring semantic color mapping and contrast accessibility ratios in M3.',
    members: [],
    sharedAssets: []
  },
  {
    id: 'conv-4',
    name: 'Elena Rostova',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '15m ago',
    statusText: 'Interaction Design & Micro-animations',
    category: 'direct',
    description: 'Interaction designer. Creating tactile state layers and smooth transition choreography.',
    members: [],
    sharedAssets: []
  },
  {
    id: 'conv-5',
    name: 'Product Core Announcements',
    isGroup: true,
    avatar: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 0,
    statusText: 'Broadcast channel • 28 members',
    pinned: false,
    category: 'work',
    description: 'Official releases, deploy metrics, and cross-functional milestones for the engineering group.',
    members: [],
    sharedAssets: []
  },
  {
    id: 'conv-6',
    name: 'Jordan Sparks',
    isGroup: false,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '3h ago',
    statusText: 'Coffee enthusiast ☕ | Frontend Engineer',
    category: 'direct',
    description: 'Frontend Engineer specializing in React state management and responsive canvas layouts.',
    members: [],
    sharedAssets: []
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1-1',
      conversationId: 'conv-1',
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Hey team! The Material Design 3 Web Messenger spec is locked in. Please review the tonal elevation tiers and asymmetric chat bubble radii.',
      timestamp: '10:14 AM',
      rawTime: 1730704440000,
      isOutgoing: false,
      status: 'read',
      reactions: [
        { emoji: '🚀', count: 4, users: ['Alex Rivera', 'Dr. Aris Thorne', 'Marcus Chen'] },
        { emoji: '❤️', count: 2, users: ['Elena Rostova'] }
      ]
    },
    {
      id: 'msg-1-2',
      conversationId: 'conv-1',
      senderId: 'user-aris',
      senderName: 'Dr. Aris Thorne',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'The 4px tail corner contrast is spot on. Outgoing messages get the sharp bottom-right tail, while incoming get the bottom-left tail. Successive messages drop the tail into uniform 16px curvature.',
      timestamp: '10:18 AM',
      rawTime: 1730704680000,
      isOutgoing: false,
      status: 'read',
      reactions: [
        { emoji: '👍', count: 3, users: ['Maya Lin', 'Alex Rivera'] }
      ]
    },
    {
      id: 'msg-1-3',
      conversationId: 'conv-1',
      senderId: 'me',
      senderName: 'Alex Rivera',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'I have prepared the interactive prototype! It supports Mobile single-pane stack, Tablet dual-pane with 80px Rail, and Desktop 3-pane with collapsible drawer.',
      timestamp: '10:25 AM',
      rawTime: 1730705100000,
      isOutgoing: true,
      status: 'read',
      reactions: [
        { emoji: '🔥', count: 5, users: ['Maya Lin', 'Dr. Aris Thorne', 'Elena Rostova', 'Marcus Chen'] }
      ]
    },
    {
      id: 'msg-1-4',
      conversationId: 'conv-1',
      senderId: 'user-elena',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Here is the elevation mockup showing Level 0 through Level 5 layers in action:',
      timestamp: '10:32 AM',
      rawTime: 1730705520000,
      isOutgoing: false,
      status: 'read',
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
        name: 'M3-Tonal-Hierarchy-Sample.png',
        size: '1.4 MB'
      }
    },
    {
      id: 'msg-1-5',
      conversationId: 'conv-1',
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'I also recorded a quick voice memo walking through the bottom sheet gesture and FAB transitions:',
      timestamp: '10:41 AM',
      rawTime: 1730706060000,
      isOutgoing: false,
      status: 'read',
      media: {
        type: 'audio',
        url: 'https://actions.google.com/sounds/v1/ambiences/coffee_shop.ogg',
        duration: 34,
        name: 'Voice memo: FAB & Navigation specs'
      }
    },
    {
      id: 'msg-1-6',
      conversationId: 'conv-1',
      senderId: 'user-marcus',
      senderName: 'Marcus Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Are we supporting quick quote replies directly from hovering a bubble?',
      timestamp: '10:45 AM',
      rawTime: 1730706300000,
      isOutgoing: false,
      status: 'delivered'
    },
    {
      id: 'msg-1-7',
      conversationId: 'conv-1',
      senderId: 'me',
      senderName: 'Alex Rivera',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Yes! You can hover or tap any message to quote reply, react with emoji, copy, or star.',
      timestamp: '10:48 AM',
      rawTime: 1730706480000,
      isOutgoing: true,
      status: 'read',
      replyTo: {
        id: 'msg-1-6',
        senderName: 'Marcus Chen',
        text: 'Are we supporting quick quote replies directly from hovering a bubble?'
      }
    }
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      conversationId: 'conv-2',
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Good morning Alex! Did you manage to test the 80px navigation rail state transitions for tablet viewports?',
      timestamp: '8:45 AM',
      rawTime: 1730699100000,
      isOutgoing: false,
      status: 'read'
    },
    {
      id: 'msg-2-2',
      conversationId: 'conv-2',
      senderId: 'me',
      senderName: 'Alex Rivera',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Yes! The 80px rail seamlessly docks on the left, with the conversation list at 320dp and active chat taking the remaining width. It looks ultra polished.',
      timestamp: '9:02 AM',
      rawTime: 1730700120000,
      isOutgoing: true,
      status: 'read'
    },
    {
      id: 'msg-2-3',
      conversationId: 'conv-2',
      senderId: 'user-maya',
      senderName: 'Maya Lin',
      senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Awesome. Let us also ensure the details drawer on desktop can toggle smoothly without jarring the layout.',
      timestamp: '9:15 AM',
      rawTime: 1730700900000,
      isOutgoing: false,
      status: 'read'
    }
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      conversationId: 'conv-3',
      senderId: 'user-aris',
      senderName: 'Dr. Aris Thorne',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Alex, take a look at the color contrast formula for on-primary-container (#21005D) against primary-container (#EADDFF). It passes WCAG AAA with a 9.2:1 ratio.',
      timestamp: 'Yesterday',
      rawTime: 1730619600000,
      isOutgoing: false,
      status: 'read'
    },
    {
      id: 'msg-3-2',
      conversationId: 'conv-3',
      senderId: 'user-aris',
      senderName: 'Dr. Aris Thorne',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Can you verify the active search bar elevation level when focused?',
      timestamp: '11:02 AM',
      rawTime: 1730707320000,
      isOutgoing: false,
      status: 'delivered'
    }
  ],
  'conv-4': [
    {
      id: 'msg-4-1',
      conversationId: 'conv-4',
      senderId: 'user-elena',
      senderName: 'Elena Rostova',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Coffee break at 3pm? We can review the sticker pack animations together!',
      timestamp: 'Yesterday',
      rawTime: 1730626800000,
      isOutgoing: false,
      status: 'read'
    }
  ],
  'conv-5': [
    {
      id: 'msg-5-1',
      conversationId: 'conv-5',
      senderId: 'system-bot',
      senderName: 'Release Bot',
      senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=256&h=256&q=80',
      content: '📢 Material Design 3 Web System v3.2.0 deployed to staging! Includes enhanced state layers, ripple feedback, and pill filters.',
      timestamp: 'Nov 2',
      rawTime: 1730533200000,
      isOutgoing: false,
      status: 'read'
    }
  ],
  'conv-6': [
    {
      id: 'msg-6-1',
      conversationId: 'conv-6',
      senderId: 'conv-6',
      senderName: 'Jordan Sparks',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
      content: 'Loved the smooth motion curves on the FAB expand animation!',
      timestamp: 'Oct 30',
      rawTime: 1730360400000,
      isOutgoing: false,
      status: 'read'
    }
  ]
};

export const QUICK_EMOJIS = ['❤️', '👍', '🔥', '🎉', '😂', '👏', '✨', '🙌'];

export const SAMPLE_ATTACHMENTS = [
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    name: 'Material-Palette-Exploration.png',
    size: '1.2 MB'
  },
  {
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    name: 'Hardware-Test-Station.jpg',
    size: '2.4 MB'
  },
  {
    type: 'file' as const,
    url: '#',
    name: 'Design-Tokens-Specification-v3.pdf',
    size: '3.8 MB'
  }
];

export const ALL_CONTACTS: User[] = [
  {
    id: 'user-maya',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'admin',
    statusText: 'Lead Design Architect • Product Systems',
    isOnline: true,
    email: 'maya.lin@material.design',
    phone: '+1 (555) 234-5678'
  },
  {
    id: 'user-aris',
    name: 'Dr. Aris Thorne',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'admin',
    statusText: 'AI Systems & Accessibility Research',
    isOnline: true,
    email: 'aris.thorne@material.design',
    phone: '+1 (555) 345-6789'
  },
  {
    id: 'user-elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'member',
    statusText: 'Interaction Design & Micro-animations',
    isOnline: false,
    lastSeen: '15m ago',
    email: 'elena.rostova@material.design',
    phone: '+1 (555) 456-7890'
  },
  {
    id: 'user-marcus',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'member',
    statusText: 'Motion design & physics curves',
    isOnline: true,
    email: 'marcus.chen@material.design',
    phone: '+1 (555) 567-8901'
  },
  {
    id: 'user-jordan',
    name: 'Jordan Sparks',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'member',
    statusText: 'Coffee enthusiast ☕ | Frontend Engineer',
    isOnline: false,
    lastSeen: '3h ago',
    email: 'jordan.sparks@material.design',
    phone: '+1 (555) 678-9012'
  },
  {
    id: 'user-clara',
    name: 'Clara Oswald',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    role: 'member',
    statusText: 'Design token evangelist',
    isOnline: true,
    email: 'clara.oswald@material.design',
    phone: '+1 (555) 789-0123'
  }
];
