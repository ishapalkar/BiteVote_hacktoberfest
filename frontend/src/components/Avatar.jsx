import React from 'react';
import { getAvatar } from '../avatars';

function FoodIcon({ foodId }) {
  switch (foodId) {
    case 'food-samosa':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="samosaGrad" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="0.6" stopColor="#D97706" />
              <stop offset="1" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Samosa body */}
          <path d="M24 7L40 37C37 39 11 39 8 37L24 7Z" fill="url(#samosaGrad)" stroke="#78350F" strokeWidth="1.8" strokeLinejoin="round" />
          {/* Crimp crease at bottom */}
          <path d="M10 37C14 34 20 38 24 35C28 38 34 34 38 37" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          {/* Spice blisters */}
          <circle cx="21" cy="20" r="1.2" fill="#78350F" />
          <circle cx="26" cy="26" r="1.4" fill="#78350F" />
          <circle cx="17" cy="29" r="1" fill="#78350F" />
          <circle cx="30" cy="18" r="1" fill="#78350F" />
          {/* Mint chutney drop */}
          <circle cx="36" cy="12" r="3" fill="#10B981" />
          <circle cx="35" cy="11" r="1" fill="#D1FAE5" />
        </svg>
      );

    case 'food-dosa':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="dosaGrad" x1="8" y1="12" x2="40" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.5" stopColor="#D97706" />
              <stop offset="1" stopColor="#92400E" />
            </linearGradient>
          </defs>
          {/* Dosa roll */}
          <rect x="7" y="14" width="34" height="15" rx="7.5" fill="url(#dosaGrad)" stroke="#78350F" strokeWidth="1.8" />
          {/* Crisp roasted stripes */}
          <path d="M14 16C17 20 17 24 15 27" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 15C25 19 25 25 23 28" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 15C33 19 33 25 31 28" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" />
          {/* Coconut chutney bowl */}
          <circle cx="16" cy="35" r="5" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="16" cy="35" r="1.5" fill="#15803D" />
          {/* Tomato chutney bowl */}
          <circle cx="32" cy="35" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
          <circle cx="31" cy="34" r="1.2" fill="#FCA5A5" />
        </svg>
      );

    case 'food-biryani':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="potGrad" x1="12" y1="24" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B45309" />
              <stop offset="1" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="riceGrad" x1="12" y1="14" x2="36" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FEF08A" />
              <stop offset="0.5" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Clay Handi Pot */}
          <path d="M9 25C9 35 15 41 24 41C33 41 39 35 39 25H9Z" fill="url(#potGrad)" stroke="#451A03" strokeWidth="1.6" />
          <ellipse cx="24" cy="24" rx="15" ry="4" fill="#92400E" stroke="#451A03" strokeWidth="1.4" />
          {/* Rice mound */}
          <path d="M11 23C12 14 36 14 37 23C34 20 14 20 11 23Z" fill="url(#riceGrad)" />
          {/* Spices */}
          <circle cx="19" cy="18" r="1.2" fill="#78350F" />
          <circle cx="28" cy="19" r="1.4" fill="#DC2626" />
          <path d="M23 15L25 18L22 17Z" fill="#15803D" />
          {/* Steam wisps */}
          <path d="M19 11C18 9 20 7 19 5" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
          <path d="M27 10C26 8 28 6 27 4" stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
        </svg>
      );

    case 'food-chai':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="teaGrad" x1="14" y1="18" x2="34" y2="38" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.6" stopColor="#D97706" />
              <stop offset="1" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="glassGrad" x1="12" y1="15" x2="36" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#94A3B8" stopOpacity="0.4" />
              <stop offset="1" stopColor="#475569" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          {/* Cutting Chai Glass */}
          <path d="M14 15L17 38C17 40 31 40 31 38L34 15H14Z" fill="url(#glassGrad)" stroke="#CBD5E1" strokeWidth="1.6" />
          {/* Tea liquid */}
          <path d="M15.5 21L17.5 37C18.5 38.5 29.5 38.5 30.5 37L32.5 21H15.5Z" fill="url(#teaGrad)" />
          {/* Creamy froth line */}
          <ellipse cx="24" cy="21" rx="8.5" ry="2" fill="#FEF3C7" opacity="0.9" />
          {/* Steam */}
          <path d="M21 13C20 10 22 8 21 5" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M27 12C26 9 28 7 27 4" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case 'food-pav':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="bunGrad" x1="10" y1="10" x2="38" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.6" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Top Bun */}
          <path d="M11 21C11 12 37 12 37 21H11Z" fill="url(#bunGrad)" stroke="#78350F" strokeWidth="1.6" />
          {/* Butter shine */}
          <ellipse cx="24" cy="16" rx="7" ry="2" fill="#FEF9C3" opacity="0.7" />
          {/* Golden Vada Patty */}
          <rect x="10" y="22" width="28" height="9" rx="4.5" fill="#D97706" stroke="#451A03" strokeWidth="1.4" />
          {/* Red Chutney streak */}
          <path d="M12 22H36" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
          {/* Bottom Bun */}
          <rect x="12" y="32" width="24" height="6" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
          {/* Fried green chili */}
          <path d="M19 10C22 7 27 7 29 10" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'food-tikka':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="tikkaGrad" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB923C" />
              <stop offset="0.7" stopColor="#EA580C" />
              <stop offset="1" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          {/* Metal Skewer */}
          <line x1="7" y1="41" x2="41" y2="7" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tikka Cube 1 */}
          <rect x="11" y="26" width="9.5" height="9.5" rx="2" transform="rotate(-45 15.75 30.75)" fill="url(#tikkaGrad)" stroke="#7F1D1D" strokeWidth="1.4" />
          <line x1="17" y1="28" x2="21" y2="32" stroke="#451A03" strokeWidth="1.4" />
          {/* Green pepper */}
          <rect x="19" y="19" width="6.5" height="6.5" rx="1.5" transform="rotate(-45 22.25 22.25)" fill="#16A34A" stroke="#14532D" strokeWidth="1.2" />
          {/* Tikka Cube 2 */}
          <rect x="23" y="13" width="9.5" height="9.5" rx="2" transform="rotate(-45 27.75 17.75)" fill="url(#tikkaGrad)" stroke="#7F1D1D" strokeWidth="1.4" />
          <line x1="29" y1="15" x2="33" y2="19" stroke="#451A03" strokeWidth="1.4" />
          {/* Red onion petal */}
          <circle cx="36" cy="11" r="2.5" fill="#E11D48" stroke="#881337" strokeWidth="1" />
        </svg>
      );

    case 'food-momos':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="momoGrad" x1="12" y1="16" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.6" stopColor="#F1F5F9" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>
          {/* Momo Body */}
          <path d="M12 32C10 24 17 18 24 17C31 18 38 24 36 32C34 38 14 38 12 32Z" fill="url(#momoGrad)" stroke="#94A3B8" strokeWidth="1.6" />
          {/* Top Fold Pinch */}
          <circle cx="24" cy="17" r="2.8" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
          {/* Pleats */}
          <path d="M18 22C20 26 23 30 24 34" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M30 22C28 26 25 30 24 34" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M24 19V34" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
          {/* Chilli Chutney Bowl */}
          <circle cx="37" cy="14" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
          <circle cx="36" cy="13" r="1.4" fill="#FCA5A5" />
          {/* Steam */}
          <path d="M22 12C21 9 23 7 22 5" stroke="#93C5FD" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case 'food-pizza':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          <defs>
            <linearGradient id="cheeseGrad" x1="24" y1="16" x2="24" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FBBF24" />
              <stop offset="0.7" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Pizza Slice */}
          <path d="M24 40L9 14C17 9 31 9 39 14L24 40Z" fill="url(#cheeseGrad)" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Thick Crust */}
          <path d="M8.5 14C16.5 9 31.5 9 39.5 14" stroke="#92400E" strokeWidth="4.8" strokeLinecap="round" />
          {/* Toppings */}
          <circle cx="21" cy="20" r="3" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          <circle cx="28" cy="26" r="2.8" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          <circle cx="23" cy="32" r="2.2" fill="#DC2626" stroke="#991B1B" strokeWidth="0.8" />
          {/* Basil */}
          <path d="M16 26C18 24 20 26 18 28C16 28 15 27 16 26Z" fill="#16A34A" />
        </svg>
      );

    case 'food-burger':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          {/* Top Bun */}
          <path d="M10 20C10 11 38 11 38 20H10Z" fill="#F59E0B" stroke="#92400E" strokeWidth="1.6" />
          {/* Sesame seeds */}
          <circle cx="19" cy="15" r="1" fill="#FEF3C7" />
          <circle cx="27" cy="14" r="1" fill="#FEF3C7" />
          <circle cx="24" cy="17" r="1" fill="#FEF3C7" />
          {/* Lettuce */}
          <path d="M9 22C12 20 16 23 19 21C23 23 27 20 30 22C34 20 37 22 39 21" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" />
          {/* Tomato */}
          <rect x="11" y="24" width="26" height="3" rx="1.5" fill="#EF4444" />
          {/* Patty */}
          <rect x="10" y="28" width="28" height="6" rx="3" fill="#78350F" stroke="#451A03" strokeWidth="1.2" />
          {/* Bottom bun */}
          <path d="M11 35H37C37 39 11 39 11 35Z" fill="#D97706" stroke="#92400E" strokeWidth="1.6" />
        </svg>
      );

    case 'food-taco':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          {/* Taco Shell */}
          <path d="M8 33C8 17 40 17 40 33C40 35 8 35 8 33Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.8" />
          {/* Filling */}
          <path d="M12 29C16 26 21 29 25 26C29 29 33 26 37 28" stroke="#16A34A" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="17" cy="27" r="2.2" fill="#EF4444" />
          <circle cx="28" cy="26" r="2.2" fill="#EF4444" />
          <circle cx="23" cy="28" r="1.8" fill="#D97706" />
        </svg>
      );

    case 'food-ramen':
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          {/* Chopsticks */}
          <line x1="7" y1="11" x2="39" y2="17" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="9" y1="14" x2="41" y2="19" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
          {/* Bowl */}
          <path d="M10 22C10 34 16 41 24 41C32 41 38 34 38 22H10Z" fill="#1E293B" stroke="#64748B" strokeWidth="1.6" />
          {/* Broth & Noodles */}
          <ellipse cx="24" cy="22" rx="13" ry="4" fill="#D97706" />
          <path d="M16 21C19 23 21 20 24 22C27 20 29 23 32 21" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
          {/* Egg */}
          <ellipse cx="19" cy="21" rx="3.2" ry="2.2" fill="#F8FAFC" />
          <circle cx="19" cy="21" r="1.4" fill="#F97316" />
          {/* Scallions */}
          <circle cx="28" cy="21" r="1.2" fill="#22C55E" />
          <circle cx="30" cy="22" r="1.2" fill="#22C55E" />
        </svg>
      );

    case 'food-coffee':
    default:
      return (
        <svg viewBox="0 0 48 48" className="w-full h-full p-1" fill="none">
          {/* Saucer */}
          <ellipse cx="24" cy="38" rx="16" ry="3" fill="#334155" stroke="#64748B" strokeWidth="1.2" />
          {/* Cup Handle */}
          <path d="M32 22C37 22 38 31 32 31" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Cup Body */}
          <path d="M14 19L16 34C16 36 32 36 32 34L34 19H14Z" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.6" />
          {/* Coffee foam */}
          <ellipse cx="24" cy="19" rx="9.5" ry="3" fill="#78350F" />
          {/* Latte heart */}
          <path d="M21 19C23 17 25 17 27 19C25 21 23 21 21 19Z" fill="#FEF3C7" />
          {/* Steam */}
          <path d="M21 13C20 10 22 8 21 5" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          <path d="M27 12C26 9 28 7 27 4" stroke="#FDE68A" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
  }
}

export default function Avatar({ avatarId, size = 'md', className = '', alt = 'Food Avatar' }) {
  const avatar = getAvatar(avatarId);

  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`relative shrink-0 ${selectedSize} rounded-full bg-gradient-to-tr ${avatar.color} ${avatar.border} border ring-2 ${avatar.ring} shadow-md flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-105 ${className}`}
      title={avatar.label || avatar.name}
    >
      <div className="w-full h-full flex items-center justify-center">
        <FoodIcon foodId={avatar.id} />
      </div>
    </div>
  );
}
