
import React, { useState } from 'react';
import { User } from '../types';
import { checkUsernameSecurity } from '../services/geminiService';
import { ShieldCheckIcon, AtSymbolIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface OnboardingProps {
  onComplete: (user: User) => void;
  existingUsernames: string[];
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, existingUsernames }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [securityRisk, setSecurityRisk] = useState<{ riskScore: number; warning: string; similarTo?: string } | null>(null);

  const handleNext = async () => {
    if (step === 1) {
      setAnalyzing(true);
      // Run AI check for impersonation/safety
      const result = await checkUsernameSecurity(username, existingUsernames);
      setSecurityRisk(result);
      setAnalyzing(false);
      
      if (result.riskScore < 50) {
        setStep(2);
      }
    } else {
      onComplete({
        id: Math.random().toString(36).substr(2, 9),
        username: username.toLowerCase().replace(/\s/g, ''),
        displayName: displayName || username,
        isPrivate: true
      });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-md w-full bg-[#111] border border-zinc-800 p-8 rounded-[2rem] shadow-2xl relative z-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 ring-1 ring-blue-500/50">
            <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to Aura</h2>
          <p className="text-zinc-500 text-sm">No phone number. No tracking. Just you.</p>
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Unique Username</label>
              <div className="relative">
                <AtSymbolIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                <input 
                  type="text"
                  placeholder="alex_rivera"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setSecurityRisk(null);
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              {securityRisk && securityRisk.riskScore > 0 && (
                <div className={`mt-3 p-3 rounded-xl text-xs flex items-start gap-2 ${securityRisk.riskScore > 50 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                   <span>⚠️ {securityRisk.warning || "Username resembles a known high-profile user."}</span>
                </div>
              )}
            </div>

            <button 
              disabled={!username || analyzing}
              onClick={handleNext}
              className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <SparklesIcon className="w-5 h-5 animate-pulse" />
                  AI Identity Guard Analyzing...
                </>
              ) : "Check Availability"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2 ml-1">Display Name (Publicly visible)</label>
              <input 
                type="text"
                placeholder="Alex R."
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl flex gap-3">
              <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                By clicking create, you're establishing an identity on the Aura network. Your account will be <strong>Private</strong> by default.
              </p>
            </div>

            <button 
              onClick={handleNext}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              Enter the Aura
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-1">
          <div className={`h-1 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-800'}`}></div>
          <div className={`h-1 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-blue-500' : 'w-2 bg-zinc-800'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
