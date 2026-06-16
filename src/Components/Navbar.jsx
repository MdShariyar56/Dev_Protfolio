import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ─────────────────────────────────────────────
   NAV LINKS — id must match section id="..."
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",      id: "home"      },
  { label: "About",     id: "about"     },
  { label: "Skills",    id: "skills"    },
  { label: "Education", id: "education" },
  { label: "Projects",  id: "projects"  },
  { label: "Contact",   id: "contact"   },
];

/* ─────────────────────────────────────────────
   SCROLL-SPY HOOK
   Watches IntersectionObserver for each section
───────────────────────────────────────────── */
const useScrollSpy = (ids) => {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observers = [];
    const visibleMap = {};

    const pickMostVisible = () => {
      // pick the id with the highest intersectionRatio
      let best = ids[0];
      let max  = -1;
      ids.forEach((id) => {
        if ((visibleMap[id] ?? 0) > max) {
          max  = visibleMap[id] ?? 0;
          best = id;
        }
      });
      setActiveId(best);
    };

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visibleMap[id] = entry.intersectionRatio;
          pickMostVisible();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i / 20), rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return activeId;
};

/* ─────────────────────────────────────────────
   SMOOTH SCROLL HELPER
───────────────────────────────────────────── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Navbar = () => {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const sectionIds                = NAV_LINKS.map((l) => l.id);
  const activeId                  = useScrollSpy(sectionIds);

  /* scrollY → navbar bg opacity */
  const { scrollY } = useScroll();
  const bgOpacity   = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 40));
    return () => unsub();
  }, [scrollY]);

  /* close mobile menu on resize */
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <>
      {/* ══════════ DESKTOP NAVBAR ══════════ */}
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* frosted glass bg — fades in on scroll */}
        <motion.div
          className="absolute inset-0"
          style={{
            opacity:          bgOpacity,
            background:       "rgba(6,12,24,0.85)",
            backdropFilter:   "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom:     "1px solid rgba(255,255,255,0.06)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">

          {/* ── Logo ── */}
          <motion.button
            onClick={() => handleNav("home")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2.5 focus:outline-none"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{
                background:  "linear-gradient(135deg,#0095FF,#0044cc)",
                boxShadow:   "0 4px 14px rgba(0,149,255,0.4)",
              }}
            >
              <svg width="15" height="15" fill="white" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm4 5h12v2H8zm-4 5h16v2H4z" />
              </svg>
            </div>
            <span
              className="text-xl font-extrabold tracking-tight text-white"
            >
              Vir<span style={{ color: "#0095FF" }}>Tuo</span>
            </span>
          </motion.button>

          {/* ── Desktop links ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <motion.button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className="relative px-4 py-2 text-sm font-medium rounded-xl focus:outline-none"
                  style={{ color: isActive ? "#ffffff" : "#4a6070" }}
                  whileHover={{ color: "#ffffff" }}
                  transition={{ duration: 0.2 }}
                >
                  {/* active pill bg */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: "rgba(0,149,255,0.12)", border: "1px solid rgba(0,149,255,0.25)" }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{   opacity: 0, scale: 0.85 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* label */}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="h-1 w-1 rounded-full"
                        style={{ background: "#0095FF", boxShadow: "0 0 5px #0095FF" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </span>

                  {/* hover underline */}
                  <motion.span
                    className="absolute bottom-1 left-4 right-4 h-px rounded-full"
                    style={{ background: "linear-gradient(90deg,#0095FF,#60a5fa)" }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              );
            })}
          </nav>

          {/* ── CTA button (desktop) ── */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              onClick={() => handleNav("contact")}
              className="relative overflow-hidden rounded-xl px-5 py-2 text-sm font-bold text-white"
              style={{
                background:  "linear-gradient(135deg,#0095FF,#0055cc)",
                boxShadow:   "0 4px 16px rgba(0,149,255,0.32)",
              }}
              whileHover={{ scale: 1.04, y: -1, boxShadow: "0 8px 24px rgba(0,149,255,0.45)" }}
              whileTap={{ scale: 0.97 }}
            >
              {/* shimmer sweep */}
              <motion.span
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Hire Me →</span>
            </motion.button>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <motion.button
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl focus:outline-none"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
            onClick={() => setOpen((v) => !v)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate:  90,  opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} style={{ color: "#0095FF" }} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0,  opacity: 1 }}
                  exit={{   rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} style={{ color: "#a0b3c6" }} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.header>

      {/* ══════════ MOBILE MENU ══════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* drawer */}
            <motion.div
              className="fixed right-0 top-0 bottom-0 z-50 w-[75vw] max-w-xs md:hidden flex flex-col"
              style={{
                background:   "linear-gradient(160deg,#0a1628 0%,#060c18 100%)",
                borderLeft:   "1px solid rgba(255,255,255,0.07)",
                boxShadow:    "-20px 0 60px rgba(0,0,0,0.5)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0       }}
              exit={{   x: "100%"   }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
            >
              {/* drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-lg font-extrabold text-white">
                  Vir<span style={{ color: "#0095FF" }}>Tuo</span>
                </span>
                <motion.button
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} style={{ color: "#4a6070" }} />
                </motion.button>
              </div>

              {/* drawer links */}
              <nav className="flex flex-col gap-1 p-4 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeId === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-left w-full focus:outline-none"
                      style={{
                        background: isActive ? "rgba(0,149,255,0.1)"  : "transparent",
                        border:     isActive ? "1px solid rgba(0,149,255,0.22)" : "1px solid transparent",
                        color:      isActive ? "#ffffff" : "#4a6070",
                      }}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0   }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 5, color: "#ffffff" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {/* active indicator */}
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: isActive ? "#0095FF" : "rgba(255,255,255,0.15)",
                          boxShadow:  isActive ? "0 0 6px #0095FF" : "none",
                        }}
                        animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
                        transition={{ duration: 1.6, repeat: Infinity }}
                      />
                      {link.label}

                      {isActive && (
                        <span
                          className="ml-auto text-[10px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5"
                          style={{ background: "rgba(0,149,255,0.15)", color: "#0095FF" }}
                        >
                          Active
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </nav>

              {/* drawer footer CTA */}
              <div className="p-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <motion.button
                  onClick={() => handleNav("contact")}
                  className="relative w-full overflow-hidden rounded-xl py-3 text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,#0095FF,#0055cc)",
                    boxShadow:  "0 4px 16px rgba(0,149,255,0.32)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  Hire Me →
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;