
import React, { useState } from 'react';
import { User } from '../types';
import { 
  QrCodeIcon, 
  ArrowRightOnRectangleIcon, 
  ShieldCheckIcon, 
  AdjustmentsHorizontalIcon,
  PencilIcon,
  ChevronLeftIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowDownTrayIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
  accentColor: string;
}

type ProfileView = 'main' | 'edit' | 'qr' | 'privacy';

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onUpdateUser, accentColor }) => {
  const [view, setView] = useState<ProfileView>('main');
  
  // Edit State
  const [editData, setEditData] = useState({
    displayName: user.displayName,
    bio: user.bio || '',
    status: user.status || ''
  });

  // Privacy State
  const [privacySettings, setPrivacySettings] = useState({
    privateMode: user.isPrivate,
    stealthMode: false,
    linkWarning: true,
    readReceipts: true
  });

  const handleSaveProfile = () => {
    onUpdateUser({
      ...user,
      displayName: editData.displayName,
      bio: editData.bio,
      status: editData.status
    });
    setView('main');
  };

  const renderEditView = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('main')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeftIcon className="w-5 h-5" style={{ color: 'var(--theme-secondary-text)' }} />
        </button>
        <h3 className="text-xl font-bold" style={{ color: 'var(--theme-text)' }}>Refine Identity</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2 ml-1">Display Name</label>
          <input 
            type="text" 
            value={editData.displayName}
            onChange={(e) => setEditData({...editData, displayName: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            style={{ color: 'var(--theme-text)' }}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2 ml-1">Status Message</label>
          <input 
            type="text" 
            value={editData.status}
            placeholder="What's your frequency?"
            onChange={(e) => setEditData({...editData, status: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            style={{ color: 'var(--theme-text)' }}
          />
        </div>
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 block mb-2 ml-1">Manifesto (Bio)</label>
          <textarea 
            rows={4}
            value={editData.bio}
            onChange={(e) => setEditData({...editData, bio: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
            style={{ color: 'var(--theme-text)' }}
          />
        </div>
      </div>

      <button 
        onClick={handleSaveProfile}
        className="w-full py-4 rounded-2xl bg-white text-black font-bold uppercase text-xs tracking-widest hover:brightness-90 transition-all shadow-lg"
      >
        Sync Changes
      </button>
    </div>
  );

  const renderQRView = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300 flex flex-col items-center">
      <div className="w-full flex items-center gap-4 mb-2">
        <button onClick={() => setView('main')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeftIcon className="w-5 h-5" style={{ color: 'var(--theme-secondary-text)' }} />
        </button>
        <h3 className="text-xl font-bold" style={{ color: 'var(--theme-text)' }}>My Aura QR</h3>
      </div>

      <div className="relative p-8 border-2 border-dashed rounded-[3rem] bg-white/5 flex items-center justify-center transition-all duration-700"
           style={{ borderColor: 'var(--theme-border)' }}>
        {/* Futuristic SVG QR Placeholder */}
        <svg width="240" height="240" viewBox="0 0 240 240" className="opacity-80">
          <defs>
            <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'var(--accent-color)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0.2 }} />
            </linearGradient>
          </defs>
          {/* Mock QR Grid Pattern */}
          {Array.from({length: 20}).map((_, i) => (
            Array.from({length: 20}).map((_, j) => (
              Math.random() > 0.6 && (
                <rect 
                  key={`${i}-${j}`} 
                  x={i * 12} y={j * 12} width="8" height="8" rx="2"
                  fill={Math.random() > 0.8 ? 'url(#auraGradient)' : 'currentColor'}
                  className="opacity-40"
                />
              )
            ))
          ))}
          {/* Corner Markers */}
          <rect x="0" y="0" width="48" height="48" rx="12" fill="none" stroke="currentColor" strokeWidth="4" className={accentColor} />
          <rect x="12" y="12" width="24" height="24" rx="6" fill="currentColor" className={accentColor} />
          <rect x="192" y="0" width="48" height="48" rx="12" fill="none" stroke="currentColor" strokeWidth="4" className={accentColor} />
          <rect x="204" y="12" width="24" height="24" rx="6" fill="currentColor" className={accentColor} />
          <rect x="0" y="192" width="48" height="48" rx="12" fill="none" stroke="currentColor" strokeWidth="4" className={accentColor} />
          <rect x="12" y="204" width="24" height="24" rx="6" fill="currentColor" className={accentColor} />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm rounded-[3rem] cursor-pointer">
           <span className="text-xs font-bold uppercase tracking-widest text-white">Generate Live QR</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>@{user.username}</p>
        <p className="text-[10px] uppercase tracking-[0.3em] opacity-40" style={{ color: 'var(--theme-text)' }}>Identity established in Aura</p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
         <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            <ArrowDownTrayIcon className="w-4 h-4" /> Save
         </button>
         <button className="flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            <ShareIcon className="w-4 h-4" /> Share
         </button>
      </div>
    </div>
  );

  const renderPrivacyView = () => (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => setView('main')} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeftIcon className="w-5 h-5" style={{ color: 'var(--theme-secondary-text)' }} />
        </button>
        <h3 className="text-xl font-bold" style={{ color: 'var(--theme-text)' }}>Security Protocols</h3>
      </div>

      <div className="space-y-2">
        <PrivacyToggle 
          label="Private Handshake Only" 
          desc="Only spirits you accept can see your frequency."
          active={privacySettings.privateMode}
          onToggle={() => setPrivacySettings({...privacySettings, privateMode: !privacySettings.privateMode})}
        />
        <PrivacyToggle 
          label="Stealth Presence" 
          desc="Hide your active status from all spirits."
          active={privacySettings.stealthMode}
          onToggle={() => setPrivacySettings({...privacySettings, stealthMode: !privacySettings.stealthMode})}
        />
        <PrivacyToggle 
          label="Link Sentinel" 
          desc="AI warning for suspicious external links."
          active={privacySettings.linkWarning}
          onToggle={() => setPrivacySettings({...privacySettings, linkWarning: !privacySettings.linkWarning})}
        />
        <PrivacyToggle 
          label="Whisper Confirmation" 
          desc="Show when you have heard a message."
          active={privacySettings.readReceipts}
          onToggle={() => setPrivacySettings({...privacySettings, readReceipts: !privacySettings.readReceipts})}
        />
      </div>

      <div className="p-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 space-y-3">
         <div className="flex items-center gap-2 text-amber-500">
            <ShieldCheckIcon className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encryption</span>
         </div>
         <p className="text-[11px] leading-relaxed opacity-70" style={{ color: 'var(--theme-text)' }}>
           All whisper logs are encrypted locally using your unique identity key. Aura never stores or sees the contents of your manifest.
         </p>
      </div>
    </div>
  );

  if (view === 'edit') return <div className="p-8">{renderEditView()}</div>;
  if (view === 'qr') return <div className="p-8">{renderQRView()}</div>;
  if (view === 'privacy') return <div className="p-8">{renderPrivacyView()}</div>;

  return (
    <div className="p-8 transition-all duration-700 animate-in fade-in">
      <div className="flex flex-col items-center mb-10 relative">
        <button 
          onClick={() => setView('edit')}
          className="absolute right-0 top-0 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <PencilIcon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--theme-text)' }} />
        </button>

        <div className="w-28 h-28 rounded-[2.5rem] border-2 p-2 shadow-2xl shadow-blue-900/10 mb-6 transition-all duration-700 relative"
             style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
           <div className={`w-full h-full rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center text-5xl font-black transition-all ${accentColor}`}>
              {user.displayName[0]}
           </div>
           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 rounded-full" style={{ borderColor: 'var(--theme-bg)' }}></div>
        </div>
        
        <h2 className="text-2xl font-bold mb-1 tracking-tight" style={{ color: 'var(--theme-text)' }}>{user.displayName}</h2>
        <p className="text-sm font-mono opacity-50 mb-4" style={{ color: 'var(--theme-secondary-text)' }}>@{user.username}</p>
        
        {user.status && (
          <p className="text-xs font-medium italic opacity-70 mb-5" style={{ color: 'var(--theme-secondary-text)' }}>
            "{user.status}"
          </p>
        )}

        <div className="flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full transition-all hover:bg-blue-500/20 cursor-default">
           <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
           <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Verified Identity</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
         <button 
          onClick={() => setView('qr')}
          className="p-6 rounded-[2rem] border text-center flex flex-col items-center group transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
          style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
            <QrCodeIcon className={`w-10 h-10 mb-3 transition-transform group-hover:scale-110 ${accentColor}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--theme-text)' }}>My Aura QR</span>
         </button>
         <button 
          onClick={() => setView('privacy')}
          className="p-6 rounded-[2rem] border text-center flex flex-col items-center group transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
          style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
            <AdjustmentsHorizontalIcon className={`w-10 h-10 mb-3 transition-transform group-hover:scale-110 ${accentColor}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--theme-text)' }}>Protocols</span>
         </button>
      </div>

      <div className="space-y-4">
        {user.bio && (
          <div className="p-6 rounded-3xl border mb-6" style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 block mb-3">Manifesto</label>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--theme-text)' }}>{user.bio}</p>
          </div>
        )}

        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 py-5 rounded-[1.8rem] border text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500/5 active:scale-[0.98] transition-all"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" /> Dissolve Identity
        </button>
      </div>
    </div>
  );
};

const PrivacyToggle: React.FC<{ label: string; desc: string; active: boolean; onToggle: () => void }> = ({ label, desc, active, onToggle }) => (
  <div 
    onClick={onToggle}
    className="p-5 flex items-center justify-between group hover:bg-white/[0.03] rounded-3xl cursor-pointer transition-all border border-transparent hover:border-white/5"
  >
    <div className="flex-1 pr-4">
      <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--theme-text)' }}>{label}</h4>
      <p className="text-[10px] opacity-50 leading-tight" style={{ color: 'var(--theme-secondary-text)' }}>{desc}</p>
    </div>
    <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 flex items-center ${active ? 'bg-blue-600 justify-end' : 'bg-zinc-800 justify-start'}`}>
      <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
    </div>
  </div>
);

export default Profile;
