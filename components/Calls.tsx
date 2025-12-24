
import React from 'react';
import { PhoneIcon, VideoCameraIcon, ArrowUpRightIcon, ArrowDownLeftIcon } from '@heroicons/react/24/outline';

interface CallsProps {
  accentClass: string;
}

const Calls: React.FC<CallsProps> = ({ accentClass }) => {
  const calls = [
    { id: '1', name: 'Trushar', type: 'audio', status: 'incoming', time: '10:45 AM' },
    { id: '2', name: 'Jessica', type: 'video', status: 'outgoing', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-3">
      {calls.map(call => (
        <div key={call.id} className="p-5 border rounded-2xl flex items-center justify-between group hover:bg-white/[0.03] transition-all"
             style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors"
                 style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
              {call.type === 'audio' ? <PhoneIcon className={`w-5 h-5 ${accentClass}`} /> : <VideoCameraIcon className={`w-5 h-5 ${accentClass}`} />}
            </div>
            <div>
              <h4 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>{call.name}</h4>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--theme-secondary-text)' }}>
                {call.status === 'incoming' ? <ArrowDownLeftIcon className="w-3 h-3 text-green-500" /> : <ArrowUpRightIcon className="w-3 h-3 text-blue-500" />}
                {call.time}
              </div>
            </div>
          </div>
          <button className="p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all border"
                  style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}>
             <PhoneIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Calls;
