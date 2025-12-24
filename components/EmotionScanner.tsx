
import React, { useRef, useState, useEffect } from 'react';
import { analyzeEmotion } from '../services/geminiService';
import { CameraIcon, XMarkIcon, SparklesIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface EmotionScannerProps {
  onComplete: (emotion: string) => void;
  onSkip: () => void;
}

const EmotionScanner: React.FC<EmotionScannerProps> = ({ onComplete, onSkip }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const setupCamera = async () => {
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 640 }
        } 
      });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (err: any) {
      console.error("Camera access error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError("Camera access was denied. Please check your browser permissions.");
      } else {
        setError("Unable to initialize bio-metric sensor. Verify camera connection.");
      }
    }
  };

  useEffect(() => {
    setupCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setScanning(true);
    
    const context = canvasRef.current.getContext('2d');
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
      const base64 = dataUrl.split(',')[1];
      
      const emotion = await analyzeEmotion(base64);
      onComplete(emotion);
    }
    setScanning(false);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center backdrop-blur-3xl bg-black/90 p-6 animate-in fade-in duration-700">
      <div className="max-w-md w-full border rounded-[3.5rem] overflow-hidden flex flex-col items-center p-10 relative"
           style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
        
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black tracking-tighter uppercase mb-2" style={{ color: 'var(--theme-text)' }}>Bio-Sync</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40" style={{ color: 'var(--theme-secondary-text)' }}>Frequency Verification</p>
        </div>

        <div className="relative w-full aspect-square max-w-[280px] rounded-[3rem] overflow-hidden border-2 border-white/5 mb-10 bg-zinc-900/50 flex items-center justify-center">
           {!error ? (
             <>
               <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale brightness-75 scale-110 transition-all duration-1000" />
               <canvas ref={canvasRef} className="hidden" />
               
               {/* HUD Overlays */}
               <div className="absolute inset-x-0 h-0.5 bg-blue-500/40 blur-[2px] shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
               <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
               
               <div className="absolute top-6 left-6 font-mono text-[8px] uppercase tracking-widest text-blue-500/60 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                 Sensor Active
               </div>
             </>
           ) : (
             <div className="px-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
                <ExclamationTriangleIcon className="w-12 h-12 text-amber-500/50 mb-4" />
                <p className="text-xs font-bold leading-relaxed opacity-60 mb-6">{error}</p>
                <button onClick={setupCamera} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
                  <ArrowPathIcon className="w-4 h-4" /> Retry Initialization
                </button>
             </div>
           )}
        </div>

        <div className="w-full space-y-4">
           {!error && (
             <button 
               onClick={captureAndAnalyze}
               disabled={scanning}
               className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/5"
             >
               {scanning ? <SparklesIcon className="w-4 h-4 animate-spin" /> : <CameraIcon className="w-4 h-4" />}
               {scanning ? "Syncing Identity..." : "Initiate Pulse"}
             </button>
           )}
           
           <button 
             onClick={onSkip}
             className="w-full py-4 bg-transparent border rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-white/5"
             style={{ borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}
           >
             {error ? "Continue to Session (Undefined)" : "Bypass Biometrics"}
           </button>
        </div>

        <p className="mt-10 text-[8px] text-center uppercase tracking-[0.3em] opacity-20 font-bold max-w-[200px] leading-loose" style={{ color: 'var(--theme-text)' }}>
          Images are ephemeral. Session encryption maintains your absolute privacy.
        </p>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default EmotionScanner;
