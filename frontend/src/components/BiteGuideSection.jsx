import React, { useState } from 'react';
import { 
  Compass, Search, Sparkles, ExternalLink, ChevronDown, 
  ChevronUp, Utensils, Flame, Award, AlertCircle, Play, 
  Clock, Eye, ChefHat, CheckCircle2, ShieldCheck, RefreshCw, Video
} from 'lucide-react';
import { api } from '../api';

function YouTubeIcon({ className = "w-4 h-4 text-rose-500" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function BiteGuideSection({ restaurant, city }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const fetchGuide = async () => {
    if (!restaurant?.id) return;
    setLoading(true);
    setError(null);
    setLoadingStep(1);

    const stepTimer1 = setTimeout(() => setLoadingStep(2), 1200);
    const stepTimer2 = setTimeout(() => setLoadingStep(3), 2400);

    try {
      const res = await api.getBiteGuide(restaurant.id);
      setData(res);
      setIsOpen(true);
    } catch (err) {
      console.error("Failed to load BiteGuide:", err);
      setError("Unable to retrieve web intelligence at the moment. Please try again.");
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!data && !loading) {
      fetchGuide();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const getStrengthBadge = (strength) => {
    switch (strength?.toLowerCase()) {
      case 'must-try':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
            <Flame className="w-3 h-3 text-brand-500" /> Must-Try
          </span>
        );
      case 'signature pick':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            <Award className="w-3 h-3 text-amber-500" /> Signature Pick
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-600" /> Crowd Favorite
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Prominent "Discover What to Order" Discovery Card / Trigger */}
      {!isOpen && !loading && (
        <div 
          onClick={handleToggle}
          className="group relative overflow-hidden rounded-2xl bg-white border border-cream-200 hover:border-brand-300 p-6 cursor-pointer transition-all duration-300 shadow-soft hover:shadow-md"
        >
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-all pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-soft group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> BiteGuide Web Intelligence
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-100 text-stone-600 border border-cream-200 font-semibold">
                    SerpApi + Gemma 2
                  </span>
                </div>
                <h3 className="heading-h3 group-hover:text-brand-600 transition-colors">
                  Discover What to Order at {restaurant.name}
                </h3>
                <p className="body-small text-stone-600">
                  We scanned Google food critic reviews and YouTube tasting vlogs. See the dishes people actually rave about.
                </p>
              </div>
            </div>

            <button 
              type="button"
              className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-soft shrink-0 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Explore BiteGuide</span>
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton & Progress */}
      {loading && (
        <div className="bg-white rounded-2xl p-6 border border-cream-200 text-center space-y-4 shadow-soft animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto border border-brand-100">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-500" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-stone-900">Synthesizing BiteGuide Intelligence...</h4>
            <p className="text-xs text-stone-500">
              {loadingStep === 1 && "Searching Google food reviews and blog articles via SerpApi..."}
              {loadingStep === 2 && "Analyzing YouTube dining vlogs and tasting menus in " + (city || "city") + "..."}
              {loadingStep >= 3 && "Google Gemma 2 is synthesizing grounded dish recommendations..."}
            </p>
          </div>
          <div className="w-48 h-1.5 bg-cream-100 rounded-full mx-auto overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-400 to-amber-500 transition-all duration-700 ease-out" 
              style={{ width: loadingStep === 1 ? '35%' : loadingStep === 2 ? '70%' : '95%' }}
            />
          </div>
        </div>
      )}

      {/* Error Banner */}
      {error && !loading && (
        <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchGuide}
            className="px-3 py-1 rounded-lg bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 font-semibold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Full BiteGuide Content Panel */}
      {isOpen && data && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-cream-200 space-y-6 shadow-soft relative animate-fadeIn">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-cream-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-black uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-brand-600" /> BiteGuide
                </span>
                <span className="text-[11px] text-stone-500 font-semibold">
                  Synthesized by Gemma 2 from {data.source_count || 'multiple'} web & video sources
                </span>
              </div>
              <h2 className="heading-h2">
                What People Actually Recommend at {restaurant.name}
              </h2>
              <p className="body-small text-stone-500 italic">
                “We searched the web. Here’s what people actually recommend.”
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchGuide}
                disabled={loading}
                title="Refresh web search"
                className="p-2 rounded-xl bg-cream-50 hover:bg-cream-100 border border-cream-200 text-stone-600 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-brand-500' : ''}`} />
              </button>
              <button
                onClick={handleToggle}
                className="px-3 py-1.5 rounded-xl bg-cream-50 hover:bg-cream-100 border border-cream-200 text-stone-700 font-bold text-xs flex items-center gap-1 transition-colors"
              >
                <span>Collapse</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Web Consensus Summary */}
          {data.summary && (
            <div className="bg-gradient-to-r from-cream-50 to-teal-50/40 rounded-2xl p-4 md:p-5 border border-teal-200/80 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                  Critic & Diner Consensus
                </div>
                <p className="body-text text-stone-700 font-medium">
                  {data.summary}
                </p>
              </div>
            </div>
          )}

          {/* Top Recommended Dishes Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="heading-h3 flex items-center gap-2 text-stone-900">
                <Utensils className="w-4 h-4 text-brand-500" />
                <span>Top Recommended Dishes</span>
              </h3>
              <span className="text-[11px] text-stone-500 font-medium">
                Grounded in web reviews & menu data
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {data.top_dishes?.map((dish, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl overflow-hidden border border-cream-200 hover:border-cream-300 shadow-soft hover:shadow-md transition-all flex flex-col justify-between p-4 space-y-3"
                >
                  <div className="flex gap-4">
                    {dish.image_url && (
                      <img 
                        src={dish.image_url} 
                        alt={dish.name} 
                        className="w-20 h-20 rounded-xl object-cover shrink-0 border border-cream-200"
                      />
                    )}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        {getStrengthBadge(dish.recommendation_strength)}
                        {dish.price && (
                          <span className="text-xs font-mono font-bold text-teal-700 px-2 py-0.5 rounded-md bg-teal-50 border border-teal-200">
                            {dish.price}
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-sm font-black text-stone-900 truncate">
                        {dish.name}
                      </h4>
                      
                      <p className="text-xs text-stone-600 leading-snug line-clamp-2">
                        {dish.why_try_it}
                      </p>
                    </div>
                  </div>

                  {/* Footer with citation & links */}
                  <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-[11px] text-stone-500">
                    <span>
                      {dish.mention_count ? `Cited in ${dish.mention_count}+ reviews` : 'Consensus favorite'}
                    </span>
                    {dish.source_links && dish.source_links.length > 0 && (
                      <a
                        href={dish.source_links[0]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 transition-colors font-medium"
                      >
                        <span>Review source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasting Menu or Graceful "Most Recommended Dishes" Fallback */}
          {data.tasting_menu && (
            <div className="bg-cream-50/70 rounded-2xl p-5 border border-cream-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-stone-900">
                    {data.tasting_menu.title || (data.tasting_menu.has_tasting_menu ? "Chef's Tasting Menu" : "Most Recommended Dishes")}
                  </h4>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  {data.tasting_menu.has_tasting_menu ? "Tasting Menu" : "Curated Selection"}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {data.tasting_menu.description}
              </p>
              {data.tasting_menu.items && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {data.tasting_menu.items.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold px-3 py-1 rounded-lg bg-white text-stone-700 border border-cream-200 shadow-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conflict Notes Banner */}
          {data.conflict_notes && (
            <div className="rounded-xl p-3.5 border border-amber-200 bg-amber-50 flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-800">Sources disagree: </span>
                <span>{data.conflict_notes}</span>
              </div>
            </div>
          )}

          {/* "Watch Reviews" YouTube Section */}
          {data.youtube_reviews && data.youtube_reviews.length > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="heading-h3 flex items-center gap-2 text-stone-900">
                  <YouTubeIcon className="w-4 h-4 text-rose-500" />
                  <span>Watch Reviews & Tasting Vlogs</span>
                </h3>
                <span className="body-caption text-stone-500 font-medium">
                  Verified video reviews on YouTube
                </span>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.youtube_reviews.map((video, idx) => (
                  <a
                    key={idx}
                    href={video.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-white rounded-xl overflow-hidden border border-cream-200 hover:border-brand-300 shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full bg-cream-100 overflow-hidden">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-cream-100 text-stone-400">
                          <YouTubeIcon className="w-8 h-8 text-rose-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-rose-600 group-hover:bg-rose-700 flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-110">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>
                      {video.duration && (
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white font-semibold">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-3 space-y-1">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {video.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-stone-500 pt-1">
                        <span className="font-semibold text-stone-700 truncate max-w-[120px]">{video.channel}</span>
                        {video.views && <span>{video.views}</span>}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
