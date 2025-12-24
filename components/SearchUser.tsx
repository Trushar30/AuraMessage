
import React, { useState } from 'react';
import { User } from '../types';
import { MagnifyingGlassIcon, HandRaisedIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

interface SearchUserProps {
  currentUser: User;
  accentBg: string;
  onViewProfile: (username: string) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ currentUser, accentBg, onViewProfile }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (val.length > 2) {
      const mockUsers: User[] = [
        { id: '1', username: 'trushar.dev', displayName: 'Trushar', isPrivate: true, bio: "Building the next-gen privacy layer." },
        { id: '2', username: 'jess_code', displayName: 'Jessica', isPrivate: false, bio: "Frontend sorceress & UI enthusiast." },
        { id: '3', username: 'ghost_protocol', displayName: 'Protocol Ghost', isPrivate: true, bio: "Undefined. Unreachable." },
      ];

      setResults(mockUsers.filter(u => 
        u.username.includes(val) || 
        u.displayName.toLowerCase().includes(val.toLowerCase()) ||
        (u.phone && u.phone.includes(val)) ||
        (u.email && u.email.includes(val))
      ));
    } else {
      setResults([]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors" style={{ color: 'var(--theme-secondary-text)' }} />
        <input 
          type="text"
          placeholder="Search Username, Phone or Email..."
          className="w-full border rounded-3xl py-4 pl-12 pr-4 text-sm focus:outline-none transition-all outline-none focus:ring-1 focus:ring-blue-500/30"
          style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-text)' }}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {results.map((u) => (
          <div key={u.id} 
               onClick={() => onViewProfile(u.username)}
               className="p-6 border rounded-[2.5rem] group hover:scale-[1.01] transition-all hover:shadow-xl shadow-black/5 cursor-pointer"
               style={{ backgroundColor: 'var(--theme-sub)', borderColor: 'var(--theme-border)' }}>
            <div className="flex items-center gap-5 mb-5">
              <div className="w-16 h-16 rounded-[1.8rem] flex items-center justify-center font-bold text-2xl border group-hover:scale-105 transition-transform overflow-hidden"
                   style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)', color: 'var(--theme-secondary-text)' }}>
                {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" alt={u.displayName} /> : <span>{u.displayName[0]}</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <h4 className="font-bold tracking-tight" style={{ color: 'var(--theme-text)' }}>{u.displayName}</h4>
                  <CheckBadgeIcon className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--theme-secondary-text)' }}>@{u.username}</p>
              </div>
            </div>
            
            <p className="text-[11px] mb-6 px-1 leading-relaxed line-clamp-2" style={{ color: 'var(--theme-secondary-text)' }}>
              {u.bio || "This spirit prefers silence over description."}
            </p>

            <button className={`w-full flex items-center justify-center gap-2 py-3.5 ${accentBg} text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-[0.98]`}>
               <HandRaisedIcon className="w-4 h-4" /> View Full Profile
            </button>
          </div>
        ))}

        {query && results.length === 0 && (
          <div className="text-center py-20">
             <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border"
                  style={{ backgroundColor: 'var(--theme-bg)', borderColor: 'var(--theme-border)' }}>
               <MagnifyingGlassIcon className="w-6 h-6 opacity-20" style={{ color: 'var(--theme-text)' }} />
             </div>
             <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--theme-secondary-text)' }}>Identity Not Found</p>
          </div>
        )}
        
        {!query && (
           <div className="pt-10 flex flex-col items-center text-center px-8">
              <div className="w-1 h-20 bg-gradient-to-b from-transparent via-current to-transparent rounded-full mb-6 opacity-20" style={{ color: 'var(--theme-secondary-text)' }}></div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] leading-loose" style={{ color: 'var(--theme-secondary-text)' }}>
                Aura respects boundaries.<br/>Search is precise and protected.
              </p>
           </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
