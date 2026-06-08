"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Marquee from "./Marquee";

export default function HeroVideo() {
  const containerRef = useRef<HTMLElement>(null);

  /*
   * useLayoutEffect — before first paint.
   *
   * ENTER THE and BANGKOK are offset to sit exactly on top of SPACE PLUS
   * (opacity 0, z-index behind it). When the animation runs they slide out
   * from behind SPACE PLUS to their natural positions.
   *
   * We compute the real pixel gap with getBoundingClientRect so it works at
   * any font size / viewport.
   */
  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const spEl = root.querySelector<HTMLElement>(".hero-spaceplus");
    const etEl = root.querySelector<HTMLElement>(".hero-enterthe");
    const bkEl = root.querySelector<HTMLElement>(".hero-bangkok");
    if (!spEl || !etEl || !bkEl) return;

    const spTop = spEl.getBoundingClientRect().top;
    const etTop = etEl.getBoundingClientRect().top;
    const bkTop = bkEl.getBoundingClientRect().top;

    /* SPACE PLUS: clipped, ready to slide up first */
    gsap.set(spEl, {
      clipPath: "inset(0% 0% 105% 0%)",
      y: 18,
      zIndex: 2,
      position: "relative",
    });

    /* ENTER THE: positioned at SPACE PLUS, hidden behind it */
    gsap.set(etEl, {
      y: spTop - etTop, /* positive → move down to SPACE PLUS row */
      opacity: 0,
      zIndex: 1,
      position: "relative",
    });

    /* BANGKOK: positioned at SPACE PLUS, hidden behind it */
    gsap.set(bkEl, {
      y: spTop - bkTop, /* negative → move up to SPACE PLUS row */
      opacity: 0,
      zIndex: 1,
      position: "relative",
    });

    gsap.set(".hero-tag",  { opacity: 0 });
    gsap.set(".hero-meta", { opacity: 0 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });

      /* 1 — SPACE PLUS rises and reveals */
      tl.to(".hero-spaceplus", {
        clipPath: "inset(0% 0% 0% 0%)",
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      /* 2 — ENTER THE slides up, BANGKOK slides down — both from SPACE PLUS */
        .to(".hero-enterthe", {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        }, "+=0.02")
        .to(".hero-bangkok", {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        }, "<")

      /* 3 — Support text fades in */
        .to(".hero-tag",  { opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.25")
        .to(".hero-meta", { opacity: 1, duration: 0.35, ease: "power2.out" }, "-=0.18");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-black flex flex-col justify-between"
    >
      {/* ── Video background ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        autoPlay muted loop playsInline
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/assets/videos/SPACEPLUS%20PRESENT%20ATLANTIS.mp4`}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 65% 40%, rgba(60,10,90,0.55) 0%, transparent 60%)",
            "radial-gradient(ellipse 70% 50% at 30% 60%, rgba(10,5,30,0.6) 0%, transparent 55%)",
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.65) 100%)",
          ].join(","),
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-12 pt-20">
        <p className="hero-tag text-[9px] tracking-[0.42em] text-white/40 uppercase mb-7">
          SpacePlus BKK — Bangkok, Thailand
        </p>

        <div className="space-y-0.5">

          {/* Line 1 — slides up from SPACE PLUS row */}
          <h1
            className="hero-enterthe font-display leading-[0.9] text-white"
            style={{ fontSize: "clamp(54px, 9vw, 140px)" }}
          >
            ENTER THE
          </h1>

          {/* Line 2 — appears first */}
          <div
            className="hero-spaceplus flex items-center gap-3 md:gap-5 flex-wrap"
            style={{ fontSize: "clamp(54px, 9vw, 140px)" }}
          >
            <span className="font-display leading-[0.9] bg-foreground text-background px-3 md:px-4">
              SPACE
            </span>
            <span className="font-display leading-[0.9] text-white">PLUS</span>
          </div>

          {/* Line 3 — slides down from SPACE PLUS row */}
          <h1
            className="hero-bangkok font-display leading-[0.9] text-white"
            style={{ fontSize: "clamp(54px, 9vw, 140px)" }}
          >
            BANGKOK
          </h1>

        </div>

        <p className="hero-meta text-[10px] tracking-[0.32em] text-white/35 uppercase mt-8">
          RCA · BANGKOK · Thailand
        </p>
      </div>

      {/* ── Bottom marquee ── */}
      <div className="relative z-10 border-t border-white/10 bg-black/35 py-3">
        <Marquee text="SPACEPLUS BKK · RCA · BANGKOK · WORLD-CLASS DJs" speed={35} size="sm" />
      </div>
    </section>
  );
}
