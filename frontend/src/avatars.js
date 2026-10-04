// Curated Food Avatars for BiteVote
// Distinct vector food icons with vibrant food-tech styling

export const FOOD_AVATARS = [
  {
    id: 'food-samosa',
    name: 'Samosa',
    label: 'Crispy Samosa',
    tag: 'Desi Snack',
    color: 'from-amber-500/25 to-orange-600/35',
    border: 'border-amber-500/50',
    ring: 'ring-amber-500/40',
    badgeBg: 'bg-amber-950/40'
  },
  {
    id: 'food-dosa',
    name: 'Dosa',
    label: 'Masala Dosa',
    tag: 'Crispy Crepe',
    color: 'from-emerald-500/25 to-teal-600/35',
    border: 'border-emerald-500/50',
    ring: 'ring-emerald-500/40',
    badgeBg: 'bg-emerald-950/40'
  },
  {
    id: 'food-biryani',
    name: 'Biryani',
    label: 'Dum Biryani',
    tag: 'Fragrant Rice',
    color: 'from-orange-500/25 to-amber-600/35',
    border: 'border-orange-500/50',
    ring: 'ring-orange-500/40',
    badgeBg: 'bg-orange-950/40'
  },
  {
    id: 'food-chai',
    name: 'Chai',
    label: 'Cutting Chai',
    tag: 'Spiced Brew',
    color: 'from-yellow-600/25 to-amber-700/35',
    border: 'border-yellow-600/50',
    ring: 'ring-yellow-600/40',
    badgeBg: 'bg-yellow-950/40'
  },
  {
    id: 'food-pav',
    name: 'Vada Pav',
    label: 'Mumbai Pav',
    tag: 'Street Hero',
    color: 'from-red-500/25 to-amber-500/35',
    border: 'border-red-500/50',
    ring: 'ring-red-500/40',
    badgeBg: 'bg-red-950/40'
  },
  {
    id: 'food-tikka',
    name: 'Tikka',
    label: 'Paneer Tikka',
    tag: 'Tandoor Char',
    color: 'from-rose-500/25 to-red-600/35',
    border: 'border-rose-500/50',
    ring: 'ring-rose-500/40',
    badgeBg: 'bg-rose-950/40'
  },
  {
    id: 'food-momos',
    name: 'Momo',
    label: 'Steamed Momo',
    tag: 'Dim Sum',
    color: 'from-sky-500/25 to-cyan-600/35',
    border: 'border-sky-500/50',
    ring: 'ring-sky-500/40',
    badgeBg: 'bg-sky-950/40'
  },
  {
    id: 'food-pizza',
    name: 'Pizza',
    label: 'Woodfired Pizza',
    tag: 'Cheesy Slice',
    color: 'from-amber-500/25 to-rose-600/35',
    border: 'border-amber-500/50',
    ring: 'ring-amber-500/40',
    badgeBg: 'bg-amber-950/40'
  },
  {
    id: 'food-burger',
    name: 'Burger',
    label: 'Gourmet Burger',
    tag: 'Toasted Stack',
    color: 'from-orange-600/25 to-yellow-600/35',
    border: 'border-orange-500/50',
    ring: 'ring-orange-500/40',
    badgeBg: 'bg-orange-950/40'
  },
  {
    id: 'food-taco',
    name: 'Taco',
    label: 'Crunchy Taco',
    tag: 'Mexican Crunch',
    color: 'from-lime-500/25 to-emerald-600/35',
    border: 'border-lime-500/50',
    ring: 'ring-lime-500/40',
    badgeBg: 'bg-lime-950/40'
  },
  {
    id: 'food-ramen',
    name: 'Ramen',
    label: 'Noodle Bowl',
    tag: 'Savory Broth',
    color: 'from-indigo-500/25 to-purple-600/35',
    border: 'border-indigo-500/50',
    ring: 'ring-indigo-500/40',
    badgeBg: 'bg-indigo-950/40'
  },
  {
    id: 'food-coffee',
    name: 'Coffee',
    label: 'Artisan Coffee',
    tag: 'Latte Art',
    color: 'from-amber-700/25 to-stone-700/35',
    border: 'border-amber-700/50',
    ring: 'ring-amber-700/40',
    badgeBg: 'bg-stone-950/40'
  }
];

export const AVATAR_LIST = FOOD_AVATARS;

// Legacy and backwards-compatible ID mappings
const LEGACY_ID_MAP = {
  'avatar-1': 'food-samosa',
  'avatar-2': 'food-dosa',
  'avatar-3': 'food-biryani',
  'avatar-4': 'food-chai',
  'avatar-5': 'food-pav',
  'avatar-6': 'food-tikka',
  'avatar-7': 'food-momos',
  'avatar-8': 'food-pizza'
};

export function getAvatar(avatarId) {
  if (!avatarId) return FOOD_AVATARS[0];
  const mappedId = LEGACY_ID_MAP[avatarId] || avatarId;
  const found = FOOD_AVATARS.find((a) => a.id === mappedId);
  if (found) return found;

  // Deterministic fallback based on avatarId string hash
  const idx = Math.abs(avatarId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % FOOD_AVATARS.length;
  return FOOD_AVATARS[idx];
}
