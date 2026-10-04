import React, { useState, useEffect } from 'react';
import { 
  X, Heart, Star, Sparkles, Check, ChevronRight, 
  MapPin, IndianRupee, Award, Utensils, Info, CheckCircle2, Leaf, ShieldCheck, Moon,
  Flame, ArrowRight, Zap, Scale
} from 'lucide-react';
import Avatar from './Avatar';
import BiteBlitzModal from './BiteBlitzModal';

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
  const [showBiteBlitz, setShowBiteBlitz] = useState(false);

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
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6 animate-fadeIn">
        <div className="glass-panel rounded-3xl p-8 border border-cream-300 shadow-card bg-white/95 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="heading-h2">Your Votes Are In!</h2>
          <p className="body-text max-w-md mx-auto mt-1">
            You reviewed all {totalCards} restaurants in {room.city}. Ready for Gemma to arbitrate everyone's dietary constraints and budgets!
          </p>

          {/* Group Status */}
          <div className="my-6 p-4 rounded-2xl bg-cream-50 border border-cream-200 text-left">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              <span>Friends Voting Status</span>
              <span className="text-brand-600 font-bold">{participantsVotedCount} of {totalParticipants} Finished</span>
            </div>
            
            <div className="space-y-2">
              {room.participants.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs py-1.5 border-b border-cream-200/80 last:border-0">
                  <div className="flex items-center gap-2.5">
                    <Avatar avatarId={p.avatar} size="xs" alt={p.name} />
                    <span className="font-semibold text-stone-800">{p.name}</span>
                  </div>
                  {p.has_voted || (p.id === currentUser?.id && hasFinishedVoting) ? (
                    <span className="text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5 text-teal-600" /> Voted
                    </span>
                  ) : (
                    <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                      Reviewing cards...
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Check: If tied or divided, show "Too close to call?" card */}
          {(() => {
            // Check if top choices are tied or very close
            const likeTally = {};
            candidateRestaurants.forEach((r) => { likeTally[r.id] = 0; });
            Object.values(room.votes || {}).forEach((userVotes) => {
              Object.entries(userVotes || {}).forEach(([rId, choice]) => {
                if (choice === 'like') likeTally[rId] = (likeTally[rId] || 0) + 1;
                if (choice === 'superlike') likeTally[rId] = (likeTally[rId] || 0) + 2;
              });
            });
            Object.entries(votes || {}).forEach(([rId, choice]) => {
              if (choice === 'like') likeTally[rId] = (likeTally[rId] || 0) + 1;
              if (choice === 'superlike') likeTally[rId] = (likeTally[rId] || 0) + 2;
            });
            const counts = Object.values(likeTally).sort((a, b) => b - a);
            const isTooCloseToCall = counts.length >= 2 && (counts[0] - counts[1]) <= 1;

            if (isTooCloseToCall) {
              return (
                <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-brand-50/70 via-cream-50 to-teal-50/70 border border-brand-200/80 shadow-soft text-left space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-wider">
                      <Zap className="w-4 h-4 text-brand-500 fill-brand-500" />
                      <span>Too close to call?</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white text-brand-600 border border-brand-200 shadow-sm">
                      Tie-Breaker Available
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-900">Settle it with a quick game.</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Votes are neck-and-neck! Play Bite Blitz for 60 seconds — the trivia champion earns a small tie-breaker signal for Gemma's final verdict.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowBiteBlitz(true)}
                      className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-black text-xs shadow-soft transition-all flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      <span>Play Bite Blitz</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onTriggerDecide()}
                      disabled={loadingDecide}
                      className="py-3 px-4 rounded-xl bg-white hover:bg-cream-100 border border-cream-300 text-stone-700 hover:text-stone-900 font-semibold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
                    >
                      <span>Skip → See Results</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[10px] text-stone-500 italic">
                    “Bite Blitz can break a tie, but it can never override someone's dietary boundaries.”
                  </p>
                </div>
              );
            }

            return (
              <div className="mb-6 space-y-3">
                <button
                  onClick={() => onTriggerDecide()}
                  disabled={loadingDecide}
                  className="w-full py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-black text-base shadow-soft transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>{loadingDecide ? 'Gemma is Arbitrating Compromise...' : 'Summon Gemma AI Verdict!'}</span>
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setShowBiteBlitz(true)}
                    className="text-xs text-brand-600 hover:text-brand-700 font-bold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-brand-500" />
                    <span>Bite Blitz — Got 60 seconds? Play while the group decides.</span>
                  </button>
                </div>
              </div>
            );
          })()}

          <p className="text-[11px] text-stone-500 mt-2">
            Gemma executes deterministic hard-constraint filtering before resolving soft preference conflicts.
          </p>

          {/* Bite Blitz Modal */}
          {showBiteBlitz && (
            <BiteBlitzModal
              isOpen={showBiteBlitz}
              onClose={() => setShowBiteBlitz(false)}
              onApplyTieBreak={(blitzData) => {
                setShowBiteBlitz(false);
                onTriggerDecide({ bite_blitz: blitzData });
              }}
              onSkipTieBreak={() => {
                setShowBiteBlitz(false);
                onTriggerDecide();
              }}
              room={room}
              currentUser={currentUser}
              restaurants={candidateRestaurants}
              loading={loadingDecide}
            />
          )}
        </div>
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div className="text-center py-16 text-stone-500">
        No candidate restaurants found in this room.
      </div>
    );
  }

  const dietary = currentRestaurant.dietary || {};

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-4 animate-fadeIn">
      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500">
        <span className="flex items-center gap-1">
          <Utensils className="w-3.5 h-3.5 text-brand-500" />
          <span className="text-stone-800 font-bold">Card {currentIndex + 1} of {totalCards}</span> ({room.city})
        </span>
        <span className="font-mono text-stone-500">{Math.round(((currentIndex) / totalCards) * 100)}% done</span>
      </div>

      <div className="w-full bg-cream-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-brand-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex) / totalCards) * 100}%` }}
        />
      </div>

      {/* Main Restaurant Card */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-cream-300 shadow-card relative transition-all bg-white">
        {/* Photo Container */}
        <div className="relative h-64 w-full bg-cream-200">
          <img 
            src={currentRestaurant.image_url} 
            alt={currentRestaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

          {/* Badges on Photo */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-amber-700 font-black text-xs border border-amber-200 flex items-center gap-1 shadow-sm">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              {currentRestaurant.rating}
            </span>

            {dietary.pure_veg ? (
              <span className="px-2.5 py-1 rounded-xl bg-teal-50/95 backdrop-blur-md border border-teal-200 text-teal-800 font-bold text-xs flex items-center gap-1.5 shadow-sm">
                <Leaf className="w-3 h-3 text-teal-600" /> Pure Veg
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md border border-cream-200 text-stone-700 text-xs shadow-sm font-medium">
                Veg & Non-Veg
              </span>
            )}

            {dietary.jain_available && (
              <span className="px-2.5 py-1 rounded-xl bg-amber-50/95 backdrop-blur-md border border-amber-200 text-amber-800 font-bold text-xs flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3 h-3 text-amber-600" /> Jain
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-md text-stone-800 text-xs font-bold border border-cream-200 shadow-sm">
              ₹{currentRestaurant.cost_per_person_inr}/person
            </span>
          </div>

          {/* Restaurant Headline */}
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="heading-h2 text-white leading-tight drop-shadow-sm">
              {currentRestaurant.name}
            </h2>
            <p className="body-small text-brand-100 font-semibold mt-0.5">
              {currentRestaurant.cuisine} • {currentRestaurant.locality || currentRestaurant.city}
            </p>
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-5 space-y-3 bg-white">
          <p className="body-small text-stone-600 line-clamp-2">
            {currentRestaurant.description}
          </p>

          {/* Pricing & Dietary Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-cream-100 border border-cream-300 text-stone-700 text-[10px] font-bold">
              ₹{currentRestaurant.cost_for_two_inr || 800} for two
            </span>
            {dietary.halal_certified && (
              <span className="px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-bold flex items-center gap-1">
                <Moon className="w-2.5 h-2.5 text-teal-600" /> Halal Certified
              </span>
            )}
            {dietary.gluten_free_options && (
              <span className="px-2.5 py-0.5 rounded-full bg-cream-50 border border-cream-200 text-stone-600 text-[10px]">
                Gluten-Free Options
              </span>
            )}
            {currentRestaurant.place_type && (
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px] border border-brand-200 font-semibold">
                {currentRestaurant.place_type}
              </span>
            )}
          </div>

          {/* Signature Dish Highlights */}
          {currentRestaurant.signature_dishes && currentRestaurant.signature_dishes.length > 0 && (
            <div className="pt-2.5 border-t border-cream-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Menu Highlights:
              </div>
              <div className="space-y-1.5">
                {currentRestaurant.signature_dishes.slice(0, 2).map((dish, i) => (
                  <div key={i} className="text-xs text-stone-800 flex items-center justify-between">
                    <span className="truncate pr-2 font-medium">{dish.name}</span>
                    <span className="text-[11px] text-brand-600 font-bold shrink-0">
                      ₹{dish.price_inr}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Voting Action Buttons matching pastel theme */}
        <div className="p-4 bg-cream-50/80 border-t border-cream-200 flex items-center justify-around gap-3">
          {/* Skip / Pass */}
          <button
            onClick={() => handleVote('skip')}
            className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 hover:text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-soft group"
            title="Pass / Not feeling this (Left Arrow)"
          >
            <X className="w-4 h-4 text-rose-500 group-hover:scale-125 transition-transform" />
            <span>Pass</span>
          </button>

          {/* Details */}
          <button
            onClick={() => onOpenDetails && onOpenDetails(currentRestaurant)}
            className="p-3.5 rounded-2xl bg-white hover:bg-cream-100 border border-cream-300 text-stone-500 hover:text-stone-800 transition-colors shadow-soft"
            title="Inspect Full Menu & Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Like */}
          <button
            onClick={() => handleVote('like')}
            className="flex-1 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-soft transition-all group"
            title="Like / Down to eat here (Right Arrow)"
          >
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
            <span>Like</span>
          </button>
        </div>
      </div>

      <div className="text-center text-[11px] text-stone-500">
        Tip: Press <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-cream-300 text-stone-700 font-mono shadow-sm">←</kbd> to Pass or <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-cream-300 text-stone-700 font-mono shadow-sm">→</kbd> to Like
      </div>
    </div>
  );
}
