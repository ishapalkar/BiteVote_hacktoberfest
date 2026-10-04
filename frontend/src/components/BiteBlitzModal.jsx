import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, Trophy, Clock, Sparkles, Check, X, 
  Flame, Award, ArrowRight, RotateCcw, ShieldCheck, 
  IndianRupee, HelpCircle, ChevronRight, Users, Scale
} from 'lucide-react';
import Avatar from './Avatar';

// Round 1: Guess the Dish (Food trivia with speed bonus)
const DISH_QUESTIONS = [
  {
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    options: ['Pav Bhaji', 'Misal Pav', 'Keema Pav', 'Dal Makhani'],
    correct: 0,
    hint: 'Mashed spiced vegetables cooked on a huge tawa with generous butter and soft pav'
  },
  {
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    options: ['Golden Samosa', 'Kachori', 'Batata Vada', 'Aloo Tikki'],
    correct: 0,
    hint: 'Crispy triangular pastry stuffed with spiced potatoes and peas'
  },
  {
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    options: ['Dum Biryani', 'Jeera Rice', 'Pulao', 'Curd Rice'],
    correct: 0,
    hint: 'Slow-cooked fragrant basmati rice layered with caramelized onions and saffron'
  },
  {
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    options: ['Paneer Tikka', 'Tandoori Chaap', 'Malai Tikka', 'Seekh Kebab'],
    correct: 0,
    hint: 'Marinated cottage cheese roasted over glowing tandoor charcoal with bell peppers'
  }
];

// Round 2: Guess the Price (Authentic Indian restaurant dishes)
const PRICE_QUESTIONS = [
  {
    dish: 'Dal Bukhara at ITC Maurya',
    locality: 'Chanakyapuri, New Delhi',
    realPrice: 1150,
    min: 150,
    max: 2200,
    step: 25,
    desc: 'Simmered for 18 hours over charcoal embers with rich tomato puree and churned butter.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    dish: 'Special Puneri Misal Pav with Extra Tarri at Katkirr',
    locality: 'Karve Road, Pune',
    realPrice: 130,
    min: 40,
    max: 450,
    step: 5,
    desc: 'Sprouted moth beans in fiery spicy tarri rassa served with crunchy farsan and soft pav.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80'
  },
  {
    dish: 'Butter Garlic Jumbo Crab at Trishna',
    locality: 'Kala Ghoda, Mumbai',
    realPrice: 1850,
    min: 300,
    max: 3000,
    step: 50,
    desc: 'World-famous fresh mud crab tossed in silky black pepper and garlic butter.',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80'
  },
  {
    dish: 'Crispy Butter Masala Dosa at CTR (Shri Sagar)',
    locality: 'Malleshwaram, Bengaluru',
    realPrice: 110,
    min: 40,
    max: 350,
    step: 5,
    desc: 'Iconic heritage breakfast spot celebrated for red chutney spread and golden crust.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80'
  }
];

// Round 3: Real or Fake (Spot the one fabricated claim)
const REAL_OR_FAKE_QUESTIONS = [
  {
    topic: 'Street Food Origins',
    claims: [
      { id: 'a', text: 'Hyderabadi Haleem was the first meat delicacy in India granted a formal Geographical Indication (GI) tag.', isFake: false },
      { id: 'b', text: 'The classic Mumbai Vada Pav was invented in 1966 outside Dadar railway station by Ashok Vaidya.', isFake: false },
      { id: 'c', text: 'Samosas were officially declared the state dessert of Maharashtra in 1994 by the state assembly.', isFake: true, explanation: 'Samosas are savory snacks tracing back to Central Asian sanbosag, and are not a dessert!' }
    ]
  },
  {
    topic: 'Culinary Legends',
    claims: [
      { id: 'a', text: 'Gulab Jamun has roots in medieval Persian fritters known as Luqmat al-Qadi, popularized in Mughal courts.', isFake: false },
      { id: 'b', text: 'Dosa batter fermentation is legally banned from exceeding 4 hours under Tamil Nadu municipal codes.', isFake: true, explanation: 'Dosa batter naturally requires 8-12 hours of overnight fermentation; there is no legal limit!' },
      { id: 'c', text: 'Moti Mahal in Delhi famously served its tandoori creations to US President Richard Nixon.', isFake: false }
    ]
  },
  {
    topic: 'Famous Kitchen Inventions',
    claims: [
      { id: 'a', text: 'Butter Chicken was created by Kundan Lal Gujral to prevent leftover tandoori chicken from drying out.', isFake: false },
      { id: 'b', text: 'The word "Chai" is directly derived from the northern Chinese term "chá".', isFake: false },
      { id: 'c', text: 'Chicken Tikka Masala was declared India’s official national dish in the 2002 National Gastronomy Act.', isFake: true, explanation: 'India has no official national dish, and Chicken Tikka Masala was popularized in Glasgow, Scotland!' }
    ]
  }
];

export default function BiteBlitzModal({
  isOpen,
  onClose,
  onApplyTieBreak,
  onSkipTieBreak,
  room,
  currentUser,
  restaurants = [],
  loading = false
}) {
  if (!isOpen) return null;

  // Active round: 1 = Guess Dish, 2 = Guess Price, 3 = Real or Fake, 4 = Podium
  const [currentRound, setCurrentRound] = useState(1);
  const [roundTimeLeft, setRoundTimeLeft] = useState(12);
  const [roundScores, setRoundScores] = useState({});
  const [playerFeedbacks, setPlayerFeedbacks] = useState({});

  // Question state
  const [qIndex1] = useState(() => Math.floor(Math.random() * DISH_QUESTIONS.length));
  const [qIndex2] = useState(() => Math.floor(Math.random() * PRICE_QUESTIONS.length));
  const [qIndex3] = useState(() => Math.floor(Math.random() * REAL_OR_FAKE_QUESTIONS.length));

  const q1 = DISH_QUESTIONS[qIndex1];
  const q2 = PRICE_QUESTIONS[qIndex2];
  const q3 = REAL_OR_FAKE_QUESTIONS[qIndex3];

  // Round 1 Selection
  const [r1Selected, setR1Selected] = useState(null);
  const [r1Answered, setR1Answered] = useState(false);

  // Round 2 Price Slider
  const [guessedPrice, setGuessedPrice] = useState(q2.min + Math.round((q2.max - q2.min) / 2));
  const [r2Submitted, setR2Submitted] = useState(false);

  // Round 3 Fake Claim Selection
  const [r3Selected, setR3Selected] = useState(null);
  const [r3Answered, setR3Answered] = useState(false);

  // Participants list setup
  const participants = room?.participants || [
    { id: currentUser?.id || 'p-1', name: currentUser?.name || 'You', avatar: currentUser?.avatar || 'food-samosa' }
  ];

  // Initialize scores map
  const [totalScores, setTotalScores] = useState(() => {
    const map = {};
    participants.forEach(p => { map[p.id] = 0; });
    return map;
  });

  // Timer countdown per round
  useEffect(() => {
    if (currentRound > 3) return;
    
    setRoundTimeLeft(currentRound === 2 ? 15 : 12);
    const interval = setInterval(() => {
      setRoundTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRound]);

  // Simulated peer reactions
  useEffect(() => {
    if (currentRound > 3) return;

    // Simulate other players answering in 2 to 6 seconds
    const peers = participants.filter(p => p.id !== currentUser?.id);
    const timers = peers.map((peer, idx) => {
      const delay = 2000 + Math.random() * 4000;
      return setTimeout(() => {
        // Points based on simulated performance
        const points = 700 + Math.floor(Math.random() * 450);
        setRoundScores(prev => ({ ...prev, [peer.id]: points }));
        setPlayerFeedbacks(prev => ({ ...prev, [peer.id]: `+${points} pts ⚡` }));
        setTotalScores(prev => ({ ...prev, [peer.id]: (prev[peer.id] || 0) + points }));
      }, delay);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [currentRound]);

  const handleTimeExpire = () => {
    if (currentRound === 1 && !r1Answered) {
      setR1Answered(true);
    } else if (currentRound === 2 && !r2Submitted) {
      handlePriceSubmit();
    } else if (currentRound === 3 && !r3Answered) {
      setR3Answered(true);
    }
  };

  // Round 1 submit
  const handleR1Answer = (optIndex) => {
    if (r1Answered) return;
    setR1Selected(optIndex);
    setR1Answered(true);

    const isCorrect = optIndex === q1.correct;
    const pts = isCorrect ? 900 + Math.max(0, roundTimeLeft * 45) : 100;

    const myId = currentUser?.id || participants[0]?.id;
    setRoundScores(prev => ({ ...prev, [myId]: pts }));
    setPlayerFeedbacks(prev => ({ 
      ...prev, 
      [myId]: isCorrect ? `Correct! +${pts} pts` : `Missed (+${pts} pts)` 
    }));
    setTotalScores(prev => ({ ...prev, [myId]: (prev[myId] || 0) + pts }));
  };

  // Round 2 submit
  const handlePriceSubmit = () => {
    if (r2Submitted) return;
    setR2Submitted(true);

    const diff = Math.abs(guessedPrice - q2.realPrice);
    const pctDiff = diff / q2.realPrice;
    let pts = 250;
    if (pctDiff <= 0.05) pts = 1200;
    else if (pctDiff <= 0.15) pts = 950;
    else if (pctDiff <= 0.30) pts = 700;
    else if (pctDiff <= 0.50) pts = 500;

    const myId = currentUser?.id || participants[0]?.id;
    setRoundScores(prev => ({ ...prev, [myId]: pts }));
    setPlayerFeedbacks(prev => ({ ...prev, [myId]: `+${pts} pts (Off by ₹${diff})` }));
    setTotalScores(prev => ({ ...prev, [myId]: (prev[myId] || 0) + pts }));
  };

  // Round 3 submit
  const handleR3Answer = (claimId) => {
    if (r3Answered) return;
    setR3Selected(claimId);
    setR3Answered(true);

    const chosenClaim = q3.claims.find(c => c.id === claimId);
    const isCorrect = chosenClaim?.isFake === true;
    const pts = isCorrect ? 1000 + Math.max(0, roundTimeLeft * 50) : 150;

    const myId = currentUser?.id || participants[0]?.id;
    setRoundScores(prev => ({ ...prev, [myId]: pts }));
    setPlayerFeedbacks(prev => ({ 
      ...prev, 
      [myId]: isCorrect ? `Fake Spotted! +${pts} pts` : `Real fact! (+${pts} pts)` 
    }));
    setTotalScores(prev => ({ ...prev, [myId]: (prev[myId] || 0) + pts }));
  };

  // Step to next round
  const handleNextStep = () => {
    setPlayerFeedbacks({});
    setRoundScores({});
    if (currentRound < 3) {
      setCurrentRound(prev => prev + 1);
    } else {
      // Game finished, show podium
      setCurrentRound(4);
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }
  };

  // Compute final leaderboard
  const sortedLeaderboard = [...participants].map(p => ({
    ...p,
    score: totalScores[p.id] || 0
  })).sort((a, b) => b.score - a.score);

  const champion = sortedLeaderboard[0] || participants[0];

  // Find champion's favored restaurant from room votes or fallback
  const getChampionPreferredRestaurant = () => {
    const champVotes = room?.votes?.[champion.id] || {};
    // Look for superlike first, then like
    let preferredId = Object.keys(champVotes).find(id => champVotes[id] === 'superlike');
    if (!preferredId) {
      preferredId = Object.keys(champVotes).find(id => champVotes[id] === 'like');
    }
    // Fallback to highest rated compatible restaurant
    if (!preferredId && restaurants.length > 0) {
      preferredId = restaurants[0].id;
    }
    const r = restaurants.find(res => res.id === preferredId) || restaurants[0] || { id: 'mum-1', name: 'Top Pick' };
    return r;
  };

  const champRestaurant = getChampionPreferredRestaurant();

  const handleApplyTieBreak = () => {
    const payload = {
      played: true,
      winner_name: champion.name,
      winner_id: champion.id,
      winner_preferred_restaurant_id: champRestaurant.id,
      winner_preferred_restaurant_name: champRestaurant.name,
      tie_break_boost: 7.5,
      leaderboard: sortedLeaderboard.map(p => ({ name: p.name, score: p.score }))
    };
    onApplyTieBreak(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-cream-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-cream-200 flex items-center justify-between bg-gradient-to-r from-cream-50 via-white to-amber-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-soft">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                  Bite Blitz
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-100 text-stone-700 border border-cream-200">
                  {currentRound <= 3 ? `Round ${currentRound} of 3` : 'Podium'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-stone-900">
                {currentRound === 1 && 'Round 1: Guess the Dish'}
                {currentRound === 2 && 'Round 2: Guess the Price'}
                {currentRound === 3 && 'Round 3: Real or Fake'}
                {currentRound === 4 && 'Bite Blitz Champion Crowned!'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentRound <= 3 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-50 border border-cream-200 text-xs font-mono font-bold text-amber-800">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{roundTimeLeft}s</span>
              </div>
            )}
            <button
              onClick={onClose}
              disabled={loading}
              className="p-2 rounded-xl bg-cream-50 hover:bg-cream-100 border border-cream-200 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-cream-100 h-1.5 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-brand-500 transition-all duration-300"
            style={{ width: `${(currentRound / 4) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">

          {/* ROUND 1: Guess the Dish */}
          {currentRound === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Speed Trivia
                </span>
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Identify this mouthwatering Indian specialty:
                </h4>
                <p className="text-xs text-stone-500 italic">
                  Hint: “{q1.hint}”
                </p>
              </div>

              {/* Food Image */}
              <div className="relative aspect-video max-h-56 w-full rounded-2xl overflow-hidden border border-cream-200 shadow-soft mx-auto bg-cream-100">
                <img 
                  src={q1.image} 
                  alt="Guess the dish" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {q1.options.map((opt, idx) => {
                  let btnStyle = "border-cream-200 bg-cream-50/60 hover:bg-white hover:border-brand-300 text-stone-800";
                  if (r1Answered) {
                    if (idx === q1.correct) {
                      btnStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300";
                    } else if (idx === r1Selected) {
                      btnStyle = "border-rose-300 bg-rose-50 text-rose-800";
                    } else {
                      btnStyle = "border-cream-200 opacity-40 text-stone-400";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleR1Answer(idx)}
                      disabled={r1Answered}
                      className={`p-3.5 rounded-xl border font-bold text-xs sm:text-sm text-left transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {r1Answered && idx === q1.correct && (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {r1Answered && idx === r1Selected && idx !== q1.correct && (
                        <X className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ROUND 2: Guess the Price */}
          {currentRound === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                  Menu Price Estimation
                </span>
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  How much does this real dish cost?
                </h4>
                <div className="text-xs text-brand-600 font-bold">
                  {q2.dish} • {q2.locality}
                </div>
              </div>

              <div className="bg-cream-50/60 rounded-2xl p-4 border border-cream-200 flex gap-4 items-center">
                <img 
                  src={q2.image} 
                  alt={q2.dish} 
                  className="w-20 h-20 rounded-xl object-cover border border-cream-200 shrink-0" 
                />
                <p className="text-xs text-stone-600 leading-relaxed">
                  {q2.desc}
                </p>
              </div>

              {/* Price Slider */}
              <div className="bg-white rounded-2xl p-5 border border-cream-200 space-y-4 text-center shadow-soft">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Your Price Guess</span>
                  <div className="text-3xl font-black text-amber-600 font-mono">
                    ₹{guessedPrice}
                  </div>
                </div>

                <input
                  type="range"
                  min={q2.min}
                  max={q2.max}
                  step={q2.step}
                  value={guessedPrice}
                  disabled={r2Submitted}
                  onChange={(e) => setGuessedPrice(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />

                <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                  <span>₹{q2.min}</span>
                  <span>₹{q2.max}</span>
                </div>

                {!r2Submitted ? (
                  <button
                    onClick={handlePriceSubmit}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white font-black text-xs shadow-soft transition-all"
                  >
                    Lock In Price Guess
                  </button>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium space-y-1">
                    <div>
                      Verified Restaurant Price: <span className="font-bold text-stone-900 font-mono">₹{q2.realPrice}</span>
                    </div>
                    <div className="text-[11px] text-stone-600">
                      Your guess was off by <span className="font-bold text-amber-800">₹{Math.abs(guessedPrice - q2.realPrice)}</span>. Points awarded!
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ROUND 3: Real or Fake */}
          {currentRound === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider">
                  Spot the Fake Fact
                </span>
                <h4 className="text-base sm:text-lg font-bold text-stone-900">
                  Two of these claims are real culinary facts. One is completely fake!
                </h4>
                <p className="text-xs text-stone-500">
                  Topic: {q3.topic} — tap the one that is fabricated:
                </p>
              </div>

              <div className="space-y-2.5">
                {q3.claims.map((claim) => {
                  let cardStyle = "border-cream-200 bg-cream-50/60 hover:bg-white hover:border-brand-300 text-stone-800";
                  if (r3Answered) {
                    if (claim.isFake) {
                      cardStyle = "border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-300";
                    } else if (claim.id === r3Selected) {
                      cardStyle = "border-rose-300 bg-rose-50 text-rose-800";
                    } else {
                      cardStyle = "border-cream-200 opacity-50 text-stone-400";
                    }
                  }

                  return (
                    <div
                      key={claim.id}
                      onClick={() => handleR3Answer(claim.id)}
                      className={`p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 shadow-xs ${cardStyle}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 text-stone-600">
                        {claim.id.toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p>{claim.text}</p>
                        {r3Answered && claim.isFake && (
                          <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                            {claim.explanation}
                          </p>
                        )}
                      </div>
                      {r3Answered && claim.isFake && (
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ROUND 4: Podium & Champion */}
          {currentRound === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Bite Blitz Champion
                </div>
                <h3 className="text-2xl font-black text-stone-900">
                  {champion.name} Reigns Supreme!
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Earned {champion.score} points across 3 rapid rounds of food trivia.
                </p>
              </div>

              {/* Champion Card */}
              <div className="bg-gradient-to-r from-cream-50 via-white to-amber-50/50 rounded-2xl p-5 border border-amber-200 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar avatarId={champion.avatar} size="xl" alt={champion.name} />
                  <div>
                    <div className="text-xs uppercase font-extrabold text-amber-700 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> 1st Place Winner
                    </div>
                    <div className="text-xl font-black text-stone-900">{champion.name}</div>
                    <div className="text-xs text-stone-600">
                      Favored Spot: <span className="font-bold text-brand-600">{champRestaurant.name}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Total Score</span>
                  <div className="text-2xl font-black text-amber-600 font-mono">
                    {champion.score} pts
                  </div>
                </div>
              </div>

              {/* Full Leaderboard */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                  <span className="font-bold uppercase tracking-wider text-[10px]">Leaderboard</span>
                  <span>{sortedLeaderboard.length} Squad Members</span>
                </div>
                <div className="bg-white rounded-xl overflow-hidden border border-cream-200 divide-y divide-cream-100 shadow-soft">
                  {sortedLeaderboard.map((player, rankIdx) => (
                    <div key={player.id} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-stone-400 w-4">#{rankIdx + 1}</span>
                        <Avatar avatarId={player.avatar} size="xs" alt={player.name} />
                        <span className="font-bold text-stone-900">{player.name}</span>
                        {player.id === currentUser?.id && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cream-100 text-stone-600">You</span>
                        )}
                      </div>
                      <span className="font-mono font-bold text-teal-700">{player.score} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tie-Breaker Decision Impact Explanation */}
              <div className="bg-teal-50/60 rounded-xl p-4 border border-teal-200/80 space-y-2">
                <div className="flex items-center gap-2 text-teal-800 text-xs font-bold">
                  <Scale className="w-4 h-4 text-teal-600" />
                  <span>How this influences the decision:</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  As Champion, {champion.name}'s preferred restaurant (<span className="font-bold text-stone-900">{champRestaurant.name}</span>) receives a <span className="font-bold text-teal-700">small tie-breaker boost (+7.5 pts)</span> for Gemma's arbitration.
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-teal-200 text-[11px] text-teal-900 font-medium">
                  “Bite Blitz can break a tie, but it can never override someone's dietary boundaries.”
                </div>
              </div>
            </div>
          )}

          {/* Live Squad Reactions Strip (Rounds 1-3) */}
          {currentRound <= 3 && (
            <div className="pt-2 border-t border-cream-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Squad Activity
              </span>
              <div className="flex flex-wrap gap-2">
                {participants.map(p => {
                  const fb = playerFeedbacks[p.id];
                  const hasAnswered = !!roundScores[p.id];
                  return (
                    <div 
                      key={p.id} 
                      className={`flex items-center gap-2 px-2.5 py-1 rounded-xl border text-xs transition-all ${
                        hasAnswered 
                          ? 'bg-amber-50 border-amber-200 text-amber-800' 
                          : 'bg-cream-50 border-cream-200 text-stone-500'
                      }`}
                    >
                      <Avatar avatarId={p.avatar} size="xs" alt={p.name} />
                      <span className="font-semibold">{p.name}</span>
                      {fb ? (
                        <span className="text-[10px] font-mono font-bold text-teal-700">{fb}</span>
                      ) : (
                        <span className="text-[10px] text-stone-400 italic">Thinking...</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-cream-200 bg-cream-50/60 flex items-center justify-between gap-3">
          {currentRound <= 3 ? (
            <>
              <button
                onClick={onSkipTieBreak}
                disabled={loading}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-200 text-stone-700 font-semibold text-xs transition-colors shadow-xs"
              >
                Skip Game
              </button>

              <button
                onClick={handleNextStep}
                disabled={
                  (currentRound === 1 && !r1Answered) ||
                  (currentRound === 2 && !r2Submitted) ||
                  (currentRound === 3 && !r3Answered)
                }
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-soft transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <span>{currentRound === 3 ? 'View Champion Podium' : 'Next Round'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={onSkipTieBreak}
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-cream-100 border border-cream-200 text-stone-700 font-semibold text-xs transition-colors shadow-xs"
              >
                Decide Normally (Ignore Tie-Breaker)
              </button>

              <button
                onClick={handleApplyTieBreak}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 text-white font-black text-xs shadow-soft transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'Gemma is Arbitrating...' : 'Apply Tie-Break & Summon Gemma AI'}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
