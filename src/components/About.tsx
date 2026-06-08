const milestones = [
  { year: "2018", event: "SpacePlus opens its doors in the heart of Bangkok" },
  { year: "2020", event: "Expansion to 3,000 sqm flagship venue" },
  { year: "2022", event: "Named Best Club in Southeast Asia by DJ Mag" },
  { year: "2024", event: "Launched exclusive residency program with global DJs" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#08080f] relative overflow-hidden">
      {/* Background element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <div className="relative">
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-900/30 via-purple-800/20 to-indigo-900/30 border border-[#1e1e2e] h-[420px] flex items-center justify-center">
              {/* Concentric circles */}
              <div className="relative flex items-center justify-center">
                {[160, 120, 80, 44].map((size, i) => (
                  <div
                    key={size}
                    className="absolute rounded-full border border-violet-500/10 animate-float"
                    style={{
                      width: size,
                      height: size,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
                <div className="w-20 h-20 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center animate-glow">
                  <span className="text-white font-black text-2xl tracking-tight">SP</span>
                </div>
              </div>

              {/* Floating labels */}
              <div className="absolute top-8 left-8 px-3 py-1.5 rounded-full bg-[#0f0f1a] border border-[#1e1e2e] text-xs text-violet-300 tracking-wider">
                Est. 2018
              </div>
              <div className="absolute bottom-8 right-8 px-3 py-1.5 rounded-full bg-[#0f0f1a] border border-[#1e1e2e] text-xs text-violet-300 tracking-wider">
                Bangkok, TH
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-5">
              {[
                { n: "3,000", u: "sqm" },
                { n: "2", u: "floors" },
                { n: "1,200", u: "capacity" },
              ].map((s) => (
                <div
                  key={s.u}
                  className="rounded-xl border border-[#1e1e2e] bg-[#0f0f1a] p-4 text-center"
                >
                  <div className="text-2xl font-black gradient-text">{s.n}</div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase mt-0.5">
                    {s.u}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Story */}
          <div>
            <p className="text-violet-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              — Our Story
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
              ABOUT<br />SPACEPLUS
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              Born from a vision to redefine Bangkok&apos;s nightlife,
              SpacePlus BKK is more than a club — it&apos;s a sanctuary for
              those who live for the music. Set across two floors in the heart
              of the city, we bring together world-class sound systems,
              immersive lighting rigs, and the planet&apos;s most sought-after
              electronic artists.
            </p>
            <p className="text-gray-500 leading-relaxed mb-10">
              From intimate underground sets to massive headline shows, every
              night at SpacePlus is crafted to create a connection between the
              music, the space, and the people who fill it.
            </p>

            {/* Timeline */}
            <div className="space-y-5">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-violet-500/30 bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-violet-400" />
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-[#1e1e2e] mt-1 min-h-[24px]" />
                    )}
                  </div>
                  <div className="pb-5">
                    <span className="text-violet-400 text-xs font-bold tracking-widest uppercase">
                      {m.year}
                    </span>
                    <p className="text-gray-300 text-sm mt-0.5">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
