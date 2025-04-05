import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const WebTitle = () => {
  return (
    <div>
      {/* Link To The Homepage */}
      <Link to="/" className="flex-centric">
        {/* Logo */}
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
        {/* Website Title */}
        <h1 className="title-style">driveXpress</h1>
        {/* Trademark Symbol */}
        <h2>
          <sup>&trade;</sup>
        </h2>
      </Link>
    </div>
  );
};

export default WebTitle;
