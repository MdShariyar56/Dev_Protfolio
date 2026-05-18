import React from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";

const educationData = [
  {
    degree: "B.Sc in Computer Science & Engineering",
    institute: "Northern University Bangladesh [NUB]",
    year: "2025 - Running (Weekend)",
    image: "https://i.ibb.co/kVXfZmpw/Campus-Image.png",
    link: "https://nub.ac.bd/",
  },
  {
    degree: "Diploma in Computer Science & Technology",
    institute: "Brahmanbariya Polytechnic Institute [BBPI]",
    year: "2021 - 2022 | Passed",
    details: "CGPA: 3.40 out of 4.00",
    image: "https://i.ibb.co/WNqvp5yP/475787058-655704360318836-604595313590966038-n.png",
    link: "https://www.facebook.com/BBPIT",
  },
  {
    degree: "Secondary School Certificate (Science)",
    institute: "Dhap Satgara B.M. Model kamil Madrasha [DSM]",
    year: "2015 - 2020 | Passed",
    details: "GPA: 4.69 out of 5.00",
    image: "https://i.ibb.co/mr5qwFjm/image.jpg",
    link: "https://dsmkmr.edu.bd/",
  },
];

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
   PREMIUM EDUCATION CARD COMPONENT
───────────────────────────────────────────── */
const EducationCard = ({ edu, index }) => {
  const angle = useMotionValue(0);

  // Smooth dynamic conic gradient for border outline
  const borderGradient = useMotionTemplate`conic-gradient(from ${angle}deg, #0095FF, #3b82f6, #86efac, #facc15, #0095FF)`;

  const handleHoverStart = () => {
    angle.set(0);
    animate(angle, 360, {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    });
  };

  const handleHoverEnd = () => {
    animate(angle, 0, { duration: 0.3 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="group relative p-[1.5px] rounded-[24px] overflow-hidden flex items-center justify-center cursor-pointer 
                 shadow-[0_10px_30px_rgba(0,0,0,0.3)] bg-white/5 border border-white/5 
                 transition-all duration-300 hover:border-transparent hover:bg-transparent"
    >
      {/* ⚡ THE ROTATING GRADIENT BORDER LINE ON HOVER */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: borderGradient }}
      />

      {/* 💼 Inner Glass Body */}
      <div className="relative w-full z-10 bg-[#070d19]/95 backdrop-blur-md rounded-[23px] p-6 
                      flex flex-col md:flex-row items-center gap-6 transition-all duration-300">
        
        {/* IMAGE / CAMPUS WRAPPER */}
        <a
          href={edu.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 overflow-hidden rounded-xl border border-white/5 w-full md:w-64 h-40 block relative group/img"
        >
          <motion.img
            src={edu.image}
            alt={edu.institute}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110 filter brightness-90 group-hover/img:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/img:opacity-20 transition-opacity" />
        </a>

        {/* CONTENT INFO */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <span className="text-[10px] font-extrabold text-[#0095FF] tracking-widest uppercase mb-1.5 block">
            {edu.year}
          </span>
          
          <h3 className="text-xl font-black text-white tracking-tight mb-1 group-hover:text-[#0095FF] transition-colors duration-300">
            {edu.degree}
          </h3>

          <a
            href={edu.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white font-medium text-sm md:text-base inline-block hover:underline mb-3 self-center md:self-start"
          >
            {edu.institute}
          </a>

          {edu.details && (
            <div className="inline-flex items-center justify-center md:justify-start gap-2 bg-white/[0.02] border border-white/5 rounded-lg px-3 py-1 w-fit self-center md:self-start">
              <p className="text-xs text-gray-400 font-medium">
                {edu.details.split(/(\d+\.\d+)/).map((part, idx) =>
                  /\d+\.\d+/.test(part) ? (
                    <span key={idx} className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">{part}</span>
                  ) : (
                    <span key={idx}>{part}</span>
                  )
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Education = () => {
  return (
    <section
      id="education"
      className="bg-[#030712] relative min-h-screen py-24 px-6 flex flex-col items-center 
                 scroll-mt-20 overflow-hidden"
    >
      <DotGrid />

      {/* TOP GLOW LINE */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0095FF]/20 to-transparent" />

      {/* 🔹 Content Wrap */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          {/* TOP MINI CHIP */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0095FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0095FF]"></span>
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095FF]">
              Education Journey
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0095FF] to-blue-500">History</span>
          </h2>
          
          <p className="mt-4 text-xs max-w-md mx-auto font-semibold uppercase tracking-[0.15em] text-[#4a6070] italic">
            "Education is not the learning of facts, but the training of the mind to think."
          </p>
        </motion.div>

        {/* Education List Stack */}
        <div className="space-y-8 relative">
          {/* Subtle Vertical Timeline Guide Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0095FF]/10 via-transparent to-transparent hidden lg:block -translate-x-1/2 pointer-events-none" />

          {educationData.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;