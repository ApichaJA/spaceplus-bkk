"use client";

const info = [
  {
    icon: "◈",
    label: "Address",
    value: "123 Sukhumvit Soi 11, Khlong Toei Nuea, Bangkok 10110",
  },
  {
    icon: "◉",
    label: "Operating Hours",
    value: "Thursday – Sunday  |  10 PM – 5 AM",
  },
  { icon: "◆", label: "Reservations", value: "vip@spaceplusbkk.com" },
  { icon: "◇", label: "General Inquiries", value: "hello@spaceplusbkk.com" },
];

const socials = [
  { label: "Instagram", handle: "@spaceplusbkk", href: "#" },
  { label: "Facebook", handle: "SpacePlus BKK", href: "#" },
  { label: "LINE OA", handle: "@spaceplusbkk", href: "#" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#0a0a14]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Find Us
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            CONTACT
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm">
            Questions, press inquiries, or just want to say hi — we&apos;re here.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-5">
            {info.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 p-5 rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a] card-hover"
              >
                <div className="text-xl text-violet-400 mt-0.5 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="text-white text-sm leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="p-5 rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a]">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                Follow Us
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-gray-400 text-xs uppercase tracking-widest">
                        {s.label}
                      </span>
                      <span className="text-violet-400 text-sm font-semibold ml-3 group-hover:text-violet-300 transition-colors">
                        {s.handle}
                      </span>
                    </div>
                    <span className="text-gray-600 group-hover:text-violet-400 transition-colors">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden border border-[#1e1e2e] bg-[#0f0f1a] min-h-[400px] relative flex items-center justify-center">
            {/* Grid background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#8b5cf640 1px, transparent 1px), linear-gradient(90deg, #8b5cf640 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {/* Center marker */}
            <div className="relative z-10 text-center">
              <div className="w-14 h-14 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-4 animate-glow">
                <span className="text-violet-400 text-xl">◈</span>
              </div>
              <p className="text-white font-bold tracking-wider">
                SpacePlus BKK
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Sukhumvit Soi 11, Bangkok
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200"
              >
                Open in Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
