import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Star, Sparkles, Check, ChevronRight, 
  MapPin, IndianRupee, Award, Utensils, Info, CheckCircle2, Leaf, ShieldCheck, Moon 
} from 'lucide-react';
import Avatar from './Avatar';

export default function VotingDeck({ 
  restaurants, 
  onVoteComplete, 
  onTriggerDecide, 
  room, 
  currentUser, 
  loadingDecide,
  onOpenDetails 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [hasFinishedVoting, setHasFinishedVoting] = useState(false);

  // Filter restaurants in room or by city
  let candidateRestaurants = restaurants.filter(
    (r) => room.restaurant_ids.includes(r.id)
  );

  if (candidateRestaurants.length === 0) {
    candidateRestaurants = restaurants.filter(
      (r) => r.city?.toLowerCase() === room.city?.toLowerCase()
    );
  }

  if (candidateRestaurants.length === 0) {
    candidateRestaurants = restaurants;
  }

  const currentRestaurant = candidateRestaurants[currentIndex];
  const totalCards = candidateRestaurants.length;

  const handleVote = (choice) => {
    if (!currentRestaurant) return;
    
    const newVotes = { ...votes, [currentRestaurant.id]: choice };
    setVotes(newVotes);

    if (currentIndex + 1 < totalCards) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setHasFinishedVoting(true);
      onVoteComplete(newVotes);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (hasFinishedVoting) return;
      if (e.key === 'ArrowLeft') handleVote('skip');
      if (e.key === 'ArrowRight') handleVote('like');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasFinishedVoting, votes]);

  // If user already voted or finished
  if (hasFinishedVoting || currentUser?.has_voted) {
    const participantsVotedCount = room.participants.filter((p) => p.has_voted).length;
    const totalParticipants = room.participants.length;

    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="glass-panel rounded-2xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-white">Your Votes Are In!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            You reviewed all {totalCards} restaurants in {room.city}. Ready for Gemma to arbitrate everyone's dietary constraints and budgets!
          </p>

          {/* Group Status */}
          <div className="my-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              <span>Friends Voting Status</span>
              <span className="text-brand-400">{participantsVotedCount} of {totalParticipants} Finished</span>
            </div>
            
            <div className="space-y-2">
              {room.participants.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <Avatar avatarId={p.avatar} size="xs" alt={p.name} />
                    <span className="font-semibold text-white">{p.name}</span>
                  </div>
                  {p.has_voted || (p.id === currentUser?.id && hasFinishedVoting) ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> Voted
                    </span>
                  ) : (
                    <span className="text-amber-400 animate-pulse font-medium">
                      Reviewing cards...
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Trigger Gemma AI Compromise Engine */}
          <button
            onClick={onTriggerDecide}
            disabled={loadingDecide}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-base shadow-ai-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
            <span>{loadingDecide ? 'Gemma is Arbitrating Compromise...' : 'Summon Gemma AI Verdict!'}</span>
          </button>
          
          <p className="text-[11px] text-slate-400 mt-2">
            Gemma executes deterministic hard-constraint filtering before resolving soft preference conflicts.
          </p>
        </div>
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div className="text-center py-16 text-slate-400">
        No candidate restaurants found in this room.
      </div>
    );
  }

  const dietary = currentRestaurant.dietary || {};

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4">
      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span className="flex items-center gap-1">
          <Utensils className="w-3.5 h-3.5 text-brand-400" />
          <span>Card {currentIndex + 1} of {totalCards} ({room.city})</span>
        </span>
        <span>{Math.round(((currentIndex) / totalCards) * 100)}% done</span>
      </div>

      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-gradient-to-r from-brand-500 to-amber-400 h-full transition-all duration-300"
          style={{ width: `${((currentIndex) / totalCards) * 100}%` }}
        />
      </div>

      {/* Main Restaurant Card */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl relative transition-all">
        {/* Photo Container */}
        <div className="relative h-64 w-full bg-slate-900">
          <img 
            src={currentRestaurant.image_url} 
            alt={currentRestaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Badges on Photo */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-amber-400 font-black text-xs border border-amber-500/30 flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {currentRestaurant.rating}
            </span>

            {dietary.pure_veg ? (
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                <Leaf className="w-3 h-3 text-emerald-400" /> Pure Veg
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 text-xs">
                Veg & Non-Veg
              </span>
            )}

            {dietary.jain_available && (
              <span className="px-2.5 py-1 rounded-md bg-amber-950/90 border border-amber-500/50 text-amber-300 font-bold text-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-amber-400" /> Jain
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-bold border border-slate-700">
              ₹{currentRestaurant.cost_per_person_inr}/person
            </span>
          </div>

          {/* Restaurant Headline */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-2xl font-black text-white leading-tight drop-shadow-md">
              {currentRestaurant.name}
            </h2>
            <p className="text-xs text-brand-300 font-semibold mt-0.5">
              {currentRestaurant.cuisine} • {currentRestaurant.locality || currentRestaurant.city}
            </p>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-4 space-y-3 bg-slate-900/80">
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {currentRestaurant.description}
          </p>

          {/* Pricing & Dietary Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
              ₹{currentRestaurant.cost_for_two_inr || 800} for two
            </span>
            {dietary.halal_certified && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold flex items-center gap-1">
                <Moon className="w-2.5 h-2.5" /> Halal Certified
              </span>
            )}
            {dietary.gluten_free_options && (
              <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px]">
                Gluten-Free Options
              </span>
            )}
            {currentRestaurant.place_type && (
              <span className="px-2 py-0.5 rounded-full bg-purple-950/40 text-purple-300 text-[10px] border border-purple-800/40">
                {currentRestaurant.place_type}
              </span>
            )}
          </div>

          {/* Signature Dish Highlights */}
          {currentRestaurant.signature_dishes && currentRestaurant.signature_dishes.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Menu Highlights:
              </div>
              <div className="space-y-1.5">
                {currentRestaurant.signature_dishes.slice(0, 2).map((dish, i) => (
                  <div key={i} className="text-xs text-slate-200 flex items-center justify-between">
                    <span className="truncate pr-2 font-medium">{dish.name}</span>
                    <span className="text-[11px] text-amber-300 font-bold shrink-0">
                      ₹{dish.price_inr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voting Action Buttons */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-around gap-4">
          {/* Skip / Pass */}
          <button
            onClick={() => handleVote('skip')}
            className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-all group"
            title="Pass / Not feeling this (Left Arrow)"
          >
            <X className="w-4 h-4 text-rose-500 group-hover:scale-125 transition-transform" />
            <span>Pass</span>
          </button>

          {/* Details */}
          <button
            onClick={() => onOpenDetails && onOpenDetails(currentRestaurant)}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Inspect Full Menu & Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Like */}
          <button
            onClick={() => handleVote('like')}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950 transition-all group"
            title="Like / Down to eat here (Right Arrow)"
          >
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
            <span>Like</span>
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400">
        Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">←</kbd> to Pass or <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">→</kbd> to Like
      </div>
    </div>
  );
}
