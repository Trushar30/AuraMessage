
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeftIcon, 
  PaperAirplaneIcon, 
  EllipsisVerticalIcon,
  PlusIcon,
  UserGroupIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { analyzeMessageSecurity, MessageSecurityReport } from '../services/geminiService';
import { ChatSession } from '../types';

interface ChatWindowProps {
  chatId: string;
  onClose: () => void;
  accentColor: string;
  onViewProfile: (username: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatId, onClose, accentColor, onViewProfile }) => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState([
    { id: '1', text: "Stable frequency established.", sender: 'other', senderName: 'Aura Node', timestamp: Date.now() - 3600000 },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('aura_chats');
    if (savedChats) {
      const chats = JSON.parse(savedChats);
      const found = chats.find((c: ChatSession) => c.id === chatId);
      if (found) setSession(found);
    }
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    const msgId = Math.random().toString();
    const text = inputValue;
    setMessages([...messages, { id: msgId, text, sender: 'me', senderName: 'Me', timestamp: Date.now() }]);
    setInputValue('');
    await analyzeMessageSecurity(text); // Passive scan
  };

  const accentHex = { 'text-blue-500': '#3b82f6', 'text-indigo-500': '#6366f1', 'text-emerald-500': '#10b981', 'text-rose-500': '#f43f5e', 'text-amber-500': '#f59e0b' }[accentColor] || '#3b82f6';

  if (!session) return <div className="flex-1 flex items-center justify-center opacity-20">Syncing...</div>;

  return (
    <div className="flex flex-col h-full w-full relative" style={{ backgroundColor: 'var(--theme-sub)' }}>
      {/* Header */}
      <header className="px-8 py-6 border-b flex items-center justify-between backdrop-blur-2xl z-20"
              style={{ borderColor: 'var(--theme-border)', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <div className="flex items-center gap-5">
          <button onClick={onClose} className="md:hidden p-2 -ml-2">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <div className="relative">
             <div className="w-12 h-12 rounded-2xl border flex items-center justify-center font-bold" 
                  style={{ backgroundColor: 'var(--theme-bg)', borderColor: session.isGroup ? session.groupMetadata?.color : 'var(--theme-border)' }}>
               {session.isGroup ? <UserGroupIcon className="w-6 h-6" style={{ color: session.groupMetadata?.color }} /> : session.partner?.displayName[0]}
             </div>
             {!session.isGroup && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 rounded-full" style={{ borderColor: 'var(--theme-sub)' }} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-sm tracking-tight" style={{ color: 'var(--theme-text)' }}>
                {session.isGroup ? session.groupMetadata?.name : session.partner?.displayName}
              </h2>
              {session.isGroup ? (
                 <div className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <span className="text-[7px] font-black uppercase tracking-widest text-white/40">{session.groupMetadata?.memberCount} entities</span>
                 </div>
              ) : (
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                   <HeartIcon className="w-2.5 h-2.5 text-blue-500" />
                   <span className="text-[8px] font-black uppercase tracking-widest text-blue-400">Frequency: {session.partner?.emotion || 'Unknown'}</span>
                </div>
              )}
            </div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-40" style={{ color: 'var(--theme-secondary-text)' }}>
              {session.isGroup ? "Collective Frequency" : session.partner?.status}
            </p>
          </div>
        </div>

        <button onClick={() => setShowMoreMenu(!showMoreMenu)} className="p-3 rounded-2xl hover:bg-white/5 transition-colors" style={{ color: 'var(--theme-secondary-text)' }}>
           <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}>
            {session.isGroup && m.sender !== 'me' && (
              <span className="text-[8px] font-black uppercase tracking-widest mb-2 opacity-30 ml-4">{m.senderName}</span>
            )}
            <div className={`max-w-[75%] px-8 py-5 rounded-[2.5rem] shadow-xl ${m.sender === 'me' ? 'text-black rounded-br-none' : 'border rounded-bl-none'}`}
                 style={m.sender === 'other' ? { backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' } : { backgroundColor: accentHex }}>
              <p className="text-sm leading-relaxed tracking-tight">{m.text}</p>
            </div>
            <span className="text-[8px] mt-2 opacity-20 font-bold uppercase tracking-widest mx-4">
              {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>

      <footer className="p-8 border-t" style={{ borderColor: 'var(--theme-border)' }}>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all">
            <PlusIcon className="w-5 h-5 opacity-40" />
          </div>
          <input 
            type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={session.isGroup ? "Sync with collective..." : "Whisper into the void..."}
            className="flex-1 bg-white/5 border rounded-[2rem] py-5 px-10 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
          />
          <button onClick={handleSend} className="w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: accentHex }}>
            <PaperAirplaneIcon className="w-6 h-6 -rotate-45" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatWindow;
