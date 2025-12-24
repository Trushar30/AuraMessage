
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthFlow from './components/AuthFlow';
import Layout from './components/Layout';
import SetupWizard from './components/SetupWizard';
import EmotionScanner from './components/EmotionScanner';
import { User, AuthMode, UIMode, AccentColor, Workspace } from './types';

const DEFAULT_WORKSPACES: Workspace[] = [
  { id: 'ws_home', name: 'Home', icon: 'HomeIcon', color: '#3b82f6' },
  { id: 'ws_work', name: 'Work', icon: 'BriefcaseIcon', color: '#10b981' },
  { id: 'ws_friends', name: 'Friends', icon: 'UserGroupIcon', color: '#f59e0b' },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('landing');
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [needsEmotionScan, setNeedsEmotionScan] = useState(false);
  
  const [uiMode, setUiMode] = useState<UIMode>('aura');
  const [accent, setAccent] = useState<AccentColor>('blue');

  const accentHexValues: Record<AccentColor, string> = {
    blue: '#3b82f6', indigo: '#6366f1', emerald: '#10b981', rose: '#f43f5e', amber: '#f59e0b'
  };

  const themeStyles: Record<UIMode, { bg: string; border: string; sub: string; text: string; secondaryText: string; isLight?: boolean; specialClass?: string; radius: string; font: string; }> = {
    aura: { bg: '#0a0a0a', border: 'rgba(255,255,255,0.1)', sub: '#121212', text: '#ffffff', secondaryText: '#a1a1aa', specialClass: 'aura-glow-active', radius: '1.8rem', font: "'Inter', sans-serif" },
    midnight: { bg: '#000000', border: 'rgba(255,255,255,0.25)', sub: '#000000', text: '#ffffff', secondaryText: '#888888', radius: '0rem', font: "'Inter', sans-serif" },
    nordic: { bg: '#0f172a', border: 'rgba(51,65,85,0.4)', sub: '#1e293b', text: '#f8fafc', secondaryText: '#94a3b8', radius: '1.2rem', font: "'Inter', sans-serif" },
    nebula: { bg: '#0c001c', border: 'rgba(139,92,246,0.2)', sub: '#14002e', text: '#ffffff', secondaryText: '#a78bfa', specialClass: 'nebula-stars-active', radius: '2.5rem', font: "'Inter', sans-serif" },
    forest: { bg: '#050a08', border: 'rgba(16,185,129,0.2)', sub: '#08140e', text: '#ecfdf5', secondaryText: '#34d399', radius: '3rem', font: "'Inter', sans-serif" },
    terminal: { bg: '#020202', border: 'rgba(34,197,94,0.4)', sub: '#000000', text: '#4ade80', secondaryText: '#166534', specialClass: 'terminal-crt-active glow-text', radius: '0rem', font: "'JetBrains Mono', monospace" },
    snow: { bg: '#ffffff', border: 'rgba(0,0,0,0.1)', sub: '#f4f4f5', text: '#18181b', secondaryText: '#71717a', isLight: true, radius: '0.4rem', font: "'Inter', sans-serif" },
    parchment: { bg: '#fcf8ec', border: 'rgba(165,124,0,0.15)', sub: '#f5f0e1', text: '#2d2d30', secondaryText: '#78716c', isLight: true, specialClass: 'parchment-grain-active ink-bleed', radius: '0rem', font: "'Crimson Pro', serif" },
    glacier: { bg: '#f0f4f8', border: 'rgba(0,0,0,0.08)', sub: '#e1e8f0', text: '#1e293b', secondaryText: '#64748b', isLight: true, radius: '2.2rem', font: "'Inter', sans-serif" }
  };

  useEffect(() => {
    const currentTheme = themeStyles[uiMode];
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', currentTheme.bg);
    root.style.setProperty('--theme-sub', currentTheme.sub);
    root.style.setProperty('--theme-border', currentTheme.border);
    root.style.setProperty('--theme-text', currentTheme.text);
    root.style.setProperty('--theme-secondary-text', currentTheme.secondaryText);
    root.style.setProperty('--border-radius', currentTheme.radius);
    root.style.setProperty('--font-family', currentTheme.font);
    root.style.setProperty('--accent-color', accentHexValues[accent]);
  }, [uiMode, accent]);

  useEffect(() => {
    const savedUser = localStorage.getItem('aura_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setNeedsEmotionScan(true);
    }
    setLoading(false);
  }, []);

  const handleAuthComplete = (user: User) => {
    const userWithWorkspaces = { ...user, workspaces: user.workspaces || DEFAULT_WORKSPACES };
    setCurrentUser(userWithWorkspaces);
    if (!user.aiFeatures) setNeedsSetup(true);
    else setNeedsEmotionScan(true);
  };

  const handleSetupComplete = (user: User) => {
    const finalUser = { ...user, workspaces: user.workspaces || DEFAULT_WORKSPACES };
    setCurrentUser(finalUser);
    localStorage.setItem('aura_user', JSON.stringify(finalUser));
    setNeedsSetup(false);
    setNeedsEmotionScan(true);
  };

  const handleEmotionComplete = (emotion: string) => {
    if (currentUser) {
      const updated = { ...currentUser, emotion };
      setCurrentUser(updated);
      localStorage.setItem('aura_user', JSON.stringify(updated));
    }
    setNeedsEmotionScan(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthMode('landing');
    localStorage.removeItem('aura_user');
  };

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin"></div></div>;

  return (
    <div className={`h-screen w-full flex flex-col relative overflow-hidden theme-transition ${themeStyles[uiMode].specialClass || ''}`}>
      {uiMode === 'aura' && <div className="aura-glow" />}
      {uiMode === 'terminal' && <div className="scanline-overlay" />}
      {uiMode === 'parchment' && <div className="grain-overlay" />}
      
      <div className="relative z-[100] w-full h-full flex flex-col">
        {currentUser && needsSetup && <SetupWizard user={currentUser} onComplete={handleSetupComplete} />}
        {currentUser && needsEmotionScan && currentUser.aiFeatures?.faceEmotionDetection && (
          <EmotionScanner onComplete={handleEmotionComplete} onSkip={() => handleEmotionComplete("Undefined")} />
        )}

        {!currentUser ? (
          authMode === 'landing' ? <LandingPage onStartSignup={() => setAuthMode('signup')} onStartLogin={() => setAuthMode('login')} /> : <AuthFlow mode={authMode} onComplete={handleAuthComplete} onBack={() => setAuthMode('landing')} />
        ) : (
          <Layout currentUser={currentUser} onLogout={handleLogout} onUpdateUser={setCurrentUser} uiMode={uiMode} accent={accent} onUpdateUiMode={setUiMode} onUpdateAccent={setAccent} />
        )}
      </div>
    </div>
  );
};

export default App;
