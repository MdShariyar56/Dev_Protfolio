import React from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaDownload,
} from "react-icons/fa";

import { HiOutlineMailOpen } from "react-icons/hi";
import { TbCodeCircle } from "react-icons/tb";
import { IoRocketOutline } from "react-icons/io5";

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const socials = [
  {
    icon: FaGithub,
    link: "#",
  },
  {
    icon: FaLinkedinIn,
    link: "#",
  },
  {
    icon: FaTwitter,
    link: "#",
  },
  {
    icon: TbCodeCircle,
    link: "#",
  },
];

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      {/* এখানে Left Side
          এর সব code paste করো */}
    </motion.div>
  );
};

export default HeroContent;