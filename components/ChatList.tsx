
import React, { useState, useEffect } from 'react';
import { User, ChatSession, Workspace, GroupMetadata } from '../types';
import { Squares2X2Icon, PlusSmallIcon, TagIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import WorkspaceModal from './WorkspaceModal';
import CreateGroupModal from './CreateGroupModal';

interface ChatListProps {
  onSelectChat: (id: string) => void;
  accentClass: string;
  user: User;
  onUpdateUser: (user: User) => void;
}

const INITIAL_MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    isGroup: false,
    partner: { id: '1', username: 'trushar.dev', displayName: 'Trushar', isPrivate: true },
    lastMessage: { id: 'm1', senderId: '1', receiverId: 'me', text: "Welcome to the privacy-first world.", timestamp: Date.now() - 3600000, status: 'delivered' },
    unreadCount: 1,
    workspaceIds: ['ws_home', 'ws_work']
  },
  {
    id: 'g1',
    isGroup: true,
    groupMetadata: { id: 'g1', name: 'Aura Protocol Core', memberCount: 12, color: '#8b5cf6' },
    lastMessage: { id: 'm2', senderId: '3', receiverId: 'me', text: "Stable release at 00:00 UTC", timestamp: Date.now() - 600000, status: 'sent' },
    unreadCount: 0,
    workspaceIds: ['ws_work']
  }
];

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, accentClass, user, onUpdateUser }) => {
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('all');
  const [showTagMenu, setShowTagMenu] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('aura_chats');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CHATS;
  });
  const [showWSModal, setShowWSModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('aura_chats', JSON.stringify(chats));
  }, [chats]);

  const workspaces = user.workspaces || [];
  
  const filteredChats = activeWorkspaceId === 'all' 
    ? chats 
    : chats.filter(chat => chat.workspaceIds.includes(activeWorkspaceId));

  const toggleWorkspaceAssignment = (chatId: string, wsId: string) => {
    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        const hasWs = c.workspaceIds.includes(wsId);
        return {
          ...c,
          workspaceIds: hasWs 
            ? c.workspaceIds.filter(id => id !== wsId)
            : [...c.workspaceIds, wsId]
        };
      }
      return c;
    }));
  };

  const handleAddWorkspace = (ws: Workspace) => {
    const updated = {
      ...user,
      workspaces: [...workspaces, ws]
    };
    onUpdateUser(updated);
    localStorage.setItem('aura_user', JSON.stringify(updated));
    setShowWSModal(false);
  };

  const handleCreateGroup = (group: GroupMetadata) => {
    const newChat: ChatSession = {
      id: group.id,
      isGroup: true,
      groupMetadata: group,
      unreadCount: 0,
      workspaceIds: activeWorkspaceId === 'all' ? [] : [activeWorkspaceId],
      lastMessage: { id: `m_${Date.now()}`, senderId: 'me', receiverId: group.id, text: "Collective established.", timestamp: Date.now(), status: 'sent' }
    };
    setChats([newChat, ...chats]);
    setShowGroupModal(false);
  };

  return (
    <div className="flex flex-col h-full">
      {showWSModal && <WorkspaceModal onClose={() => setShowWSModal(false)} onSave={handleAddWorkspace} />}
      {showGroupModal && <CreateGroupModal onClose={() => setShowGroupModal(false)} onSave={handleCreateGroup} />}

      {/* Workspace Switcher */}
      <div className="px-2 mb-6 flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
        <button 
          onClick={() => setActiveWorkspaceId('all')}
          className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeWorkspaceId === 'all' ? 'bg-white text-black shadow-lg' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
        >
          All Pulse
        </button>
        {workspaces.map(ws => (
          <button 
            key={ws.id}
            onClick={() => setActiveWorkspaceId(ws.id)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${activeWorkspaceId === ws.id ? 'bg-white text-black shadow-lg' : 'bg-white/5 text-zinc-500 hover:bg-white/10'}`}
            style={activeWorkspaceId === ws.id ? { backgroundColor: ws.color, color: '#fff' } : {}}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeWorkspaceId === ws.id ? '#fff' : ws.color }}></div>
            {ws.name}
          </button>
        ))}
        <div className="flex items-center gap-1 border-l border-white/10 pl-2">
          <button 
            onClick={() => setShowWSModal(true)}
            title="Manifest Workspace"
            className="p-2 rounded-full bg-white/5 text-zinc-600 hover:bg-white/10 transition-colors"
          >
            <PlusSmallIcon className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setShowGroupModal(true)}
            title="Manifest Collective"
            className="p-2 rounded-full bg-white/5 text-zinc-600 hover:bg-white/10 transition-colors"
          >
            <UserGroupIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 space-y-1">
        {filteredChats.map((chat) => (
          <div key={chat.id} className="relative group">
            <button 
              onClick={() => onSelectChat(chat.id)}
              className="w-full flex items-center gap-4 p-5 rounded-[2rem] hover:bg-white/[0.04] transition-all text-left theme-transition relative overflow-hidden"
            >
              <div className="relative shrink-0">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 border ${chat.isGroup ? 'border-dashed' : ''}`}
                     style={{ backgroundColor: 'var(--theme-bg)', borderColor: chat.isGroup ? (chat.groupMetadata?.color || 'var(--theme-border)') : 'var(--theme-border)' }}>
                   {chat.isGroup ? (
                     <UserGroupIcon className="w-6 h-6" style={{ color: chat.groupMetadata?.color }} />
                   ) : (
                     <span className={`text-lg font-bold group-hover:${accentClass} transition-colors`} style={{ color: 'var(--theme-secondary-text)' }}>
                       {chat.partner?.displayName[0]}
                     </span>
                   )}
                </div>
                {!chat.isGroup && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 rounded-full" style={{ borderColor: 'var(--theme-bg)' }}></div>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold truncate text-sm" style={{ color: 'var(--theme-text)' }}>
                    {chat.isGroup ? chat.groupMetadata?.name : chat.partner?.displayName}
                  </h3>
                  <span className="text-[9px] font-medium opacity-40" style={{ color: 'var(--theme-text)' }}>12:30 PM</span>
                </div>
                <p className="text-xs truncate opacity-40 leading-relaxed mb-1" style={{ color: 'var(--theme-text)' }}>
                  {chat.isGroup && <span className="text-[8px] font-black mr-1 opacity-60 uppercase">Collective:</span>}
                  {chat.lastMessage?.text}
                </p>
                
                {/* Workspace Tags */}
                <div className="flex gap-1 overflow-hidden">
                   {chat.workspaceIds.map(wsId => {
                     const ws = workspaces.find(w => w.id === wsId);
                     if (!ws) return null;
                     return <div key={wsId} className="w-3 h-1 rounded-full" style={{ backgroundColor: ws.color }} title={ws.name}></div>
                   })}
                </div>
              </div>

              {chat.unreadCount > 0 && (
                <div className={`w-2 h-2 rounded-full shadow-lg ${accentClass.replace('text', 'bg')} shrink-0`}></div>
              )}
            </button>

            {/* Quick Workspace Assign */}
            <button 
              onClick={(e) => { e.stopPropagation(); setShowTagMenu(showTagMenu === chat.id ? null : chat.id); }}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all z-10 ${showTagMenu === chat.id ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <TagIcon className="w-3 h-3 text-white" />
            </button>

            {showTagMenu === chat.id && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 rounded-3xl p-3 z-20 shadow-2xl flex flex-col gap-1 min-w-[140px] animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500 px-2 py-1 mb-1">Frequency Tag</p>
                {workspaces.map(ws => (
                  <button 
                    key={ws.id}
                    onClick={() => toggleWorkspaceAssignment(chat.id, ws.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-wider hover:bg-white/5 transition-all ${chat.workspaceIds.includes(ws.id) ? 'text-white' : 'text-zinc-500'}`}
                    style={chat.workspaceIds.includes(ws.id) ? { backgroundColor: ws.color + '20' } : {}}
                  >
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ws.color }}></div>
                       {ws.name}
                    </div>
                    {chat.workspaceIds.includes(ws.id) && <PlusSmallIcon className="w-4 h-4 rotate-45" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center opacity-20">
             <Squares2X2Icon className="w-10 h-10 mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest">No entities in this frequency</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
