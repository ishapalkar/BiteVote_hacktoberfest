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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Code */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-300 relative overflow-hidden bg-white/95 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500">Dinner Room Lobby</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cream-100 text-stone-700 border border-cream-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-500" /> {room.city}
              </span>
            </div>
            <h1 className="heading-h2">{room.name}</h1>
            <p className="body-small text-stone-500 mt-1">
              Share the room code with friends to submit dietary boundaries and begin voting.
            </p>
          </div>

          {/* Room Code Card */}
          <div className="flex items-center gap-3">
            <div className="bg-cream-50 border border-cream-300 px-4 py-2.5 rounded-2xl text-center shadow-soft">
              <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Room Code</span>
              <span className="font-mono text-2xl font-black text-brand-500 tracking-widest">{room.code}</span>
            </div>

            <button
              onClick={copyInvite}
              className="px-4 py-3 rounded-2xl bg-white hover:bg-cream-100 border border-cream-300 text-stone-800 font-semibold text-xs flex items-center gap-2 transition-all shadow-soft"
              title="Copy link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-teal-600" />
                  <span className="text-teal-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-400" />
                  <span>Share Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Group Dietary Constraints Alert */}
        {Object.keys(groupDiets).length > 0 && (
          <div className="mt-5 pt-4 border-t border-cream-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-teal-700 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Enforced Group Constraints:
            </span>
            {Object.entries(groupDiets).map(([k, count]) => (
              <span
                key={k}
                className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-bold text-[11px]"
              >
                {k === 'jain' ? 'JAIN' : k === 'pure_veg' ? 'PURE VEG' : k.replace('_', ' ').toUpperCase()} ({count})
              </span>
            ))}
            <span className="text-stone-500 text-[11px] ml-auto">
              Non-compliant spots are deterministically eliminated in Python.
            </span>
          </div>
        )}
      </div>

      {/* Participants Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="heading-h3 flex items-center gap-2 text-stone-900">
            <Users className="w-5 h-5 text-brand-500" />
            <span>Participants ({room.participants.length})</span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPreferences}
              className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition-colors shadow-soft"
            >
              <Sliders className="w-3.5 h-3.5 text-brand-500" /> Edit My Profile
            </button>

            {onAddSimulatedFriend && (
              <button
                onClick={onAddSimulatedFriend}
                className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-xs font-semibold text-teal-800 flex items-center gap-1.5 transition-colors shadow-soft"
                title="Add simulated friend with realistic profile"
              >
                <UserPlus className="w-3.5 h-3.5 text-teal-600" /> + Add Friend Demo
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
                className={`glass-card rounded-2xl p-4 border transition-all bg-white shadow-soft ${
                  isMe ? 'border-brand-500/60 ring-2 ring-brand-500/20' : 'border-cream-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar avatarId={p.avatar} size="md" alt={p.name} />
                    <div>
                      <div className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                        {p.name}
                        {p.is_host && <Crown className="w-3.5 h-3.5 text-amber-500" title="Host" />}
                        {isMe && <span className="text-[10px] text-brand-600 font-bold">(You)</span>}
                      </div>
                      <div className="text-[11px] text-stone-500 font-medium">
                        ₹{prefs.budget_min || 300}–₹{prefs.budget_max || 600} • {prefs.vibe || 'Casual'}
                      </div>
                    </div>
                  </div>

                  {p.is_ready ? (
                    <span className="flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" /> Ready
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-medium">
                      <Clock className="w-3 h-3 text-amber-600 animate-spin" /> Setup
                    </span>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-1.5 pt-2 border-t border-cream-200 text-xs">
                  {activeDiets.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {activeDiets.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                          {d === 'jain' ? 'Jain' : d === 'pure veg' ? 'Pure Veg' : d}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[11px] text-stone-400 italic">No dietary restrictions</span>
                  )}

                  {prefs.cravings && prefs.cravings.length > 0 && (
                    <div className="text-[11px] text-stone-600 truncate">
                      Craving: <span className="text-brand-600 font-semibold">{prefs.cravings.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Voting Control Bar */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-cream-300 text-center space-y-3 bg-white/95 shadow-card">
        {isHost ? (
          <div>
            <button
              onClick={onStartVoting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm shadow-soft transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Start Food Voting Round</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-stone-500 mt-2">
              Friends swipe Like/Skip on verified candidates in {room.city}. Gemma arbitrates the best compromise.
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-stone-600 text-sm py-2">
            <Clock className="w-4 h-4 text-brand-500 animate-spin" />
            <span>Waiting for room host to start the voting round...</span>
          </div>
        )}
      </div>

      {/* Candidate Spots Preview */}
      {restaurants && restaurants.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>Candidate Options Up For Voting ({restaurants.length} spots in {room.city})</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {restaurants.slice(0, 4).map((r) => (
              <div key={r.id} className="glass-card rounded-2xl overflow-hidden border border-cream-200 bg-white shadow-soft">
                <img src={r.image_url} alt={r.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <div className="font-bold text-xs text-stone-900 truncate flex items-center gap-1.5">
                    {r.dietary?.pure_veg && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" title="Pure Veg" />
                    )}
                    <span className="truncate">{r.name}</span>
                  </div>
                  <div className="text-[10px] text-stone-500 truncate">{r.cuisine}</div>
                  <div className="text-[10px] text-stone-700 font-bold mt-0.5">~₹{r.cost_per_person_inr}/person</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
