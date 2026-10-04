import React, { useState } from 'react';
import { 
  Users, Crown, CheckCircle2, Clock, Copy, Check, 
  Sparkles, Sliders, ArrowRight, ShieldCheck, UserPlus, MapPin, IndianRupee, Leaf 
} from 'lucide-react';
import Avatar from './Avatar';

export default function LobbyView({ 
  room, 
  currentUser, 
  onStartVoting, 
  onOpenPreferences,
  onAddSimulatedFriend,
  restaurants 
}) {
  const [copied, setCopied] = useState(false);

  const isHost = currentUser?.id === room.host_id || currentUser?.is_host;

  const copyInvite = () => {
    const url = `${window.location.origin}${window.location.pathname}?room=${room.code}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tally group dietary requirements
  const groupDiets = {};
  room.participants.forEach((p) => {
    const diet = p.preferences?.dietary || {};
    Object.entries(diet).forEach(([k, v]) => {
      if (v) groupDiets[k] = (groupDiets[k] || 0) + 1;
    });
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner / Code */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Dinner Room Lobby</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-400" /> {room.city}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{room.name}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Share the room code with friends to submit dietary boundaries and begin voting.
            </p>
          </div>

          {/* Room Code Card */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/90 border border-slate-700 px-4 py-2.5 rounded-xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Room Code</span>
              <span className="font-mono text-2xl font-black text-amber-400 tracking-widest">{room.code}</span>
            </div>

            <button
              onClick={copyInvite}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Share Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Group Dietary Constraints Alert */}
        {Object.keys(groupDiets).length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Enforced Group Constraints:
            </span>
            {Object.entries(groupDiets).map(([k, count]) => (
              <span
                key={k}
                className="px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 font-bold text-[11px]"
              >
                {k === 'jain' ? 'JAIN' : k === 'pure_veg' ? 'PURE VEG' : k.replace('_', ' ').toUpperCase()} ({count})
              </span>
            ))}
            <span className="text-slate-400 text-[11px] ml-auto">
              Non-compliant spots are deterministically eliminated in Python.
            </span>
          </div>
        )}
      </div>

      {/* Participants Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-400" />
            <span>Participants ({room.participants.length})</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPreferences}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-brand-400" /> Edit My Profile
            </button>

            {onAddSimulatedFriend && (
              <button
                onClick={onAddSimulatedFriend}
                className="px-3 py-1.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-xs font-semibold text-purple-300 flex items-center gap-1.5 transition-colors"
                title="Add simulated friend with realistic profile"
              >
                <UserPlus className="w-3.5 h-3.5 text-purple-400" /> + Add Friend Demo
              </button>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {room.participants.map((p) => {
            const isMe = p.id === currentUser?.id;
            const prefs = p.preferences || {};
            const diet = prefs.dietary || {};
            const activeDiets = Object.entries(diet).filter(([_, v]) => v).map(([k]) => k.replace('_', ' '));

            return (
              <div
                key={p.id}
                className={`glass-card rounded-xl p-4 border transition-all ${
                  isMe ? 'border-brand-500/50 ring-1 ring-brand-500/30' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar avatarId={p.avatar} size="md" alt={p.name} />
                    <div>
                      <div className="font-bold text-sm text-white flex items-center gap-1.5">
                        {p.name}
                        {p.is_host && <Crown className="w-3.5 h-3.5 text-amber-400" title="Host" />}
                        {isMe && <span className="text-[10px] text-brand-400 font-normal">(You)</span>}
                      </div>
                      <div className="text-[11px] text-amber-300 font-medium">
                        ₹{prefs.budget_min || 300}–₹{prefs.budget_max || 600} • {prefs.vibe || 'Casual'}
                      </div>
                    </div>
                  </div>

                  {p.is_ready ? (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-500/20 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-500/20 font-medium">
                      <Clock className="w-3 h-3 animate-spin" /> Setup
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-xs">
                  {activeDiets.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {activeDiets.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 rounded bg-emerald-900/40 text-emerald-300 text-[10px] font-semibold border border-emerald-700/30">
                          {d === 'jain' ? 'Jain' : d === 'pure veg' ? 'Pure Veg' : d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">No dietary restrictions</span>
                  )}

                  {prefs.cravings && prefs.cravings.length > 0 && (
                    <div className="text-[11px] text-slate-300 truncate">
                      Craving: <span className="text-orange-300 font-medium">{prefs.cravings.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Voting Control Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-700/80 text-center space-y-3">
        {isHost ? (
          <div>
            <button
              onClick={onStartVoting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-glow transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Start Food Voting Round</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-slate-400 mt-2">
              Friends swipe Like/Skip on verified candidates in {room.city}. Gemma arbitrates the best compromise.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-slate-300 text-sm py-2">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Waiting for room host to start the voting round...</span>
          </div>
        )}
      </div>

      {/* Candidate Spots Preview */}
      {restaurants && restaurants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>Candidate Options Up For Voting ({restaurants.length} spots in {room.city})</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {restaurants.slice(0, 4).map((r) => (
              <div key={r.id} className="glass-card rounded-lg overflow-hidden border border-slate-800">
                <img src={r.image_url} alt={r.name} className="w-full h-24 object-cover" />
                <div className="p-2.5">
                  <div className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                    {r.dietary?.pure_veg && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Pure Veg" />
                    )}
                    <span className="truncate">{r.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{r.cuisine}</div>
                  <div className="text-[10px] text-amber-300 font-semibold mt-0.5">~₹{r.cost_per_person_inr}/person</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
