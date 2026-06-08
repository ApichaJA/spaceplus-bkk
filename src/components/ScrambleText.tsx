"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$?+=&#";

interface Props {
  text: string;
  className?: string;
  delay?: number; /* ms before scramble starts after trigger */
  speed?: number; /* ms per frame — lower = faster */
}

export default function ScrambleText({
  text,
  className,
  delay = 0,
  speed = 18, /* fast by default */
}: Props) {
  const [display, setDisplay]   = useState(text);
  const [show,    setShow]      = useState(false); /* hidden until in-view */
  const [triggered, setTrigger] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  /* ── Watch scroll position ── */
  useEffect(() => {
    const el = ref.current;
    if (!el || triggered) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  /* ── Scramble when triggered ── */
  useEffect(() => {
    if (!triggered) return;

    const chars = text.split("");
    const FPC   = 2; /* frames per char until resolved */
    const total = chars.length * FPC + FPC;
    let frame   = 0;
    let iid: ReturnType<typeof setInterval>;

    /* Show random chars immediately */
    setDisplay(
      chars
        .map(ch => (/[A-Za-z0-9]/.test(ch) ? CHARS[Math.floor(Math.random() * CHARS.length)] : ch))
        .join("")
    );
    setShow(true);

    const tid = setTimeout(() => {
      iid = setInterval(() => {
        setDisplay(
          chars
            .map((ch, i) => {
              if (!/[A-Za-z0-9]/.test(ch)) return ch;
              if (frame >= (i + 1) * FPC) return ch; /* resolved */
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        frame++;
        if (frame > total) {
          clearInterval(iid);
          setDisplay(text);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(tid);
      clearInterval(iid);
    };
  }, [triggered, text, delay, speed]);

  return (
    <span ref={ref} className={className} style={{ opacity: show ? 1 : 0 }}>
      {display}
    </span>
  );
}
