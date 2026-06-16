import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";

/* ─────────────────────────────────────────────
   LIGHTWEIGHT PARTICLES
   ✅ GPU-only (CSS transform/opacity)
   ✅ No canvas, no O(n²) loop
   ✅ useMemo — generated once, never re-runs
───────────────────────────────────────────── */
const BgParticles = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id:    i,
        x:     Math.random() * 100,
        y:     Math.random() * 100,
        size:  Math.random() > 0.5 ? 2.5 : 1.5,
        dur:   5 + Math.random() * 6,
        delay: Math.random() * 6,
        dx:    (Math.random() - 0.5) * 30,
        dy:    (Math.random() - 0.5) * 30,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            width:      d.size,
            height:     d.size,
            left:       `${d.x}%`,
            top:        `${d.y}%`,
            background: "#0095FF",
            boxShadow:  d.size > 2 ? "0 0 5px rgba(0,149,255,0.5)" : "none",
          }}
          animate={{ opacity: [0.08, 0.5, 0.08], x: [0, d.dx, 0], y: [0, d.dy, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   ANIMATED FIELD
───────────────────────────────────────────── */
const Field = ({ as: Tag = "input", ...props }) => {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      animate={{ y: focused ? -2 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-xl transition-all duration-300"
        style={{
          boxShadow: focused
            ? "0 0 0 2px #0095FF, 0 0 24px rgba(0,149,255,0.22)"
            : "0 0 0 1px rgba(255,255,255,0.07)",
        }}
      />
      <Tag
        {...props}
        onFocus={(e) => { setFocused(true);  props.onFocus?.(e); }}
        onBlur={(e)  => { setFocused(false); props.onBlur?.(e);  }}
        className={`w-full rounded-xl px-5 py-4 text-sm text-white outline-none
          placeholder:text-[#2e4a60] transition-all duration-300 ${props.className ?? ""}`}
        style={{
          background: focused ? "rgba(0,149,255,0.06)" : "rgba(255,255,255,0.03)",
          border: "none",
          ...props.style,
        }}
      />
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   INFO CARD
───────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -28 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
    whileHover={{ x: 7 }}
    className="group flex cursor-default items-center gap-4"
  >
    <motion.div
      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
      style={{ background: "rgba(0,149,255,0.08)", border: "1px solid rgba(0,149,255,0.2)" }}
      whileHover={{
        background: "rgba(0,149,255,0.18)",
        boxShadow: "0 0 20px rgba(0,149,255,0.32)",
        borderColor: "rgba(0,149,255,0.55)",
      }}
      transition={{ duration: 0.25 }}
    >
      <Icon size={18} className="text-[#0095FF]" />
    </motion.div>
    <div>
      <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest" style={{ color: "#2e4a60" }}>
        {label}
      </p>
      <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.88)" }}>
        {value}
      </p>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", phone: "", message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const SERVICE_ID  = "service_i7rjs38";
    const TEMPLATE_ID = "template_hmi49bi";
    const PUBLIC_KEY  = "iiLs0XNUyIOi2AgWJ";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setSending(false);
        Swal.fire({
          title: "Message Sent!",
          text: "I'll get back to you within 24 hours.",
          icon: "success",
          confirmButtonColor: "#0095FF",
          background: "#060c18",
          color: "#ffffff",
          iconColor: "#0095FF",
          confirmButtonText: "Awesome!",
          customClass: {
            popup: "rounded-3xl border border-white/10",
            confirmButton: "rounded-xl px-8 py-2.5 font-semibold",
          },
        });
        setFormData({ name: "", email: "", subject: "", phone: "", message: "" });
      })
      .catch((err) => {
        setSending(false);
        console.error(err);
        Swal.fire({
          title: "Error!",
          text: "Failed to send message. Please try again.",
          icon: "error",
          background: "#060c18",
          color: "#ffffff",
          customClass: { popup: "rounded-3xl border border-white/10" },
        });
      });
  };

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const item = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0%   center }
          100% { background-position: 200% center }
        }
        .contact-shimmer-heading {
          background: linear-gradient(135deg,#00aaff 0%,#0095FF 35%,#60a5fa 65%,#00ccff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <section
      id="contact"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20"
        style={{ background: "#060c18" }}
      >
        {/* ✅ lightweight CSS particles — no canvas */}
        <BgParticles />

        {/* ✅ static dot grid — no animation, zero CPU */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,149,255,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ✅ ambient glows — GPU blur, 2 elements only */}
        <motion.div
          className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,80,200,0.22) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 right-12 h-80 w-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(100,50,200,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.48, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* ════════ GLASS CARD ════════
            ✅ backdropFilter REMOVED — ওটাই ছিল সবচেয়ে বড় কারণ
            ✅ solid dark background দিয়ে replace — visually same
        ══════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10 w-full max-w-6xl overflow-hidden rounded-3xl"
          style={{
            /* ✅ solid — no backdropFilter */
            background: "linear-gradient(145deg, #0a1628 0%, #071020 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* top gradient line */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent 5%,rgba(0,149,255,0.7) 40%,rgba(139,92,246,0.45) 70%,transparent 95%)",
            }}
          />

          {/* inner corner glow */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,149,255,0.12) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          <div className="grid grid-cols-1 gap-12 p-6 md:grid-cols-2 md:gap-20 md:p-14 lg:p-16">

            {/* ════ LEFT ════ */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="z-10 flex flex-col justify-center"
            >
              {/* badge */}
              <motion.div variants={item} className="mb-6">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{
                    background: "rgba(0,149,255,0.08)",
                    border: "1px solid rgba(0,149,255,0.25)",
                    color: "#0095FF",
                  }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "#0095FF", boxShadow: "0 0 6px #0095FF" }}
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  Let's Work Together
                </span>
              </motion.div>

              {/* heading */}
              <motion.h1
                variants={item}
                className="mb-10 font-extrabold leading-[1.06] tracking-tight text-white"
                style={{ fontSize: "clamp(36px, 4.5vw, 58px)" }}
              >
                Get Ready To
                <br />
                <span className="contact-shimmer-heading">Create Great</span>
              </motion.h1>

              {/* info cards */}
              <motion.div variants={item} className="space-y-5">
                <InfoCard icon={Mail}   label="E-mail"   value="shahriyarkobir2005@gmail.com" delay={0.10} />
                <InfoCard icon={MapPin} label="Location" value="Dhaka, Bangladesh"             delay={0.20} />
                <InfoCard icon={Phone}  label="Contact"  value="01764841333"                   delay={0.30} />
              </motion.div>
            </motion.div>

            {/* ════ RIGHT (form) ════ */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="z-10 flex flex-col justify-center "
            >
              <motion.p
                variants={item}
                className="mb-6 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: "#0095FF" }}
              >
                ✦ Get In Touch
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field name="name"  value={formData.name}  onChange={handleChange} placeholder="Your Name"    required />
                  <Field name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                </motion.div>

                <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
                  <Field type="email" name="email"   value={formData.email}   onChange={handleChange} placeholder="Your Email"   required />
                  <Field              name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" />
                </motion.div>

                <motion.div variants={item}>
                  <Field
                    as="textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={5}
                    className="resize-none "
                    
                  />
                </motion.div>

                {/* submit */}
                <motion.div variants={item}>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.025, y: -3, boxShadow: "0 12px 40px rgba(0,149,255,0.5)" }}
                    whileTap={{ scale: 0.975 }}
                    className="relative w-full overflow-hidden rounded-2xl py-4 font-bold text-white
                      flex items-center justify-center gap-2.5 text-[15px] tracking-wide
                      disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg,#0095FF 0%,#0055cc 55%,#0095FF 100%)",
                      backgroundSize: "200% auto",
                      boxShadow: "0 4px 28px rgba(0,149,255,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                    }}
                  >
                    <motion.span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.18) 50%,transparent 65%)",
                        backgroundSize: "200% 100%",
                      }}
                      animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                    />

                    <AnimatePresence mode="wait">
                      {sending ? (
                        <motion.span
                          key="sending"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.25" strokeWidth="3" />
                            <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="flex items-center gap-2"
                        >
                          <Send size={16} />
                          Send Message
                          <ArrowRight size={16} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ContactSection;