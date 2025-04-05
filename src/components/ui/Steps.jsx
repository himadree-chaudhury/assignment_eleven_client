import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCalendarCheck, FaMapLocationDot, FaTrophy } from "react-icons/fa6";

const Steps = () => {
  const [isMobile, setIsMobile] = useState(false);

  // *Check Screen Size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // *Steps Array
  const steps = [
    {
      title: "Choose Location",
      description: "Choose Your Location And Find Your Best Car.",
      icon: <FaMapLocationDot />,
    },
    {
      title: "Pick-Up Date",
      description: "Select Your Pick Up Date And Time To Book Your Car.",
      icon: <FaCalendarCheck />,
    },
    {
      title: "Book Your Car",
      description: "Book Your Car And We Will Deliver It Directly To You.",
      icon: <FaTrophy />,
    },
  ];

  // *Series Of Small Dots For The Progress Line
  const smallDots = Array(20)
    .fill(0)
    .map((_, i) => i * 5); // 20 Evenly Spaced Dots

  return (
    <div className="relative p-8">
      <div
        className={`relative ${isMobile ? "flex-col" : "flex justify-between"} items-start`}
      >
        {/* Progress Line With Small Dots */}
        <div
          className={`absolute ${
            isMobile
              ? "top-12 bottom-0 left-7.5 h-auto w-1"
              : "top-24 right-[16%] left-[16%] h-1 w-auto"
          } bg-accent z-0`}
        >
          {smallDots.map((position, index) => (
            <div
              key={index}
              className="bg-text-primary-dark dark:bg-text-primary absolute rounded-full"
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

        {/* Steps With Icons And Descriptions */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={`relative z-10 ${
              isMobile ? "mb-20 ml-16 last:mb-0" : ""
            }`}
            style={!isMobile ? { width: `${100 / steps.length}%` } : {}}
          >
            <div
              className={`flex ${isMobile ? "flex-row items-start" : "flex-col items-center"}`}
            >
              {/* Mobile: Icon And Number To The Left */}
              {isMobile && (
                <div className="absolute top-0 -left-16 flex flex-col items-center">
                  <div className="text-accent dark:text-primary flex-centric mb-2 h-16 w-16 text-4xl">
                    {step.icon}
                  </div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="bg-primary border-primary-hover z-[40] flex h-8 w-8 items-center justify-center rounded-full border-4"
                  >
                    <span className="font-bold text-white">{index + 1}</span>
                  </motion.div>
                </div>
              )}

              {/* Desktop: Icon And Number Above */}
              {!isMobile && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    className="text-accent dark:text-primary flex-centric mb-3 h-16 w-16 text-5xl"
                  >
                    {step.icon}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="bg-primary border-primary-hover z-[40] mb-2 flex h-10 w-10 items-center justify-center rounded-full border-4"
                  >
                    <span className="font-bold text-white">{index + 1}</span>
                  </motion.div>
                </>
              )}

              {/* Step Title And Description */}
              <div className={isMobile ? "ml-4" : ""}>
                <h3 className={`mb-2 ${!isMobile ? "text-center" : ""}`}>
                  {step.title}
                </h3>
                <p className={`${!isMobile ? "px-2 text-center" : ""}`}>
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Animated Rocket Emoji */}
        <div
          className={`absolute ${isMobile ? "top-0 bottom-0 left-7.5" : "top-24 right-[15%] left-[15%]"}`}
        >
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
