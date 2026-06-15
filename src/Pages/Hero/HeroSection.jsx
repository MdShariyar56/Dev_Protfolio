import React from "react";
import { motion } from "framer-motion";

import ParticlesBg from "./ParticlesBg";
import HeroContent from "./HeroContent";
import HeroCodeCard from "./HeroCodeCard";

const HeroSection = () => {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes spin-angle {
          to {
            --angle: 360deg;
          }
        }

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
          opacity: .4;
        }

        .animated-card-inner {
          position: relative;
          z-index: 1;
          border-radius: inherit;
          overflow: hidden;
        }

        .gradient-heading {
          background: linear-gradient(
            135deg,
            #60a5fa 0%,
            #818cf8 45%,
            #a78bfa 100%
          );

          background-size: 200% auto;

          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <section
        className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 py-20"
        style={{
          background: "#060c18",
        }}
      >
        <ParticlesBg />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,149,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "grid-scroll 8s linear infinite",
          }}
        />

        <motion.div
          className="pointer-events-none absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,80,200,0.2) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="pointer-events-none absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(100,50,200,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.85, 0.5],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <HeroContent />
          <HeroCodeCard />
        </div>
      </section>
    </>
  );
};

export default HeroSection;