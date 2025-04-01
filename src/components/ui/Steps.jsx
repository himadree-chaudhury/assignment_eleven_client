import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCalendarCheck, FaMapLocationDot, FaTrophy } from "react-icons/fa6";

const Steps = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const steps = [
    {
      title: "Choose location",
      description: "Choose your location and find your best car.",
      icon: <FaMapLocationDot />,
    },
    {
      title: "Pick-up date",
      description: "Select your pick up date and time to book your car.",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Book your car",
      description: "Book your car and we will deliver it directly to you.",
      icon: <FaTrophy />,
    },
  ];

  // Create a series of small dots for the line
  const smallDots = Array(20)
    .fill(0)
    .map((_, i) => i * 5); // 20 small dots spaced evenly

  return (
    <div className="relative p-8">
      <div
        className={`relative ${isMobile ? "flex-col" : "flex justify-between"} items-start`}
      >
        {/* Progress line with small dots - horizontal for desktop, vertical for mobile */}
        <div
          className={`absolute ${
            isMobile
              ? "left-7.5 top-12 bottom-0 w-1 h-auto"
              : "top-24 left-[16%] right-[16%] h-1 w-auto"
          } bg-accent z-0`}
        >
          {smallDots.map((position, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-text-primary-dark dark:bg-text-primary"
              style={
                isMobile
                  ? {
                      top: `${position}%`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: "4px",
                      width: "4px",
                    }
                  : {
                      left: `${position}%`,
                      top: "50%",
                      transform: "translateY(-50%)",
                      height: "4px",
                      width: "4px",
                    }
              }
            />
          ))}
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative z-10 ${
              isMobile ? "mb-20 last:mb-0 ml-16" : ""
            }`}
            style={!isMobile ? { width: `${100 / steps.length}%` } : {}}
          >
            <div
              className={`flex ${isMobile ? "flex-row items-start" : "flex-col items-center"}`}
            >
              {/* For mobile: Position icon and number to the left */}
              {isMobile && (
                <div className="absolute -left-16 top-0 flex flex-col items-center">
                  <div className="h-16 w-16 text-4xl text-accent-hover flex-centric mb-2">
                    {step.icon}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary border-4 border-primary-hover flex items-center justify-center z-[40]">
                    <span className="text-text-primary font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
              )}

              {/* For desktop: Position icon and number above */}
              {!isMobile && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="h-16 w-16 text-5xl text-accent-hover flex-centric mb-3"
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="h-10 w-10 rounded-full bg-primary border-4 border-primary-hover flex items-center justify-center mb-2 z-[40]"
                  >
                    <span className="text-text-primary font-bold">
                      {index + 1}
                    </span>
                  </motion.div>
                </>
              )}

              <div className={isMobile ? "ml-4" : ""}>
                <h3 className={`mb-2 ${!isMobile ? "text-center" : ""}`}>
                  {step.title}
                </h3>
                <p className={`${!isMobile ? "text-center px-2" : ""}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Animated rocket emoji - one-way animation */}
        <div
          className={`absolute ${isMobile ? "left-7.5 top-0 bottom-0" : "top-24 left-[15%] right-[15%]"}`}
        >
          {/* Main animated rocket */}
          <motion.div
            className="absolute"
            style={{
              fontSize: isMobile ? "20px" : "24px",
              transform: isMobile ? "translateX(-50%)" : "translateY(-50%)",
              transformOrigin: "center center",
            }}
            initial={
              isMobile
                ? { top: "16%", left: "50%" }
                : { left: "0%", top: "50%" }
            }
            animate={
              isMobile
                ? { top: ["16%", "58%", "97%"] }
                : { left: ["0%", "48%", "95%"] }
            }
            transition={{
              duration: 5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            🚘
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
