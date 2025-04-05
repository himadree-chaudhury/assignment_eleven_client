import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import WebTitle from "./ui/WebTitle";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  // *Context States
  const { user, logOut } = useAuth();

  // *Data States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  // *Toggle Mobile Menu Open/Close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // *Toggle Dark Mode
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  // *Styles For Active/Inactive Links
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      transition: "color ease-in-out",
      duration: "1s",
      ...(isActive && {
        backgroundImage:
          "linear-gradient(to right, oklch(50.81% 0.127 224.54), oklch(50% 0.128 278.61), oklch(50% 0.211 284.33))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }),
    };
  };

  // *Handle Logout
  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsMenuOpen(false);
        toast.success("Logout successful!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong. Try again");
      });
  };

  // *Animation Variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // *Links For Mobile And Desktop Views
  const links = (isMobile = false) => (
    <>
      {isMobile ? (
        // *Mobile Links
        <>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/"
              className="block py-2"
            >
              Home
            </NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/allcars"
              className="block py-2"
            >
              Available Cars
            </NavLink>
          </motion.div>
          {/* Conditional Rendering For Authenticated User */}
          {user ? (
            <>
              <motion.div variants={itemVariants}>
                <NavLink
                  style={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                  to="/addcar"
                  className="block py-2"
                >
                  Add Car
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink
                  style={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                  to="/mycars"
                  className="block py-2"
                >
                  My Cars
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink
                  style={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                  to="/mybookings"
                  className="block py-2"
                >
                  My Bookings
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink
                  style={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                  to="/bookingrequests"
                  className="block py-2"
                >
                  Booking Requests
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  className="block py-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  to="/"
                >
                  Logout
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div variants={itemVariants}>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/login"
                className="block py-2"
              >
                Login
              </NavLink>
            </motion.div>
          )}
        </>
      ) : (
        // *Desktop Links
        <>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            style={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
            to="/allcars"
          >
            Available Cars
          </NavLink>
          {/* Conditional Rendering For Authenticated User */}
          {user ? (
            <>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/addcar"
              >
                Add Car
              </NavLink>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/mycars"
              >
                My Cars
              </NavLink>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/mybookings"
              >
                My Bookings
              </NavLink>
              <NavLink
                style={navLinkStyles}
                onClick={() => setIsMenuOpen(false)}
                to="/bookingrequests"
              >
                Booking Requests
              </NavLink>
              <Link
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                to="/"
              >
                Logout
              </Link>
            </>
          ) : (
            <NavLink
              style={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
              to="/login"
            >
              Login
            </NavLink>
          )}
        </>
      )}
    </>
  );

  return (
    <div>
      {/* Navbar Container */}
      <motion.nav
        className="flex-centric font-button dark:shadow-text-secondary bg-background-light dark:bg-background-dark fixed top-0 left-0 z-[100] w-full justify-between gap-5 px-3 shadow-md xl:px-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <WebTitle />
        {/* Desktop Links */}
        <div className="flex-centric **:hover:text-text-secondary **:dark:hover:text-text-secondary-dark hidden gap-5 **:text-lg lg:flex">
          {links(false)}
        </div>

        <div className="flex-centric gap-3">
          {/* User Profile Or Default Icon */}
          {user && (
            <div>
              <a
                data-tooltip-id="user-name"
                data-tooltip-content={user.displayName}
              >
                {user.photoURL ? (
                  <img
                    referrerPolicy="no-referrer"
                    src={user.photoURL}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <FiUser className="h-7 w-7 rounded-full" />
                )}
              </a>
              <Tooltip id="user-name" />
            </div>
          )}
          {/* Dark Mode Toggle Button */}
          <motion.button
            onClick={toggleDarkMode}
            className={`rounded-full p-2 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-300`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            {isDark ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-700" />
            )}
          </motion.button>
          {/* Mobile Menu Toggle Button */}
          <motion.button
            onClick={toggleMenu}
            className={`rounded-md p-2 ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } flex transition-colors lg:hidden`}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="bg-background-light dark:bg-background-dark fixed top-16 left-0 z-[90] w-full overflow-hidden shadow-lg lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="flex flex-col items-start space-y-2 px-8 py-4 text-lg">
              {links(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
