import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, Sparkles, Star, MapPin, ExternalLink, Share2, 
  RotateCcw, Check, ShieldCheck, HeartHandshake, Utensils, IndianRupee, Leaf 
} from 'lucide-react';
import Avatar from './Avatar';

export default function ResultView({ room, restaurants, onReset, currentUser }) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const decision = room.decision;

  const winner = restaurants.find((r) => r.id === decision?.winner_id) || {
    name: decision?.winner_name,
    cuisine: decision?.winner_cuisine,
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    address: room.city,
    locality: room.city,
    price: '₹₹',
    cost_per_person_inr: 450,
    cost_for_two_inr: 900,
    rating: 4.8,
  };

  const runnerUp = restaurants.find((r) => r.id === decision?.runner_up_id);
  const suggestions = decision?.dish_suggestions || decision?.safe_orders || decision?.friend_orders || [];

  // Lookup participant avatar helper
  const getParticipantAvatar = (participantName) => {
    const p = room.participants.find((part) => part.name === participantName);
    return p?.avatar || 'food-samosa';
  };

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#e11d48', '#8b5cf6', '#10b981', '#fbbf24']
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  const handleCopySummary = () => {
    if (!decision) return;
    const text = `BiteVote Consensus for ${room.name} (${room.city})\n` +
      `Winner: ${decision.winner_name} (${winner.cuisine})\n` +
      `Location: ${winner.locality || winner.address}\n` +
      `Estimated Cost: ₹${winner.cost_per_person_inr}/person (₹${winner.cost_for_two_inr} for two)\n` +
      `Group Match Score: ${decision.match_score}%\n` +
      `Gemma's Verdict: ${decision.verdict_summary}\n\n` +
      `Personalized Dish Suggestions:\n` +
      suggestions.map(o => `• ${o.participant}: ${o.dish} (₹${o.price_inr}) - ${o.note}`).join('\n') +
      `\n\nDecided with BiteVote — Powered by Google Gemma 2 via OpenRouter`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  if (!decision) {
    return (
      <div className="text-center py-16 text-slate-400">
        Waiting for AI decision...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-glow">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          Consensus Reached in {room.city}
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Gemma’s Compromise Champion
        </h1>
        <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto">
          Multi-constraint optimization successfully resolved dietary boundaries and conflicting cravings.
        </p>
      </div>

      {/* Main Winner Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-amber-500/40 shadow-glow relative">
        <div className="grid md:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="md:col-span-5 relative h-64 md:h-auto min-h-[260px] bg-slate-900">
            <img 
              src={winner.image_url} 
              alt={winner.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
            
            {/* Score Badge */}
            <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/50 flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-300">Match Score:</span>
              <span className="text-base font-black text-amber-400">{decision.match_score}%</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  {winner.cuisine}
                </span>
                <span className="text-xs text-amber-300 font-bold">
                  ₹{winner.cost_per_person_inr}/person • {winner.rating}★
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                {winner.dietary?.pure_veg && (
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" title="Pure Veg" />
                )}
                <span>{winner.name}</span>
              </h2>

              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {winner.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{winner.address || winner.locality} • {winner.city}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(winner.name + ' ' + (winner.address || room.city))}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopySummary}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gemma's Mediator Verdict Box */}
      <div className="glass-card rounded-2xl p-6 border border-purple-500/30 bg-purple-950/20 relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-ai-glow">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Gemma 2 Compromise Verdict
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-700/50 text-purple-200 font-medium">
                {decision.model_used}
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-200 italic font-medium leading-relaxed">
              "{decision.verdict_summary}"
            </p>
          </div>
        </div>

        {/* Why this wins list */}
        {decision.compromise_reasons && decision.compromise_reasons.length > 0 && (
          <div className="mt-5 pt-4 border-t border-purple-900/40 grid sm:grid-cols-2 gap-2 text-xs">
            {decision.compromise_reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personalized Dish Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-brand-400" />
            <span>Personalized Dish Suggestions</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-medium">Matched strictly from restaurant's verified menu</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {suggestions.map((order, i) => {
            const pName = order.participant || order.participant_name || order.friend_name || 'Friend';
            const dishName = order.dish || order.dish_name || order.order || "Chef's Special";
            const priceVal = order.price_inr ? `₹${order.price_inr}` : (order.price ? `${order.price}` : '₹250');
            const noteText = order.note || order.diet_fit || order.why_safe || order.why_chosen || 'Matches dietary preferences';
            return (
              <div key={i} className="glass-card rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar avatarId={getParticipantAvatar(pName)} size="xs" alt={pName} />
                    <span className="text-xs font-bold text-amber-400">{pName}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-300">{priceVal}</span>
                </div>
                <div className="text-sm font-extrabold text-white">{dishName}</div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  {noteText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Concession / Trade-Off Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>The Compromise Matrix</span>
          </h3>
          <span className="text-[11px] text-slate-400">Total transparency across concessions</span>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden border border-slate-800 divide-y divide-slate-800/80 text-xs">
          <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-900/90 font-bold text-slate-400 uppercase tracking-wider text-[10px]">
            <div className="col-span-3">Participant</div>
            <div className="col-span-4">Concession Made</div>
            <div className="col-span-5 text-emerald-400">Benefit Gained</div>
          </div>
          {decision.trade_offs.map((item, i) => (
            <div key={i} className="grid grid-cols-12 px-4 py-3 items-center gap-2">
              <div className="col-span-3 font-bold text-white flex items-center gap-2">
                <Avatar avatarId={getParticipantAvatar(item.participant)} size="xs" alt={item.participant} />
                <span className="truncate">{item.participant}</span>
              </div>
              <div className="col-span-4 text-slate-300">
                {item.concession}
              </div>
              <div className="col-span-5 text-emerald-300 font-medium">
                {item.gain}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Runner Up Backup Option */}
      {runnerUp && (
        <div className="glass-card rounded-xl p-4 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img src={runnerUp.image_url} alt={runnerUp.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Alternative Option (Runner-Up)</div>
              <div className="font-bold text-sm text-white">{runnerUp.name} ({runnerUp.cuisine})</div>
              <div className="text-slate-400 text-[11px]">{decision.runner_up_reason}</div>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(runnerUp.name + ' ' + (runnerUp.address || room.city))}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] shrink-0 text-center"
          >
            View Details
          </a>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>Vote Another Meal / Reset Room</span>
        </button>
      </div>
    </div>
  );
}
