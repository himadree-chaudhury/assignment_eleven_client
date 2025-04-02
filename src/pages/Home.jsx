import React from "react";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import Header from "../components/Header";
import Offers from "../components/ui/Offers";
import Heading from "../components/utilities/Heading";
import Features from "../components/ui/Features";
import Steps from "../components/ui/Steps";
import RecentCars from "../components/ui/RecentCars.jsx";

const Home = () => {
    // Animation variants for sections
    const sectionVariants = {
        hidden: {opacity: 0, y: 50},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    };

    // Staggered animation for child elements
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="">
            {/* Hero Banner Section */}
            <motion.section
                className="section-layout "
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={sectionVariants}
                viewport={{once: false, amount: 0.2}}
            >
                <Header/>
            </motion.section>

            {/* Car Renting Process */}
            <motion.section
                className="section-layout "
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={sectionVariants}
                viewport={{once: false, amount: 0.2}}
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
                    viewport={{once: false, amount: 0.2}}
                >
                    <Steps/>
                </motion.div>
            </motion.section>

            {/* Recent Listing Car Section */}
            <motion.section
                className="section-layout "
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={sectionVariants}
                viewport={{once: false, amount: 0.3}}
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
                    viewport={{once: false, amount: 0.2}}
                >
                    <RecentCars/>
                </motion.div>
            </motion.section>

            {/* Special Offer Section */}
            <motion.section
                className="section-layout "
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={sectionVariants}
                viewport={{once: false, amount: 0.2}}
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
                    viewport={{once: false, amount: 0.2}}
                >
                    <Offers/>
                </motion.div>
            </motion.section>

            {/* Why Choose Us Section */}
            <motion.section
                className="section-layout "
                initial="hidden"
                whileInView="visible"
                exit="exit"
                variants={sectionVariants}
                viewport={{once: false, amount: 0.2}}
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
                    viewport={{once: false, amount: 0.2}}
                >
                    <Features/>
                </motion.div>
            </motion.section>
        </div>
    );
};

export default Home;
