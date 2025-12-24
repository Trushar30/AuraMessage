
import React, { useState } from 'react';
import { User } from '../types';
import { 
  XMarkIcon, 
  HandRaisedIcon, 
  ShieldCheckIcon, 
  UserPlusIcon, 
  NoSymbolIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';

interface PublicProfileProps {
  user: User;
  onClose: () => void;
  accentBg: string;
  accentColor: string;
}

const PublicProfile: React.FC<PublicProfileProps> = ({ user, onClose, accentBg, accentColor }) => {
  const [requestSent, setRequestSent] = useState(false);

  const handleSendHandshake = () => {
    setRequestSent(true);
    // Real logic would be an API call here
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-500 relative transition-all duration-700"
         style={{ backgroundColor: 'var(--theme-sub)' }}>
      
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 p-3 rounded-2xl border hover:bg-white/5 transition-all z-30"
        style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-bg)', color: 'var(--theme-secondary-text)' }}
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      <div className="max-w-md w-full p-10 border rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col items-center"
           style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
        
        {/* Background Aura Glow */}
        <div className={`absolute top-0 inset-x-0 h-40 opacity-10 bg-gradient-to-b from-blue-500 to-transparent pointer-events-none`}></div>

        <div className="w-32 h-32 rounded-[2.5rem] border-4 p-2 mb-8 relative transition-all duration-700"
             style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
           <div className={`w-full h-full rounded-[2rem] flex items-center justify-center text-5xl font-black ${accentColor}`}>
              {user.displayName[0]}
           </div>
           <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 rounded-full" style={{ borderColor: 'var(--theme-bg)' }}></div>
        </div>

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--theme-text)' }}>{user.displayName}</h2>
            <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
          </div>
          <p className="text-sm font-mono tracking-wider uppercase mb-6" style={{ color: 'var(--theme-secondary-text)' }}>@{user.username}</p>
          
          <p className="text-[13px] leading-relaxed px-4" style={{ color: 'var(--theme-secondary-text)' }}>
            {user.bio || "This profile is shrouded in mystery. No public data available beyond this handshake."}
          </p>
        </div>

        <div className="w-full space-y-4">
          {!requestSent ? (
            <button 
              onClick={handleSendHandshake}
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 ${accentBg} text-white font-bold text-sm tracking-[0.1em] uppercase shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
            >
              <HandRaisedIcon className="w-5 h-5" /> Initiate Handshake
            </button>
          ) : (
            <div className="w-full py-5 rounded-2xl border border-green-500/30 bg-green-500/5 flex items-center justify-center gap-3 text-green-500 font-bold text-sm uppercase tracking-[0.1em]">
               <ShieldCheckIcon className="w-5 h-5" /> Handshake Pending
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
             <button className="py-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-white/5"
                     style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}>
               <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" /> Message
             </button>
             <button className="py-4 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold text-red-500 transition-all hover:bg-red-500/5"
                     style={{ borderColor: 'var(--theme-border)' }}>
               <NoSymbolIcon className="w-4 h-4" /> Block
             </button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t w-full flex flex-col items-center text-center" style={{ borderColor: 'var(--theme-border)' }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40" style={{ color: 'var(--theme-secondary-text)' }}>Aura Integrity Report</p>
          <div className="flex gap-6">
             <div className="flex flex-col items-center">
                <span className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>99%</span>
                <span className="text-[8px] uppercase font-bold text-zinc-500">Trust Score</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>24d</span>
                <span className="text-[8px] uppercase font-bold text-zinc-500">Aura Age</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-lg font-bold" style={{ color: 'var(--theme-text)' }}>0</span>
                <span className="text-[8px] uppercase font-bold text-zinc-500">Reports</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
