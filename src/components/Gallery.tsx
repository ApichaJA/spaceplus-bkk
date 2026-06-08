"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

const PHOTOS = [
  { src: "/assets/gallery/G-1.jpeg", alt: "SpacePlus night" },
  { src: "/assets/gallery/G-2.jpeg", alt: "SpacePlus night" },
  { src: "/assets/gallery/G-3.jpg",  alt: "SpacePlus night" },
  { src: "/assets/gallery/G-4.jpg",  alt: "SpacePlus night" },
  { src: "/assets/gallery/G-5.jpg",  alt: "SpacePlus night" },
  { src: "/assets/gallery/G-6.jpeg", alt: "SpacePlus night" },
  { src: "/assets/gallery/G-7.jpeg", alt: "SpacePlus night" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  /* ── Header animation ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = headerRef.current;
    if (!header) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: header, start: "top 82%" };
      gsap.from(".g-num", {
        x: -40, opacity: 0, immediateRender: false,
        duration: 0.7, ease: "power3.out", scrollTrigger: trigger,
      });
      gsap.from(".g-divider", {
        scaleX: 0, transformOrigin: "left center", immediateRender: false,
        duration: 1.1, delay: 0.06, ease: "expo.out", scrollTrigger: trigger,
      });
      /* title animation handled by ScrambleText */
    }, header);

    return () => ctx.revert();
  }, []);

  /* ── Image stagger punch-in ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const rows = section.querySelectorAll<HTMLElement>(".g-row");
    const tweens: ReturnType<typeof gsap.from>[] = [];

    rows.forEach((row, ri) => {
      const imgs = row.querySelectorAll(".g-item");
      const tween = gsap.from(imgs, {
        y: 60,
        scale: 0.86,
        opacity: 0,
        rotation: ri % 2 === 0 ? -1 : 1, /* alternate slight rotation for energy */
        immediateRender: false,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 84%" },
      });
      tweens.push(tween);
    });

    return () => tweens.forEach((tw) => { tw.scrollTrigger?.kill(); tw.kill(); });
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="pt-32 md:pt-44 pb-16 bg-background">

      {/* Header */}
      <div ref={headerRef} className="px-6 md:px-8 mb-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="g-num text-[9px] tracking-[0.4em] text-foreground/25 font-sans uppercase shrink-0">
            <ScrambleText text="03" speed={60} delay={0} />
          </span>
          <div className="g-divider flex-1 h-px bg-foreground/10" />
        </div>
        <h2
          className="g-title font-display leading-none text-foreground"
          style={{ fontSize: "clamp(44px, 8.5vw, 128px)" }}
        >
          <ScrambleText text="GALLERY" delay={200} speed={30} />
        </h2>
      </div>

      {/* Photo grid — 2 + 3 + 2 = 7 images */}
      <div className="px-6 md:px-8 flex flex-col gap-2">

        {/* Row 1 — 2 wide */}
        <div className="g-row grid grid-cols-2 gap-2">
          {PHOTOS.slice(0, 2).map((photo, i) => (
            <div
              key={i}
              className="g-item relative overflow-hidden group"
              style={{ height: "clamp(160px, 28vw, 440px)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/5 transition-colors duration-600" />
            </div>
          ))}
        </div>

        {/* Row 2 — 3 smaller */}
        <div className="g-row grid grid-cols-3 gap-2">
          {PHOTOS.slice(2, 5).map((photo, i) => (
            <div
              key={i}
              className="g-item relative overflow-hidden group"
              style={{ height: "clamp(100px, 18vw, 280px)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 33vw, 30vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/5 transition-colors duration-600" />
            </div>
          ))}
        </div>

        {/* Row 3 — 2 wide */}
        <div className="g-row grid grid-cols-2 gap-2">
          {PHOTOS.slice(5, 7).map((photo, i) => (
            <div
              key={i}
              className="g-item relative overflow-hidden group"
              style={{ height: "clamp(120px, 22vw, 340px)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/5 transition-colors duration-600" />
            </div>
          ))}
        </div>

      </div>

      <div className="h-px bg-foreground/6 mx-6 md:mx-8 mt-12" />
    </section>
  );
}
