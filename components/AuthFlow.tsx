import React, { useState } from 'react';
import { User, AuthMode } from '../types';
import { 
  ChevronLeftIcon, 
  DevicePhoneMobileIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  UserCircleIcon,
  SparklesIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { checkUsernameSecurity } from '../services/geminiService';

interface AuthFlowProps {
  mode: AuthMode;
  onComplete: (user: User) => void;
  onBack: () => void;
}

const AuthFlow: React.FC<AuthFlowProps> = ({ mode, onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    otp: '',
    username: '',
    displayName: '',
    bio: '',
    avatar: null as string | null
  });
  const [loading, setLoading] = useState(false);
  const [securityRisk, setSecurityRisk] = useState<any>(null);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 1 ? setStep(step - 1) : onBack();

  const handleSignup = async () => {
    if (step === 4) {
      if (!formData.username) return;
      setLoading(true);
      const risk = await checkUsernameSecurity(formData.username, ['trushar.dev', 'aura_dev']);
      setSecurityRisk(risk);
      setLoading(false);
      if (risk.riskScore < 50) nextStep();
      return;
    }
    
    if (step === 5) {
      onComplete({
        id: Math.random().toString(36).substr(2, 9),
        username: formData.username,
        displayName: formData.displayName || formData.username,
        bio: formData.bio,
        isPrivate: true,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar || undefined
      });
      return;
    }

    nextStep();
  };

  const handleLogin = () => {
    if (step === 1) {
      if (!formData.username) return;
      nextStep();
    } else {
      onComplete({
        id: 'user_rec',
        username: formData.username.includes('@') ? formData.username : '@' + formData.username,
        displayName: 'Aura Member',
        isPrivate: true
      });
    }
  };

  const inputStyle = "w-full border rounded-theme py-4 px-6 text-sm focus:outline-none transition-all";
  const labelStyle = "text-[10px] uppercase font-bold tracking-widest opacity-50 ml-1 mb-2 block";

  const renderSignup = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold tracking-tight">Step 1: Recovery Core</h3>
            <p className="text-sm opacity-60">Your phone number is only used for encrypted recovery.</p>
            <div className="relative">
              <DevicePhoneMobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              <input 
                autoFocus
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className={`${inputStyle} pl-12`}
                style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <button 
              onClick={nextStep} 
              disabled={!formData.phone} 
              className="w-full py-4 rounded-theme font-bold disabled:opacity-30 transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
            >
              Next: Email
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Step 2: Email Gateway</h3>
            <p className="text-sm opacity-60">Access keys are synchronized to your email.</p>
            <div className="relative">
              <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
              <input 
                autoFocus
                type="email" 
                placeholder="identity@aura.com"
                className={`${inputStyle} pl-12`}
                style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <button 
              onClick={nextStep} 
              disabled={!formData.email} 
              className="w-full py-4 rounded-theme font-bold disabled:opacity-30 transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
            >
              Send OTP Code
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
            <h3 className="text-xl font-bold">Step 3: Verification</h3>
            <p className="text-sm opacity-60">Connecting to {formData.email}...</p>
            <div className="flex justify-center gap-2">
              {[1,2,3,4,5,6].map(i => (
                <input 
                  key={i} 
                  type="text" 
                  maxLength={1} 
                  className="w-10 h-12 md:w-12 md:h-14 border rounded-theme text-center text-xl font-bold focus:outline-none" 
                  style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                />
              ))}
            </div>
            <button 
              onClick={nextStep} 
              className="w-full py-4 rounded-theme font-bold hover:brightness-110 transition-all"
              style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
            >
              Verify & Proceed
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Step 4: Identity Setup</h3>
            <div className="flex flex-col items-center gap-4">
               <div className="w-24 h-24 rounded-theme border-2 border-dashed flex flex-col items-center justify-center relative cursor-pointer group hover:bg-white/5 transition-all"
                    style={{ borderColor: 'var(--theme-border)', backgroundColor: 'var(--theme-sub)' }}>
                  <CameraIcon className="w-8 h-8 opacity-40 group-hover:opacity-100 mb-1" />
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setFormData({...formData, avatar: URL.createObjectURL(file)});
                  }} />
                  {formData.avatar && <img src={formData.avatar} className="absolute inset-0 w-full h-full object-cover rounded-theme" alt="Preview" />}
               </div>
            </div>
            <div className="space-y-4">
              <label className={labelStyle}>Unique Username</label>
              <input 
                type="text" 
                placeholder="@username"
                className={inputStyle}
                style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value.toLowerCase().replace(/\s/g, '')})}
              />
            </div>
            <button 
              onClick={handleSignup} 
              disabled={loading || !formData.username} 
              className="w-full py-4 rounded-theme font-bold disabled:opacity-30 transition-all"
              style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
            >
              {loading ? "Checking Identity..." : "Continue"}
            </button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold">Step 5: Final Profile</h3>
            <div className="space-y-4">
              <div>
                <label className={labelStyle}>Display Name</label>
                <input 
                  type="text" 
                  placeholder="The Ghost"
                  className={inputStyle}
                  style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                  value={formData.displayName}
                  onChange={e => setFormData({...formData, displayName: e.target.value})}
                />
              </div>
              <div>
                <label className={labelStyle}>Bio (Manifesto)</label>
                <textarea 
                  placeholder="Visible to everyone..."
                  className={`${inputStyle} h-24 resize-none`}
                  style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </div>
            </div>
            <button 
              onClick={handleSignup} 
              className="w-full py-4 rounded-theme font-bold hover:brightness-110 transition-all"
              style={{ backgroundColor: 'var(--theme-text)', color: 'var(--theme-bg)' }}
            >
              Establish Identity
            </button>
          </div>
        );
    }
  };

  const renderLogin = () => {
    if (step === 1) {
      return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h3 className="text-xl font-bold">Recover Identity</h3>
          <p className="text-sm opacity-60">Enter your Username or Phone number.</p>
          <input 
            autoFocus
            type="text" 
            placeholder="@username or +1..."
            className={inputStyle}
            style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
            value={formData.username}
            onChange={e => setFormData({...formData, username: e.target.value})}
          />
          <button 
            onClick={handleLogin} 
            disabled={!formData.username} 
            className="w-full py-4 rounded-theme font-bold disabled:opacity-30"
            style={{ backgroundColor: 'var(--accent-color)', color: '#fff' }}
          >
            Request Access Key
          </button>
        </div>
      );
    }
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 text-center">
        <h3 className="text-xl font-bold">OTP Verification</h3>
        <p className="text-sm opacity-60">Access key sent to connected email.</p>
        <div className="flex justify-center gap-2">
          {[1,2,3,4,5,6].map(i => (
            <input key={i} type="text" maxLength={1} className="w-10 h-12 md:w-12 md:h-14 border rounded-theme text-center text-xl font-bold focus:outline-none" style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }} />
          ))}
        </div>
        <button 
          onClick={handleLogin} 
          className="w-full py-4 rounded-theme font-bold hover:brightness-110 transition-all"
          style={{ backgroundColor: 'var(--theme-text)', color: 'var(--theme-bg)' }}
        >
          Restore Session
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="max-w-md w-full border rounded-[2.5rem] p-10 relative shadow-2xl z-20 transition-all duration-700"
           style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
        
        <button 
          onClick={prevStep} 
          className="absolute left-6 top-10 opacity-50 hover:opacity-100 transition-colors p-2"
          style={{ color: 'var(--theme-text)' }}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        
        <div className="mt-8">
          {mode === 'signup' ? renderSignup() : renderLogin()}
        </div>
      </div>
    </div>
  );
};

export default AuthFlow;