import React, { memo } from "react";
import { motion } from "framer-motion";

const HeroCodeCard = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.75,
      }}
      className="animated-card-border"
    >
      {/* এখানে তোমার পুরো code card paste করো */}
    </motion.div>
  );
};

export default memo(HeroCodeCard);