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
    <div className="w-full max-w-[1500px] mx-auto px-6 lg:px-12 py-8 md:py-12">
      {/* 2-Column Hero on Desktop, Stacked on Mobile */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Headline, Value Proposition & Benefits */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Find a place everyone agrees on</span>
          </div>

          <h1 className="heading-h1">
            End the <span className="text-brand-500">"Where should we eat?"</span> debate forever.
          </h1>

          <p className="body-lead max-w-2xl">
            Group dining shouldn't take 45 minutes of circular debates. BiteVote gathers your squad's dietary boundaries, cravings, and budgets, then uses AI arbitration to find the one restaurant everyone will genuinely enjoy.
          </p>

        </div>

        {/* Right Column: Hero Cover Art + Dinner Room Interactive Card */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center lg:items-end w-full space-y-4">

          <div className="w-full max-w-xl glass-panel rounded-3xl p-6 md:p-8 shadow-card border border-cream-300 relative bg-white/95">
            {mode === 'menu' && (
              <div className="space-y-4">
                <button
                  onClick={() => setMode('create')}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-soft transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Utensils className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="heading-h4 text-white">Start a New Room</div>
                      <div className="body-small text-brand-100">Select city, set dietary boundaries & invite friends</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setMode('join')}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-white hover:bg-cream-100/70 border border-cream-300 text-stone-800 font-semibold transition-all group shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cream-100 text-stone-600 flex items-center justify-center group-hover:text-brand-500 transition-colors">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="heading-h4 text-stone-900">Join with Room Code</div>
                      <div className="body-small text-stone-500">Enter 6-character room code from your group</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-stone-400" />
                </button>

                {/* Quick Demo Button */}
                <div className="pt-2">
                  <button
                    onClick={onInstantDemo}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-800 text-sm font-bold transition-all shadow-sm"
                  >
                    <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
                    <span>Try Mumbai 3-Friend Demo (1-Click)</span>
                  </button>
                  <p className="body-caption text-center text-stone-500 mt-2">
                    Simulates <strong>Sarah</strong> (Jain + ₹300-500 + Maharashtrian), <strong>Rahul</strong> (Veg + ₹400-700 + North Indian), and <strong>Aisha</strong> (Veg + ₹300-600 + Indo-Chinese) in Mumbai.
                  </p>
                </div>
              </div>
            )}

            {/* Create Room Form */}
            {mode === 'create' && (
              <form onSubmit={handleCreateSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                  <h2 className="heading-h3 flex items-center gap-2 text-stone-900">
                    <Utensils className="w-4 h-4 text-brand-500" /> Create Dinner Room
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMode('menu')}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    Back
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={hostName}
                    onChange={(e) => setHostName(e.target.value)}
                    placeholder="e.g. Rahul, Priya, Ananya"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 text-sm"
                  />
                </div>

                {/* Profile Avatar Picker */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Select Food Avatar</label>
                  <div className="grid grid-cols-4 gap-2">
                    {AVATAR_LIST.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setHostAvatar(av.id)}
                        className={`relative p-1.5 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                          hostAvatar === av.id 
                            ? 'border-brand-500 bg-brand-50/80 ring-2 ring-brand-500/30' 
                            : 'border-cream-200 bg-white hover:border-cream-300'
                        }`}
                      >
                        <Avatar avatarId={av.id} size="md" alt={av.name} />
                        <span className="text-[10px] text-stone-600 font-medium">{av.name}</span>
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
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-500" /> Select City
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-900 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
                  >
                    {INDIAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Occasion / Group Name</label>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="e.g. Friday Feasters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !hostName.trim()}
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold shadow-soft transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? 'Creating Room...' : 'Launch Room & Get Share Code →'}
                </button>
              </form>
            )}

            {/* Join Room Form */}
            {mode === 'join' && (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-cream-200 pb-3">
                  <h2 className="heading-h3 flex items-center gap-2 text-stone-900">
                    <Users className="w-4 h-4 text-brand-500" /> Join Existing Room
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMode('menu')}
                    className="text-xs font-semibold text-stone-500 hover:text-stone-800"
                  >
                    Back
                  </button>
                </div>

                {joinError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {joinError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">6-Character Room Code</label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="e.g. BITE72"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 text-base font-mono uppercase tracking-widest text-center font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={joinName}
                    onChange={(e) => setJoinName(e.target.value)}
                    placeholder="e.g. Kabir, Aisha"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">Select Food Avatar</label>
                  <div className="grid grid-cols-4 gap-2">
                    {AVATAR_LIST.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setJoinAvatar(av.id)}
                        className={`relative p-1.5 rounded-xl flex flex-col items-center gap-1 border transition-all ${
                          joinAvatar === av.id 
                            ? 'border-brand-500 bg-brand-50/80 ring-2 ring-brand-500/30' 
                            : 'border-cream-200 bg-white hover:border-cream-300'
                        }`}
                      >
                        <Avatar avatarId={av.id} size="md" alt={av.name} />
                        <span className="text-[10px] text-stone-600 font-medium">{av.name}</span>
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
                  className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all disabled:opacity-50 text-sm shadow-soft"
                >
                  {loading ? 'Joining...' : 'Enter Room →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Compact Horizontal Feature Strip Below Hero */}
      <div className="w-full bg-white/90 border border-cream-200 rounded-2xl p-4 sm:p-5 shadow-soft my-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-cream-200">
          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-2">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="heading-h4 text-xs sm:text-sm text-stone-900">Dietary boundaries protected</div>
              <div className="body-caption text-stone-500 font-medium">100% hard-filtered in code</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-brand-500" />
            </div>
            <div>
              <div className="heading-h4 text-xs sm:text-sm text-stone-900">Group preferences matched</div>
              <div className="body-caption text-stone-500 font-medium">Cravings, budgets & vibes</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="heading-h4 text-xs sm:text-sm text-stone-900">AI-powered compromise</div>
              <div className="body-caption text-stone-500 font-medium">Arbitrated by Gemma 2</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="heading-h4 text-xs sm:text-sm text-stone-900">Source-backed recommendations</div>
              <div className="body-caption text-stone-500 font-medium">Grounded web & vlog reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Value Props matching pastel subtle theme with subtle hover elevation */}
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="glass-card rounded-2xl p-5 border border-cream-300 shadow-soft bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="heading-h3 text-base mb-1">Deterministic Dietary Filter</h3>
          <p className="body-small text-stone-600 leading-relaxed">
            Jain, Pure Veg, and Halal requirements are deterministically enforced before AI evaluation. The LLM is never allowed to override dietary boundaries.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-cream-300 shadow-soft bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 border border-brand-100 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="heading-h3 text-base mb-1">Google Gemma 2 Arbitration</h3>
          <p className="body-small text-stone-600 leading-relaxed">
            Google’s open-weight Gemma 2 model synthesizes soft cravings, budgets, and votes into a clear, diplomatic verdict.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-cream-300 shadow-soft bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-100 flex items-center justify-center mb-3">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="heading-h3 text-base mb-1">Transparent Concessions</h3>
          <p className="body-small text-stone-600 leading-relaxed">
            Every friend gets verified dish suggestions and reviews the trade-off matrix. Zero post-dinner resentment.
          </p>
        </div>
      </div>
    </div>
  );
}
