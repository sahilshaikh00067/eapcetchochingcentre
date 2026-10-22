import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   EAPCET COACHING CENTRE - single file App.jsx
   Requires: React 18 + Tailwind CSS. Edit CONFIG below.
   Palette: Navy #0B1B34 | Royal Blue #2563EB | Gold #F5B93B
            Surface #F6F8FC | White #FFFFFF
   ============================================================ */

const CONFIG = {
  name: "EAPCET Coaching Centre",
  examDate: "2027-04-29T09:00:00", // change to your exam date
  phone: "+91 98765 43210",
  email: "admissions@eapcetcentre.in",
  address: "Plot 21, Ameerpet Main Road, Hyderabad, Telangana 500016",
  whatsapp: "919876543210",
  heroVideo: "https://www.w3schools.com/html/mov_bbb.mp4", // replace with your video
  promoVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
};

const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero: u("photo-1523050854058-8df90110c9f1", 1600),
  class: u("photo-1427504494785-3a9ca7044f45"),
  group: u("photo-1522202176988-66273c2fd55f"),
  study: u("photo-1580582932707-520aed937b7b"),
  hall: u("photo-1524178232363-1fb2b075b655"),
  teach: u("photo-1509062522246-3755977927d7"),
  lib: u("photo-1546410531-bb4caa6b424d"),
};

const COURSES = [
  { t: "2-Year Classroom Program", d: "Starts in Intermediate 1st year. Complete syllabus, weekly tests and daily doubt hours.", p: "₹1,10,000", img: IMG.class, tag: "Most popular" },
  { t: "1-Year Intensive Program", d: "A fast-track batch built for Intermediate 2nd year students.", p: "₹78,000", img: IMG.teach, tag: "Fast track" },
  { t: "Crash Course", d: "60 days of focused revision with 40 mock tests and rank-booster sessions.", p: "₹24,000", img: IMG.lib, tag: "Last 2 months" },
  { t: "Live Online Program", d: "Live classes, recordings and an app-based test series from anywhere.", p: "₹32,000", img: IMG.study, tag: "Learn anywhere" },
];

const FACULTY = [
  { n: "Dr. Ramesh Babu", r: "Mathematics · 18 years", img: u("photo-1507003211169-0a1dd7228f2d", 600) },
  { n: "Ms. Lavanya Reddy", r: "Physics · 14 years", img: u("photo-1494790108377-be9c29b29330", 600) },
  { n: "Mr. Karthik Rao", r: "Chemistry · 12 years", img: u("photo-1472099645785-5658abf4ff4e", 600) },
  { n: "Ms. Sravani Devi", r: "Test Strategy · 10 years", img: u("photo-1573496359142-b8d87734a5a2", 600) },
];

const STORIES = [
  { n: "Sai Teja", rank: "EAPCET Rank 312", q: "The weekly tests taught me time management. In the last three months my rank improved from 4,000 to 312.", img: u("photo-1500648767791-00dcc994a43e", 400) },
  { n: "Harika", rank: "EAPCET Rank 704", q: "My physics doubts were cleared the same day. The faculty knows every student by name.", img: u("photo-1438761681033-6461ffad8d80", 400) },
  { n: "Vamsi Krishna", rank: "EAPCET Rank 1,150", q: "The mock tests felt exactly like the real exam, so I walked into the exam hall completely calm.", img: u("photo-1472099645785-5658abf4ff4e", 400) },
];

const FAQ = [
  ["How do I get admission?", "Attend a free demo class. After a short counselling session, we allot you a batch. Seats are limited."],
  ["Can I pay the fees in installments?", "Yes. Two or three installments are available, and the scholarship test can earn up to 50% off."],
  ["What is the batch size?", "Each batch has a maximum of 35 students, so every student gets personal attention."],
  ["Are online class recordings available?", "Yes. Every live class is recorded and stays available in the app for 12 months."],
];

/* ---------------- hooks and helpers ---------------- */
function useCountdown(target) {
  const calc = () => {
    const d = Math.max(0, new Date(target).getTime() - Date.now());
    return { d: Math.floor(d / 864e5), h: Math.floor(d / 36e5) % 24, m: Math.floor(d / 6e4) % 60, s: Math.floor(d / 1e3) % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.2 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Counter({ to, suffix = "" }) {
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    let start = null;
    const step = (ts) => {
      start = start || ts;
      const p = Math.min((ts - start) / 1800, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      p < 1 && requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [seen]);
  return <span ref={ref}>{v.toLocaleString("en-IN")}{suffix}</span>;
}

function Tilt({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateZ(6px)`;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => (ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)");
  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`tilt ${className}`}>{children}</div>;
}

function Reveal({ children, className = "" }) {
  const [ref, seen] = useInView();
  return <div ref={ref} className={`${className} transition-all duration-700 ease-out ${seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{children}</div>;
}

const Heading = ({ title, sub, light, center }) => (
  <Reveal className={center ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
    <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${light ? "text-white" : "text-[#0B1B34]"}`}>{title}</h2>
    {sub && <p className={`mt-4 text-lg ${light ? "text-slate-300" : "text-slate-600"}`}>{sub}</p>}
  </Reveal>
);

/* ---------------- sections ---------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["Courses", "#courses"], ["Videos", "#video"], ["Results", "#results"], ["Faculty", "#faculty"], ["FAQ", "#faq"], ["Contact", "#contact"]];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0B1B34]/90 backdrop-blur-xl shadow-lg shadow-black/20 py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br from-[#F5B93B] to-[#E69B0E] text-[#0B1B34] font-black group-hover:rotate-12 transition">E</span>
          <span className="font-display text-lg font-bold text-white">EAPCET Coaching Centre</span>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([l, h]) => <a key={l} href={h} className="navlink text-sm font-medium text-slate-200 hover:text-white">{l}</a>)}
          <a href="#contact" className="btn-primary">Book a free demo</a>
        </nav>
        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          <div className="space-y-1.5">
            <i className={`block h-0.5 w-6 bg-white transition ${open ? "rotate-45 translate-y-2" : ""}`} />
            <i className={`block h-0.5 w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <i className={`block h-0.5 w-6 bg-white transition ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-[#0B1B34]/95 backdrop-blur-xl ${open ? "max-h-96 mt-3" : "max-h-0"}`}>
        {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="block px-6 py-3 text-slate-100 border-b border-white/10">{l}</a>)}
      </div>
    </header>
  );
}

function Hero() {
  const t = useCountdown(CONFIG.examDate);
  const [m, setM] = useState({ x: 0, y: 0 });
  const box = (v, l) => (
    <div className="flex-1 min-w-[64px] text-center rounded-xl bg-white/[0.07] border border-white/15 backdrop-blur py-3">
      <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums">{String(v).padStart(2, "0")}</div>
      <div className="text-xs text-slate-300 mt-1">{l}</div>
    </div>
  );
  return (
    <section id="top" onMouseMove={(e) => setM({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
      className="relative min-h-screen overflow-hidden flex items-center bg-[#0B1B34]">
      <video autoPlay muted loop playsInline poster={IMG.hero} className="absolute inset-0 h-full w-full object-cover opacity-30">
        <source src={CONFIG.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1B34] via-[#0B1B34]/90 to-[#12306B]/80" />
      <div className="absolute inset-0 grid-bg" />
      <div className="orb orb1" style={{ transform: `translate(${m.x * 50}px,${m.y * 50}px)` }} />
      <div className="orb orb2" style={{ transform: `translate(${m.x * -60}px,${m.y * -40}px)` }} />
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-32 pb-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 text-slate-100 px-4 py-1.5 text-sm border border-white/20">
            <span className="h-2 w-2 rounded-full bg-[#F5B93B] animate-ping" /> Admissions open for the new batch
          </p>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight text-white">
            Your engineering seat starts with a <span className="shimmer">top rank.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-300">
            Premium EAPCET coaching in Hyderabad: only 35 students per batch, weekly tests, and strategy sessions led by toppers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary text-base px-8 py-4">Book a free demo class</a>
            <a href="#video" className="btn-ghost text-base px-8 py-4">Watch campus video</a>
          </div>
          <div className="mt-12">
            <p className="text-slate-300 mb-3 text-sm">Time left for EAPCET:</p>
            <div className="flex gap-3 max-w-md">{box(t.d, "Days")}{box(t.h, "Hours")}{box(t.m, "Minutes")}{box(t.s, "Seconds")}</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Tilt max={14} className="relative">
            <img src={IMG.group} alt="Students studying together" className="rounded-3xl h-[520px] w-full object-cover shadow-2xl shadow-black/50 border border-white/15" />
            <div className="glare" />
            <div className="float-slow absolute -left-10 bottom-12 rounded-2xl bg-white p-4 shadow-xl" style={{ transform: "translateZ(60px)" }}>
              <p className="text-xs text-slate-500">Last year's result</p>
              <p className="font-display text-2xl font-extrabold text-[#0B1B34]">38 students</p>
              <p className="text-xs text-slate-500">in the top 1000 ranks</p>
            </div>
            <div className="float-slow2 absolute -right-6 top-10 rounded-2xl bg-gradient-to-br from-[#F5B93B] to-[#E69B0E] p-4 shadow-xl text-[#0B1B34]">
              <p className="font-display text-3xl font-extrabold">96%</p>
              <p className="text-xs font-semibold">qualifying rate</p>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["JNTU Hyderabad", "Osmania University", "CBIT", "VNR VJIET", "Vasavi College", "Gokaraju Rangaraju", "MGIT", "Sreenidhi"];
  return (
    <div className="bg-[#2563EB] py-4 overflow-hidden">
      <div className="marquee flex gap-14 whitespace-nowrap font-display font-semibold text-white text-lg">
        {[...items, ...items, ...items].map((x, i) => <span key={i}>{x} ✦</span>)}
      </div>
    </div>
  );
}

function Stats() {
  const s = [[12500, "+", "Students trained"], [38, "", "Top 1000 ranks this year"], [15, "+", "Years of experience"], [96, "%", "Qualifying rate"]];
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {s.map(([n, suf, l]) => (
          <Reveal key={l}>
            <Tilt className="rounded-2xl bg-[#F6F8FC] border border-slate-200 p-8 text-center hover:shadow-xl hover:shadow-blue-900/10 transition-shadow">
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#2563EB]"><Counter to={n} suffix={suf} /></div>
              <p className="mt-2 text-slate-600 text-sm font-medium">{l}</p>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section id="courses" className="bg-[#F6F8FC] py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Heading title="Choose the program that fits you" sub="Every course includes weekly tests, doubt clearing and printed study material." />
        <div className="mt-14 grid sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {COURSES.map((c) => (
            <Reveal key={c.t}>
              <Tilt className="group relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-lg shadow-blue-900/5 h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={c.img} alt={c.t} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute top-4 left-4 rounded-full bg-[#F5B93B] px-3 py-1 text-xs font-bold text-[#0B1B34]">{c.tag}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-[#0B1B34]">{c.t}</h3>
                  <p className="mt-2 text-sm text-slate-600">{c.d}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-2xl font-extrabold text-[#2563EB]">{c.p}</span>
                    <a href="#contact" className="rounded-full bg-[#0B1B34] text-white px-4 py-2 text-sm font-medium hover:bg-[#2563EB] transition">Enquire</a>
                  </div>
                </div>
                <div className="glare" />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const [play, setPlay] = useState(false);
  return (
    <section id="video" className="relative bg-[#0B1B34] py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="orb orb2" style={{ opacity: 0.2 }} />
      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2">
          <Heading light title="A day on our campus" sub="Meet our faculty and see the classrooms, library and test hall where students prepare for the exam." />
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[IMG.hall, IMG.lib, IMG.teach].map((s, i) => (
              <img key={i} src={s} alt="Campus" className="h-24 w-full object-cover rounded-xl hover:scale-105 hover:-rotate-2 transition duration-500" />
            ))}
          </div>
        </div>
        <Reveal className="lg:col-span-3">
          <Tilt max={6} className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/60">
            {play ? (
              <video src={CONFIG.promoVideo} controls autoPlay className="w-full aspect-video bg-black" />
            ) : (
              <button onClick={() => setPlay(true)} className="group relative block w-full aspect-video" aria-label="Play video">
                <img src={IMG.hall} alt="Campus video" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[#0B1B34]/50 group-hover:bg-[#0B1B34]/30 transition" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="pulse-ring grid place-items-center h-24 w-24 rounded-full bg-[#F5B93B] text-[#0B1B34] text-3xl group-hover:scale-110 transition">▶</span>
                </span>
              </button>
            )}
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function Results() {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) return;
    const id = setInterval(() => setI((p) => (p + 1) % STORIES.length), 5000);
    return () => clearInterval(id);
  }, [pause]);
  const go = (d) => setI((i + d + STORIES.length) % STORIES.length);
  return (
    <section id="results" className="bg-white py-24" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      <div className="mx-auto max-w-5xl px-5">
        <Heading center title="In our toppers' own words" />
        <div className="relative mt-14 overflow-hidden rounded-3xl">
          <div className="flex transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)]" style={{ transform: `translateX(-${i * 100}%)` }}>
            {STORIES.map((s) => (
              <div key={s.n} className="min-w-full p-2">
                <div className="grid md:grid-cols-5 bg-gradient-to-br from-[#0B1B34] to-[#12306B] rounded-2xl overflow-hidden">
                  <img src={s.img} alt={s.n} className="md:col-span-2 h-64 md:h-full w-full object-cover" />
                  <div className="md:col-span-3 p-8 sm:p-12 flex flex-col justify-center">
                    <p className="text-[#F5B93B] text-6xl font-display leading-none">“</p>
                    <p className="text-xl sm:text-2xl text-white leading-relaxed">{s.q}</p>
                    <p className="mt-6 font-bold text-white">{s.n}</p>
                    <p className="text-[#F5B93B] text-sm font-medium">{s.rank}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => go(-1)} aria-label="Previous" className="arrow left-3">‹</button>
          <button onClick={() => go(1)} aria-label="Next" className="arrow right-3">›</button>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {STORIES.map((_, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} className={`h-2.5 rounded-full transition-all ${k === i ? "w-10 bg-[#2563EB]" : "w-2.5 bg-slate-300"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section id="faculty" className="bg-[#F6F8FC] py-24">
      <div className="mx-auto max-w-7xl px-5">
        <Heading title="Faculty who know the exam inside out" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {FACULTY.map((f) => (
            <Reveal key={f.n}>
              <Tilt className="group relative rounded-2xl overflow-hidden h-96 shadow-lg shadow-blue-900/10">
                <img src={f.img} alt={f.n} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B34] via-[#0B1B34]/20 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white translate-y-2 group-hover:translate-y-0 transition">
                  <h3 className="font-display text-xl font-bold">{f.n}</h3>
                  <p className="text-[#F5B93B] text-sm">{f.r}</p>
                </div>
                <div className="glare" />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [o, setO] = useState(0);
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Heading center title="Frequently asked questions" />
        <div className="mt-12 space-y-4">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="rounded-xl bg-[#F6F8FC] border border-slate-200 overflow-hidden">
              <button onClick={() => setO(o === i ? -1 : i)} className="w-full flex justify-between items-center text-left p-6 font-semibold text-[#0B1B34]">
                {q}<span className={`text-2xl text-[#2563EB] transition-transform ${o === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-500 ${o === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden"><p className="px-6 pb-6 text-slate-600">{a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ openLegal }) {
  const [f, setF] = useState({ name: "", phone: "", cls: "", msg: "", agree: false });
  const [err, setErr] = useState({});
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = "Please enter the student's full name.";
    if (!/^[6-9]\d{9}$/.test(f.phone)) x.phone = "Enter a valid 10-digit mobile number.";
    if (!f.cls) x.cls = "Please select the current class.";
    if (!f.agree) x.agree = "You must accept the policies to continue.";
    setErr(x);
    if (Object.keys(x).length) return;
    // TODO: connect your API / Google Sheet / EmailJS here
    console.log("Enquiry:", f);
    setDone(true);
  };
  const field = "w-full rounded-xl bg-white border border-slate-300 px-4 py-3.5 text-slate-900 placeholder-slate-400 outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 transition";
  const Err = ({ k }) => err[k] ? <p className="text-red-600 text-sm mt-1">{err[k]}</p> : null;
  return (
    <section id="contact" className="relative bg-[#0B1B34] py-24 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="orb orb1" style={{ opacity: 0.25 }} />
      <div className="relative mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-14 items-start">
        <div>
          <Heading light title="Your first class is free. Seats are limited." sub="Fill in the form and our team will call you within 24 hours to schedule your demo class." />
          <div className="mt-10 space-y-5 text-slate-200">
            <p><span className="text-[#F5B93B] font-semibold block">Phone</span><a href={`tel:${CONFIG.phone}`} className="hover:text-white">{CONFIG.phone}</a></p>
            <p><span className="text-[#F5B93B] font-semibold block">Email</span>{CONFIG.email}</p>
            <p><span className="text-[#F5B93B] font-semibold block">Address</span>{CONFIG.address}</p>
          </div>
          <iframe title="Map" className="mt-8 w-full h-48 rounded-2xl border border-white/15 grayscale hover:grayscale-0 transition duration-700"
            src="https://www.google.com/maps?q=Ameerpet+Hyderabad&output=embed" loading="lazy" />
        </div>
        <Reveal>
          <Tilt max={3} className="rounded-3xl bg-white p-7 sm:p-10 shadow-2xl shadow-black/40">
            {done ? (
              <div className="text-center py-16">
                <div className="mx-auto grid place-items-center h-20 w-20 rounded-full bg-[#2563EB] text-white text-4xl pop">✓</div>
                <h3 className="font-display text-2xl font-bold text-[#0B1B34] mt-6">Thank you, we got your enquiry</h3>
                <p className="text-slate-600 mt-2">We will call you on {f.phone} within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <h3 className="font-display text-2xl font-bold text-[#0B1B34]">Book your free demo class</h3>
                <div><input className={field} placeholder="Student's full name" value={f.name} onChange={set("name")} /><Err k="name" /></div>
                <div><input className={field} placeholder="Mobile number" inputMode="numeric" maxLength={10} value={f.phone} onChange={set("phone")} /><Err k="phone" /></div>
                <div>
                  <select className={field} value={f.cls} onChange={set("cls")}>
                    <option value="">Current class</option>
                    <option>Intermediate 1st year</option>
                    <option>Intermediate 2nd year</option>
                    <option>Passed out / Repeater</option>
                  </select>
                  <Err k="cls" />
                </div>
                <textarea rows={3} className={field} placeholder="Any questions? (optional)" value={f.msg} onChange={set("msg")} />
                <div>
                  <label className="flex gap-3 items-start text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={f.agree} onChange={set("agree")} className="mt-1 h-5 w-5 accent-[#2563EB] shrink-0" />
                    <span>
                      I agree to the <button type="button" onClick={() => openLegal("privacy")} className="underline text-[#2563EB] font-medium">Privacy Policy</button> and{" "}
                      <button type="button" onClick={() => openLegal("terms")} className="underline text-[#2563EB] font-medium">Terms &amp; Conditions</button>, and I allow the centre to contact me by call or WhatsApp.
                    </span>
                  </label>
                  <Err k="agree" />
                </div>
                <button className="btn-primary w-full justify-center text-base py-4">Book free demo</button>
              </form>
            )}
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ openLegal }) {
  return (
    <footer className="bg-[#07122A] text-slate-400 py-10">
      <div className="mx-auto max-w-7xl px-5 flex flex-col md:flex-row gap-4 justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} {CONFIG.name}. All rights reserved.</p>
        <div className="flex gap-6">
          <button onClick={() => openLegal("privacy")} className="hover:text-[#F5B93B] transition">Privacy Policy</button>
          <button onClick={() => openLegal("terms")} className="hover:text-[#F5B93B] transition">Terms &amp; Conditions</button>
        </div>
      </div>
    </footer>
  );
}

const LEGAL = {
  privacy: {
    title: "Privacy Policy",
    body: [
      ["Information we collect", "When you submit the enquiry form, you give us your name, mobile number, class and message. We collect only what we need to contact you."],
      ["How we use it", "We use your information to schedule demo classes, call you for counselling and send batch updates."],
      ["Sharing", "We never sell your personal information. It is shared only with service providers we use to contact you, such as SMS or WhatsApp platforms."],
      ["Security and retention", "We store your information securely and delete it when we no longer need it."],
      ["Your rights", `You can ask to view, correct or delete your information by writing to ${CONFIG.email}.`],
      ["Cookies", "This website may use anonymous analytics cookies to help us improve it."],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      ["Admission", "Admission is confirmed only after counselling and subject to seat availability. Submitting the form does not guarantee a seat."],
      ["Fees", "Fees are listed on the course pages and may change. Please collect a receipt for every payment. The refund policy is shared at the time of admission."],
      ["Attendance and conduct", "Students are expected to attend regularly and follow classroom discipline. Repeated violations may lead to removal from the batch."],
      ["Result claims", "We do not guarantee any rank or selection. Results depend on the student's effort, attendance and preparation."],
      ["Study material", "Study material and recordings are for the enrolled student's personal use only. Copying or reselling them is prohibited."],
      ["Changes", "We may update these terms at any time. The latest version is always available on this page."],
    ],
  },
};

function LegalModal({ type, close }) {
  useEffect(() => {
    if (!type) return;
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [type]);
  if (!type) return null;
  const d = LEGAL[type];
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/70 backdrop-blur-sm" onClick={close}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" className="pop w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-8 sm:p-10">
        <div className="flex justify-between items-start">
          <h3 className="font-display text-3xl font-extrabold text-[#0B1B34]">{d.title}</h3>
          <button onClick={close} aria-label="Close" className="text-3xl leading-none text-slate-400 hover:text-slate-900">×</button>
        </div>
        <p className="text-sm text-slate-500 mt-1">Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
        <div className="mt-6 space-y-5">
          {d.body.map(([h, p]) => <div key={h}><h4 className="font-bold text-[#0B1B34]">{h}</h4><p className="text-slate-600 mt-1">{p}</p></div>)}
        </div>
        <button onClick={close} className="btn-primary mt-8">Got it</button>
      </div>
    </div>
  );
}

/* ---------------- root ---------------- */
export default function App() {
  const [legal, setLegal] = useState(null);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    const f = () => setProg((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div className="font-body antialiased text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        html{scroll-behavior:smooth}
        .font-display{font-family:'Sora',sans-serif}
        .font-body{font-family:'Inter',sans-serif}
        .btn-primary{display:inline-flex;align-items:center;gap:.5rem;border-radius:9999px;background:linear-gradient(135deg,#F5B93B,#E69B0E);color:#0B1B34;font-weight:700;padding:.7rem 1.4rem;transition:transform .3s,box-shadow .3s}
        .btn-primary:hover{transform:translateY(-3px) scale(1.03);box-shadow:0 14px 30px -8px rgba(230,155,14,.55)}
        .btn-ghost{display:inline-flex;align-items:center;border-radius:9999px;border:1px solid rgba(255,255,255,.4);color:#fff;font-weight:600;transition:all .3s}
        .btn-ghost:hover{background:#fff;color:#0B1B34}
        .navlink{position:relative}
        .navlink:after{content:"";position:absolute;left:0;bottom:-6px;height:2px;width:0;background:#F5B93B;transition:width .3s}
        .navlink:hover:after{width:100%}
        .grid-bg{background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse at center,#000 40%,transparent 80%);-webkit-mask-image:radial-gradient(ellipse at center,#000 40%,transparent 80%)}
        .tilt{transition:transform .25s ease-out;transform-style:preserve-3d;will-change:transform}
        .glare{position:absolute;inset:0;pointer-events:none;border-radius:inherit;opacity:0;transition:opacity .3s;background:radial-gradient(circle at var(--gx,50%) var(--gy,50%),rgba(255,255,255,.25),transparent 55%)}
        .tilt:hover>.glare{opacity:1}
        .shimmer{background:linear-gradient(90deg,#F5B93B,#FFE29A,#F5B93B);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shim 5s linear infinite}
        @keyframes shim{to{background-position:250% 0}}
        .orb{position:absolute;border-radius:9999px;filter:blur(90px);transition:transform .4s ease-out;pointer-events:none}
        .orb1{width:420px;height:420px;background:#2563EB;opacity:.4;top:-100px;left:-100px}
        .orb2{width:380px;height:380px;background:#1D4ED8;opacity:.3;bottom:-100px;right:-60px}
        .float-slow{animation:fl 6s ease-in-out infinite}
        .float-slow2{animation:fl 7s ease-in-out infinite reverse}
        @keyframes fl{50%{transform:translateY(-16px)}}
        .marquee{animation:mq 28s linear infinite;width:max-content}
        @keyframes mq{to{transform:translateX(-33.33%)}}
        .pulse-ring{animation:pr 2s infinite}
        @keyframes pr{0%{box-shadow:0 0 0 0 rgba(245,185,59,.6)}100%{box-shadow:0 0 0 40px rgba(245,185,59,0)}}
        .pop{animation:pop .45s cubic-bezier(.2,1.4,.4,1)}
        @keyframes pop{from{transform:scale(.85);opacity:0}}
        .arrow{position:absolute;top:50%;transform:translateY(-50%);height:3rem;width:3rem;border-radius:9999px;background:rgba(255,255,255,.92);font-size:1.8rem;line-height:1;color:#0B1B34;transition:all .3s}
        .arrow:hover{background:#F5B93B;transform:translateY(-50%) scale(1.1)}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
        :focus-visible{outline:2px solid #F5B93B;outline-offset:3px}
      `}</style>

      <div className="fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-[#2563EB] to-[#F5B93B]" style={{ width: `${prog}%` }} />
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Courses />
      <VideoSection />
      <Results />
      <Faculty />
      <Faq />
      <Contact openLegal={setLegal} />
      <Footer openLegal={setLegal} />
      <LegalModal type={legal} close={() => setLegal(null)} />

      <a href={`https://wa.me/${CONFIG.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 grid place-items-center h-14 w-14 rounded-full bg-green-500 text-white text-2xl shadow-xl hover:scale-110 transition">💬</a>
    </div>
  );
}