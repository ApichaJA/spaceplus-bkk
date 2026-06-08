const events = [
  {
    id: 1,
    date: "SAT 14 JUN",
    artist: "FISHER",
    genre: "Techno / House",
    tag: "HEADLINER",
    color: "from-violet-600/20 to-transparent",
  },
  {
    id: 2,
    date: "FRI 20 JUN",
    artist: "CHARLOTTE DE WITTE",
    genre: "Dark Techno",
    tag: "EXCLUSIVE",
    color: "from-purple-700/20 to-transparent",
  },
  {
    id: 3,
    date: "SAT 21 JUN",
    artist: "AMELIE LENS",
    genre: "Techno",
    tag: "SOLD OUT",
    color: "from-indigo-600/20 to-transparent",
  },
  {
    id: 4,
    date: "FRI 27 JUN",
    artist: "BORIS BREJCHA",
    genre: "High-Tech Minimal",
    tag: "VIP ONLY",
    color: "from-violet-800/20 to-transparent",
  },
  {
    id: 5,
    date: "SAT 28 JUN",
    artist: "ADAM BEYER",
    genre: "Techno",
    tag: "HEADLINER",
    color: "from-purple-600/20 to-transparent",
  },
  {
    id: 6,
    date: "FRI 04 JUL",
    artist: "NINA KRAVIZ",
    genre: "Techno / Acid",
    tag: "EXCLUSIVE",
    color: "from-violet-700/20 to-transparent",
  },
];

const tagColors: Record<string, string> = {
  HEADLINER: "bg-violet-600/20 text-violet-300 border-violet-500/30",
  EXCLUSIVE: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  "SOLD OUT": "bg-red-500/10 text-red-300 border-red-500/30",
  "VIP ONLY": "bg-purple-500/10 text-purple-300 border-purple-500/30",
};

export default function Events() {
  return (
    <section id="events" className="py-24 px-6 bg-[#08080f]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-violet-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              — Upcoming
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              EVENTS
            </h2>
          </div>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-violet-400 tracking-widest uppercase border-b border-gray-700 hover:border-violet-400 pb-0.5 transition-colors w-fit"
          >
            View All Events →
          </a>
        </div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <div
              key={event.id}
              className={`group relative rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a] overflow-hidden card-hover cursor-pointer`}
            >
              {/* Visual placeholder */}
              <div
                className={`relative h-48 bg-gradient-to-br ${event.color} border-b border-[#1e1e2e] flex items-center justify-center overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <svg viewBox="0 0 100 100" className="w-32 h-32 text-violet-400" fill="currentColor">
                    <circle cx="50" cy="50" r="40" opacity="0.3" />
                    <circle cx="50" cy="50" r="25" opacity="0.5" />
                    <circle cx="50" cy="50" r="10" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl font-black text-white/10 tracking-tighter">
                    {event.artist.split(" ")[0]}
                  </div>
                </div>
                {/* Tag */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${tagColors[event.tag]}`}
                  >
                    {event.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-2">
                  {event.date}
                </p>
                <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-violet-300 transition-colors">
                  {event.artist}
                </h3>
                <p className="text-gray-500 text-sm mb-5">{event.genre}</p>
                <a
                  href="#"
                  className={`inline-flex w-full items-center justify-center py-2.5 rounded-lg border transition-all duration-200 text-sm font-semibold tracking-wider uppercase ${
                    event.tag === "SOLD OUT"
                      ? "border-gray-700 text-gray-600 cursor-not-allowed"
                      : "border-violet-500/40 text-violet-400 hover:bg-violet-600 hover:text-white hover:border-violet-600"
                  }`}
                >
                  {event.tag === "SOLD OUT" ? "Sold Out" : "Get Tickets"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
