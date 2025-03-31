import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import WebTitle from "./ui/WebTitle";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Function to toggle mobile menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(document.documentElement.classList.contains("dark"));
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      transition: "color ease-in-out",
      duration: "1s",
      ...(isActive && {
        backgroundImage: "linear-gradient(to right, #28b4df, #8f97ef, #6b54e6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }),
    };
  };

  // Handle logout functionality
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

  // Animation variants for the mobile menu
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

  // Animation variants for individual menu items
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

  const links = (isMobile = false) => (
    <>
      {isMobile ? (
        // Mobile links with animation
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
                <button
                  className="cursor-pointer block py-2"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
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
        // Desktop links without animation
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
              <button
                className="cursor-pointer"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
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
      <motion.nav
        className="flex-centric justify-between gap-5 px-3 xl:px-5 font-button shadow-md dark:shadow-text-secondary bg-background-light dark:bg-background-dark fixed w-full z-[100] top-0 left-0"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <WebTitle />
        <div className="flex-centric gap-5 **:text-lg **:hover:text-text-secondary **:dark:hover:text-text-secondary-dark hidden lg:flex">
          {links(false)}
        </div>

        <div className="flex-centric gap-3">
          <motion.button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full cursor-pointer ${
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
          <motion.button
            onClick={toggleMenu}
            className={`p-2 rounded-md cursor-pointer ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors lg:hidden flex`}
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

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-16 left-0 w-full bg-background-light dark:bg-background-dark z-[90] shadow-lg overflow-hidden lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="flex flex-col items-start space-y-2 py-4 text-lg px-8">
              {links(true)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
