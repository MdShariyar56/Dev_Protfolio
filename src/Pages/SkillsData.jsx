import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const skillsData = [
  { name: "HTML", img: "https://i.ibb.co/MxpLfr6R/folder-11570267.png" },
  { name: "CSS", img: "https://i.ibb.co/mrw6w5Yg/css-10356624.png" },
  { name: "Tailwind", img: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Bootstrap", img: "https://i.ibb.co/KjcqTYGd/bold-5086969.png" },
  { name: "JavaScript", img: "https://i.ibb.co/FbYRQ3sh/js-file-9695720.png" },
  { name: "React.js", img: "https://i.ibb.co/vvgXn7pn/react-1183621.png" },
  { name: "Node.js", img: "https://i.ibb.co/Y7kp6n5D/programing-15484303.png" },
  { name: "Express.js", img: "https://i.ibb.co/rRrQvdhY/expressjs-logo.png" },
  { name: "MongoDB", img: "https://imglink.cc/cdn/oe8cL5zRlT.png" },
  { name: "Firebase", img: "https://imglink.cc/cdn/pNvwkszKSi.png" },
  { name: "GitHub", img: "https://i.ibb.co/W4mM8vcn/social-16065963.png" },
  { name: "Git", img: "https://imglink.cc/cdn/zMCU7S_kdx.png" },
];

const skillColors = {
  HTML: "text-orange-400",
  CSS: "text-blue-400",
  Tailwind: "text-cyan-400",
  Bootstrap: "text-purple-400",
  JavaScript: "text-yellow-300",
  "React.js": "text-sky-400",
  "Node.js": "text-green-400",
  "Express.js": "text-gray-300",
  MongoDB: "text-emerald-400",
  Firebase: "text-amber-400",
  Git: "text-red-400",
  GitHub: "text-white",
};

/* ─────────────────────────────────────────────
   BACKGROUND DOTS
───────────────────────────────────────────── */
const DotGrid = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-40"
    style={{
      backgroundImage:
        "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

/* ─────────────────────────────────────────────
   PREMIUM INDIVIDUAL CARD COMPONENT
───────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  // Framer motion animation hooks for dynamic rotation angle
  const angle = useMotionValue(0);

  // Background gradient interpolation that updates smoothly using motion values
  const background = useMotionTemplate`conic-gradient(from ${angle}deg, #0095FF, #3b82f6, #86efac, #facc15, #0095FF)`;

  const handleHoverStart = () => {
    // Rotates the inner gradient seamlessly when hovered
    angle.set(0);
    motion.animate(angle, 360, {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    });
  };

  const handleHoverEnd = () => {
    // Stops the animation back to initial stage smoothly
    motion.animate(angle, 0, { duration: 0.3 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="group relative p-[1.5px] rounded-[22px] overflow-hidden flex items-center justify-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
    >
      {/* 🔮 The Rotating Gradient Track that appears behind the card boundary */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background }}
      />

      {/* 💼 Inner Structural Container acting as the solid surface card */}
      <div className="relative w-full z-10 bg-[#070d19]/95 backdrop-blur-md rounded-[21px] p-6 flex flex-col items-center justify-center border border-gray-800 transition-all duration-300 group-hover:border-transparent group-hover:bg-[#070d19]/90">
        
        {/* IMAGE WRAPPER */}
        <div className="h-16 w-16 flex items-center justify-center mb-4">
          <motion.img
            src={skill.img}
            alt={skill.name}
            className="h-full w-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          />
        </div>

        {/* SKILL TITLE */}
        <h3 className={`font-bold text-sm md:text-base tracking-wide text-center uppercase transition-all duration-300 group-hover:scale-105 ${skillColors[skill.name] || "text-white"}`}>
          {skill.name}
        </h3>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Skills = () => {
  return (
    <section
      id="skills"
      className="bg-[#030712] relative min-h-screen py-24 px-6 flex flex-col items-center 
                 scroll-mt-20 overflow-hidden"
    >
      <DotGrid />

      {/* TOP GLOW LINE */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0095FF]/20 to-transparent" />

      {/* 🔹 Content Wrap */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          {/* TOP MINI CHIP */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0095FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0095FF]"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095FF]">
              My Expertise
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0095FF] to-blue-500">Skills</span>
          </h2>
          
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#4a6070]">
            Technologies & Tools I Work With
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;