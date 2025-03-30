import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import {  motion } from "framer-motion";
import cupon from "../assets/cupon.png";
import cuponWhite from "../assets/cupon-white.png";

const Offers = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const lastAprilDate = new Date(currentDate.getFullYear(), 3, 30);

  const daysUntilFriday = (5 - currentDay + 7) % 7 || 7;
  currentDate.setDate(currentDate.getDate() + daysUntilFriday);
  const nextFriday = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timeDiffApril = lastAprilDate - new Date();
  const daysLeftForApril = Math.ceil(timeDiffApril / (1000 * 60 * 60 * 24));
  const lastDayOfApril = lastAprilDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const cardVariants1 = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const cardVariants2 = {
    initial: { y: 0 },
    animate: {
      y: [0, 10, 0],
      transition: { duration: 2, delay:0.2, repeat: Infinity, ease: "easeInOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };
  const cardVariants3 = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        delay: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="md:relative space-y-4">
      {/* Offer - 1 */}
      <motion.div
        className="md:w-[45%] border border-text-secondary-dark rounded-lg md:relative md:top-10 group"
        variants={cardVariants1}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex-centric justify-between bg-gradient-to-r from-secondary-hover to-secondary rounded-t-lg p-2 **:text-text-primary"
          whileHover={{ rotate: 0 }}
        >
          <div>
            <p className="font-semibold">Unlimited</p>
            <h1 className="font-extrabold text-4xl py-2">12% OFF !</h1>
            <p>Only {daysUntilFriday} days left...</p>
          </div>
          <motion.img
            src={cupon}
            alt="Cupon Ticket"
            className="-rotate-12 w-32"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          />
        </motion.div>
        <div className="p-2 mb-2">
          <div className="flex-centric justify-between">
            <h3>Get on every Friday!</h3>
            <h3>#1</h3>
          </div>
          <p className="mb-5">{nextFriday}</p>
          <Link className="btn-secondary">More...</Link>
        </div>
      </motion.div>

      {/* Offer - 2 */}
      <motion.div
        className="md:w-[45%] border border-text-secondary-dark rounded-lg md:absolute md:bottom-10 md:left-[30%] group"
        variants={cardVariants2}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex-centric justify-between bg-gradient-to-r from-accent-hover to-accent rounded-t-lg p-2 **:text-text-primary-dark"
          whileHover={{ rotate: 0 }}
        >
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="font-extrabold text-4xl py-2">$30 OFF !</h1>
            <p>Only {daysLeftForApril} days left...</p>
          </div>
          <motion.img
            src={cuponWhite}
            alt="Cupon Ticket"
            className="-rotate-12 w-32"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          />
        </motion.div>
        <div className="p-2 mb-2">
          <div className="flex-centric justify-between">
            <h3>Luxury cars this winter!</h3>
            <h3>#2</h3>
          </div>
          <p className="mb-5">{lastDayOfApril}</p>
          <Link className="btn-accent">More...</Link>
        </div>
      </motion.div>

      {/* Offer - 3 */}
      <motion.div
        className="md:w-[45%] border border-text-secondary-dark rounded-lg md:relative md:bottom-66 md:left-[55%] group"
        variants={cardVariants3}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.div
          className="flex-centric justify-between bg-gradient-to-r from-primary-hover to-primary rounded-t-lg p-2 **:text-text-primary"
          whileHover={{ rotate: 0 }}
        >
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="font-extrabold text-4xl py-2">$99/day</h1>
            <p>Only for five family members</p>
          </div>
          <motion.img
            src={cupon}
            alt="Cupon Ticket"
            className="-rotate-12 w-32"
            whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
          />
        </motion.div>
        <div className="p-2">
          <div className="flex-centric justify-between">
            <h3>#3</h3>
            <h3>Get on family package!</h3>
          </div>
          <p className="mb-2 text-right">{formattedTomorrow}</p>
          <div className="flex justify-end">
            <Link className="btn-primary">More...</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Offers;
