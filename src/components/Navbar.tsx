"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:     scrolled ? "rgba(22, 22, 22, 0.94)" : "transparent",
        borderBottom:   scrolled ? "1px solid rgba(240,237,232,0.07)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(1.1)" : "none",
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-[60px]">

        {/* ── Wordmark ── */}
        <a href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="font-display text-[15px] tracking-[0.08em] text-[#f0ede8] leading-none">
            SPACEPLUS
          </span>
          <span
            className="text-[8px] tracking-[0.2em] font-sans font-semibold px-1.5 py-[3px] rounded-[2px] leading-none"
            style={{ background: "#8b5cf6", color: "#fff" }}
          >
            BKK
          </span>
        </a>

        {/* ── Book CTA ── */}
        <a
          href="#contact"
          className="flex items-center gap-2 h-8 px-4 text-[9px] tracking-[0.22em] uppercase font-sans font-medium transition-all duration-200 hover:opacity-85"
          style={{ background: "#8b5cf6", color: "#ffffff" }}
        >
          BOOK TABLE
          <span className="opacity-70 text-[11px]">↗</span>
        </a>

      </div>
    </header>
  );
}
