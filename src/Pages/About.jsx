import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa6";
import { HiOutlineMailOpen } from "react-icons/hi";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS (Professional & Clean)
───────────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ─────────────────────────────────────────────
   BACKGROUND DOTS
───────────────────────────────────────────── */
const DotGrid = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-60"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

/* ─────────────────────────────────────────────
   COUNTER CARD
───────────────────────────────────────────── */
const CounterCard = ({ value, suffix, label }) => (
  <div className="flex-1 border-r border-white/5 px-6 py-5 last:border-r-0 text-center lg:text-left">
    <h3 className="text-2xl font-black text-white md:text-3xl tracking-tight">
      {value}
      <span className="text-[#0095FF]">{suffix}</span>
    </h3>
    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a6070]">
      {label}
    </p>
  </div>
);

/* ─────────────────────────────────────────────
   SKILL PILL
───────────────────────────────────────────── */
const SkillPill = ({ label, color }) => (
  <motion.div
    whileHover={{ y: -2, backgroundColor: `${color}18` }}
    className="rounded-xl border px-4 py-2 text-xs font-bold tracking-wide transition-colors"
    style={{
      backgroundColor: `${color}08`,
      borderColor: `${color}25`,
      color: color === "#ffffff" ? "#e2e8f0" : color,
    }}
  >
    {label}
  </motion.div>
);

/* ─────────────────────────────────────────────
   MAIN ABOUT COMPONENT
───────────────────────────────────────────── */
const About = () => {
  const skills = [
    { label: "React.js", color: "#61dafb" },
    { label: "Next.js", color: "#ffffff" },
    { label: "JavaScript", color: "#facc15" },
    { label: "TypeScript", color: "#3b82f6" },
    { label: "Tailwind CSS", color: "#38bdf8" },
    { label: "Node.js", color: "#4ade80" },
    { label: "MongoDB", color: "#86efac" },
    { label: "Express.js", color: "#94a3b8" },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#030712] px-6 py-24 md:py-32"
    >
      <DotGrid />

      {/* TOP GLOW LINE */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0095FF]/20 to-transparent" />

      {/* FIXED BORDER - ROTATING COLOR ANIMATION */}
      <style dangerouslySetInnerHTML={{__html: `
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spinColors {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        .premium-moving-border {
          position: relative;
          border-radius: 24px;
          background: #070d19; /* Inner Background */
        }

        .premium-moving-border::before {
          content: '';
          position: absolute;
          inset: -2px; /* Border thickness */
          border-radius: 26px;
          background: conic-gradient(from var(--angle), #0095FF, #3b82f6, #86efac, #facc15, #0095FF);
          animation: spinColors 4s linear infinite;
          z-index: -1;
        }
      `}} />

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* HEADER SECTION */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center md:mb-24"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0095FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0095FF]"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095FF]">
              Get To Know Me
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0095FF] to-blue-500">Me</span>
          </h2>
        </motion.div>

        {/* CONTENT MAIN */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* LEFT: IMAGE WITH SMART GRADIENT MOVING COLORS */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex justify-center"
          >
            {/* Wrapper for the static border with rotating colors */}
            <div className="premium-moving-border w-full max-w-[280px] md:max-w-[320px] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:top-28">
              
              <div className="relative h-[340px] w-full overflow-hidden rounded-[18px] md:h-[400px] ">
                <img
                  src="https://imglink.cc/cdn/JB_vZLeOI-.png"
                  alt="Profile"
                  className="h-full w-full object-cover object-top filter grayscale-[10%] contrast-[105%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/30 to-transparent" />
              </div>

              {/* FLOATING STATUS: AVAILABLE */}
              <div className="absolute -right-3 -top-3 flex items-center gap-2 rounded-xl border border-white/5 bg-[#070d1a] px-3 py-2 shadow-xl backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <p className="text-[11px] font-bold tracking-wide text-white/90">Available</p>
              </div>

              {/* FLOATING STATUS: EXPERIENCE */}
              <div className="absolute -bottom-3 -left-3 rounded-xl border border-white/5 bg-[#070d1a] px-4 py-2 shadow-xl backdrop-blur-md text-center">
                <h4 className="text-xl font-black text-white leading-none">
                  1<span className="text-[#0095FF]">+</span>
                </h4>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#4a6070] mt-0.5">
                  Years Exp.
                </p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: TEXT CONTENT */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7"
          >
            {/* ROLE TAG */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-lg border border-[#0095FF]/10 bg-[#0095FF]/5 px-3 py-1.5">
              <div className="h-3 w-[2px] rounded-full bg-[#0095FF]" />
              <span className="text-xs font-bold tracking-wide text-[#0095FF]">
                Frontend Developer
              </span>
            </div>

            {/* NEW BIO TEXT (Your updated texts with enhanced colors) */}
            <div className="text-gray-400 text-sm md:text-[15px] leading-relaxed space-y-5 px-2 font-medium">
              <p>
                Dedicated{" "}
                <span className="font-bold text-white bg-blue-500/10 border border-blue-500/20 rounded-md px-1.5 py-0.5">
                  Frontend Developer
                </span>{" "}
                with strong expertise in modern UI development. Highly skilled in building 
                responsive, user-friendly websites using{" "}
                <span className="font-semibold text-blue-400">HTML5, CSS3, Tailwind/Bootstrap, JavaScript, and React</span>.
              </p>

              <p>
                I also bring foundational backend knowledge of{" "}
                <span className="font-semibold text-emerald-400">Node.js, Express.js, and MongoDB</span>, 
                allowing me to implement basic full-stack functionality while writing clean, maintainable code.
              </p>

              <p>
                Passionate about translating complex{" "}
                <span className="font-semibold text-purple-400">UI/UX designs</span> into polished, seamless digital experiences—always following best practices in performance, accessibility, and modern web standards.
              </p>
            </div>

            {/* STATS SECTION */}
            <div className="mt-8 flex rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm">
              <CounterCard value="50" suffix="+" label="Projects Done" />
              <CounterCard value="10" suffix="+" label="Happy Clients" />
              <CounterCard value="1" suffix="yr +" label="Experience" />
            </div>

            {/* DIVIDER */}
            <div className="my-8 h-px bg-gradient-to-r from-white/5 via-white/5 to-transparent" />

            {/* TECH STACK */}
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#4a6070]">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => (
                <SkillPill key={skill.label} label={skill.label} color={skill.color} />
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-10">
                          {/* Primary */}
                          <motion.button
                            className="group relative flex items-center gap-2.5 px-8 py-3.5 text-white font-bold rounded-2xl overflow-hidden"
                            style={{
                              background: "linear-gradient(135deg,#0095FF,#0050cc)",
                              boxShadow: "0 4px 24px rgba(0,149,255,0.35)",
                              fontSize: "clamp(12px,1.2vw,14px)",
                              letterSpacing: "0.04em",
                            }}
                            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 10px 36px rgba(0,149,255,0.5)" }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <motion.span
                              className="pointer-events-none absolute inset-0"
                              style={{
                                background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.2) 50%,transparent 65%)",
                                backgroundSize: "200% 100%",
                              }}
                              animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                            Hire Me
                            <HiOutlineMailOpen className="text-lg transition-transform duration-300 group-hover:rotate-12" />
                          </motion.button>
            
                          {/* Secondary */}
                          <motion.button
                            className="flex items-center gap-2.5 px-8 py-3.5 font-bold rounded-2xl transition-all duration-300"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              color: "rgba(255,255,255,0.7)",
                              fontSize: "clamp(12px,1.2vw,14px)",
                              letterSpacing: "0.04em",
                            }}
                            whileHover={{
                              borderColor: "rgba(0,149,255,0.45)",
                              color: "white",
                              background: "rgba(0,149,255,0.08)",
                            }}
                            whileTap={{ scale: 0.97 }}
                          >
                           DOWNLOAD
                            <FaDownload className="text-sm" style={{ color: "#4a6070" }} />
                          </motion.button>
                        </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;