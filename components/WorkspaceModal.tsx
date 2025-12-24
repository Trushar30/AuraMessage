
import React, { useState } from 'react';
import { Workspace } from '../types';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';

interface WorkspaceModalProps {
  workspace?: Workspace;
  onClose: () => void;
  onSave: (workspace: Workspace) => void;
}

const COLORS = ['#3b82f6', '#6366f1', '#10b981', '#f43f5e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

const WorkspaceModal: React.FC<WorkspaceModalProps> = ({ workspace, onClose, onSave }) => {
  const [name, setName] = useState(workspace?.name || '');
  const [color, setColor] = useState(workspace?.color || COLORS[0]);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: workspace?.id || `ws_${Date.now()}`,
      name: name.trim(),
      icon: 'Squares2X2Icon', // Default icon for now
      color,
    });
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center backdrop-blur-3xl bg-black/60 p-6 animate-in fade-in duration-300">
      <div className="max-w-sm w-full border rounded-[2.5rem] p-8 relative overflow-hidden"
           style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100">
          <XMarkIcon className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-black uppercase tracking-tighter mb-8" style={{ color: 'var(--theme-text)' }}>
          {workspace ? 'Refine Freq' : 'New Frequency'}
        </h3>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-3 ml-1">Workspace Identity</label>
            <input 
              autoFocus
              type="text" 
              placeholder="e.g. Home, Void, Studio"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50"
              style={{ color: 'var(--theme-text)' }}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-3 ml-1">Vibration Signature</label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button 
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all flex items-center justify-center ${color === c ? 'scale-125 ring-2 ring-white/20' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                >
                  {color === c && <CheckIcon className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={!name.trim()}
            className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 mt-4"
          >
            Stabilize Frequency
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;
