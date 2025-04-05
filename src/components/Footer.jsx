import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import WebTitle from "./ui/WebTitle";

const Footer = () => {
  // *Current Year For The Copyright Notice
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="shadow-text-secondary shadow-lg"
    >
      <div className="section-layout">
        {/* Top Section With Logo And Social Media Links */}
        <div className="sm:flex-centric py-5 sm:justify-between">
          <WebTitle />
          <div className="flex-centric space-x-4 transition-colors duration-100">
            {/* Social Media Links */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-text-primary-dark hover:text-text-secondary dark:hover:text-text-secondary-dark text-black"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        {/* Middle Section With Footer Links */}
        <div className="font-footer grid grid-cols-1 gap-6 px-5 text-sm md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {/* Company Section */}
          <div>
            <h3 className="mb-3 font-semibold">Company</h3>
            <ul className="space-y-2">
              {/* Map Through Company-Related Links */}
              {[
                "About",
                "Jobs",
                "List your property",
                "Partnerships",
                "Newsroom",
                "Investor Relations",
                "Advertising",
                "Affiliate Marketing",
                "Feedback",
              ].map((item) => (
                <li
                  key={item}
                  className="text-accent dark:text-secondary cursor-pointer hover:underline"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="mb-3 font-semibold">Explore</h3>
            <ul className="space-y-2">
              {/* Map Through Explore-Related Links */}
              {[
                "United States of America travel guide",
                "Hotels in United States of America",
                "Vacation rentals in United States of America",
                "Vacation packages in United States of America",
                "Domestic flights",
                "Car rentals in United States of America",
                "All accommodation types",
                "One Key credit cards",
              ].map((item) => (
                <li
                  key={item}
                  className="text-accent dark:text-secondary cursor-pointer hover:underline"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="mb-3 font-semibold">Policies</h3>
            <ul className="space-y-2">
              {/* Map Through Policy-Related Links */}
              {[
                "Privacy",
                "Cookies",
                "Terms of use",
                "One Key™ terms and conditions",
                "Terms and conditions",
                "Accessibility",
                "Your privacy choices",
                "Content guidelines and reporting content",
              ].map((item) => (
                <li
                  key={item}
                  className="text-accent dark:text-secondary cursor-pointer hover:underline"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="mb-3 font-semibold">Help</h3>
            <ul className="space-y-2">
              {/* Map Through Help-Related Links */}
              {[
                "Support",
                "Cancel your rental booking",
                "Delete your profile",
                "Refund basics",
                "Use an driveXpress coupon",
                "International travel documents",
              ].map((item) => (
                <li
                  key={item}
                  className="text-accent dark:text-secondary cursor-pointer hover:underline"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-text-secondary dark:text-text-secondary-dark font-credit mt-10 border-t pt-4 text-center text-xs">
          {/* Copyright Notice */}
          <p>&copy; {currentYear} driveXpress Inc. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
