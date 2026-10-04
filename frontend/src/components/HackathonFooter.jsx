import React from 'react';
import { Sparkles, Server, Database, Code2 } from 'lucide-react';

export default function HackathonFooter() {
  return (
    <footer className="border-t border-cream-200 bg-white/70 backdrop-blur-sm py-8 px-4 mt-16 text-stone-500 text-xs">
      <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 font-bold text-stone-900">
            <span className="text-brand-600 font-extrabold">Bite</span>
            <span className="text-teal-700 font-extrabold">Vote</span>
            <span>—</span>
            <span className="text-stone-600 font-medium">Vote. Match. Eat.</span>
          </div>
          <p className="text-stone-500 text-[11px]">
            AI compromise engine for groups resolving dietary boundaries, cravings, and budgets.
          </p>
        </div>

        {/* Sponsor & Open Source Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>AI: Google Gemma 2 (OpenRouter)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-cream-200 text-stone-700">
            <Database className="w-3.5 h-3.5 text-stone-500" />
            <span>Database: MongoDB Atlas</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-50 border border-cream-200 text-stone-700">
            <Server className="w-3.5 h-3.5 text-stone-500" />
            <span>Hosting: Render</span>
          </div>
        </div>

        {/* Challenge Tags */}
        <div className="text-[11px] text-stone-500 text-center md:text-right">
          <span className="font-semibold text-stone-700">Hacktoberfest 2026 Weekend Challenge</span>
          <div className="text-stone-400 font-mono text-[10px] mt-0.5">
            #devchallenge #weekendchallenge #hf26challenge
          </div>
        </div>
      </div>
    </footer>
  );
}
