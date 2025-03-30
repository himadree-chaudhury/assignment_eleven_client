import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import banner from "../assets/cover.png";
import underline from "../assets/underline.png";

const Banner = () => {
  return (
    <div className="md:relative section-layout">
      <div className="flex justify-center md:justify-end">
        <motion.img
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5, duration: 1, ease: "easeIn" }}
          src={banner}
          alt="driveXpress Banner"
          className="md:w-[60%] xl:w-[40%] object-cover"
        />
      </div>
      <div className="md:absolute top-5">
        <div className="font-bold text-[min(8vw,50px)] p-5 lg:p-10 pb-0">
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          >
            Find, Book, and
          </motion.h1>
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
          >
            rental car in&nbsp;
            <div
              animate={{ x: 500 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="relative text-primary inline"
            >
              Easy&nbsp;
              <div className="absolute right-4 sm:right-10 top-8 sm:top-14">
                <motion.img
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
                  src={underline}
                  alt="Underline"
                />
              </div>
            </div>
          </motion.h1>
          <motion.h1
            animate={{ x: [-1000, 50, 0] }}
            transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
          >
            steps !
          </motion.h1>
        </div>
        <div className="p-5 lg:p-0 lg:pl-10">
          <div className="pb-5 text-subtle">
            <motion.p
              animate={{ y: [10, -10, 0], opacity: [0, 10, 1] }}
              transition={{ delay: 1.6, duration: 1, ease: "easeInOut" }}
            >
              Get or add a car whereever
            </motion.p>
            <motion.p
              animate={{ y: [10, -10, 0], opacity: [0, 10, 1] }}
              transition={{ delay: 1.7, duration: 1, ease: "easeInOut" }}
            >
              and whenever you need
            </motion.p>
          </div>
          <motion.div
            animate={{ y: [-50, 10, 0], opacity: [0, 0.2, 0.5, 0.8, 1] }}
            transition={{ delay: 2, duration: 1, ease: "easeInOut" }}
          >
            <Link className="btn-primary" to="/allcar">
              Explore Cars
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
