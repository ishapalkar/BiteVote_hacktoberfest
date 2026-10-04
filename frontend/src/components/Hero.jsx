import React, { useState } from 'react';
import { Sparkles, Users, Utensils, ArrowRight, ShieldCheck, Zap, HeartHandshake, MapPin, Check } from 'lucide-react';
import { AVATAR_LIST } from '../avatars';
import Avatar from './Avatar';

const INDIAN_CITIES = [
  "Mumbai", "Pune", "Delhi NCR", "Bengaluru", 
  "Hyderabad", "Chennai", "Kolkata", "Ahmedabad", "Navi Mumbai"
];

export default function Hero({ onCreateRoom, onJoinRoom, onInstantDemo, loading }) {
  const [mode, setMode] = useState('menu'); // 'menu' | 'create' | 'join'
  
  // Create Form State
  const [roomName, setRoomName] = useState('Friday Dinner Squad');
  const [hostName, setHostName] = useState('');
  const [hostAvatar, setHostAvatar] = useState('food-samosa');
  const [city, setCity] = useState('Mumbai');

  // Join Form State
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const [joinAvatar, setJoinAvatar] = useState('food-dosa');
  const [joinError, setJoinError] = useState('');

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!hostName.trim()) return;
    onCreateRoom({
      name: roomName.trim() || 'Dinner Squad',
      host_name: hostName.trim(),
      host_avatar: hostAvatar,
      city: city || 'Mumbai',
    });
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName.trim() || !joinCode.trim()) return;
    setJoinError('');
    onJoinRoom(joinCode.trim().toUpperCase(), {
      name: joinName.trim(),
      avatar: joinAvatar,
    }).catch(err => {
      setJoinError(err.message || 'Could not find that room. Please check the 6-character code.');
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      {/* Hero Header */}
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          Hacktoberfest 2026: Build for a Friend
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          End the <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">"Where should we eat?"</span> debate forever.
        </h1>

        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          Group dining is a multi-constraint decision problem involving dietary restrictions, budgets, cravings, and preferences. 
          <strong className="text-brand-400 font-semibold"> Google Gemma 2</strong> arbitrates your group’s constraints to find the one spot everyone will genuinely enjoy.
        </p>
      </div>

      {/* Main Interactive Card */}
      <div className="max-w-lg mx-auto glass-panel rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-700/60 relative">
        {mode === 'menu' && (
          <div className="space-y-4">
            <button
              onClick={() => setMode('create')}
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold shadow-glow transition-all group"
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-white/90" />
                <div className="text-left">
                  <div className="text-base font-bold">Start a New Room</div>
                  <div className="text-xs text-orange-100 font-normal">Select city, set dietary boundaries & invite friends</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setMode('join')}
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-100 font-semibold transition-all group"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-400 group-hover:text-brand-400 transition-colors" />
                <div className="text-left">
                  <div className="text-base font-bold">Join with Room Code</div>
                  <div className="text-xs text-slate-400 font-normal">Enter 6-character room code from your group</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-slate-400" />
            </button>

            {/* Quick Demo Button */}
            <div className="pt-2">
              <button
                onClick={onInstantDemo}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-200 text-sm font-semibold transition-colors"
              >
                <Zap className="w-4 h-4 text-purple-400" />
                <span>Try Mumbai 3-Friend Demo (1-Click)</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-1.5">
                Simulates <strong>Sarah</strong> (Jain + ₹300-500 + Maharashtrian), <strong>Rahul</strong> (Veg + ₹400-700 + North Indian), and <strong>Aisha</strong> (Veg + ₹300-600 + Indo-Chinese) in Mumbai.
              </p>
            </div>
          </div>
        )}

        {/* Create Room Form */}
        {mode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-brand-400" /> Create Dinner Room
              </h2>
              <button
                type="button"
                onClick={() => setMode('menu')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Rahul, Priya, Ananya"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm"
              />
            </div>

            {/* Profile Avatar Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Food Avatar</label>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_LIST.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setHostAvatar(av.id)}
                    className={`relative p-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      hostAvatar === av.id 
                        ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/40' 
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <Avatar avatarId={av.id} size="md" alt={av.name} />
                    <span className="text-[10px] text-slate-300 font-medium">{av.name}</span>
                    {hostAvatar === av.id && (
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-400" /> Select City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-500"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Occasion / Group Name</label>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="e.g. Friday Feasters"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !hostName.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold shadow-glow transition-all disabled:opacity-50 text-sm"
            >
              {loading ? 'Creating Room...' : 'Launch Room & Get Share Code →'}
            </button>
          </form>
        )}

        {/* Join Room Form */}
        {mode === 'join' && (
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-400" /> Join Existing Room
              </h2>
              <button
                type="button"
                onClick={() => setMode('menu')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
            </div>

            {joinError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {joinError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">6-Character Room Code</label>
              <input
                type="text"
                required
                maxLength={8}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="e.g. BITE72"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-base font-mono uppercase tracking-widest text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                required
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="e.g. Kabir, Aisha"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Food Avatar</label>
              <div className="grid grid-cols-4 gap-2">
                {AVATAR_LIST.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setJoinAvatar(av.id)}
                    className={`relative p-1 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                      joinAvatar === av.id 
                        ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/40' 
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                    }`}
                  >
                    <Avatar avatarId={av.id} size="md" alt={av.name} />
                    <span className="text-[10px] text-slate-300 font-medium">{av.name}</span>
                    {joinAvatar === av.id && (
                      <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !joinName.trim() || !joinCode.trim()}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all disabled:opacity-50 text-sm shadow-glow"
            >
              {loading ? 'Joining...' : 'Enter Room →'}
            </button>
          </form>
        )}
      </div>

      {/* Feature Value Props */}
      <div className="grid md:grid-cols-3 gap-5 mt-14">
        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base mb-1">Deterministic Dietary Filter</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Jain, Pure Veg, and Halal requirements are deterministically enforced before AI evaluation. The LLM is never allowed to override dietary boundaries.
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base mb-1">Google Gemma 2 Arbitration</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Google’s open-weight Gemma 2 model synthesizes soft cravings, budgets, and votes into a clear, diplomatic verdict.
          </p>
        </div>

        <div className="glass-card rounded-xl p-5 border border-slate-800/80">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-white font-bold text-base mb-1">Transparent Concessions</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every friend gets verified dish suggestions and reviews the trade-off matrix. Zero post-dinner resentment.
          </p>
        </div>
      </div>
    </div>
  );
}
