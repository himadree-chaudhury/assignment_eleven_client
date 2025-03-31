import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import solid1 from "../../assets/rocket.png";
import solid2 from "../../assets/check.png";
import solid3 from "../../assets/user.png";
import solid4 from "../../assets/shield.png";
import solid5 from "../../assets/flip.png";
import solid6 from "../../assets/layers.png";

// Animation variants
const cardVariants = {
  offscreenLeft: {
    x: -100,
    opacity: 0,
  },
  offscreenRight: {
    x: 100,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
    },
  },
};

const Features = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {/* First 3 cards animate from left */}
      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenLeft"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid1} alt="Rocket" />
        <div className="space-y-3">
          <h3>Easy Rent</h3>
          <p>
            Rent a car at our rental with an easy and fast process without
            disturbing your productivity
          </p>
        </div>
      </motion.div>

      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenLeft"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid2} alt="Check Mark" />
        <div className="space-y-3">
          <h3>Premium Quality</h3>
          <p>
            Our cars are always maintained engine health and cleanliness to
            provide a more comfortable driving experience
          </p>
        </div>
      </motion.div>

      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenLeft"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid3} alt="User" />
        <div className="space-y-3">
          <h3>Professional Agent</h3>
          <p>
            You can ask your travel companion to escort and guide your journey
          </p>
        </div>
      </motion.div>

      {/* Last 3 cards animate from right */}
      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenRight"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid4} alt="Shield" />
        <div className="space-y-3">
          <h3>Car Safety</h3>
          <p>
            We guarantee the safety of the engine on the car always running well
            with regular checks on the car engine
          </p>
        </div>
      </motion.div>

      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenRight"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid5} alt="Flip" />
        <div className="space-y-3">
          <h3>Refund</h3>
          <p>
            Our service guarantee provides a money back opportunity if the car
            does not match the information provided
          </p>
        </div>
      </motion.div>

      <motion.div
        className="p-2 card flex-centric gap-5"
        initial="offscreenRight"
        whileInView="onscreen"
        whileHover="hover"
        viewport={{ once: false, amount: 0.2 }}
        variants={cardVariants}
      >
        <img src={solid6} alt="Layers" />
        <div className="space-y-3">
          <h3>Live Monitoring</h3>
          <p>
            Our service provides direct customer monitoring to monitor trips in
            terms of safety and comfort
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
