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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-cream-200 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="relative h-48 w-full bg-cream-100">
          <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-700 border border-cream-200 shadow-soft transition-colors"
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
            <div className="text-xs text-amber-200 font-semibold">{restaurant.cuisine} • {restaurant.locality || restaurant.city}</div>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto bg-white">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-teal-700">
              ₹{restaurant.cost_per_person_inr}/person (₹{restaurant.cost_for_two_inr} for two)
            </span>
            <span className="text-stone-500">
              {restaurant.rating}★ ({restaurant.review_count}+ reviews)
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            {restaurant.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
            <span>{restaurant.address} • {restaurant.city}</span>
          </div>

          {/* Dietary Compliance */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800 mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Dietary Standards:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeDiet.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-semibold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Signature dishes with INR prices */}
          {restaurant.signature_dishes && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600 mb-1.5 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" /> Verified Menu Items:
              </div>
              <div className="space-y-2">
                {restaurant.signature_dishes.map((dish, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-cream-50/70 border border-cream-200 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-stone-900">{dish.name}</div>
                      <div className="text-[10px] text-stone-500">{dish.dietary.join(', ')}</div>
                    </div>
                    <span className="text-xs text-brand-600 font-bold shrink-0 ml-2 font-mono">₹{dish.price_inr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {restaurant.tags && (
            <div className="flex flex-wrap gap-1 pt-2 border-t border-cream-200">
              {restaurant.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded bg-cream-100 text-stone-600 border border-cream-200 text-[10px]">
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
