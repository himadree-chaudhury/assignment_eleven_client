import React from "react";
import WebTitle from "./WebTitle";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  // *Current Year For The Copyright Notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="shadow-lg shadow-text-secondary">
      <div className="section-layout border">
        <div className="py-5 sm:flex-centric  sm:justify-between ">
          <WebTitle />
          <div className="flex-centric space-x-4 **:transition-colors **:duration-100">
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
              className="text-black dark:text-text-primary-dark hover:text-text-secondary dark:hover:text-text-secondary-dark"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm px-5 md:px-0 font-footer">
          {/* Company Section */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
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
                  className="hover:underline text-accent dark:text-secondary cursor-pointer"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2">
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
                  className="hover:underline text-accent dark:text-secondary cursor-pointer"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h3 className="font-semibold mb-3">Policies</h3>
            <ul className="space-y-2">
              {[
                "Privacy",
                "Cookies",
                "Terms of use",
                "One Key™ terms and conditions",
                "Vrbo terms and conditions",
                "Accessibility",
                "Your privacy choices",
                "Content guidelines and reporting content",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:underline text-accent dark:text-secondary cursor-pointer"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="font-semibold mb-3">Help</h3>
            <ul className="space-y-2">
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
                  className="hover:underline text-accent dark:text-secondary cursor-pointer"
                >
                  <Link to={item}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-xs text-text-secondary dark:text-text-secondary-dark border-t pt-4 font-credit">
          <p>&copy; {currentYear} driveXpress Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
