import React from 'react';
import { X, MapPin, Star, Utensils, ShieldCheck, IndianRupee, Leaf } from 'lucide-react';

export default function RestaurantModal({ restaurant, onClose }) {
  if (!restaurant) return null;

  const dietary = restaurant.dietary || {};
  const activeDiet = Object.entries(dietary).filter(([_, v]) => v).map(([k]) => {
    if (k === 'pure_veg') return 'Pure Vegetarian Kitchen';
    if (k === 'jain_available') return 'Jain Food Available';
    if (k === 'halal_certified') return 'Halal Certified';
    return k.replace('_', ' ');
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative h-48 w-full bg-slate-900">
          <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              {dietary.pure_veg && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Pure Veg" />
              )}
              <span>{restaurant.name}</span>
            </h2>
            <div className="text-xs text-brand-300 font-semibold">{restaurant.cuisine} • {restaurant.locality || restaurant.city}</div>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300">
              ₹{restaurant.cost_per_person_inr}/person (₹{restaurant.cost_for_two_inr} for two)
            </span>
            <span className="text-slate-400">
              {restaurant.rating}★ ({restaurant.review_count}+ reviews)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {restaurant.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{restaurant.address} • {restaurant.city}</span>
          </div>

          {/* Dietary Compliance */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Dietary Standards:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeDiet.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Signature dishes with INR prices */}
          {restaurant.signature_dishes && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" /> Verified Menu Items:
              </div>
              <div className="space-y-2">
                {restaurant.signature_dishes.map((dish, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-200">{dish.name}</div>
                      <div className="text-[10px] text-slate-400">{dish.dietary.join(', ')}</div>
                    </div>
                    <span className="text-xs text-amber-300 font-bold shrink-0 ml-2">₹{dish.price_inr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {restaurant.tags && (
            <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
              {restaurant.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
