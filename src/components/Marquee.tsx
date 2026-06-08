"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  text?: string;
  speed?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Marquee({
  text = "SPACEPLUS BKK · SUMMER 2026 · SUKHUMVIT SOI 11 · BANGKOK",
  speed = 30,
  className = "",
  size = "md",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
    return () => { tween.kill(); };
  }, [speed]);

  const sizeCls =
    size === "sm" ? "text-[13px]"
    : size === "lg" ? "text-[clamp(18px,2.8vw,42px)]"
    : "text-[clamp(14px,2vw,28px)]";

  const repeated = Array(12).fill(text);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex">
        {[...repeated, ...repeated].map((item, i) => (
          <span
            key={i}
            className={`font-display text-foreground/65 ${sizeCls} mr-14 shrink-0`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
