import { useMemo, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, animate, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Layers } from "lucide-react";
import { LuGithub } from "react-icons/lu";

/* ─────────────────────────────────────────────
   PROJECT DATA  ← replace with your own
───────────────────────────────────────────── */
const projectsData = [
  {
    title:       "E-Commerce Platform",
    desc:        "Full-stack e-commerce with cart, payment gateway, admin dashboard and order tracking.",
    image:       "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=600&q=80",
    tags:        ["React", "Next.js", "MongoDB"],
    category:    "Next.js",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    true,
  },
  {
    title:       "Portfolio Website",
    desc:        "Animated personal portfolio with framer-motion, dark theme and EmailJS integration.",
    image:       "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&q=80",
    tags:        ["React", "Tailwind", "Framer"],
    category:    "React",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    false,
  },
  {
    title:       "Task Manager App",
    desc:        "Kanban-style task manager with drag-and-drop, deadlines and real-time updates.",
    image:       "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    tags:        ["React", "Firebase"],
    category:    "React",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    false,
  },
  {
    title:       "Blog Platform",
    desc:        "SEO-optimised blog with MDX, dark mode, category filter and comment system.",
    image:       "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
    tags:        ["Next.js", "Tailwind", "Prisma"],
    category:    "Next.js",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    false,
  },
  {
    title:       "Weather Dashboard",
    desc:        "Real-time weather app with 7-day forecast, map view and geolocation support.",
    image:       "https://images.unsplash.com/photo-1504608524841-42584120d693?w=600&q=80",
    tags:        ["JavaScript", "OpenWeather API"],
    category:    "JavaScript",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    false,
  },
  {
    title:       "Chat Application",
    desc:        "Real-time chat with Socket.io, JWT auth, rooms and file sharing.",
    image:       "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&q=80",
    tags:        ["React", "Node.js", "Socket.io"],
    category:    "React",
    liveUrl:     "#",
    githubUrl:   "#",
    featured:    false,
  },
];

const FILTERS = ["All", "React", "Next.js", "JavaScript"];

/* ─────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────── */
const Particles = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id:    i,
        x:     `${Math.random() * 100}%`,
        y:     `${Math.random() * 100}%`,
        size:  Math.random() > 0.5 ? 2.5 : 1.5,
        dur:   5 + Math.random() * 6,
        delay: Math.random() * 5,
        dx:    (Math.random() - 0.5) * 28,
        dy:    (Math.random() - 0.5) * 28,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{ width: d.size, height: d.size, left: d.x, top: d.y, background: "#0095FF" }}
          animate={{ opacity: [0.06, 0.42, 0.06], x: [0, d.dx, 0], y: [0, d.dy, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
const ProjectCard = ({ project, index }) => {
  const angle       = useMotionValue(0);
  const borderStyle = useMotionTemplate`conic-gradient(from ${angle}deg,#0095FF 0%,#3b82f6 25%,#a78bfa 55%,#0095FF 80%)`;

  const onHoverStart = () => {
    angle.set(0);
    animate(angle, 360, { duration: 2.6, repeat: Infinity, ease: "linear" });
  };
  const onHoverEnd = () => animate(angle, 0, { duration: 0.4 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative rounded-3xl p-[1.5px] cursor-pointer"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      {/* rotating gradient border */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: borderStyle, filter: "blur(1px)" }}
      />

      {/* card body */}
      <div
        className="relative z-10 flex flex-col h-full rounded-[22px] overflow-hidden"
        style={{
          background: "linear-gradient(145deg,#0a1628 0%,#071020 100%)",
          boxShadow:  "0 8px 40px rgba(0,0,0,0.45)",
        }}
      >
        {/* image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.75)" }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5 }}
          />

          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top,#0a1628 0%,rgba(7,16,32,0.3) 55%,transparent 100%)" }}
          />

          {/* featured badge */}
          {project.featured && (
            <div
              className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ background: "rgba(0,149,255,0.85)", color: "white", backdropFilter: "blur(6px)" }}
            >
              ⭐ Featured
            </div>
          )}

          {/* hover action buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
              style={{
                background: "linear-gradient(135deg,#0095FF,#0055cc)",
                boxShadow: "0 4px 16px rgba(0,149,255,0.45)",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={13} /> Live
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "white",
                textDecoration: "none",
                backdropFilter: "blur(6px)",
              }}
            >
              <LuGithub size={13} /> Code
            </motion.a>
          </div>
        </div>

        {/* content */}
        <div className="flex flex-col flex-1 p-5 gap-3">

          {/* title */}
          <h3
            className="font-extrabold text-white leading-tight transition-colors duration-300 group-hover:text-[#60a5fa]"
            style={{ fontSize: 17, letterSpacing: "-0.02em" }}
          >
            {project.title}
          </h3>

          {/* description */}
          <p className="text-xs leading-relaxed flex-1" style={{ color: "#4a6070" }}>
            {project.desc}
          </p>

          {/* tags + links row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold rounded-lg px-2 py-0.5"
                  style={{ background: "rgba(0,149,255,0.1)", border: "1px solid rgba(0,149,255,0.2)", color: "#60a5fa" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2e4a60", textDecoration: "none" }}
                whileHover={{ color: "#0095FF", y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink size={15} />
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#2e4a60", textDecoration: "none" }}
                whileHover={{ color: "#0095FF", y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <LuGithub size={15} />
              </motion.a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────── */
const Projects = () => {
  const [active, setActive] = useState("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projectsData
        : projectsData.filter((p) => p.category === active),
    [active]
  );

  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden px-4 py-24 scroll-mt-20"
      style={{ background: "#060c18" }}
    >
      {/* Particles */}
      <Particles />

      {/* Static dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
          backgroundSize:  "28px 28px",
        }}
      />

      {/* Glow — left */}
      <motion.div
        className="pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle,rgba(0,80,200,0.2) 0%,transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Glow — right */}
      <motion.div
        className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle,rgba(100,50,200,0.14) 0%,transparent 70%)", filter: "blur(80px)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.42, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent 5%,rgba(0,149,255,0.55) 40%,rgba(139,92,246,0.4) 70%,transparent 95%)" }}
      />

      {/* ════ CONTENT ════ */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          {/* badge */}
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em]"
            style={{ background: "rgba(0,149,255,0.08)", border: "1px solid rgba(0,149,255,0.25)", color: "#0095FF" }}
          >
            <motion.div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#0095FF" }}
              animate={{ opacity: [1, 0.2, 1], boxShadow: ["0 0 4px #0095FF", "0 0 10px #0095FF", "0 0 4px #0095FF"] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            My Works
          </div>

          {/* heading */}
          <h2
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(36px, 5vw, 58px)", letterSpacing: "-0.03em", lineHeight: 1.08 }}
          >
            Featured{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#0095FF 0%,#60a5fa 50%,#a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor:  "transparent",
                backgroundClip:       "text",
              }}
            >
              Projects
            </span>
          </h2>

          {/* animated divider */}
          <motion.div
            className="mx-auto mt-5 h-px"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(0,149,255,0.4),rgba(139,92,246,0.3),transparent)",
              maxWidth: 280,
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {FILTERS.map((filter) => {
            const isActive = active === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setActive(filter)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden"
                style={{
                  background:   isActive ? "linear-gradient(135deg,#0095FF,#0055cc)" : "rgba(255,255,255,0.04)",
                  border:       isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.1)",
                  color:        isActive ? "white" : "#4a6070",
                  boxShadow:    isActive ? "0 4px 20px rgba(0,149,255,0.35)" : "none",
                }}
              >
                {isActive && (
                  <motion.span
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {filter === "All" && <Layers size={12} />}
                {filter !== "All" && <Code2 size={12} />}
                {filter}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Project Count ── */}
        <motion.p
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center text-xs font-medium"
          style={{ color: "#2e4a60" }}
        >
          Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          {active !== "All" ? ` in ${active}` : ""}
        </motion.p>

        {/* ── Cards Grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── View All Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-bold"
            style={{
              background:  "rgba(255,255,255,0.04)",
              border:      "1px solid rgba(255,255,255,0.1)",
              color:       "rgba(255,255,255,0.65)",
              textDecoration: "none",
            }}
            whileHover={{
              scale:       1.04,
              y:           -2,
              borderColor: "rgba(0,149,255,0.5)",
              color:       "white",
              boxShadow:   "0 6px 24px rgba(0,0,0,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <LuGithub size={16} />
            View All on GitHub
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;