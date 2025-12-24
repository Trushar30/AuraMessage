
import React, { useState } from 'react';
import { User } from '../types';
import { 
  ShieldCheckIcon, 
  FaceSmileIcon, 
  ChatBubbleBottomCenterTextIcon, 
  MicrophoneIcon,
  CheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface SetupWizardProps {
  user: User;
  onComplete: (user: User) => void;
}

const SetupWizard: React.FC<SetupWizardProps> = ({ user, onComplete }) => {
  const [config, setConfig] = useState(user.aiFeatures || {
    toxicClassifier: true,
    faceEmotionDetection: true,
    phishingSentinel: true,
    oracleVoice: true
  });

  const toggle = (key: keyof typeof config) => setConfig({ ...config, [key]: !config[key] });

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black p-6">
      <div className="max-w-xl w-full flex flex-col items-center">
        <div className="mb-12 text-center space-y-4">
           <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-blue-500/20">
              <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
           </div>
           <h1 className="text-4xl font-black tracking-tighter uppercase text-white">Refining Aura</h1>
           <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
             Establish your identity parameters. These AI protocols operate locally to protect your frequency.
           </p>
        </div>

        <div className="w-full grid gap-4 mb-12">
           <ConfigToggle 
             icon={<FaceSmileIcon className="w-5 h-5" />} 
             label="Bio-Metric Frequency" 
             desc="Display your current emotional state to trusted spirits."
             active={config.faceEmotionDetection}
             onToggle={() => toggle('faceEmotionDetection')}
           />
           <ConfigToggle 
             icon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5" />} 
             label="Toxic Sentinel" 
             desc="Identify and shadow-block incoming hostile frequency."
             active={config.toxicClassifier}
             onToggle={() => toggle('toxicClassifier')}
           />
           <ConfigToggle 
             icon={<ShieldCheckIcon className="w-5 h-5" />} 
             label="Phishing Shield" 
             desc="AI verification for deceptive identity attempts."
             active={config.phishingSentinel}
             onToggle={() => toggle('phishingSentinel')}
           />
           <ConfigToggle 
             icon={<MicrophoneIcon className="w-5 h-5" />} 
             label="The Oracle Link" 
             desc="Enable high-latency voice session capabilities."
             active={config.oracleVoice}
             onToggle={() => toggle('oracleVoice')}
           />
        </div>

        <button 
          onClick={() => onComplete({ ...user, aiFeatures: config })}
          className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.3em] rounded-[2rem] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
        >
          Establish Protocol <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const ConfigToggle: React.FC<{ icon: React.ReactNode; label: string; desc: string; active: boolean; onToggle: () => void }> = ({ icon, label, desc, active, onToggle }) => (
  <div 
    onClick={onToggle}
    className={`p-6 border rounded-[2rem] flex items-center justify-between cursor-pointer transition-all ${active ? 'bg-zinc-900 border-zinc-700' : 'bg-transparent border-zinc-800 opacity-60'}`}
  >
     <div className="flex items-center gap-5">
        <div className={`p-3 rounded-2xl ${active ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-600'}`}>
           {icon}
        </div>
        <div>
           <h4 className="font-bold text-white text-sm mb-1">{label}</h4>
           <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{desc}</p>
        </div>
     </div>
     <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${active ? 'bg-blue-600/20 text-blue-500' : 'bg-zinc-800 text-zinc-700'}`}>
        {active && <CheckIcon className="w-5 h-5" />}
     </div>
  </div>
);

export default SetupWizard;
