"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

const PANELS = [
  {
    image:   "/assets/images/Local_ACT.jpg",
    eyebrow: "EVERY NIGHT IS A SPECIAL NIGHT",
    title:   "OUR RESIDENTS",
    cta:     "SEE OUR LOCAL ACTS",
    href:    "#special-events",
    delay:   0,
  },
  {
    image:   "/assets/images/International_ACT.jpg",
    eyebrow: "LETS MAKE HISTORY",
    title:   "OUR INTERNATIONALS",
    cta:     "SEE OUR INTERNATIONAL ACTS",
    href:    "#special-events",
    delay:   140,
  },
];

export default function LineupSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    /* Panels fade + slight scale punch */
    const panels = section.querySelectorAll<HTMLElement>(".lp-panel");
    const t1 = gsap.from(panels, {
      opacity: 0,
      scale: 0.97,
      immediateRender: false,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 72%" },
    });

    /* CTA buttons rise up */
    const btns = section.querySelectorAll<HTMLElement>(".lp-btn");
    const t2 = gsap.from(btns, {
      y: 22,
      opacity: 0,
      immediateRender: false,
      duration: 0.7,
      delay: 0.55,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: { trigger: section, start: "top 72%" },
    });

    return () => {
      t1.scrollTrigger?.kill(); t1.kill();
      t2.scrollTrigger?.kill(); t2.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lineup"
      className="flex"
      style={{ minHeight: "clamp(480px, 80vh, 900px)" }}
    >
      {PANELS.map((panel, i) => (
        <div
          key={i}
          className="lp-panel relative flex-1 overflow-hidden group"
        >
          {/* Background photo */}
          <Image
            src={panel.image}
            alt={panel.title}
            fill
            sizes="50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />

          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.18) 100%)",
                "linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 55%)",
              ].join(","),
            }}
          />

          {/* Divider between panels */}
          {i < PANELS.length - 1 && (
            <div className="absolute top-0 right-0 bottom-0 w-px bg-white/12 z-10" />
          )}

          {/* Text */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end px-8 md:px-14 pb-12 md:pb-16">
            <p className="text-[9px] tracking-[0.38em] text-white/50 uppercase mb-4">
              {panel.eyebrow}
            </p>

            <h2
              className="font-display leading-none text-white mb-7"
              style={{ fontSize: "clamp(34px, 4.5vw, 76px)" }}
            >
              <ScrambleText text={panel.title} delay={panel.delay} speed={30} />
            </h2>

            <a
              href={panel.href}
              className="lp-btn inline-flex items-center gap-3 w-fit px-5 py-3 text-[9px] tracking-[0.28em] uppercase text-white transition-all duration-300 hover:bg-white/25"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(6px)",
              }}
            >
              {panel.cta}
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
