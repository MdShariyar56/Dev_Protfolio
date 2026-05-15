import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaTwitter, FaDownload } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { TbCodeCircle } from 'react-icons/tb';
import { IoRocketOutline } from 'react-icons/io5';

/* ─── Particle canvas background ─── */
const ParticlesBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 55 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a:  Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.a += 0.008;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,149,255,${0.12 + 0.18 * Math.abs(Math.sin(d.a))})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 95) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0,149,255,${0.07 * (1 - dist / 95)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
const HeroSection = () => {
  const fadeInUp = {
    hidden:   { opacity: 0, y: 30 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const staggerContainer = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0%   center }
          100% { background-position: 200% center }
        }
        @keyframes grid-scroll {
          0%   { background-position: 0 0 }
          100% { background-position: 40px 40px }
        }
        /* ── rotating conic border ── */
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes spin-angle { to { --angle: 360deg } }

        .animated-card-border {
          position: relative;
          border-radius: 2rem;
        }
        .animated-card-border::before,
        .animated-card-border::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            transparent 0%,
            rgba(0,149,255,0.9) 20%,
            rgba(139,92,246,0.7) 35%,
            transparent 50%
          );
          animation: spin-angle 4s linear infinite;
          z-index: 0;
        }
        .animated-card-border::after {
          filter: blur(14px);
          opacity: 0.4;
        }
        .animated-card-inner {
          position: relative;
          z-index: 1;
          border-radius: inherit;
          overflow: hidden;
        }

        .gradient-heading {
          background: linear-gradient(135deg, #60a5fa 0%, #818cf8 45%, #a78bfa 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <section
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 py-20"
        style={{ background: "#060c18" }}
      >
        {/* ── Particle canvas ── */}
        <ParticlesBg />

        {/* ── Moving dot grid ── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "grid-scroll 8s linear infinite",
          }}
        />

        {/* ── Ambient glows ── */}
        <motion.div
          className="pointer-events-none absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,80,200,0.2) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100,50,200,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* ════════ GRID ════════ */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

          {/* ══ LEFT ══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md mb-8"
            >
              <IoRocketOutline className="text-[#0095FF]" size={15} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-300">
                Welcome to my universe
              </span>
              <motion.span
                className="ml-1 h-1.5 w-1.5 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="font-black text-white leading-[1.08] tracking-tighter"
              style={{ fontSize: "clamp(40px, 5.8vw, 74px)" }}
            >
              Crafting
              <br />
              <span className="gradient-heading">Digital Masterpieces</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 font-light leading-relaxed"
              style={{ color: "#4a6070", fontSize: "clamp(14px, 1.4vw, 17px)", maxWidth: 460 }}
            >
              I'm{" "}
              <span className="text-white font-medium italic">Shariyar Kobir</span>, a
              professional{" "}
              <span
                className="text-white font-medium"
                style={{ borderBottom: "1px solid rgba(0,149,255,0.45)", paddingBottom: 1 }}
              >
                Architect
              </span>{" "}
              dedicated to building high-performance, user-centric web applications.
            </motion.p>

            {/* Social icons */}
            <motion.div variants={fadeInUp} className="flex gap-3 mt-9">
              {[
                { icon: <FaGithub />,     link: "#" },
                { icon: <FaLinkedinIn />, link: "#" },
                { icon: <FaTwitter />,    link: "#" },
                { icon: <TbCodeCircle />, link: "#" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.link}
                  className="w-11 h-11 flex items-center justify-center rounded-xl text-base"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "#4a6070",
                  }}
                  whileHover={{
                    y: -4,
                    color: "#0095FF",
                    borderColor: "rgba(0,149,255,0.5)",
                    background: "rgba(0,149,255,0.1)",
                    boxShadow: "0 8px 20px rgba(0,149,255,0.28)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Buttons */}
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
                LET'S COLLABORATE
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
                GET RESUME
                <FaDownload className="text-sm" style={{ color: "#4a6070" }} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ══ RIGHT — Code card with animated border ══ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="animated-card-border"
          >
            <div
              className="animated-card-inner"
              style={{
                background: "linear-gradient(145deg,rgba(12,12,22,0.97),rgba(8,14,28,0.99))",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* top accent line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg,transparent,rgba(0,149,255,0.7) 40%,rgba(139,92,246,0.5) 70%,transparent)",
                }}
              />

              {/* inner corner glow */}
              <div
                className="pointer-events-none absolute -top-12 -left-12 h-48 w-48 rounded-full"
                style={{
                  background: "radial-gradient(circle,rgba(0,149,255,0.1) 0%,transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative z-10 p-8 md:p-10">
                {/* Window bar */}
                <div
                  className="flex items-center justify-between mb-8 pb-5"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex gap-2.5">
                    {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                      <div
                        key={c}
                        className="w-3.5 h-3.5 rounded-full"
                        style={{ background: c, boxShadow: `0 0 6px ${c}55` }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-widest"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#4a6070",
                    }}
                  >
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "#0095FF" }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                    Portfolio.tsx
                  </div>
                </div>

                {/* Code */}
                <div
                  className="font-mono leading-[1.8] tracking-tight"
                  style={{ fontSize: "clamp(12px, 1.3vw, 15px)" }}
                >
                  <p>
                    <span style={{ color: "#c084fc", fontStyle: "italic" }}>const </span>
                    <span style={{ color: "#60a5fa" }}>developer</span>
                    <span style={{ color: "#e2e8f0" }}> = {"{"}</span>
                  </p>

                  <div
                    className="pl-5 my-1 space-y-0.5"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", marginLeft: 8 }}
                  >
                    <p>
                      <span style={{ color: "#94a3b8" }}>name</span>
                      <span style={{ color: "#e2e8f0" }}>: </span>
                      <span style={{ color: "#fbbf24" }}>'Md.Shariyar Kobir'</span>
                      <span style={{ color: "#e2e8f0" }}>,</span>
                    </p>
                    <p>
                      <span style={{ color: "#94a3b8" }}>focus</span>
                      <span style={{ color: "#e2e8f0" }}>: </span>
                      <span style={{ color: "#fb923c" }}>'Frontend developer'</span>
                      <span style={{ color: "#e2e8f0" }}>,</span>
                    </p>
                    <p>
                      <span style={{ color: "#94a3b8" }}>skills</span>
                      <span style={{ color: "#e2e8f0" }}>: [</span>
                      <span style={{ color: "#34d399" }}>'React.js', 'NextJS', 'Tailwind', 'AI'</span>
                      <span style={{ color: "#e2e8f0" }}>],</span>
                    </p>
                    <p>
                      <span style={{ color: "#94a3b8" }}>passionate</span>
                      <span style={{ color: "#e2e8f0" }}>: </span>
                      <span style={{ color: "#4ade80" }}>true</span>
                      <span style={{ color: "#e2e8f0" }}>,</span>
                    </p>
                    <p>
                      <span style={{ color: "#94a3b8" }}>motto</span>
                      <span style={{ color: "#e2e8f0" }}>: </span>
                      <span style={{ color: "#fef08a" }}>"Build with Purpose"</span>
                    </p>
                  </div>

                  <p style={{ color: "#e2e8f0" }}>{"}"}</p>

                  <p className="mt-5">
                    <span style={{ color: "#60a5fa" }}>developer</span>
                    <span style={{ color: "#e2e8f0" }}>.</span>
                    <span style={{ color: "#4ade80" }}>showcase</span>
                    <span style={{ color: "#94a3b8" }}>()</span>
                    <span style={{ color: "#e2e8f0" }}>;</span>
                    <motion.span
                      className="ml-0.5 inline-block w-[2px] rounded-sm align-middle"
                      style={{ height: "1em", background: "#0095FF" }}
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
                    />
                  </p>
                </div>

                {/* Status bar */}
                <div
                  className="mt-7 flex items-center justify-between rounded-xl px-4 py-2.5"
                  style={{
                    background: "rgba(0,149,255,0.05)",
                    border: "1px solid rgba(0,149,255,0.13)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.span
                      className="h-2 w-2 rounded-full"
                      style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-medium" style={{ color: "#4ade80" }}>
                      Compiled successfully
                    </span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "#3a5068" }}>
                    TypeScript · ESNext
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default HeroSection;