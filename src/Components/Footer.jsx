import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

/* ─────────────────────────────────────────────
   ANIMATED QUICK LINK
   Hover → colour shifts to blue + animated
   underline slides in from left
───────────────────────────────────────────── */
const QuickLink = ({ label, active = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.li
      className="relative w-fit cursor-pointer select-none"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {/* label */}
      <motion.span
        className="text-sm font-medium flex items-center gap-2"
        animate={{
          color: active || hovered ? "#0095FF" : "#9ca3af",
        }}
        transition={{ duration: 0.22 }}
      >
        {/* arrow dot */}
        <motion.span
          className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
          animate={{
            background: active || hovered ? "#0095FF" : "transparent",
            boxShadow:
              active || hovered ? "0 0 6px #0095FF" : "none",
            scale: active || hovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.22 }}
        />
        {label}
      </motion.span>

      {/* sliding underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px rounded-full"
        style={{
          background: "linear-gradient(90deg, #0095FF, #00ccff)",
        }}
        initial={{ width: 0 }}
        animate={{ width: active || hovered ? "100%" : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.li>
  );
};

/* ─────────────────────────────────────────────
   SOCIAL ICON BUTTON
───────────────────────────────────────────── */
const SocialBtn = ({ Icon }) => (
  <motion.button
    whileHover={{ y: -4, scale: 1.12 }}
    whileTap={{ scale: 0.92 }}
    transition={{ type: "spring", stiffness: 400, damping: 18 }}
    className="group relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden"
    style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.09)",
    }}
  >
    {/* hover fill */}
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
    <Icon size={15} className="relative z-10 text-gray-400 group-hover:text-white transition-colors duration-200" />
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
    <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors duration-200">
      {text}
    </span>
  </motion.li>
);

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
const Particles = () => {
  const [particles] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() > 0.6 ? 2.5 : 1.5,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#0095FF]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.5, 1] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────────── */
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  const quickLinks = [
    { label: "About Me"},
    { label: "Service" },
    { label: "Contact Us" },
    { label: "Blog Post" },
    { label: "Pricing" },
  ];

  /* stagger container */
  const colVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const colItem = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer
      className="relative overflow-hidden text-white bg-[#011a2a]"
      
    >
      {/* ── ambient glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -bottom-10 -left-10 h-72 w-72 rounded-full"
          style={{
            background: "radial-gradient(circle, #0055cc 0%, transparent 70%)",
            filter: "blur(70px)",
            opacity: 0.15,
          }}
          animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-10 right-20 h-56 w-56 rounded-full"
          style={{
            background: "radial-gradient(circle, #0095FF 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.08,
          }}
          animate={{ opacity: [0.06, 0.14, 0.06], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,149,255,0.09) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* floating particles */}
      <Particles />

      {/* ── top gradient border ── */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent 5%,rgba(0,149,255,0.55) 40%,rgba(0,80,200,0.4) 70%,transparent 95%)",
        }}
      />

      {/* ══════════ MAIN GRID ══════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* ── Col 1: Brand ── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
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
              <span
                className="text-2xl font-extrabold tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Vir<span className="text-[#0095FF]">Tuo</span>
              </span>
            </motion.div>

            {/* Desc */}
            <motion.p
              variants={colItem}
              className="text-sm leading-relaxed text-gray-500"
              style={{ maxWidth: 210 }}
            >
              The personal portfolio category includes websites or physical
              displays to showcase creative work.
            </motion.p>

            {/* Socials */}
            <motion.div variants={colItem} className="flex items-center gap-3">
              {[FaInstagram, FaLinkedinIn, FaXTwitter, FaFacebookF].map(
                (Icon, i) => (
                  <SocialBtn key={i} Icon={Icon} />
                )
              )}
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
              className="mb-7 text-base font-bold tracking-tight text-white"            >
              Quick Link
            </motion.h3>

            <motion.ul variants={colItem} className="space-y-4 ">
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
              <ContactRow Icon={Mail}  text="shahriyarkobir2005@gmail.com" />
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
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* card inner glow */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-34 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle,rgba(0,149,255,0.2) 0%,transparent 80%)",
                  filter: "blur(16px)",
                }}
              />

              <h3
                className="mb-2 text-base font-bold text-white"
              >
                Newsletter
              </h3>
              <p className="mb-5 text-xs leading-relaxed text-gray-500">
                Get latest updates on personal portfolio and web design
                directly to your inbox.
              </p>

              {/* Input row */}
              <AnimatePresence mode="wait">
                {subscribed ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
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
                      background: "#011a2a",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Your e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                    />
                    <motion.button
                      onClick={handleSubscribe}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg -ml-2"
                      style={{
                        background: "linear-gradient(135deg,#0095Ff,#0055cc)",
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
          {/* divider */}
          <div
            className="mb-7 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.07) 20%,rgba(255,255,255,0.07) 80%,transparent)",
            }}
          />

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-600">
              © 2026{" "}
              <span className="text-gray-500 font-medium">InversWeb</span> | All Rights Reserved
            </p>

            <div className="flex items-center gap-6">
              {["Terms & Condition", "Privacy Policy", "Contact Us"].map(
                (link) => (
                  <motion.span
                    key={link}
                    className="cursor-pointer text-xs text-gray-600 transition-colors duration-200 hover:text-[#0095FF]"
                    whileHover={{ y: -1 }}
                  >
                    {link}
                  </motion.span>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;