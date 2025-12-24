
import React from 'react';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  FingerPrintIcon, 
  LockClosedIcon, 
  SparklesIcon, 
  ChevronRightIcon,
  CpuChipIcon,
  Square3Stack3DIcon
} from '@heroicons/react/24/outline';

interface LandingPageProps {
  onStartSignup: () => void;
  onStartLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartSignup, onStartLogin }) => {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-start relative px-6 overflow-y-auto overflow-x-hidden scrollbar-hide">
      {/* Immersive Environment Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep Field Gradient */}
        <div className="absolute top-[-10%] left-[-5%] w-[80%] h-[80%] bg-blue-600/[0.07] blur-[160px] rounded-full animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[70%] h-[70%] bg-indigo-600/[0.05] blur-[140px] rounded-full" />
        
        {/* Architectural Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.08]" />
      </div>

      {/* Navigation Header (Simplified for Landing) */}
      <header className="w-full max-w-7xl h-24 flex items-center justify-between z-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6 text-black" />
          </div>
          <span className="text-sm font-black tracking-widest uppercase">Aura Protocol</span>
        </div>
        <button 
          onClick={onStartLogin}
          className="px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest"
        >
          Session Restore
        </button>
      </header>

      <main className="max-w-6xl w-full z-10 flex flex-col items-center text-center pt-20 pb-40">
        {/* Status Badge */}
        <div className="group inline-flex items-center gap-3 px-5 py-2 border rounded-full mb-10 backdrop-blur-3xl bg-white/[0.02] border-white/5 hover:border-white/10 transition-all cursor-default animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
          <span className="text-[9px] font-black tracking-[0.4em] uppercase text-white/40 group-hover:text-white/80 transition-colors">
            End-to-End Sovereign Network // Live
          </span>
        </div>
        
        {/* Hero Headline */}
        <div className="space-y-6 mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-200">
           <h1 className="text-6xl md:text-[11rem] font-black tracking-tighter text-white leading-[0.8] uppercase select-none">
             Secure <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/10">Essence.</span>
           </h1>
        </div>
        
        <p className="text-lg md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed text-white/40 font-medium tracking-tight animate-in fade-in duration-1000 delay-500">
          A decentralized messaging protocol that treats identity as a unique frequency. 
          No phone numbers, no metadata leaks, no central authority. 
          Just pure, encrypted communication.
        </p>

        {/* Action Suite */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <button 
            onClick={onStartSignup}
            className="group flex-[1.6] relative px-12 py-7 font-black rounded-[2rem] transition-all hover:scale-[1.03] hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] active:scale-[0.98] bg-white text-black overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.4em]">
              Establish Your Aura <ChevronRightIcon className="w-5 h-5 stroke-[3]" />
            </span>
          </button>
          
          <button 
            onClick={onStartLogin}
            className="flex-1 px-12 py-7 bg-white/[0.03] border border-white/10 backdrop-blur-md font-black rounded-[2rem] hover:bg-white/[0.08] hover:border-white/20 transition-all text-white text-[11px] uppercase tracking-[0.4em]"
          >
            Reconnect
          </button>
        </div>

        {/* Feature Architecture */}
        <div className="mt-56 grid grid-cols-1 md:grid-cols-4 gap-6 w-full animate-in fade-in duration-1000 delay-1000">
           <FeaturePillar 
             icon={<FingerPrintIcon className="w-5 h-5" />}
             label="Zero-Trust"
             desc="Your keys, your frequency."
           />
           <FeaturePillar 
             icon={<CpuChipIcon className="w-5 h-5" />}
             label="Local AI"
             desc="Privacy-preserving security."
           />
           <FeaturePillar 
             icon={<Square3Stack3DIcon className="w-5 h-5" />}
             label="Workspaces"
             desc="Segmented digital existence."
           />
           <FeaturePillar 
             icon={<GlobeAltIcon className="w-5 h-5" />}
             label="Node Mesh"
             desc="P2P distribution layer."
           />
        </div>

        {/* Trust Footer Section */}
        <div className="mt-40 pt-20 border-t border-white/5 w-full flex flex-col items-center opacity-30">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] mb-8">Protocol Integrity Verified</p>
          <div className="flex gap-12 grayscale opacity-50">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter italic">QUANTUM_SHIELD</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter italic">VOID_LINK</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter italic">CRYPTO_MESH</div>
          </div>
        </div>
      </main>

      {/* Dynamic HUD element */}
      <div className="fixed bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 z-50 animate-in fade-in slide-in-from-right-10 duration-1000 delay-[1.5s]">
        <div className="px-4 py-2 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl">
          <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Network Load</div>
          <div className="flex gap-1 items-end h-4">
            <div className="w-1 bg-blue-500/40 h-[40%] rounded-full animate-[pulse_2s_infinite]" />
            <div className="w-1 bg-blue-500/40 h-[70%] rounded-full animate-[pulse_2.5s_infinite]" />
            <div className="w-1 bg-blue-500 h-[50%] rounded-full animate-[pulse_1.8s_infinite]" />
            <div className="w-1 bg-blue-500/40 h-[90%] rounded-full animate-[pulse_3s_infinite]" />
          </div>
        </div>
        <div className="text-[7px] font-mono uppercase tracking-[0.5em] text-white/20 mr-2">
          AUTH_SYSTEM_STABLE // 00:00:00
        </div>
      </div>
    </div>
  );
};

const FeaturePillar: React.FC<{ icon: React.ReactNode; label: string; desc: string }> = ({ icon, label, desc }) => (
  <div className="flex flex-col items-center gap-6 p-10 rounded-[2.5rem] border border-white/[0.03] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all duration-500 group">
    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:text-white group-hover:bg-blue-600 transition-all duration-700 shadow-xl shadow-black/20">
      {icon}
    </div>
    <div className="text-center">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-3 group-hover:translate-y-[-2px] transition-transform">{label}</h4>
      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default LandingPage;
