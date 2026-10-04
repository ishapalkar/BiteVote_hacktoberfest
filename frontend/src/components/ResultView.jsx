import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, Sparkles, Star, MapPin, ExternalLink, Share2, 
  RotateCcw, Check, ShieldCheck, HeartHandshake, Utensils, IndianRupee, Leaf, Swords, Zap
} from 'lucide-react';
import Avatar from './Avatar';
import BiteGuideSection from './BiteGuideSection';
import BiteBlitzModal from './BiteBlitzModal';

export default function ResultView({ room, restaurants, onReset, currentUser }) {
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showRematchBlitz, setShowRematchBlitz] = useState(false);
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
      <div className="text-center py-16 text-stone-500">
        Waiting for AI decision...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Celebration Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-widest shadow-soft">
          <Trophy className="w-3.5 h-3.5 text-brand-600" />
          Consensus Reached in {room.city}
        </div>
        <h1 className="heading-h1">
          Gemma’s Compromise Champion
        </h1>
        <p className="body-text max-w-xl mx-auto">
          Multi-constraint optimization successfully resolved dietary boundaries and conflicting cravings.
        </p>
      </div>

      {/* Main Winner Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-cream-200 shadow-soft relative">
        <div className="grid md:grid-cols-12 gap-0">
          {/* Image Column */}
          <div className="md:col-span-5 relative h-64 md:h-auto min-h-[260px] bg-cream-100">
            <img 
              src={winner.image_url} 
              alt={winner.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-stone-950/60 via-transparent to-transparent" />
            
            {/* Score Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cream-200 flex items-center gap-1.5 shadow-soft">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-stone-600">Match Score:</span>
              <span className="text-base font-black text-teal-700">{decision.match_score}%</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
                  {winner.cuisine}
                </span>
                <span className="text-xs text-stone-600 font-bold">
                  ₹{winner.cost_per_person_inr}/person • {winner.rating}★
                </span>
              </div>

              <h2 className="heading-h2 flex items-center gap-2 text-stone-900">
                {winner.dietary?.pure_veg && (
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" title="Pure Veg" />
                )}
                <span>{winner.name}</span>
              </h2>

              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {winner.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-stone-500 mt-3">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                <span>{winner.address || winner.locality} • {winner.city}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-cream-200 flex flex-wrap items-center gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(winner.name + ' ' + (winner.address || room.city))}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-soft transition-all"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopySummary}
                className="px-4 py-2.5 rounded-xl bg-cream-50 hover:bg-cream-100 border border-cream-200 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedSummary ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-teal-700">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copy Summary</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gemma's Mediator Verdict Box */}
      <div className="bg-gradient-to-br from-cream-50 via-white to-teal-50/40 rounded-2xl p-6 border border-teal-200/80 shadow-soft relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-soft">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Gemma 2 Compromise Verdict
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium">
                {decision.model_used}
              </span>
            </div>
            <p className="text-sm md:text-base text-stone-800 italic font-medium leading-relaxed">
              "{decision.verdict_summary}"
            </p>

            {/* Bite Blitz Tie-Breaker Details */}
            {room.bite_blitz && room.bite_blitz.played && (
              <div className="pt-2.5 space-y-1.5 border-t border-teal-200/50">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-black text-amber-700 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" /> Bite Blitz Tie-Breaker:
                  </span>
                  <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    Champion: {room.bite_blitz.winner_name} (+{room.bite_blitz.tie_break_boost || 7.5} pts applied to {room.bite_blitz.winner_preferred_restaurant_name})
                  </span>
                </div>
                <p className="text-[10px] text-stone-600 italic">
                  “Bite Blitz can break a tie, but it can never override someone's dietary boundaries.”
                </p>
              </div>
            )}

            {room.crave_clash && Object.keys(room.crave_clash).length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-brand-600 flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Crave Clash Signals:
                </span>
                {Object.entries(room.crave_clash).map(([clash, choice]) => (
                  <span key={clash} className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200 capitalize">
                    {clash}: {choice}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Why this wins list */}
        {decision.compromise_reasons && decision.compromise_reasons.length > 0 && (
          <div className="mt-5 pt-4 border-t border-teal-200/50 grid sm:grid-cols-2 gap-2 text-xs">
            {decision.compromise_reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-stone-700">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BiteGuide: Web & YouTube Intelligence via SerpApi + Gemma 2 */}
      <BiteGuideSection restaurant={winner} city={room.city} />

      {/* Personalized Dish Suggestions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="heading-h3 flex items-center gap-2 text-stone-900">
            <Utensils className="w-4 h-4 text-brand-500" />
            <span>Personalized Dish Suggestions</span>
          </h3>
          <span className="text-[11px] text-stone-500 font-medium">Matched strictly from restaurant's verified menu</span>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {suggestions.map((order, i) => {
            const pName = order.participant || order.participant_name || order.friend_name || 'Friend';
            const dishName = order.dish || order.dish_name || order.order || "Chef's Special";
            const priceVal = order.price_inr ? `₹${order.price_inr}` : (order.price ? `${order.price}` : '₹250');
            const noteText = order.note || order.diet_fit || order.why_safe || order.why_chosen || 'Matches dietary preferences';
            return (
              <div key={i} className="bg-white rounded-xl p-4 border border-cream-200 shadow-soft space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar avatarId={getParticipantAvatar(pName)} size="xs" alt={pName} />
                    <span className="text-xs font-bold text-stone-800">{pName}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-teal-700">{priceVal}</span>
                </div>
                <div className="text-sm font-extrabold text-stone-900">{dishName}</div>
                <div className="text-[11px] text-stone-500 leading-snug">
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
          <h3 className="heading-h3 flex items-center gap-2 text-stone-900">
            <HeartHandshake className="w-4 h-4 text-teal-600" />
            <span>The Compromise Matrix</span>
          </h3>
          <span className="text-[11px] text-stone-500">Total transparency across concessions</span>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border border-cream-200 shadow-soft divide-y divide-cream-200 text-xs">
          <div className="grid grid-cols-12 px-4 py-2.5 bg-cream-50 font-bold text-stone-600 uppercase tracking-wider text-[10px]">
            <div className="col-span-3">Participant</div>
            <div className="col-span-4">Concession Made</div>
            <div className="col-span-5 text-teal-700">Benefit Gained</div>
          </div>
          {decision.trade_offs.map((item, i) => (
            <div key={i} className="grid grid-cols-12 px-4 py-3 items-center gap-2">
              <div className="col-span-3 font-bold text-stone-900 flex items-center gap-2">
                <Avatar avatarId={getParticipantAvatar(item.participant)} size="xs" alt={item.participant} />
                <span className="truncate">{item.participant}</span>
              </div>
              <div className="col-span-4 text-stone-600">
                {item.concession}
              </div>
              <div className="col-span-5 text-teal-700 font-medium">
                {item.gain}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Runner Up Backup Option */}
      {runnerUp && (
        <div className="bg-white rounded-xl p-4 border border-cream-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <img src={runnerUp.image_url} alt={runnerUp.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Alternative Option (Runner-Up)</div>
              <div className="font-bold text-sm text-stone-900">{runnerUp.name} ({runnerUp.cuisine})</div>
              <div className="text-stone-500 text-[11px]">{decision.runner_up_reason}</div>
            </div>
          </div>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(runnerUp.name + ' ' + (runnerUp.address || room.city))}`}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 rounded-lg bg-cream-50 hover:bg-cream-100 border border-cream-200 text-stone-700 font-semibold text-[11px] shrink-0 text-center transition-colors"
          >
            View Details
          </a>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setShowRematchBlitz(true)}
          className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 shadow-soft transition-all"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Play Bite Blitz (60s Trivia)</span>
        </button>

        <button
          onClick={onReset}
          className="px-6 py-3 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-stone-700 font-bold text-xs flex items-center gap-2 shadow-soft transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-stone-500" />
          <span>Vote Another Meal / Reset Room</span>
        </button>
      </div>

      {/* Bite Blitz Rematch Modal */}
      {showRematchBlitz && (
        <BiteBlitzModal
          isOpen={showRematchBlitz}
          onClose={() => setShowRematchBlitz(false)}
          onApplyTieBreak={() => setShowRematchBlitz(false)}
          onSkipTieBreak={() => setShowRematchBlitz(false)}
          room={room}
          currentUser={currentUser}
          restaurants={restaurants}
        />
      )}
    </div>
  );
}
