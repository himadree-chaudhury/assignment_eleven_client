import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Header from "../components/Header";
import Offers from "../components/ui/Offers";
import Heading from "../components/utilities/Heading";
import Features from "../components/ui/Features";
import Steps from "../components/ui/Steps";
import RecentCars from "../components/ui/RecentCars.jsx";

const Home = () => {
  // *Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div>
      {/* Hero Banner Section */}
      {/* This Section Displays The Hero Banner With The Main Header */}
      <motion.section
        className="section-layout"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Header />
      </motion.section>

      {/* Car Renting Process Section */}
      {/* This Section Explains The Steps To Rent A Car */}
      <motion.section
        className="section-layout"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Heading
          title={"HOW IT WORK"}
          heading={"Rent With Following Steps"}
          description={
            "Easily find the perfect car, set your pick-up time, and enjoy seamless delivery to your location"
          }
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Steps />
        </motion.div>
      </motion.section>

      {/* Recent Listing Car Section */}
      {/* This Section Showcases The Recently Listed Cars Available For Rent */}
      <motion.section
        className="section-layout"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.3 }}
      >
        <Heading
          title={"RENTAL DEALS"}
          heading={"Recent Listing"}
          description={
            "We present popular cars that are rented by customers to maximize your comfort on long trips"
          }
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <RecentCars />
        </motion.div>
      </motion.section>

      {/* Special Offer Section */}
      {/* This Section Highlights Special Offers And Coupons Available */}
      <motion.section
        className="section-layout"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Heading
          title={"COUPONS"}
          heading={"Special Offers"}
          description={
            "Get the best and most exciting bonus today on your journey"
          }
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Offers />
        </motion.div>
      </motion.section>

      {/* Why Choose Us Section */}
      {/* This Section Explains The Advantages Of Choosing This Service */}
      <motion.section
        className="section-layout"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={sectionVariants}
        viewport={{ once: false, amount: 0.2 }}
      >
        <Heading
          title={"ADVANTAGES"}
          heading={"Why Choose Us?"}
          description={
            "We present many guarantees and advantages when you rent a car with us for your trip"
          }
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Features />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
