import React, { useState } from 'react';
import { Sparkles, Database, Copy, Check, LogOut, MapPin } from 'lucide-react';
import Avatar from './Avatar';

export default function Header({ room, user, onLeaveRoom, dbStatus }) {
  const [copied, setCopied] = useState(false);

  const copyRoomLink = () => {
    if (!room) return;
    const url = window.location.origin + window.location.pathname + `?room=${room.code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-cream-300/80 bg-cream-100/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-[0_1px_10px_-2px_rgba(41,37,36,0.03)]">
      <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo & Brand matching appstore.png */}
        <div 
          onClick={onLeaveRoom} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-cream-300 shadow-soft group-hover:scale-105 transition-transform bg-white shrink-0">
            <img src="/logo.png" alt="BiteVote" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-brand-500">Bite</span>
                <span className="text-teal-600">Vote</span>
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium hidden sm:block">AI Compromise Engine for Group Dining Decisions</p>
          </div>
        </div>

        {/* Room Code & Info Pill */}
        {room && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-cream-300 text-xs text-stone-700 shadow-soft">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span className="font-semibold">{room.city}</span>
            </div>

            <button
              onClick={copyRoomLink}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-cream-50 border border-cream-300 text-xs text-stone-700 transition-all shadow-soft"
              title="Click to copy invite link"
            >
              <span className="text-stone-400 font-medium">Room:</span>
              <span className="font-mono font-extrabold text-brand-500 tracking-wider text-sm">{room.code}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-teal-600 font-medium">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-stone-400 hover:text-stone-700" />
              )}
            </button>
          </div>
        )}

        {/* Actions & Status */}
        <div className="flex items-center gap-3">
          <div 
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-cream-300 text-[11px] text-stone-600 shadow-soft"
            title={dbStatus?.note || `Database: ${dbStatus?.type || 'MongoDB Atlas'}`}
          >
            <div className={`w-2 h-2 rounded-full ${dbStatus?.status === 'connected' ? 'bg-teal-500' : 'bg-teal-400 animate-pulse'}`} />
            <Database className="w-3 h-3 text-stone-400" />
            <span className="font-medium">MongoDB Atlas</span>
          </div>

          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-cream-300">
              <Avatar avatarId={user.avatar} size="sm" alt={user.name} />
              <span className="text-xs font-semibold text-stone-800 hidden sm:inline max-w-[100px] truncate">{user.name}</span>
            </div>
          )}

          {room && (
            <button
              onClick={onLeaveRoom}
              className="p-2 rounded-xl text-stone-400 hover:text-brand-600 hover:bg-cream-200/60 transition-colors"
              title="Leave Room"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
