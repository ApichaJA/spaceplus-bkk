const artistCards = [
  {
    name: "CARL COX",
    rotate: -9,
    style: { left: "10%", top: "24%", width: "15vw", height: "46vh" },
    bg: "linear-gradient(170deg, #2e2e2e 0%, #1a1a1a 60%, #111 100%)",
  },
  {
    name: "CHARLOTTE DE WITTE",
    rotate: 4,
    style: { left: "27%", top: "19%", width: "15vw", height: "50vh" },
    bg: "linear-gradient(160deg, #3a3a3a 0%, #222 50%, #111 100%)",
  },
  {
    name: "TIËSTO",
    rotate: -2,
    style: { left: "53%", top: "22%", width: "15vw", height: "48vh" },
    bg: "linear-gradient(175deg, #333 0%, #1e1e1e 55%, #0f0f0f 100%)",
  },
  {
    name: "BORIS BREJCHA",
    rotate: 8,
    style: { left: "71%", top: "18%", width: "15vw", height: "52vh" },
    bg: "linear-gradient(165deg, #2a2a2a 0%, #191919 55%, #111 100%)",
  },
];

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden bg-background select-none">

      {/* Corner decoration lines — below navbar */}
      <div className="absolute top-19.5 left-8 w-9 h-px bg-foreground/25" />
      <div className="absolute top-19.5 right-8 w-9 h-px bg-foreground/25" />

      {/* Centred subtle subtitle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center pointer-events-none">
        <p className="text-[9px] tracking-[0.4em] text-foreground/35 uppercase">
          Landed Bangkok &mdash; Summer 2026
        </p>
      </div>

      {/* Massive full-bleed display text */}
      <div className="absolute bottom-[9vh] left-0 right-0 flex justify-center pointer-events-none">
        <span
          className="font-display text-foreground leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(80px, 20.5vw, 320px)" }}
        >
          SPACEPLUS
        </span>
      </div>

      {/* Artist photo cards overlaid on the text */}
      {artistCards.map((card) => (
        <div
          key={card.name}
          className="absolute overflow-hidden"
          style={{
            ...card.style,
            transform: `rotate(${card.rotate}deg)`,
            background: card.bg,
          }}
        >
          {/* Simulate a grayscale photo — lighter top fading to dark */}
          <div className="w-full h-full flex flex-col justify-end p-3"
            style={{
              background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          >
            <span className="text-[9px] tracking-[0.2em] text-foreground/50 uppercase">
              {card.name}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
