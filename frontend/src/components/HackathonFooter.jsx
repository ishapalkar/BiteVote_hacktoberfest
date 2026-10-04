import React from 'react';
import { Sparkles, Server, Database, Code2 } from 'lucide-react';

export default function HackathonFooter() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-4 mt-16 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 font-bold text-slate-200">
            <span>BiteVote</span>
            <span>—</span>
            <span className="text-brand-400">Vote. Match. Eat.</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            AI compromise engine for groups resolving dietary boundaries, cravings, and budgets.
          </p>
        </div>

        {/* Sponsor & Open Source Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-700/40 text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>AI: Google Gemma 2 (OpenRouter)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-emerald-400">
            <Database className="w-3.5 h-3.5" />
            <span>Database: MongoDB Atlas (PyMongo Async)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/60 text-cyan-400">
            <Server className="w-3.5 h-3.5" />
            <span>Hosting: Render</span>
          </div>
        </div>

        {/* Challenge Tags */}
        <div className="text-[11px] text-slate-400 text-center md:text-right">
          <span className="font-semibold text-slate-300">Hacktoberfest 2026 Weekend Challenge</span>
          <div className="text-slate-400 font-mono text-[10px] mt-0.5">
            #devchallenge #weekendchallenge #hf26challenge
          </div>
        </div>
      </div>
    </footer>
  );
}
