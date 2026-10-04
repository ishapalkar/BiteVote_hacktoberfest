import React, { useState } from 'react';
import { Sparkles, Utensils, Database, Copy, Check, LogOut, MapPin } from 'lucide-react';
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
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <div 
          onClick={onLeaveRoom} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-rose-400 bg-clip-text text-transparent">
                BiteVote
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold tracking-wider uppercase">
                India Edition
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-700/50 flex items-center gap-1 font-medium">
                <Sparkles className="w-3 h-3 text-purple-400" /> Gemma 2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">AI Compromise Engine for Group Dining Decisions</p>
          </div>
        </div>

        {/* Room Code & Info Pill */}
        {room && (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-amber-300">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="font-semibold">{room.city}</span>
            </div>

            <button
              onClick={copyRoomLink}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-xs text-slate-200 transition-colors shadow-sm"
              title="Click to copy invite link"
            >
              <span className="text-slate-400 font-medium">Room:</span>
              <span className="font-mono font-bold text-brand-400 tracking-wider text-sm">{room.code}</span>
              {copied ? (
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <Check className="w-3.5 h-3.5" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
              )}
            </button>
          </div>
        )}

        {/* Actions & Status */}
        <div className="flex items-center gap-3">
          <div 
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300"
            title={dbStatus?.note || `Database: ${dbStatus?.type || 'MongoDB Atlas'}`}
          >
            <div className={`w-2 h-2 rounded-full ${dbStatus?.status === 'connected' ? 'bg-emerald-500' : 'bg-emerald-400 animate-pulse'}`} />
            <Database className="w-3 h-3 text-slate-400" />
            <span>MongoDB Atlas</span>
          </div>

          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <Avatar avatarId={user.avatar} size="sm" alt={user.name} />
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline max-w-[100px] truncate">{user.name}</span>
            </div>
          )}

          {room && (
            <button
              onClick={onLeaveRoom}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
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
