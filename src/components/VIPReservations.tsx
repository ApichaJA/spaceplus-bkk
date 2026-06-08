"use client";

import { useState } from "react";

const perks = [
  {
    icon: "◈",
    title: "Private Table",
    desc: "Dedicated table with guaranteed seating in prime locations.",
  },
  {
    icon: "◉",
    title: "Bottle Service",
    desc: "Premium spirits and champagne delivered directly to your table.",
  },
  {
    icon: "◆",
    title: "Priority Entry",
    desc: "Skip the queue and enter with exclusive VIP access.",
  },
  {
    icon: "◇",
    title: "Personal Host",
    desc: "Dedicated host to ensure your experience is flawless.",
  },
];

export default function VIPReservations() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="vip"
      className="py-24 px-6 relative overflow-hidden bg-[#08080f]"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-violet-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            — Exclusive Access
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            VIP RESERVATIONS
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Elevate your night. Reserve a VIP table and experience SpacePlus at
            its finest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Perks */}
          <div>
            <h3 className="text-xl font-bold text-white mb-8 tracking-wide">
              What&apos;s Included
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="p-5 rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a] card-hover"
                >
                  <div className="text-2xl text-violet-400 mb-3">
                    {perk.icon}
                  </div>
                  <h4 className="text-white font-bold mb-1">{perk.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Minimum spend note */}
            <div className="mt-8 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5">
              <p className="text-violet-300 text-sm font-semibold mb-1">
                Minimum Spend from ฿15,000
              </p>
              <p className="text-gray-500 text-xs">
                Pricing varies by event and table location. Our team will
                confirm details within 24 hours.
              </p>
            </div>
          </div>

          {/* Booking form */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#0f0f1a] p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">◉</div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Request Received
                </h3>
                <p className="text-gray-400 text-sm">
                  Our VIP team will contact you within 24 hours to confirm your
                  reservation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-violet-400 text-sm underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white mb-6 tracking-wide">
                  Reserve Your Table
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+66 xx xxx xxxx"
                      className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Event Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date}
                      onChange={handleChange}
                      className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                      Guests
                    </label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option value="">Select</option>
                      {["2–4", "5–8", "9–12", "13+"].map((g) => (
                        <option key={g} value={g}>
                          {g} people
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Occasion, preferences..."
                    className="w-full bg-[#08080f] border border-[#2a2a3e] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold tracking-wider uppercase text-sm transition-all duration-200 animate-glow"
                >
                  Submit VIP Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
