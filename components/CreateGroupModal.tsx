
import React, { useState } from 'react';
import { GroupMetadata, Workspace } from '../types';
import { XMarkIcon, CheckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface CreateGroupModalProps {
  onClose: () => void;
  onSave: (group: GroupMetadata) => void;
}

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: `group_${Date.now()}`,
      name: name.trim(),
      memberCount: 1, // Current user
      color,
      description: "A new collective frequency."
    });
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center backdrop-blur-3xl bg-black/60 p-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="max-w-md w-full border rounded-[3rem] p-10 relative overflow-hidden"
           style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
        
        <button onClick={onClose} className="absolute top-8 right-8 p-2 opacity-50 hover:opacity-100">
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-[1.8rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon className="w-8 h-8" style={{ color: color }} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ color: 'var(--theme-text)' }}>
            Manifest Collective
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mt-1">Multi-Entity Sync</p>
        </div>

        <div className="space-y-8">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-3 ml-1">Collective Name</label>
            <input 
              autoFocus
              type="text" 
              placeholder="e.g. Core Team, Void Runners"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              style={{ color: 'var(--theme-text)' }}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-3 ml-1">Collective Signature</label>
            <div className="flex flex-wrap gap-4">
              {COLORS.map((c) => (
                <button 
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-2xl transition-all flex items-center justify-center ${color === c ? 'scale-110 ring-4 ring-white/10' : 'hover:scale-105 opacity-60'}`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && <CheckIcon className="w-5 h-5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 mt-4 shadow-2xl shadow-white/5"
          >
            Stabilize Collective
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
