import React, { useState, useEffect } from 'react';
import { 
  Swords, Pizza, UtensilsCrossed, Flame, Sparkles, 
  Coins, Crown, Coffee, Store, ArrowRight, Check, X,
  RotateCcw, ShieldCheck, HeartHandshake
} from 'lucide-react';
import Avatar from './Avatar';

const CLASH_ROUNDS = [
  {
    id: 'comfort',
    title: 'The Comfort Duel',
    question: 'Craving comfort carbs tonight?',
    optionA: {
      key: 'pizza',
      name: 'Pizza & Italian',
      desc: 'Crispy woodfired crust, melted mozzarella & basil herbs',
      icon: Pizza,
      color: 'from-amber-500/20 to-rose-600/30',
      border: 'border-amber-500/50',
      activeRing: 'ring-amber-500',
      accent: 'text-amber-400'
    },
    optionB: {
      key: 'noodles',
      name: 'Noodles & Asian',
      desc: 'Fiery wok-tossed hakka noodles, dim sums & schezwan',
      icon: UtensilsCrossed,
      color: 'from-emerald-500/20 to-teal-600/30',
      border: 'border-emerald-500/50',
      activeRing: 'ring-emerald-500',
      accent: 'text-emerald-400'
    }
  },
  {
    id: 'flavor',
    title: 'The Spice Intensity',
    question: 'How bold should the spice be?',
    optionA: {
      key: 'spicy',
      name: 'Spicy & Fiery',
      desc: 'Bold Indian chillies, chaat masala punch & tandoor heat',
      icon: Flame,
      color: 'from-red-500/20 to-orange-600/30',
      border: 'border-red-500/50',
      activeRing: 'ring-red-500',
      accent: 'text-red-400'
    },
    optionB: {
      key: 'mild',
      name: 'Mild & Subtle',
      desc: 'Comforting creamy curries, buttery pav & delicate aromatics',
      icon: Sparkles,
      color: 'from-sky-500/20 to-indigo-600/30',
      border: 'border-sky-500/50',
      activeRing: 'ring-sky-500',
      accent: 'text-sky-400'
    }
  },
  {
    id: 'wallet',
    title: 'The Dining Budget',
    question: 'What is the spending mood?',
    optionA: {
      key: 'budget',
      name: 'Smart Budget',
      desc: 'Value-for-money street feast, pocket friendly under ₹400',
      icon: Coins,
      color: 'from-emerald-500/20 to-green-600/30',
      border: 'border-emerald-500/50',
      activeRing: 'ring-emerald-500',
      accent: 'text-emerald-400'
    },
    optionB: {
      key: 'premium',
      name: 'Premium Indulgence',
      desc: 'Gourmet plating, upscale ambiance & chef specials ₹600+',
      icon: Crown,
      color: 'from-purple-500/20 to-violet-600/30',
      border: 'border-purple-500/50',
      activeRing: 'ring-purple-500',
      accent: 'text-purple-400'
    }
  },
  {
    id: 'vibe',
    title: 'The Atmosphere Check',
    question: 'Where should the squad sit?',
    optionA: {
      key: 'cafe',
      name: 'Casual Café',
      desc: 'Cozy conversation, artisanal beverages & quick artisanal bites',
      icon: Coffee,
      color: 'from-amber-500/20 to-yellow-600/30',
      border: 'border-amber-500/50',
      activeRing: 'ring-amber-500',
      accent: 'text-amber-400'
    },
    optionB: {
      key: 'restaurant',
      name: 'Sit-Down Feast',
      desc: 'Full-table spread, traditional thali & curries, lively group dining',
      icon: Store,
      color: 'from-rose-500/20 to-orange-600/30',
      border: 'border-rose-500/50',
      activeRing: 'ring-rose-500',
      accent: 'text-rose-400'
    }
  }
];

export default function CraveClashModal({ 
  isOpen, 
  onClose, 
  onApplySignals, 
  room, 
  currentUser,
  loading 
}) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [userChoices, setUserChoices] = useState({});
  const [friendVotes, setFriendVotes] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const participants = room?.participants || [];
  const currentRound = CLASH_ROUNDS[currentRoundIdx];

  // Initialize simulated multiplayer friend votes per round based on their dietary & profile characteristics
  useEffect(() => {
    if (!room) return;
    const initialVotes = {};

    participants.forEach((p, idx) => {
      const diet = p.preferences?.dietary || {};
      const cravings = (p.preferences?.cravings || []).join(' ').toLowerCase();

      // Round 0: comfort
      let comfortPick = cravings.includes('chinese') || cravings.includes('asian') || cravings.includes('noodle')
        ? 'noodles'
        : (idx % 2 === 0 ? 'pizza' : 'noodles');

      // Round 1: flavor
      let flavorPick = diet.jain ? 'mild' : (cravings.includes('spicy') || cravings.includes('street') || idx % 2 === 1 ? 'spicy' : 'mild');

      // Round 2: wallet
      let budgetPick = (p.preferences?.budget_max || 600) <= 500 ? 'budget' : 'premium';

      // Round 3: vibe
      let vibePick = (p.preferences?.vibe || '').toLowerCase().includes('cafe') ? 'cafe' : 'restaurant';

      initialVotes[p.id] = {
        comfort: comfortPick,
        flavor: flavorPick,
        wallet: budgetPick,
        vibe: vibePick
      };
    });

    setFriendVotes(initialVotes);
  }, [room]);

  if (!isOpen) return null;

  const handleSelectOption = (key) => {
    const roundId = currentRound.id;
    const updatedChoices = { ...userChoices, [roundId]: key };
    setUserChoices(updatedChoices);

    // If current user is one of the participants, update their live pick
    if (currentUser?.id) {
      setFriendVotes((prev) => ({
        ...prev,
        [currentUser.id]: {
          ...(prev[currentUser.id] || {}),
          [roundId]: key
        }
      }));
    }

    // Auto-advance after brief reaction window
    setTimeout(() => {
      if (currentRoundIdx < CLASH_ROUNDS.length - 1) {
        setCurrentRoundIdx((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 600);
  };

  // Calculate vote tally for current round
  const getRoundTallies = (roundId, optAKey, optBKey) => {
    let countA = 0;
    let countB = 0;
    const votersA = [];
    const votersB = [];

    participants.forEach((p) => {
      const pPick = (p.id === currentUser?.id && userChoices[roundId])
        ? userChoices[roundId]
        : friendVotes[p.id]?.[roundId];

      if (pPick === optAKey) {
        countA += 1;
        votersA.push(p);
      } else if (pPick === optBKey) {
        countB += 1;
        votersB.push(p);
      }
    });

    const total = countA + countB || 1;
    const pctA = Math.round((countA / total) * 100);
    const pctB = 100 - pctA;

    return { countA, countB, pctA, pctB, votersA, votersB };
  };

  const handleFinalSubmit = () => {
    // Compile final group signals based on majority consensus
    const finalSignals = {};
    CLASH_ROUNDS.forEach((round) => {
      const tally = getRoundTallies(round.id, round.optionA.key, round.optionB.key);
      finalSignals[round.id] = tally.countA >= tally.countB ? round.optionA.key : round.optionB.key;
    });

    onApplySignals(finalSignals);
  };

  const handleRestart = () => {
    setUserChoices({});
    setCurrentRoundIdx(0);
    setIsFinished(false);
  };

  const currentTallies = currentRound ? getRoundTallies(currentRound.id, currentRound.optionA.key, currentRound.optionB.key) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Crave Clash</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Optional Tie-Breaker
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Quick 20s preference duel for the squad</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            title="Skip to Results"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Dots */}
        {!isFinished && (
          <div className="px-5 pt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 flex-1 mr-4">
              {CLASH_ROUNDS.map((r, i) => (
                <div 
                  key={r.id} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentRoundIdx 
                      ? 'flex-2 bg-gradient-to-r from-amber-500 to-orange-500' 
                      : i < currentRoundIdx 
                      ? 'flex-1 bg-emerald-500' 
                      : 'flex-1 bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono font-semibold text-slate-400">
              Round {currentRoundIdx + 1} of {CLASH_ROUNDS.length}
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {!isFinished ? (
            <div className="space-y-4">
              {/* Question Banner */}
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  {currentRound.title}
                </span>
                <h2 className="text-lg font-black text-white">
                  {currentRound.question}
                </h2>
              </div>

              {/* The Two Duel Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {/* Option A */}
                {(() => {
                  const opt = currentRound.optionA;
                  const Icon = opt.icon;
                  const isSelected = userChoices[currentRound.id] === opt.key;
                  return (
                    <button
                      type="button"
                      onClick={() => handleSelectOption(opt.key)}
                      className={`relative text-left p-4 rounded-xl border bg-gradient-to-tr ${opt.color} transition-all duration-200 group hover:scale-[1.02] flex flex-col justify-between ${
                        isSelected 
                          ? `${opt.border} ring-2 ${opt.activeRing} shadow-lg` 
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center ${opt.accent}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="text-sm font-extrabold text-white group-hover:text-amber-200 transition-colors">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug mt-1">
                            {opt.desc}
                          </div>
                        </div>
                      </div>

                      {/* Participant Avatars Reacting on Option A */}
                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <div className="flex items-center -space-x-1.5 overflow-hidden">
                          {currentTallies.votersA.map((p) => (
                            <div 
                              key={p.id} 
                              className="transition-transform duration-300 hover:scale-125 hover:z-10 animate-scaleIn"
                              title={`${p.name} leans ${opt.name}`}
                            >
                              <Avatar avatarId={p.avatar} size="xs" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {currentTallies.pctA}%
                        </span>
                      </div>
                    </button>
                  );
                })()}

                {/* Option B */}
                {(() => {
                  const opt = currentRound.optionB;
                  const Icon = opt.icon;
                  const isSelected = userChoices[currentRound.id] === opt.key;
                  return (
                    <button
                      type="button"
                      onClick={() => handleSelectOption(opt.key)}
                      className={`relative text-left p-4 rounded-xl border bg-gradient-to-tr ${opt.color} transition-all duration-200 group hover:scale-[1.02] flex flex-col justify-between ${
                        isSelected 
                          ? `${opt.border} ring-2 ${opt.activeRing} shadow-lg` 
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center ${opt.accent}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="text-sm font-extrabold text-white group-hover:text-amber-200 transition-colors">
                            {opt.name}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-snug mt-1">
                            {opt.desc}
                          </div>
                        </div>
                      </div>

                      {/* Participant Avatars Reacting on Option B */}
                      <div className="pt-3 mt-3 border-t border-slate-800/60 flex items-center justify-between">
                        <div className="flex items-center -space-x-1.5 overflow-hidden">
                          {currentTallies.votersB.map((p) => (
                            <div 
                              key={p.id} 
                              className="transition-transform duration-300 hover:scale-125 hover:z-10 animate-scaleIn"
                              title={`${p.name} leans ${opt.name}`}
                            >
                              <Avatar avatarId={p.avatar} size="xs" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {currentTallies.pctB}%
                        </span>
                      </div>
                    </button>
                  );
                })()}
              </div>

              {/* Consensus Meter */}
              <div className="pt-1">
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div 
                    className="bg-amber-500 transition-all duration-500" 
                    style={{ width: `${currentTallies.pctA}%` }} 
                  />
                  <div 
                    className="bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${currentTallies.pctB}%` }} 
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
                  <span>{currentRound.optionA.name} ({currentTallies.countA})</span>
                  <span>{currentRound.optionB.name} ({currentTallies.countB})</span>
                </div>
              </div>
            </div>
          ) : (
            /* Finished Summary Screen */
            <div className="space-y-4 py-2 text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/30 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <HeartHandshake className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Crave Clash Signals Locked!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mt-1">
                  The squad resolved their micro-cravings. Gemma will incorporate these soft preferences to break ties!
                </p>
              </div>

              {/* Consensus Highlights */}
              <div className="grid grid-cols-2 gap-2 text-left pt-1">
                {CLASH_ROUNDS.map((r) => {
                  const tally = getRoundTallies(r.id, r.optionA.key, r.optionB.key);
                  const isA = tally.countA >= tally.countB;
                  const winnerOpt = isA ? r.optionA : r.optionB;
                  const WinnerIcon = winnerOpt.icon;
                  const pct = isA ? tally.pctA : tally.pctB;

                  return (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{r.title}</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">{pct}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <WinnerIcon className={`w-4 h-4 ${winnerOpt.accent}`} />
                        <span className="text-xs font-bold text-white truncate">{winnerOpt.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Constraint Assurance Notice */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Strict Safety Guarantee:</strong> Game signals act as soft tie-breakers only. Hard dietary constraints (Jain, Pure Veg, Halal) remain strictly non-negotiable.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          {!isFinished ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors font-semibold"
              >
                Skip Game → See Results
              </button>

              <div className="flex items-center gap-2">
                {currentRoundIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentRoundIdx((prev) => prev - 1)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold transition-all"
                  >
                    Back
                  </button>
                )}
                {userChoices[currentRound.id] && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentRoundIdx < CLASH_ROUNDS.length - 1) {
                        setCurrentRoundIdx((prev) => prev + 1);
                      } else {
                        setIsFinished(true);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleRestart}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-xs shadow-ai-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{loading ? 'Arbitrating with Crave Signals...' : 'Apply Signals & Summon Gemma AI'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
