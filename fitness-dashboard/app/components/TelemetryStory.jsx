'use client';
import React, { useState } from 'react';

export default function TelemetryStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden my-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-800/40">
                    Case Study // Personal Telemetry Protocol
                </span>
                <span className="text-xs font-mono text-emerald-400">● LIVE PIPELINE (MAY 2026 START)</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                The 118 kg to 111 kg Optimization Loop
            </h3>

            <p className="text-slate-300 text-sm mt-3 leading-relaxed font-light">
                Every robust data model starts with a baseline. Tracking my physical metrics starting from May 2026, I treated my own health optimization like a production environment—debugging habits and tracking consistent daily inputs.
            </p>

            {/* Interactive Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mt-5 bg-slate-800/80 hover:bg-slate-800 text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs font-mono transition flex items-center gap-2"
            >
                <span>{isOpen ? '[-] Close Telemetry Insights' : '[+] Inspect Milestone Data'}</span>
            </button>

            {/* Expandable Metrics Breakdown */}
            {isOpen && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4 text-sm text-slate-300 animate-fadeIn">
                    <p className="font-light leading-relaxed">
                        <strong>The Strategy:</strong> Initial unlogged baseline recorded at 118 kg in May 2026. Official, active tracking pipelines locked in consistency at 111 kg. By aggregating daily step counts, WHOOP recovery scores, and SQL-backed weight logs, progress became a predictable downward trend rather than guesswork.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                            <div className="text-[10px] font-mono text-slate-400">MAY 2026 BASELINE</div>
                            <div className="text-lg font-bold text-white mt-1">118 <span className="text-xs text-slate-500 font-normal">kg</span></div>
                        </div>
                        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                            <div className="text-[10px] font-mono text-slate-400">ACTIVE LOG START</div>
                            <div className="text-lg font-bold text-indigo-400 mt-1">111 <span className="text-xs text-slate-500 font-normal">kg</span></div>
                        </div>
                        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                            <div className="text-[10px] font-mono text-slate-400">OPTIMIZATION STATUS</div>
                            <div className="text-lg font-bold text-emerald-400 mt-1">Stable <span className="text-xs text-emerald-500 font-mono">● LIVE</span></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}