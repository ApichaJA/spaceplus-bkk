"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import EventBookingModal from "./EventBookingModal";

export interface CarouselItem {
  id: number;
  title: string;
  tag?: string;
  date: string;
  time?: string;
  dates?: string;
  bg: string;
  accent: string;
  /* optional booking data */
  lineup?: { room: string; artists: string[] }[];
  about?: string;
  tickets?: { label: string; desc: string; price: number; currency?: string; vip?: boolean }[];
  extras?: { label: string; price: number; currency?: string }[];
}

interface CarouselProps {
  id: string;
  title: string;
  items: CarouselItem[];
  num?: number;
  showBookNow?: boolean;
}

export default function Carousel({ id, title, items, num, showBookNow }: CarouselProps) {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selected, setSelected] = useState<CarouselItem | null>(null);

  /* ── Header: number slide, divider scale, controls fade ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: header, start: "top 84%" };

      gsap.from(".c-num", {
        x: -40, opacity: 0, immediateRender: false,
        duration: 0.7, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from(".c-divider", {
        scaleX: 0, transformOrigin: "left center", immediateRender: false,
        duration: 1.1, delay: 0.06, ease: "expo.out", scrollTrigger: trigger,
      });
      gsap.from(".c-controls", {
        opacity: 0, y: 10, immediateRender: false,
        duration: 0.6, delay: 0.5, ease: "power2.out", scrollTrigger: trigger,
      });
    }, header);

    return () => ctx.revert();
  }, []);

  /* ── Cards punch in ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll("article");
    const tween = gsap.from(cards, {
      y: 80, scale: 0.88, opacity: 0, immediateRender: false,
      duration: 0.7, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 78%" },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  /* ── Space float — continuous drift on the inner wrapper ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const floaters = section.querySelectorAll<HTMLElement>(".c-float");
    const tweens = Array.from(floaters).map((el, i) =>
      gsap.to(el, {
        y: -4 - (i % 3),              /* subtle: 4–6 px only */
        rotation: 0.12 + (i % 4) * 0.05,
        duration: 3.2 + (i % 5) * 0.45,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.6 + i * 0.38,
      })
    );
    return () => tweens.forEach(t => t.kill());
  }, []);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = (el.querySelector("article")?.offsetWidth ?? 280) + 16;
    setActiveIdx(Math.min(Math.round(el.scrollLeft / cardW), items.length - 1));
  }, [items.length]);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = (el.querySelector("article")?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  const sectionLabel = num !== undefined ? String(num).padStart(2, "0") : null;
  const posLabel =
    String(activeIdx + 1).padStart(2, "0") +
    " / " +
    String(items.length).padStart(2, "0");

  return (
    <>
      <section ref={sectionRef} id={id} className="pt-32 md:pt-44 pb-16 bg-background">

        {/* ── Header ── */}
        <div ref={headerRef} className="px-6 md:px-8">

          {/* Number + divider */}
          {sectionLabel && (
            <div className="flex items-center gap-4 mb-4">
              <span className="c-num text-[9px] tracking-[0.4em] text-foreground/25 font-sans uppercase shrink-0">
                <ScrambleText text={sectionLabel} speed={60} delay={0} />
              </span>
              <div className="c-divider flex-1 h-px bg-foreground/10" />
            </div>
          )}
          {!sectionLabel && <div className="c-divider h-px bg-foreground/10 mb-4" />}

          {/* Title + controls */}
          <div className="flex items-end justify-between mb-10 gap-6">
            <h2
              className="font-display leading-none text-foreground shrink-0"
              style={{ fontSize: "clamp(44px, 8.5vw, 128px)" }}
            >
              <ScrambleText text={title} delay={280} speed={30} />
            </h2>

            <div className="c-controls flex items-center gap-4 pb-1.5 shrink-0">
              <button
                onClick={() => scroll("prev")}
                aria-label="Previous"
                className="text-[9px] tracking-[0.25em] text-foreground/35 hover:text-foreground transition-colors duration-200 uppercase"
              >
                ← PREV
              </button>
              <span className="text-[10px] text-foreground/22 font-sans tabular-nums select-none">
                {posLabel}
              </span>
              <button
                onClick={() => scroll("next")}
                aria-label="Next"
                className="text-[9px] tracking-[0.25em] text-foreground/35 hover:text-foreground transition-colors duration-200 uppercase"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory px-6 md:px-8 pb-10"
        >
          {items.map((item) => (
            <article
              key={item.id}
              onClick={() => showBookNow && setSelected(item)}
              className={`flex-none snap-start w-65 md:w-75 group ${showBookNow ? "cursor-pointer" : ""}`}
            >
              {/* c-float is the continuous drift target — separate from article (entrance target) */}
              <div className="c-float">
              <div
                className="w-full h-90 md:h-100 relative overflow-hidden"
                style={{ background: item.bg }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, ${item.accent}55 0%, transparent 65%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.055]">
                  <span className="font-display text-[130px] leading-none text-white">
                    {item.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/85 via-black/30 to-transparent">
                  {item.tag && (
                    <p className="text-[8px] tracking-[0.28em] text-white/45 uppercase mb-1.5">
                      {item.tag}
                    </p>
                  )}
                  <h3 className="text-white font-bold text-sm leading-snug uppercase tracking-wide group-hover:text-white/85 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between mt-2.5 mb-2">
                    <span className="text-[9.5px] text-white/42">{item.dates ?? item.date}</span>
                    {item.time && (
                      <span className="text-[9.5px] text-white/42">FROM {item.time}</span>
                    )}
                  </div>
                  {showBookNow && (
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(item); }}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-[8px] tracking-[0.18em] uppercase text-white border border-white/30 hover:bg-white/20 transition-all duration-200"
                    >
                      BOOK NOW ↗
                    </button>
                  )}
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: item.accent }}
                />
              </div>
              </div>{/* end c-float */}
            </article>
          ))}
        </div>

        <div className="h-px bg-foreground/6 mx-6 md:mx-8" />
      </section>

      {/* ── Booking modal (portal-free: fixed pos doesn't need it) ── */}
      {selected && (
        <EventBookingModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
