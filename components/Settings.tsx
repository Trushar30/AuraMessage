
import React, { useState } from 'react';
import { User, UIMode, AccentColor, Workspace } from '../types';
import WorkspaceModal from './WorkspaceModal';
import { 
  LockClosedIcon, 
  PaintBrushIcon, 
  ShieldCheckIcon,
  SwatchIcon,
  CheckCircleIcon,
  SparklesIcon,
  FaceSmileIcon,
  ChatBubbleBottomCenterTextIcon,
  FingerPrintIcon,
  Squares2X2Icon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface SettingsProps {
  user: User;
  onLogout: () => void;
  uiMode: UIMode;
  accent: AccentColor;
  onUpdateUiMode: (mode: UIMode) => void;
  onUpdateAccent: (color: AccentColor) => void;
  onUpdateUser: (user: User) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  user, onLogout, uiMode, accent, onUpdateUiMode, onUpdateAccent, onUpdateUser 
}) => {
  const [editingWS, setEditingWS] = useState<Workspace | null>(null);

  const toggleAI = (key: keyof NonNullable<User['aiFeatures']>) => {
    const updated = {
      ...user,
      aiFeatures: {
        ...(user.aiFeatures || {
          toxicClassifier: true,
          faceEmotionDetection: true,
          phishingSentinel: true,
          oracleVoice: true
        }),
        [key]: !user.aiFeatures?.[key]
      }
    };
    onUpdateUser(updated);
    localStorage.setItem('aura_user', JSON.stringify(updated));
  };

  const deleteWorkspace = (id: string) => {
    const updated = {
      ...user,
      workspaces: user.workspaces?.filter(ws => ws.id !== id)
    };
    onUpdateUser(updated);
    localStorage.setItem('aura_user', JSON.stringify(updated));
    
    // Also clean up chat assignments
    const savedChats = localStorage.getItem('aura_chats');
    if (savedChats) {
      const chats = JSON.parse(savedChats);
      const updatedChats = chats.map((c: any) => ({
        ...c,
        workspaceIds: c.workspaceIds.filter((wsId: string) => wsId !== id)
      }));
      localStorage.setItem('aura_chats', JSON.stringify(updatedChats));
    }
  };

  const saveWorkspace = (ws: Workspace) => {
    const existing = user.workspaces || [];
    const isNew = !existing.find(w => w.id === ws.id);
    const updatedWorkspaces = isNew 
      ? [...existing, ws]
      : existing.map(w => w.id === ws.id ? ws : w);

    const updated = { ...user, workspaces: updatedWorkspaces };
    onUpdateUser(updated);
    localStorage.setItem('aura_user', JSON.stringify(updated));
    setEditingWS(null);
  };

  const uiModes: { id: UIMode; name: string; bg: string; desc: string; special?: string; isLight?: boolean }[] = [
    { id: 'aura', name: 'Aura Deep', bg: '#050505', desc: 'Breathing void.', special: 'Pulse' },
    { id: 'midnight', name: 'Midnight', bg: '#000000', desc: 'True OLED.', special: 'Sharp' },
    { id: 'terminal', name: 'Terminal', bg: '#020202', desc: 'Hacker protocol.', special: 'CRT' },
    { id: 'snow', name: 'Snow Lite', bg: '#ffffff', desc: 'Minimal clarity.', special: 'Flat', isLight: true },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {editingWS && <WorkspaceModal workspace={editingWS} onClose={() => setEditingWS(null)} onSave={saveWorkspace} />}
      
      {/* Workspace Management */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 px-2" style={{ color: 'var(--theme-secondary-text)' }}>
          <Squares2X2Icon className="w-4 h-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Frequency Sectors</h3>
        </div>
        <div className="space-y-2">
           {user.workspaces?.map(ws => (
             <div key={ws.id} className="p-5 border rounded-[2rem] flex items-center justify-between group transition-all"
                  style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)' }}>
                <div className="flex items-center gap-4">
                   <div className="w-8 h-8 rounded-full shadow-lg" style={{ backgroundColor: ws.color }}></div>
                   <span className="text-sm font-black tracking-tight" style={{ color: 'var(--theme-text)' }}>{ws.name}</span>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => setEditingWS(ws)} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                      <PencilIcon className="w-4 h-4 opacity-40 hover:opacity-100" />
                   </button>
                   <button onClick={() => deleteWorkspace(ws.id)} className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-500">
                      <TrashIcon className="w-4 h-4 opacity-40 hover:opacity-100" />
                   </button>
                </div>
             </div>
           ))}
           <button 
             onClick={() => setEditingWS({ id: '', name: '', color: '#3b82f6', icon: 'Squares2X2Icon' })}
             className="w-full p-5 border border-dashed rounded-[2rem] text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-white/[0.02] transition-all"
             style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
           >
             + Manifest New Sector
           </button>
        </div>
      </div>

      {/* AI Intelligence Protocols */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 px-2" style={{ color: 'var(--theme-secondary-text)' }}>
          <SparklesIcon className="w-4 h-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Intelligence Protocols</h3>
        </div>
        <div className="border rounded-[2.5rem] overflow-hidden divide-y" style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', divideColor: 'var(--theme-border)' }}>
          <ToggleItem 
             icon={<FaceSmileIcon className="w-4 h-4" />}
             label="Frequency Monitor" 
             active={user.aiFeatures?.faceEmotionDetection} 
             onToggle={() => toggleAI('faceEmotionDetection')}
          />
          <ToggleItem 
             icon={<ChatBubbleBottomCenterTextIcon className="w-4 h-4" />}
             label="Toxic Sentinel" 
             active={user.aiFeatures?.toxicClassifier} 
             onToggle={() => toggleAI('toxicClassifier')}
          />
          <ToggleItem 
             icon={<ShieldCheckIcon className="w-4 h-4" />}
             label="Phishing Shield" 
             active={user.aiFeatures?.phishingSentinel} 
             onToggle={() => toggleAI('phishingSentinel')}
          />
        </div>
      </div>

      {/* Visual Identity */}
      <div className="space-y-5">
        <div className="flex items-center gap-3 px-2" style={{ color: 'var(--theme-secondary-text)' }}>
          <PaintBrushIcon className="w-4 h-4" />
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Visual Atmosphere</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {uiModes.map((mode) => (
            <button key={mode.id} onClick={() => onUpdateUiMode(mode.id)} className={`p-5 rounded-[2rem] border text-left transition-all ${uiMode === mode.id ? 'ring-2 ring-current' : 'opacity-60'}`}
              style={{ backgroundColor: mode.bg, borderColor: 'var(--theme-border)', color: mode.isLight ? '#000' : '#fff' }}>
              <span className="text-xs font-bold block">{mode.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <button onClick={onLogout} className="w-full py-5 text-[10px] font-black text-red-500 border border-red-500/20 rounded-[2rem] hover:bg-red-500/5 transition-all uppercase tracking-[0.3em]">
          Dissolve Identity Session
        </button>
      </div>
    </div>
  );
};

const ToggleItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; onToggle: () => void }> = ({ icon, label, active, onToggle }) => (
  <div onClick={onToggle} className="p-6 flex justify-between items-center text-xs group cursor-pointer hover:bg-white/[0.02]">
     <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${active ? 'bg-blue-600/10 text-blue-500' : 'bg-zinc-800 text-zinc-500'}`}>{icon}</div>
        <span className="font-bold tracking-tight" style={{ color: 'var(--theme-text)' }}>{label}</span>
     </div>
     <div className={`w-10 h-5 rounded-full p-1 transition-all duration-300 flex items-center ${active ? 'bg-blue-600 justify-end' : 'bg-zinc-700/50 justify-start'}`}>
        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
     </div>
  </div>
);

export default Settings;
