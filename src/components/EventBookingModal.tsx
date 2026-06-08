"use client";

import { useState, useEffect } from "react";
import type { CarouselItem } from "./Carousel";

interface Props {
  item: CarouselItem;
  onClose: () => void;
}

export default function EventBookingModal({ item, onClose }: Props) {
  const [visible,    setVisible]    = useState(false); /* modal entrance */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [qty, setQty] = useState<number[]>([
    ...(item.tickets ?? []).map(() => 0),
    ...(item.extras  ?? []).map(() => 0),
  ]);

  const extrasBase = item.tickets?.length ?? 0;

  /* Trigger entrance animation on next frame */
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* Escape key */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawerOpen) setDrawerOpen(false);
      else onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [drawerOpen, onClose]);

  const changeQty = (idx: number, delta: number) =>
    setQty(prev => prev.map((v, i) => i === idx ? Math.max(0, v + delta) : v));

  const total =
    (item.tickets ?? []).reduce((s, t, i)  => s + t.price * (qty[i]              ?? 0), 0) +
    (item.extras  ?? []).reduce((s, e, ei) => s + e.price * (qty[extrasBase + ei] ?? 0), 0);

  return (
    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center">

      {/* ── Backdrop — closes modal ── */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        onClick={onClose}
      />

      {/* ── Drawer backdrop — closes drawer only ── */}
      {drawerOpen && (
        <div
          className="absolute inset-0 z-[205] bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Event modal card ── */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-t-2xl md:rounded-xl flex flex-col"
        style={{
          background: "#111",
          transform:  visible ? "translateY(0) scale(1)"    : "translateY(32px) scale(0.97)",
          opacity:    visible ? 1 : 0,
          transition: "transform 0.48s cubic-bezier(0.22, 0.61, 0.36, 1), opacity 0.36s ease",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div className="relative flex-none" style={{ background: item.bg, minHeight: 340 }}>
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-20 w-8 h-8 border border-white/30 text-white text-[11px] flex items-center justify-center hover:bg-white/15 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Decorative large initial */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-display leading-none text-white select-none"
              style={{ fontSize: "clamp(160px, 24vw, 260px)", opacity: 0.06 }}
            >
              {item.title.charAt(0)}
            </span>
          </div>

          {/* Accent glow */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${item.accent}66 0%, transparent 65%)` }}
          />

          {/* Bottom info */}
          <div
            className="absolute bottom-0 left-0 right-0 px-6 md:px-8 py-6"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}
          >
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                {item.tag && (
                  <p className="text-[8px] tracking-[0.34em] text-white/50 uppercase mb-3">{item.tag}</p>
                )}
                <div className="flex items-center gap-5 mb-3">
                  <span className="text-[9.5px] tracking-[0.22em] text-white/55">{item.date}</span>
                  {item.time && (
                    <span className="text-[9.5px] tracking-[0.22em] text-white/55">FROM {item.time}</span>
                  )}
                </div>
                <h2
                  className="font-display text-white leading-none"
                  style={{ fontSize: "clamp(28px, 5vw, 52px)" }}
                >
                  {item.title}
                </h2>
              </div>

              {item.tickets && item.tickets.length > 0 && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="px-6 py-3 bg-white text-black text-[9.5px] tracking-[0.24em] uppercase font-sans font-semibold hover:bg-white/90 transition-colors cursor-pointer shrink-0"
                >
                  Buy Tickets
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lineup + About */}
        {(item.lineup || item.about) && (
          <div
            className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {item.lineup && (
              <div className="md:w-[42%] p-6 md:p-8 shrink-0">
                <p className="text-[8px] tracking-[0.44em] text-white/22 uppercase mb-5">Lineup</p>
                {item.lineup.map((room, ri) => (
                  <div key={ri} className="mb-4">
                    <span className="inline-block text-[7.5px] tracking-[0.24em] border border-white/16 text-white/35 px-2 py-0.5 uppercase mb-3">
                      {room.room}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {room.artists.map((artist, ai) => (
                        <p key={ai} className="font-display text-white text-xl leading-snug">
                          {artist}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {item.about && (
              <div className="flex-1 p-6 md:p-8 min-w-0">
                <p className="text-[8px] tracking-[0.44em] text-white/22 uppercase mb-5">About</p>
                <p className="text-[13px] leading-relaxed text-white/48">{item.about}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Ticket Drawer ── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[210] w-full max-w-[420px] flex flex-col"
        style={{
          background:  "#e8e4df",
          transform:   drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition:  "transform 0.38s cubic-bezier(0.22, 0.61, 0.36, 1)",
          boxShadow:   drawerOpen ? "-8px 0 40px rgba(0,0,0,0.45)" : "none",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top decorative bars */}
        <div className="flex items-center justify-between px-6 pt-5 pb-0">
          <div className="w-6 h-0.5 bg-black/22" />
          <div className="w-6 h-0.5 bg-black/22" />
        </div>

        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-black/10">
          <h3 className="font-display text-black tracking-wide" style={{ fontSize: 22 }}>
            BUY TICKETS
          </h3>
        </div>

        {/* Event name + date */}
        <div className="px-6 py-4 text-center border-b border-black/10">
          <p className="text-[8.5px] tracking-[0.3em] text-black/35 uppercase mb-1.5">{item.title}</p>
          <p className="font-display text-black tracking-widest uppercase text-sm">{item.date}</p>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {item.tickets && item.tickets.length > 0 && (
            <div className="mb-6">
              <p className="text-[8px] tracking-[0.42em] text-black/28 uppercase mb-3">Select Tickets</p>
              <div className="flex flex-col gap-2">
                {item.tickets.map((ticket, ti) => (
                  <div key={ti} className="flex items-center justify-between gap-3 p-4 border border-black/10 bg-white/55">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-[9px] font-semibold tracking-[0.14em] text-black uppercase">
                          {ticket.label}
                        </p>
                        {ticket.vip && (
                          <span className="text-[7px] bg-yellow-400 text-black px-1.5 py-0.5 font-bold tracking-wider rounded-sm">
                            VIP
                          </span>
                        )}
                      </div>
                      {ticket.desc && (
                        <p className="text-[10px] text-black/38 leading-snug mb-1">{ticket.desc}</p>
                      )}
                      <p className="text-[10.5px] text-black/52 font-medium">
                        {ticket.price.toLocaleString()}{ticket.currency ?? "฿"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => changeQty(ti, -1)} className="w-7 h-7 border border-black/18 flex items-center justify-center text-black/55 hover:bg-black/10 transition-colors cursor-pointer text-base leading-none">−</button>
                      <span className="w-5 text-center text-sm text-black font-medium tabular-nums">{qty[ti] ?? 0}</span>
                      <button onClick={() => changeQty(ti, +1)} className="w-7 h-7 border border-black/18 flex items-center justify-center text-black/55 hover:bg-black/10 transition-colors cursor-pointer text-base leading-none">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {item.extras && item.extras.length > 0 && (
            <div>
              <p className="text-[8px] tracking-[0.42em] text-black/28 uppercase mb-3">Extras</p>
              <div className="flex flex-col gap-2">
                {item.extras.map((extra, ei) => {
                  const idx = extrasBase + ei;
                  return (
                    <div key={ei} className="flex items-center justify-between gap-3 p-4 border border-black/10 bg-white/55">
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-semibold tracking-[0.14em] text-black uppercase mb-0.5">
                          {extra.label}
                        </p>
                        <p className="text-[10.5px] text-black/52 font-medium">
                          {extra.price.toLocaleString()}{extra.currency ?? "฿"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => changeQty(idx, -1)} className="w-7 h-7 border border-black/18 flex items-center justify-center text-black/55 hover:bg-black/10 transition-colors cursor-pointer text-base leading-none">−</button>
                        <span className="w-5 text-center text-sm text-black font-medium tabular-nums">{qty[idx] ?? 0}</span>
                        <button onClick={() => changeQty(idx, +1)} className="w-7 h-7 border border-black/18 flex items-center justify-center text-black/55 hover:bg-black/10 transition-colors cursor-pointer text-base leading-none">+</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-black/12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] tracking-[0.22em] text-black/35 uppercase">Total</span>
            <span className="font-display text-black text-xl">{total.toLocaleString()}฿</span>
          </div>
          <button
            disabled={total === 0}
            className="w-full py-3.5 text-[9.5px] tracking-[0.26em] uppercase font-sans font-semibold transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "#8b5cf6", color: "#fff" }}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}
