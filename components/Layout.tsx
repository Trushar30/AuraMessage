
import React, { useState } from 'react';
import { User, NavigationTab, UIMode, AccentColor } from '../types';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import SearchUser from './SearchUser';
import FriendRequests from './FriendRequests';
import Profile from './Profile';
import Calls from './Calls';
import Settings from './Settings';
import { 
  ChatBubbleBottomCenterIcon, 
  MagnifyingGlassIcon, 
  HandRaisedIcon, 
  UserCircleIcon,
  PhoneIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  currentUser: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  uiMode: UIMode;
  accent: AccentColor;
  onUpdateUiMode: (mode: UIMode) => void;
  onUpdateAccent: (color: AccentColor) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  currentUser, onLogout, onUpdateUser, uiMode, accent, onUpdateUiMode, onUpdateAccent 
}) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.CHATS);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const isLightMode = ['snow', 'parchment', 'glacier'].includes(uiMode);
  const accentColorClass = { blue: 'text-blue-500', indigo: 'text-indigo-500', emerald: 'text-emerald-500', rose: 'text-rose-500', amber: 'text-amber-500' }[accent];
  const accentBgClass = { blue: 'bg-blue-600', indigo: 'bg-indigo-600', emerald: 'bg-emerald-600', rose: 'bg-rose-600', amber: 'bg-amber-600' }[accent];
  const accentFadedBg = { blue: 'bg-blue-600/10', indigo: 'bg-indigo-600/10', emerald: 'bg-emerald-600/10', rose: 'bg-rose-600/10', amber: 'bg-amber-600/10' }[accent];

  const renderContent = () => {
    switch (activeTab) {
      case NavigationTab.CHATS: return <ChatList onSelectChat={setSelectedChatId} accentClass={accentColorClass} user={currentUser} onUpdateUser={onUpdateUser} />;
      case NavigationTab.SEARCH: return <SearchUser currentUser={currentUser} accentBg={accentBgClass} onViewProfile={(u) => console.log(u)} />;
      case NavigationTab.CALLS: return <Calls accentClass={accentColorClass} />;
      case NavigationTab.REQUESTS: return <FriendRequests accentBg={accentBgClass} />;
      case NavigationTab.SETTINGS: return <Settings user={currentUser} onLogout={onLogout} uiMode={uiMode} accent={accent} onUpdateUiMode={onUpdateUiMode} onUpdateAccent={onUpdateAccent} onUpdateUser={onUpdateUser} />;
      case NavigationTab.PROFILE: return <Profile user={currentUser} onLogout={onLogout} onUpdateUser={onUpdateUser} accentColor={accentColorClass} />;
      default: return null;
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden theme-transition`}>
      <nav className="w-24 border-r flex flex-col items-center py-10 gap-8 z-20 shrink-0" style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)' }}>
        <div className="relative mb-6">
           <div className={`w-14 h-14 rounded-[1.8rem] flex items-center justify-center shadow-lg transition-all`} style={{ backgroundColor: 'var(--accent-color)' }}>
             <ShieldCheckIcon className="w-8 h-8 text-white" />
           </div>
           {currentUser.emotion && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-blue-600 border border-blue-400 text-[7px] font-black uppercase tracking-widest text-white shadow-xl whitespace-nowrap">
                 {currentUser.emotion}
              </div>
           )}
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <NavItem icon={<ChatBubbleBottomCenterIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.CHATS} onClick={() => setActiveTab(NavigationTab.CHATS)} accentFaded={accentFadedBg} />
          <NavItem icon={<MagnifyingGlassIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.SEARCH} onClick={() => setActiveTab(NavigationTab.SEARCH)} accentFaded={accentFadedBg} />
          <NavItem icon={<PhoneIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.CALLS} onClick={() => setActiveTab(NavigationTab.CALLS)} accentFaded={accentFadedBg} />
          <NavItem icon={<HandRaisedIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.REQUESTS} onClick={() => setActiveTab(NavigationTab.REQUESTS)} accentFaded={accentFadedBg} />
        </div>

        <div className="flex flex-col gap-6 mt-auto">
          <NavItem icon={<Cog6ToothIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.SETTINGS} onClick={() => setActiveTab(NavigationTab.SETTINGS)} accentFaded={accentFadedBg} />
          <NavItem icon={<UserCircleIcon className="w-6 h-6"/>} active={activeTab === NavigationTab.PROFILE} onClick={() => setActiveTab(NavigationTab.PROFILE)} accentFaded={accentFadedBg} />
        </div>
      </nav>

      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        <div className={`w-full md:w-80 lg:w-[480px] border-r flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`} style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)' }}>
          <div className="p-10 pb-4"><h1 className="text-3xl font-black tracking-tighter uppercase" style={{ color: 'var(--theme-text)' }}>{activeTab}</h1></div>
          <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-hide">{renderContent()}</div>
        </div>
        <div className={`flex-1 relative ${selectedChatId ? 'flex' : 'hidden md:flex'}`} style={{ backgroundColor: 'var(--theme-sub)' }}>
          {selectedChatId ? <ChatWindow chatId={selectedChatId} onClose={() => setSelectedChatId(null)} accentColor={accentColorClass} onViewProfile={() => {}} /> : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-10">
               <div className="w-1 h-32 bg-current rounded-full mb-8 animate-pulse"></div>
               <p className="text-[10px] font-bold uppercase tracking-[1em]">Secure</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; active?: boolean; onClick: () => void; accentFaded: string; }> = ({ icon, active, onClick, accentFaded }) => (
  <button onClick={onClick} className={`p-4 rounded-[1.5rem] transition-all relative group ${active ? `${accentFaded}` : `hover:bg-white/[0.03]`}`} style={{ color: active ? 'var(--accent-color)' : 'var(--theme-secondary-text)' }}>
    {icon}
    {active && <div className={`absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-r-full shadow-lg`} style={{ backgroundColor: 'var(--accent-color)' }}></div>}
  </button>
);

export default Layout;
