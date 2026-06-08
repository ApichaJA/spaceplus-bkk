"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VIPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const bg      = bgRef.current;
    if (!section) return;

    const tweens: ReturnType<typeof gsap.from | typeof gsap.to>[] = [];

    /* ── Parallax on atmospheric bg layers ── */
    if (bg) {
      tweens.push(
        gsap.to(bg, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        })
      );
    }

    /* ── Text entrances ── */
    const trigger = { trigger: section, start: "top 72%" };

    tweens.push(
      gsap.from(section.querySelector(".vip-label"), {
        x: -30, opacity: 0, immediateRender: false,
        duration: 0.7, ease: "power2.out",
        scrollTrigger: trigger,
      }),
      gsap.from(section.querySelector(".vip-elevate"), {
        x: -120, opacity: 0, immediateRender: false,
        duration: 1.2, delay: 0.1, ease: "power4.out",
        scrollTrigger: trigger,
      }),
      gsap.from(section.querySelector(".vip-experience"), {
        x: 120, opacity: 0, immediateRender: false,
        duration: 1.2, delay: 0.2, ease: "power4.out",
        scrollTrigger: trigger,
      }),
      gsap.from(section.querySelector(".vip-meta"), {
        y: 24, opacity: 0, immediateRender: false,
        duration: 0.8, delay: 0.55, ease: "power2.out",
        scrollTrigger: trigger,
      })
    );

    return () => tweens.forEach((tw) => { (tw as gsap.core.Tween).scrollTrigger?.kill(); (tw as gsap.core.Tween).kill(); });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vip"
      className="relative h-screen overflow-hidden flex flex-col justify-between"
      style={{ background: "#0c0300" }}
    >
      {/* ── Atmospheric warm-amber layers (parallax target) ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 110% 70% at 50% -8%, rgba(195,72,0,0.72) 0%, rgba(130,42,0,0.45) 32%, transparent 62%)",
            "radial-gradient(ellipse 60% 45% at 20% 30%, rgba(100,28,0,0.22) 0%, transparent 50%)",
            "radial-gradient(ellipse 80% 35% at 50% 90%, rgba(8,3,0,0.96) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      {/* Ray lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "repeating-conic-gradient(from -5deg at 50% -10%, transparent 0deg, rgba(255,100,20,0.6) 4deg, transparent 8deg)",
        }}
      />

      {/* ── Top row ── */}
      <div className="relative z-10 flex items-start justify-between px-8 md:px-12 pt-20">
        <div>
          <p className="vip-label text-[9px] tracking-[0.35em] text-white/45 uppercase mb-5">
            VIP Tables
          </p>
          <h2
            className="vip-elevate font-display leading-none text-white"
            style={{ fontSize: "clamp(60px, 12vw, 180px)" }}
          >
            ELEVATE
          </h2>
        </div>
        <div className="w-9 h-px bg-white/22 mt-2 shrink-0" />
      </div>

      {/* ── Bottom-right ── */}
      <div className="relative z-10 flex justify-end px-8 md:px-12 pb-16 md:pb-20">
        <div className="text-right max-w-[480px]">
          <h3
            className="vip-experience font-display leading-[0.92] text-white mb-5"
            style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
          >
            YOUR<br />EXPERIENCE
          </h3>
          <div className="vip-meta">
            <p className="text-[10px] tracking-[0.28em] text-white/42 uppercase mb-8 leading-relaxed">
              REACH NEW HEIGHTS WITH A VIP BOOKING
            </p>
            <a
              href="#contact"
              className="inline-block text-[10px] tracking-[0.32em] text-white/38 uppercase underline underline-offset-4 hover:text-white/65 transition-colors duration-200"
            >
              BOOK A VIP TABLE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
