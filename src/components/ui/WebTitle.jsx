import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const WebTitle = () => {
  return (
    <div>
      <Link to="/" className="flex-centric">
        <motion.img
          animate={{
            rotate: 360,
            transition: {
              duration: 0.6,
              delay: 5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeInOut",
            },
          }}
          className="w-10"
          src={logo}
          alt="driveXpress logo"
        />
        <h1 className="title-style">driveXpress</h1>
        <h2>
          <sup>&trade;</sup>
        </h2>
      </Link>
    </div>
  );
};

export default WebTitle;
