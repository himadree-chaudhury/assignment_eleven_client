import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Heading = ({ title, heading, description }) => {
  return (
    <div className="text-center">
      <motion.p
        className="text-accent font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {heading}
      </motion.h2>

      <motion.p
        className="pb-5"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default Heading;
