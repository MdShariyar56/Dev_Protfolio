import { useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

const educationData = [
  {
    degree: "B.Sc in Computer Science & Engineering",
    institute: "Northern University Bangladesh [NUB]",
    year: "2025 - Running (Weekend)",
    image: "https://i.ibb.co/kVXfZmpw/Campus-Image.png",
    link: "https://nub.ac.bd/",
    tag: "Ongoing",
    tagColor: "#0095FF",
  },
  {
    degree: "Diploma in Computer Science & Technology",
    institute: "Brahmanbariya Polytechnic Institute [BBPI]",
    year: "2021 - 2022",
    details: "CGPA: 3.40 / 4.00",
    image:
      "https://i.ibb.co/WNqvp5yP/475787058-655704360318836-604595313590966038-n.png",
    link: "https://www.facebook.com/BBPIT",
    tag: "Passed",
    tagColor: "#4ade80",
  },
  {
    degree: "Secondary School Certificate (Science)",
    institute: "Dhap Satgara B.M. Model Kamil Madrasha [DSM]",
    year: "2015 - 2020",
    details: "GPA: 4.69 / 5.00",
    image: "https://i.ibb.co/mr5qwFjm/image.jpg",
    link: "https://dsmkmr.edu.bd/",
    tag: "Passed",
    tagColor: "#4ade80",
  },
];

const Particles = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        size: Math.random() > 0.5 ? 2.5 : 1.5,
        dur: 5 + Math.random() * 6,
        delay: Math.random() * 5,
        dx: (Math.random() - 0.5) * 26,
        dy: (Math.random() - 0.5) * 26,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            width: d.size,
            height: d.size,
            left: d.x,
            top: d.y,
            background: "#0095FF",
          }}
          animate={{
            opacity: [0.06, 0.42, 0.06],
            x: [0, d.dx, 0],
            y: [0, d.dy, 0],
          }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const EducationCard = ({ edu, index }) => {
  const angle = useMotionValue(0);
  const borderStyle = useMotionTemplate`conic-gradient(from ${angle}deg,#0095FF 0%,#3b82f6 25%,#a78bfa 50%,#0095FF 75%)`;

  const onHoverStart = () => {
    angle.set(0);
    animate(angle, 360, { duration: 2.8, repeat: Infinity, ease: "linear" });
  };
  const onHoverEnd = () => animate(angle, 0, { duration: 0.4 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="group relative rounded-3xl p-[1.5px] cursor-pointer"
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: borderStyle, filter: "blur(1px)" }}
      />

      <div
        className="relative z-10 rounded-[22px] overflow-hidden flex flex-col items-center pt-6 md:pt-0  md:flex-row gap-0"
        style={{
          background: "linear-gradient(145deg,#0a1628 0%,#071020 100%)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
        }}
      >
        <a
          href={edu.link}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 overflow-hidden block relative"
          style={{ width: "100%", maxWidth: 260, height: 180 }}
        >
          <motion.img
            src={edu.image}
            alt={edu.institute}
            className="w-full h-full object-cover rounded-xl md:rounded-none"
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.45 }}
            style={{ filter: "brightness(0.82)" }}
          />
        </a>

        <div className="flex-1 flex flex-col justify-center  px-7 py-6 gap-3">
          <div className="flex items-center  gap-3 flex-wrap">
            <span
              className="text-[10px] font-extrabold uppercase tracking-[0.2em]"
              style={{ color: "#0095FF" }}
            >
              {edu.year}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 py-0.5"
              style={{
                background: `${edu.tagColor}18`,
                border: `1px solid ${edu.tagColor}35`,
                color: edu.tagColor,
              }}
            >
              {edu.tag}
            </span>
          </div>

          <h3
            className="font-extrabold text-white leading-tight transition-colors duration-300 group-hover:text-[#60a5fa]"
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              letterSpacing: "-0.02em",
            }}
          >
            {edu.degree}
          </h3>

          <a
            href={edu.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors duration-200 hover:text-white w-fit"
            style={{ color: "#4a6070", textDecoration: "none" }}
          >
            🎓 {edu.institute}
          </a>

          {edu.details && (
            <div
              className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 w-fit"
              style={{
                background: "rgba(74,222,128,0.07)",
                border: "1px solid rgba(74,222,128,0.2)",
              }}
            >
              <motion.div
                className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ background: "#4ade80" }}
                animate={{
                  opacity: [1, 0.3, 1],
                  boxShadow: [
                    "0 0 4px #4ade80",
                    "0 0 8px #4ade80",
                    "0 0 4px #4ade80",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-bold" style={{ color: "#4ade80" }}>
                {edu.details}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => (
  <section
    id="education"
    className="relative min-h-screen overflow-hidden px-4 py-24 flex flex-col items-center scroll-mt-20"
    style={{ background: "#060c18" }}
  >
    <Particles />

    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />

    <motion.div
      className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full"
      style={{
        background:
          "radial-gradient(circle,rgba(0,80,200,0.2) 0%,transparent 70%)",
        filter: "blur(60px)",
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />

    <motion.div
      className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full"
      style={{
        background:
          "radial-gradient(circle,rgba(100,50,200,0.14) 0%,transparent 70%)",
        filter: "blur(80px)",
      }}
      animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.42, 0.2] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
    />

    <div
      className="absolute inset-x-0 top-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg,transparent 5%,rgba(0,149,255,0.55) 40%,rgba(139,92,246,0.4) 70%,transparent 95%)",
      }}
    />

    <div className="relative z-10 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <div
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.22em]"
          style={{
            background: "rgba(0,149,255,0.08)",
            border: "1px solid rgba(0,149,255,0.25)",
            color: "#0095FF",
          }}
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#0095FF" }}
            animate={{
              opacity: [1, 0.2, 1],
              boxShadow: [
                "0 0 4px #0095FF",
                "0 0 10px #0095FF",
                "0 0 4px #0095FF",
              ],
            }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          Education Journey
        </div>

        <h2
          className="font-extrabold text-white"
          style={{
            fontSize: "clamp(36px, 5vw, 58px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          Academic{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg,#0095FF 0%,#60a5fa 50%,#a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            History
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-xs font-medium italic"
          style={{ color: "#2e4a60" }}
        >
          "Education is not the learning of facts, but the training of the mind
          to think."
        </motion.p>

        <motion.div
          className="mx-auto mt-6 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(0,149,255,0.4),rgba(139,92,246,0.3),transparent)",
            maxWidth: 280,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      <div className="flex flex-col gap-6">
        {educationData.map((edu, i) => (
          <EducationCard key={i} edu={edu} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Education;
