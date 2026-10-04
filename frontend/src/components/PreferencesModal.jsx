import React, { useState } from 'react';
import { 
  Sliders, Check, IndianRupee, ShieldCheck, Leaf, 
  Moon, CircleSlash, WheatOff, Sparkles, AlertCircle, Shield 
} from 'lucide-react';

const CRAVING_OPTIONS = [
  'Maharashtrian', 'North Indian', 'Indo-Chinese', 'South Indian / Dosa', 
  'Biryani & Kebabs', 'Street Food / Chaat', 'Gujarati Thali', 'Punjabi Tandoor', 
  'Mughlai', 'Momos', 'Pizza & Pasta', 'Continental & Bakery', 'Japanese / Asian', 'Chai & Snacks'
];

const DISLIKE_OPTIONS = [
  'Very Spicy', 'Heavy Oil / Greasy', 'Raw Fish', 'Pork', 'Cilantro', 'Bitter Gourd (Karela)'
];

const VIBE_OPTIONS = [
  'Family Dining & Casual', 'Street Food / Chaat Hub', 'Heritage / Irani Cafe', 
  'Rooftop & Scenic Views', 'Trendy Pan-Asian / Bistro', 'Late Night Chai & Bites'
];

const DIETARY_FIELDS = [
  { key: 'pure_veg', label: 'Pure Vegetarian Kitchen', icon: Leaf },
  { key: 'jain', label: 'Strict Jain Preparations', icon: ShieldCheck },
  { key: 'vegetarian', label: 'Vegetarian Friendly', icon: Check },
  { key: 'vegan', label: 'Vegan / Plant-Based', icon: Sparkles },
  { key: 'eggless', label: 'Eggless Bakes & Desserts', icon: CircleSlash },
  { key: 'halal', label: 'Halal Certified', icon: Moon },
  { key: 'gluten_free', label: 'Gluten-Free Options', icon: WheatOff },
  { key: 'lactose_free', label: 'Dairy-Free / Lactose-Free', icon: Shield },
  { key: 'nut_free', label: 'Nut Allergy Safe', icon: AlertCircle },
];

export default function PreferencesModal({ isOpen, onClose, currentPreferences, onSave, participantName }) {
  const [dietary, setDietary] = useState(
    currentPreferences?.dietary || {
      pure_veg: false,
      jain: false,
      vegetarian: false,
      vegan: false,
      eggless: false,
      halal: false,
      gluten_free: false,
      lactose_free: false,
      nut_free: false,
    }
  );

  const [cravings, setCravings] = useState(currentPreferences?.cravings || ['Maharashtrian']);
  const [dislikes, setDislikes] = useState(currentPreferences?.dislikes || []);
  const [budgetTier, setBudgetTier] = useState(currentPreferences?.budget_tier || '₹₹');
  const [budgetMin, setBudgetMin] = useState(currentPreferences?.budget_min || 300);
  const [budgetMax, setBudgetMax] = useState(currentPreferences?.budget_max || 600);
  const [vibe, setVibe] = useState(currentPreferences?.vibe || 'Family Dining & Casual');

  if (!isOpen) return null;

  const toggleDietary = (key) => {
    setDietary((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleCraving = (item) => {
    setCravings((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const toggleDislike = (item) => {
    setDislikes((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleBudgetTierChange = (tier) => {
    setBudgetTier(tier);
    if (tier === '₹') {
      setBudgetMin(100);
      setBudgetMax(250);
    } else if (tier === '₹₹') {
      setBudgetMin(250);
      setBudgetMax(600);
    } else if (tier === '₹₹₹') {
      setBudgetMin(600);
      setBudgetMax(1200);
    } else {
      setBudgetMin(1200);
      setBudgetMax(2500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      dietary,
      cravings,
      dislikes,
      budget_tier: budgetTier,
      budget_min: parseInt(budgetMin),
      budget_max: parseInt(budgetMax),
      vibe,
      max_distance: 5.0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/40 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-cream-300 shadow-2xl overflow-hidden my-6 bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-cream-200 bg-cream-50/70 flex items-center justify-between">
          <div>
            <h2 className="heading-h3 flex items-center gap-2 text-stone-900">
              <Sliders className="w-4 h-4 text-brand-500" />
              <span>{participantName ? `${participantName}'s Food Profile` : 'Your Food Preferences'}</span>
            </h2>
            <p className="body-small text-stone-500">Hard dietary constraints are strictly filtered in Python before AI scoring.</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Dietary Restrictions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-teal-700 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Dietary Requirements</span>
              <span className="text-[10px] text-stone-400 font-normal lowercase">(enforced deterministically)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {DIETARY_FIELDS.map((d) => {
                const active = dietary[d.key];
                const IconComponent = d.icon;
                return (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => toggleDietary(d.key)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      active
                        ? 'bg-teal-50 border-teal-500 text-teal-800 shadow-sm'
                        : 'bg-cream-50/60 border-cream-200 text-stone-700 hover:border-cream-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <IconComponent className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                      <span className="truncate">{d.label}</span>
                    </span>
                    {active && <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cravings */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              Cuisines & Specialties
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CRAVING_OPTIONS.map((c) => {
                const selected = cravings.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleCraving(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selected
                        ? 'bg-brand-500 text-white font-bold shadow-soft scale-105'
                        : 'bg-cream-50 text-stone-700 hover:bg-cream-100 border border-cream-300'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget in INR (₹) */}
          <div className="p-4 rounded-2xl bg-cream-50/80 border border-cream-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-brand-500" /> Budget Per Person
              </label>
              <span className="text-xs font-mono font-bold text-brand-600">
                ₹{budgetMin} – ₹{budgetMax}
              </span>
            </div>

            {/* Quick Budget Tiers */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { tier: '₹', label: '< ₹250', desc: 'Chai / Street' },
                { tier: '₹₹', label: '₹250–₹600', desc: 'Casual / Cafe' },
                { tier: '₹₹₹', label: '₹600–₹1200', desc: 'Premium Casual' },
                { tier: '₹₹₹₹', label: '₹1200+', desc: 'Fine Dining' }
              ].map((b) => (
                <button
                  key={b.tier}
                  type="button"
                  onClick={() => handleBudgetTierChange(b.tier)}
                  className={`p-2 rounded-xl text-center transition-all ${
                    budgetTier === b.tier
                      ? 'bg-brand-500 text-white font-black shadow-soft scale-105'
                      : 'bg-white text-stone-700 hover:bg-cream-100 border border-cream-300'
                  }`}
                >
                  <div className="text-xs font-bold">{b.tier}</div>
                  <div className="text-[10px] opacity-80 truncate">{b.label}</div>
                </button>
              ))}
            </div>

            {/* Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={budgetMax}
                onChange={(e) => setBudgetMax(parseInt(e.target.value))}
                className="w-full accent-brand-500"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>Budget ceiling: ₹{budgetMax} per person</span>
                <span>(Group Average Target)</span>
              </div>
            </div>
          </div>

          {/* Desired Vibe */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Ambience & Vibe
            </label>
            <select
              value={vibe}
              onChange={(e) => setVibe(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50/60 border border-cream-300 text-stone-800 text-xs focus:outline-none focus:border-brand-500"
            >
              {VIBE_OPTIONS.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Dealbreakers / Dislikes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
              Dislikes / Exclusions
            </label>
            <div className="flex flex-wrap gap-1.5">
              {DISLIKE_OPTIONS.map((d) => {
                const selected = dislikes.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDislike(d)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selected
                        ? 'bg-rose-50 border border-rose-300 text-rose-700 font-bold'
                        : 'bg-cream-50 text-stone-600 hover:bg-cream-100 border border-cream-200'
                    }`}
                  >
                    ✕ {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-cream-200">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-stone-500 hover:text-stone-800 text-xs font-semibold"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-soft transition-all"
            >
              Lock In Profile & Save →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
