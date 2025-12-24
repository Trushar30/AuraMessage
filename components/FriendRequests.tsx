
import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface FriendRequestsProps {
  accentBg: string;
}

const FriendRequests: React.FC<FriendRequestsProps> = ({ accentBg }) => {
  const requests = [
    { id: 'r1', sender: 'alex_verified', name: 'Alex Rivera', time: '2h ago' },
    { id: 'r2', sender: 'quantum_coder', name: 'Quantum Dev', time: '5h ago' },
  ];

  return (
    <div className="p-4">
      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r.id} className="p-4 border rounded-2xl animate-in slide-in-from-left-4 fade-in transition-all duration-700"
               style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)' }}>
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg transition-colors"
                     style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}>
                  {r.name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>{r.name}</h4>
                  <p className="text-[10px] font-mono" style={{ color: 'var(--theme-secondary-text)' }}>@{r.sender} • {r.time}</p>
                </div>
             </div>
             <div className="grid grid-cols-2 gap-3">
                <button className={`flex items-center justify-center gap-2 py-2.5 px-4 ${accentBg} text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow-lg shadow-black/5`}>
                  <CheckIcon className="w-4 h-4" /> Accept
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold hover:brightness-110 transition-all border"
                        style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}>
                  <XMarkIcon className="w-4 h-4" /> Ignore
                </button>
             </div>
          </div>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-10">
            <p className="text-sm" style={{ color: 'var(--theme-secondary-text)' }}>Your network is currently silent.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
