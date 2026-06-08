"use client";

import { useState } from "react";

export default function DateBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1c] border-t border-foreground/10 flex items-center gap-6 px-8 h-[52px]">
      {/* Label */}
      <span className="hidden sm:block text-[9px] tracking-[0.3em] text-foreground/35 uppercase shrink-0">
        Pick Your Dates
      </span>

      <div className="w-px h-4 bg-foreground/15 hidden sm:block shrink-0" />

      {/* From */}
      <label className="flex items-center gap-2 cursor-pointer group shrink-0">
        <CalendarIcon />
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-transparent text-[11px] tracking-widest text-foreground/50 group-hover:text-foreground/80 focus:text-foreground outline-none cursor-pointer transition-colors w-28"
          placeholder="From"
        />
      </label>

      <div className="w-px h-4 bg-foreground/15 shrink-0" />

      {/* To */}
      <label className="flex items-center gap-2 cursor-pointer group shrink-0">
        <CalendarIcon />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="bg-transparent text-[11px] tracking-widest text-foreground/50 group-hover:text-foreground/80 focus:text-foreground outline-none cursor-pointer transition-colors w-28"
          placeholder="To"
        />
      </label>

      <div className="w-px h-4 bg-foreground/15 shrink-0" />

      {/* Search */}
      <button
        aria-label="Search events"
        className="text-foreground/40 hover:text-foreground transition-colors"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-foreground/35 shrink-0">
      <rect x="0.5" y="1.5" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1" />
      <line x1="0.5" y1="4.5" x2="12.5" y2="4.5" stroke="currentColor" strokeWidth="1" />
      <line x1="3.5" y1="0.5" x2="3.5" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="9.5" y1="0.5" x2="9.5" y2="3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="11" y1="11" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
