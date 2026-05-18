import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

/* ─────────────────────────────────────────────
   PARTICLE CANVAS  (same as HeroSection)
───────────────────────────────────────────── */
const ParticlesBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 45 }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.3 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a:  Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy; d.a += 0.007;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width)  d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,149,255,${0.08 + 0.15 * Math.abs(Math.sin(d.a))})`;
        ctx.fill();
      });

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx   = dots[i].x - dots[j].x;
          const dy   = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(0,149,255,${0.05 * (1 - dist / 85)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};

/* ─────────────────────────────────────────────
   QUICK LINK
───────────────────────────────────────────── */
const QuickLink = ({ label, active = false }) => {
  const [hovered, setHovered] = useState(false);
  const lit = active || hovered;

  return (
    <motion.li
      className="relative w-fit cursor-pointer select-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <motion.span
        className="text-sm font-medium flex items-center gap-2"
        animate={{ color: lit ? "#0095FF" : "#4a6070" }}
        transition={{ duration: 0.22 }}
      >
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
          animate={{
            background: lit ? "#0095FF" : "transparent",
            boxShadow: lit ? "0 0 6px #0095FF" : "none",
            scale: lit ? 1 : 0.5,
          }}
          transition={{ duration: 0.22 }}
        />
        {label}
      </motion.span>

      {/* sliding underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px rounded-full"
        style={{ background: "linear-gradient(90deg,#0095FF,#60a5fa)" }}
        initial={{ width: 0 }}
        animate={{ width: lit ? "100%" : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.li>
  );
};

/* ─────────────────────────────────────────────
   SOCIAL BUTTON
───────────────────────────────────────────── */
const SocialBtn = ({ Icon }) => (
  <motion.button
    whileHover={{ y: -4, scale: 1.12 }}
    whileTap={{ scale: 0.92 }}
    transition={{ type: "spring", stiffness: 400, damping: 18 }}
    className="group relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
    }}
  >
    <motion.span
      className="absolute inset-0 rounded-xl"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      style={{
        background: "linear-gradient(135deg,#0095FF,#0055cc)",
        boxShadow: "0 6px 20px rgba(0,149,255,0.4)",
      }}
      transition={{ duration: 0.25 }}
    />
    <Icon
      size={15}
      className="relative z-10 text-[#4a6070] group-hover:text-white transition-colors duration-200"
    />
  </motion.button>
);

/* ─────────────────────────────────────────────
   CONTACT ROW
───────────────────────────────────────────── */
const ContactRow = ({ Icon, text }) => (
  <motion.li
    className="group flex items-center gap-4 cursor-default"
    whileHover={{ x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
  >
    <motion.div
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
      style={{
        background: "rgba(0,149,255,0.08)",
        border: "1px solid rgba(0,149,255,0.18)",
      }}
      whileHover={{
        background: "rgba(0,149,255,0.18)",
        boxShadow: "0 0 16px rgba(0,149,255,0.3)",
        borderColor: "rgba(0,149,255,0.5)",
      }}
      transition={{ duration: 0.25 }}
    >
      <Icon size={15} className="text-[#0095FF]" />
    </motion.div>
    <span
      className="text-sm transition-colors duration-200 group-hover:text-white"
      style={{ color: "#4a6070" }}
    >
      {text}
    </span>
  </motion.li>
);

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
const Footer = () => {
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  const quickLinks = [
    { label: "About Me", },
    { label: "Service"  },
    { label: "Contact Us" },
    { label: "Blog Post"  },
    { label: "Pricing"    },
  ];

  const colVariants = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.09 } },
  };
  const colItem = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @keyframes grid-scroll-footer {
          0%   { background-position: 0 0 }
          100% { background-position: 28px 28px }
        }
      `}</style>

      <footer
        className="relative overflow-hidden text-white"
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
            animation: "grid-scroll-footer 10s linear infinite",
          }}
        />

        {/* ── Ambient glows (matching HeroSection) ── */}
        <motion.div
          className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,80,200,0.2) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -top-10 right-20 h-56 w-56 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100,50,200,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* ── Top gradient border ── */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent 5%,rgba(0,149,255,0.6) 40%,rgba(139,92,246,0.4) 70%,transparent 95%)",
          }}
        />

        {/* ══════════ MAIN GRID ══════════ */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

            {/* ── Col 1: Brand ── */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div variants={colItem} className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background: "linear-gradient(135deg,#0095FF,#0044cc)",
                    boxShadow: "0 4px 14px rgba(0,149,255,0.4)",
                  }}
                >
                  <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4zm4 5h12v2H8zm-4 5h16v2H4z" />
                  </svg>
                </div>
                <span className="text-2xl font-extrabold tracking-tight">
                  Vir<span style={{ color: "#0095FF" }}>Tuo</span>
                </span>
              </motion.div>

              <motion.p
                variants={colItem}
                className="text-sm leading-relaxed"
                style={{ color: "#4a6070", maxWidth: 210 }}
              >
                The personal portfolio category includes websites or physical
                displays to showcase creative work.
              </motion.p>

              <motion.div variants={colItem} className="flex items-center gap-3">
                {[FaInstagram, FaLinkedinIn, FaXTwitter, FaFacebookF].map((Icon, i) => (
                  <SocialBtn key={i} Icon={Icon} />
                ))}
              </motion.div>
            </motion.div>

            {/* ── Col 2: Quick Links ── */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={colItem}
                className="mb-7 text-base font-bold tracking-tight text-white"
              >
                Quick Link
              </motion.h3>
              <motion.ul variants={colItem} className="space-y-4">
                {quickLinks.map(({ label, active }) => (
                  <QuickLink key={label} label={label} active={active} />
                ))}
              </motion.ul>
            </motion.div>

            {/* ── Col 3: Contact ── */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={colItem}
                className="mb-7 text-base font-bold tracking-tight text-white"
              >
                Contact
              </motion.h3>
              <motion.ul variants={colItem} className="space-y-5">
                <ContactRow Icon={Phone} text="01764841333" />
                <ContactRow Icon={MapPin} text="Dhaka, Bangladesh" />
                <ContactRow Icon={Mail}   text="shahriyarkobir2005@gmail.com" />
              </motion.ul>
            </motion.div>

            {/* ── Col 4: Newsletter ── */}
            <motion.div
              variants={colVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div
                variants={colItem}
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                  background:
                    "linear-gradient(145deg,rgba(255,255,255,0.045) 0%,rgba(255,255,255,0.01) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* top accent */}
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(0,149,255,0.5) 50%,transparent)",
                  }}
                />
                {/* inner corner glow */}
                <div
                  className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full"
                  style={{
                    background: "radial-gradient(circle,rgba(0,149,255,0.2) 0%,transparent 80%)",
                    filter: "blur(16px)",
                  }}
                />

                <h3 className="mb-2 text-base font-bold text-white">Newsletter</h3>
                <p className="mb-5 text-xs leading-relaxed" style={{ color: "#4a6070" }}>
                  Get latest updates on personal portfolio and web design directly to your inbox.
                </p>

                <AnimatePresence mode="wait">
                  {subscribed ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-2 rounded-xl px-4 py-3  text-sm font-semibold"
                      style={{
                        background: "rgba(0,149,255,0.1)",
                        border: "1px solid rgba(0,149,255,0.3)",
                        color: "#0095FF",
                      }}
                    >
                      <CheckCircle size={16} />
                      Subscribed successfully!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 overflow-hidden rounded-xl p-1.5 pl-4"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <input
                        type="email"
                        placeholder="Your e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#2e4a60]"
                      />
                      <motion.button
                        onClick={handleSubscribe}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 18px rgba(0,149,255,0.55)" }}
                        whileTap={{ scale: 0.92 }}
                        className="flex h-9 w-9 -ml-8 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: "linear-gradient(135deg,#0095FF,#0055cc)",
                          boxShadow: "0 4px 12px rgba(0,149,255,0.4)",
                        }}
                      >
                        <Send size={14} className="text-white" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>

          </div>

          {/* ══════════ BOTTOM BAR ══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div
              className="mb-7 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(255,255,255,0.07) 20%,rgba(255,255,255,0.07) 80%,transparent)",
              }}
            />

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-xs" style={{ color: "#2e4a60" }}>
                © 2026{" "}
                <span className="font-medium" style={{ color: "#3d5a70" }}>InversWeb</span>
                {" "}| All Rights Reserved
              </p>

              <div className="flex items-center gap-6">
                {["Terms & Condition", "Privacy Policy", "Contact Us"].map((link) => (
                  <motion.span
                    key={link}
                    className="cursor-pointer text-xs transition-colors duration-200"
                    style={{ color: "#2e4a60" }}
                    whileHover={{ color: "#0095FF", y: -1 }}
                  >
                    {link}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;