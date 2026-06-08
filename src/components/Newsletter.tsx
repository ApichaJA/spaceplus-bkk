"use client";

import { useState } from "react";

const genres = [
  "Drum & Bass",
  "Disco",
  "Progressive / Festival / Trance / Dance / Pop",
  "Electronic",
  "Hard Techno / Psy Techno",
  "House / Tech House / Deep House / Minimal",
  "Afro House / Latin House",
  "Reggaeton",
  "Melodic Techno / Techno",
];

const countryCodes = ["+66", "+1", "+44", "+81", "+65", "+86", "+49", "+33", "+61", "+82"];
const languages = ["English", "Thai", "Japanese", "Chinese", "French", "German", "Spanish", "Korean"];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  phone: string;
  birthday: string;
  language: string;
  consent: boolean;
  privacy: boolean;
}

export default function Newsletter() {
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", code: "+66",
    phone: "", birthday: "", language: "", consent: false, privacy: false,
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const setField =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target instanceof HTMLInputElement && e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const toggleGenre = (g: string) =>
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="newsletter"
      className="flex flex-col md:flex-row min-h-screen bg-[#1c1c1c]"
    >
      {/* Left — huge heading */}
      <div className="flex-1 p-12 md:p-16 lg:p-24 flex items-center">
        <h2
          className="font-display leading-[0.88] text-foreground"
          style={{ fontSize: "clamp(44px, 6.8vw, 115px)" }}
        >
          NEVER<br />MISS A<br />TRANSMISSION
        </h2>
      </div>

      {/* Right — cream form panel */}
      <div
        className="w-full md:w-[420px] lg:w-[490px] shrink-0 flex flex-col justify-center px-10 py-12 lg:px-12"
        style={{ background: "#c4bfb9", color: "#1a1a1a" }}
      >
        {submitted ? (
          <div className="text-center py-12">
            <p
              className="font-display leading-tight mb-4"
              style={{ fontSize: "clamp(32px, 3.5vw, 52px)" }}
            >
              TRANSMISSION<br />RECEIVED
            </p>
            <p className="text-[10px] tracking-[0.3em] text-neutral-600 uppercase">
              We&apos;ll be in touch.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-8 text-[10px] tracking-[0.25em] text-neutral-500 uppercase underline hover:text-neutral-800 transition-colors"
            >
              Subscribe again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="FIRST NAME *">
                <input required value={form.firstName} onChange={setField("firstName")} className={inputCls} />
              </FormField>
              <FormField label="LAST NAME *">
                <input required value={form.lastName} onChange={setField("lastName")} className={inputCls} />
              </FormField>
            </div>

            {/* Email */}
            <FormField label="EMAIL ADDRESS *">
              <input type="email" required value={form.email} onChange={setField("email")} className={inputCls} />
            </FormField>

            {/* Phone */}
            <div className="flex gap-3 items-end">
              <FormField label="CODE">
                <select value={form.code} onChange={setField("code")} className={`${inputCls} w-20 appearance-none cursor-pointer`}>
                  {countryCodes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FormField>
              <div className="flex-1">
                <FormField label="PHONE *">
                  <input type="tel" required value={form.phone} onChange={setField("phone")} className={inputCls} />
                </FormField>
              </div>
            </div>

            {/* Music preference */}
            <div>
              <p className={labelCls}>MUSIC PREFERENCE</p>
              <div className="space-y-2 mt-1">
                {genres.map((g) => (
                  <label key={g} className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={selectedGenres.includes(g)}
                      onChange={() => toggleGenre(g)}
                      className="mt-0.5 accent-neutral-800 shrink-0"
                    />
                    <span className="text-[11px] text-neutral-700 leading-tight group-hover:text-neutral-900 transition-colors">
                      {g}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Birthday + Language */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="BIRTHDAY">
                <input type="date" value={form.birthday} onChange={setField("birthday")} className={inputCls} />
              </FormField>
              <FormField label="LANGUAGE">
                <select value={form.language} onChange={setField("language")} className={`${inputCls} appearance-none cursor-pointer`}>
                  <option value="">Choose</option>
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </FormField>
            </div>

            {/* Consent */}
            <div className="space-y-2.5">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.consent} onChange={setField("consent")} className="mt-0.5 accent-neutral-800 shrink-0" />
                <span className="text-[10px] text-neutral-600 leading-tight">
                  I wish to receive news and event updates from SpacePlus BKK and partner events.
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" required checked={form.privacy} onChange={setField("privacy")} className="mt-0.5 accent-neutral-800 shrink-0" />
                <span className="text-[10px] text-neutral-600 leading-tight">
                  I have read and accept the{" "}
                  <a href="#" className="underline hover:text-neutral-900 transition-colors">Privacy Policy</a>{" *"}
                </span>
              </label>
              <p className="text-[9px] text-neutral-500">Fields marked with an asterisk (*) are required.</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-[#1c1c1c] text-[#f0ede8] text-[11px] tracking-[0.35em] uppercase hover:bg-[#111] transition-colors duration-200 mt-2"
            >
              Transmit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const labelCls = "text-[9px] tracking-[0.22em] text-neutral-600 uppercase mb-1.5 block";
const inputCls =
  "w-full bg-transparent border-b border-neutral-500/50 py-1.5 text-[12px] text-neutral-800 focus:outline-none focus:border-neutral-800 transition-colors placeholder:text-neutral-500";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}
