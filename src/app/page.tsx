import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import Carousel, { CarouselItem } from "@/components/Carousel";
import LineupSection from "@/components/LineupSection";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import StageViewerWrapper from "@/components/StageViewerWrapper";

/* ─────────────────────────────────────────────
   Special Events
───────────────────────────────────────────── */

const specialEvents: CarouselItem[] = [
  {
    id: 1,
    title: "PEGGY GOU PRESENTS MIDNIGHT LOBSTER CLUB",
    tag: "SPECIAL EVENT",
    date: "12 JUN 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#3d0000,#8b1a1a,#c43030)",
    accent: "#ff4444",
    lineup: [{ room: "MAIN ROOM", artists: ["PEGGY GOU", "CALL SUPER", "MR. HO"] }],
    about: "Peggy Gou brings her legendary Midnight Lobster Club concept to SpacePlus Bangkok — a journey through deep house, afro-disco, and late-night techno across multiple rooms. One of the most anticipated nights of 2026.",
    tickets: [
      { label: "EARLY BIRD",        desc: "Limited first-release tickets.",                    price: 1200 },
      { label: "GENERAL ADMISSION", desc: "Standard entry. Includes free shuttle to venue.",    price: 1800 },
      { label: "VIP EXPERIENCE",    desc: "VIP lounge, 3 drinks included, priority entry.",     price: 4500, vip: true },
    ],
    extras: [
      { label: "DRINK PACKAGE — 5 DRINKS", price: 1500 },
    ],
  },
  {
    id: 2,
    title: "ANOTR",
    tag: "SPECIAL EVENT",
    date: "14 JUN 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#001a3d,#0055b3,#3388dd)",
    accent: "#44aaff",
    lineup: [{ room: "MAIN ROOM", artists: ["ANOTR", "MARCO CAROLA", "BONTAN b2b FLETCH", "BELLA"] }],
    about: "After changing the game with their second studio album On A Trip, ANOTR return to SpacePlus Bangkok for a special showcase. The Amsterdam duo brings their signature melodic house sound in what promises to be an unforgettable night.",
    tickets: [
      { label: "ENTRY BEFORE MIDNIGHT — 1ST RELEASE", desc: "Entry before midnight. Includes free shuttle to venue.", price: 1800 },
      { label: "ENTRY BEFORE 1AM — 2ND RELEASE",      desc: "Entry before 1AM. Includes free shuttle to venue.",    price: 2200 },
      { label: "STANDARD TICKET — 2ND RELEASE",        desc: "General admission. Includes free shuttle to venue.",   price: 2800 },
      { label: "VIP EXPERIENCE TICKET",                 desc: "5 drinks, entry via private entrance, valet parking.", price: 8900, vip: true },
    ],
    extras: [
      { label: "PACK 5 DRINKS AT SPACEPLUS BKK", price: 2500 },
    ],
  },
  {
    id: 3,
    title: "ADRIATIQUE PRESENTS X",
    tag: "SPECIAL EVENT",
    date: "21 JUN 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#111,#3a3a3a,#555)",
    accent: "#aaaaaa",
    lineup: [{ room: "MAIN ROOM", artists: ["ADRIATIQUE", "MONIKA KRUSE", "HVOB LIVE"] }],
    about: "Swiss duo Adriatique present their X concept — a stripped-back, immersive sonic experience that blurs the line between club and concert. Expect an evening of deep, hypnotic minimal techno in the heart of Bangkok.",
    tickets: [
      { label: "GENERAL ADMISSION", desc: "Standard entry ticket.", price: 1500 },
      { label: "VIP EXPERIENCE",    desc: "VIP lounge access, 2 drinks, priority entry.", price: 3800, vip: true },
    ],
    extras: [
      { label: "DRINK PACKAGE — 3 DRINKS", price: 900 },
    ],
  },
  {
    id: 4,
    title: "BLACK COFFEE",
    tag: "SPECIAL EVENT",
    date: "28 JUN 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#1a0a00,#a05000,#cc8830)",
    accent: "#ffaa44",
    lineup: [{ room: "MAIN ROOM", artists: ["BLACK COFFEE", "THEMBA", "ENOO NAPA"] }],
    about: "South African icon Black Coffee headlines SpacePlus Bangkok for an unmissable afro-house and deep techno night. Joined by Themba and Enoo Napa, this is Bangkok's biggest African electronic music event of the year.",
    tickets: [
      { label: "EARLY BIRD",        desc: "Very limited availability.",                   price: 1600 },
      { label: "GENERAL ADMISSION", desc: "Standard entry.",                               price: 2400 },
      { label: "VIP TABLE",         desc: "Private table, bottle service, 6 seat minimum.", price: 18000, vip: true },
    ],
    extras: [
      { label: "PREMIUM BOTTLE — GREY GOOSE",    price: 5500 },
      { label: "PREMIUM BOTTLE — HENNESSY VSOP", price: 4800 },
    ],
  },
  {
    id: 5,
    title: "NO ART",
    tag: "SPECIAL EVENT",
    date: "29 SEP 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#001a00,#005500,#22aa55)",
    accent: "#44ff88",
    lineup: [{ room: "MAIN ROOM", artists: ["ANOTR b2b FLETCH", "BONTAN", "MELL & SWOOSH"] }],
    about: "No Art — ANOTR's own label night — comes to Bangkok for the first time. A curated showcase of the freshest names in melodic house and techno with surprise guests expected throughout the night.",
    tickets: [
      { label: "GENERAL ADMISSION", desc: "Standard entry.", price: 1400 },
      { label: "VIP EXPERIENCE",    desc: "VIP lounge, 2 drinks, priority entry.", price: 3500, vip: true },
    ],
    extras: [
      { label: "DRINK PACKAGE — 5 DRINKS", price: 1500 },
    ],
  },
  {
    id: 6,
    title: "CHARLOTTE DE WITTE",
    tag: "SPECIAL EVENT",
    date: "05 JUL 2026",
    time: "23:30",
    bg: "linear-gradient(155deg,#0a001a,#300060,#6600cc)",
    accent: "#8800ff",
    lineup: [{ room: "MAIN ROOM", artists: ["CHARLOTTE DE WITTE", "ALIGNMENT", "INDIRA PAGANOTTO"] }],
    about: "Belgian techno queen Charlotte De Witte descends on SpacePlus for a full night of dark, industrial-grade techno. An uncompromising techno experience from one of the world's most sought-after artists.",
    tickets: [
      { label: "EARLY BIRD",        desc: "Limited early release.",                      price: 1400 },
      { label: "GENERAL ADMISSION", desc: "Standard entry.",                              price: 2200 },
      { label: "VIP EXPERIENCE",    desc: "VIP lounge, 3 drinks, backstage wristband.",   price: 5500, vip: true },
    ],
    extras: [
      { label: "DRINK PACKAGE — 5 DRINKS", price: 1500 },
    ],
  },
];

/* ─────────────────────────────────────────────
   Updates
───────────────────────────────────────────── */

const updates: CarouselItem[] = [
  { id: 1,  title: "WHAT'S ON THIS WEEK",                                  date: "1 JUN 2026",  bg: "linear-gradient(170deg,#060c1a,#0d1830,#12204a)", accent: "#4488ff" },
  { id: 2,  title: "SPACEPLUS GUIDE TO JUNE 2026",                         date: "26 MAY 2026", bg: "linear-gradient(170deg,#1a0800,#4a1800,#cc5500)", accent: "#ff8833" },
  { id: 3,  title: "CARL COX ANNOUNCES DEBUT SPACEPLUS RESIDENCY",         date: "12 MAY 2026", bg: "linear-gradient(170deg,#1a0d00,#8b4500,#d47a10)", accent: "#ff9944" },
  { id: 4,  title: "PEGGY GOU DROPS FIRE LINEUP FOR MIDNIGHT LOBSTER CLUB",date: "8 MAY 2026",  bg: "linear-gradient(170deg,#18120c,#3d2820,#6b4a34)", accent: "#cc8866" },
  { id: 5,  title: "AMELIE LENS B2B ANYMA — EXCLUSIVE BANGKOK NIGHT",      date: "30 APR 2026", bg: "linear-gradient(170deg,#050816,#0d1535,#192855)", accent: "#4466cc" },
  { id: 6,  title: "VIP SUMMER 2026 PACKAGE — EARLY ACCESS",               date: "15 APR 2026", bg: "linear-gradient(170deg,#0c0c0c,#1a1a1a,#2e2e2e)", accent: "#888888" },
  { id: 7,  title: "BEHIND THE BOOTH: SPACEPLUS SOUND SYSTEM STORY",       date: "5 APR 2026",  bg: "linear-gradient(170deg,#0a0010,#200040,#3a0080)", accent: "#8844ff" },
  { id: 8,  title: "BANGKOK'S UNDERGROUND SCENE: 2026 GUIDE",              date: "28 MAR 2026", bg: "linear-gradient(170deg,#001a10,#004030,#006050)", accent: "#00cc88" },
  { id: 9,  title: "NEW: SPACEPLUS ROOFTOP SESSIONS BEGIN",                 date: "15 MAR 2026", bg: "linear-gradient(170deg,#1a1000,#402800,#806000)", accent: "#ddaa00" },
  { id: 10, title: "DJ MAG NAMES SPACEPLUS BEST CLUB IN SE ASIA",           date: "1 MAR 2026",  bg: "linear-gradient(170deg,#1a0014,#4a003a,#880060)", accent: "#cc0088" },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroVideo />
        <Carousel id="special-events" title="SPECIAL EVENTS" items={specialEvents} num={1} showBookNow />
        <LineupSection />
        <Carousel id="updates"        title="UPDATES"        items={updates}       num={2} />
        <Gallery />
        <StageViewerWrapper />
      </main>
      <Footer />
    </>
  );
}
