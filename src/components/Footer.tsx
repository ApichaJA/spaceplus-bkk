export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('/assets/images/footer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        // backgroundColor: "#0a0e14",
      }}
    >
      {/* Dark overlay — keeps text readable over any background image */}
      {/* <div className="absolute inset-0 bg-black/80 pointer-events-none" /> */}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-10">

        {/* Logo mark */}
        <svg
          width="80"
          height="72"
          viewBox="0 0 80 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-5"
        >
          {/* Outer triangle */}
          <polygon points="40,2 78,70 2,70" fill="white" />
          {/* Inner dark cutout — creates layered depth */}
          <polygon points="40,20 64,62 16,62" fill="black" opacity="0.85" />
          {/* Core highlight */}
          <polygon points="40,33 55,59 25,59" fill="white" opacity="0.75" />
        </svg>

        {/* Wordmark */}
        <p
          className="font-display text-white leading-none mb-2"
          style={{ fontSize: "clamp(28px, 5vw, 48px)", letterSpacing: "0.1em" }}
        >
          SPACEPLUS
        </p>
        <p className="text-[10px] tracking-[0.55em] text-white/55 uppercase mb-10">
          Bangkok
        </p>

        {/* Contact info */}
        <div className="flex flex-col gap-1.5 mb-8">
          <p className="text-[12px] text-white/65 leading-relaxed tracking-wide">
            31/10 3rd floor RCA plaza, Soi Phetchaburi 47,
          </p>
          <p className="text-[12px] text-white/65 tracking-wide">
            Bangkapi, Huai Khwang, Bangkok 10310
          </p>
          <a
            href="mailto:info@spaceplusbkk.com"
            className="text-[12px] text-white/65 hover:text-white transition-colors tracking-wide mt-1"
          >
            info@spaceplusbkk.com
          </a>
          <a
            href="tel:+66811453441"
            className="text-[12px] text-white/65 hover:text-white transition-colors tracking-wide"
          >
            +66 (0) 81 145 3441
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5 mb-14">
          {/* Facebook */}
          <a href="#" aria-label="Facebook" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="#" aria-label="Instagram" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor"/>
            </svg>
          </a>
          {/* YouTube */}
          <a href="#" aria-label="YouTube" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="black"/>
            </svg>
          </a>
          {/* Email */}
          <a href="mailto:info@spaceplusbkk.com" aria-label="Email" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          {/* Phone */}
          <a href="tel:+66811453441" aria-label="Phone" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
          {/* Line */}
          <a href="#" aria-label="Line" className="text-white/45 hover:text-white transition-colors duration-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.02 2 11c0 3.27 1.8 6.14 4.54 7.89.2.12.33.34.29.57l-.38 1.93c-.06.3.21.55.49.42l2.17-1.03c.16-.08.35-.09.51-.03.85.28 1.76.44 2.71.44 5.52 0 10-4.02 10-9 0-4.98-4.48-9-10-9zm-3.5 11.5h-2a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 1 0v4.5h1.5a.5.5 0 0 1 0 1zm2 0a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 1 0v5zm4 0h-2a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 1 0v2l1.85-2.22A.5.5 0 0 1 15.5 8v5a.5.5 0 0 1-1 0v-2.1L13 13.22a.5.5 0 0 1-.5.28z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[10px] tracking-[0.2em] text-white/80 uppercase">
          © Copyright 2022 – Space Plus Bangkok 2026
        </p>
      </div>
    </footer>
  );
}
