import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Header from "../components/Header";
import Offers from "../components/Offers";
import Heading from "../components/Heading";
import Features from "../components/Features";
import Steps from "../components/Steps";

const Home = () => {
  return (
    <div className="">
      {/* Header Section */}
      <Header />
      {/* Car Renting Process */}
      <section className="section-layout border">
        <Heading
          title={"HOW IT WORK"}
          heading={"Rent With Following Steps"}
          description={
            "Easily find the perfect car, set your pick-up time, and enjoy seamless delivery to your location"
          }
        />
        <div>
          <Steps />
        </div>
      </section>
      {/* Recent Listing Car Section */}
      <section className="section-layout border">
        <Heading
          title={"RENTAL DEALS"}
          heading={"Recent Listing"}
          description={
            "We present popular cars that are rented by customers to maximize your comfort on long trips"
          }
        />
      </section>
      {/* Special Offer Section */}
      <section className="section-layout border">
        <Heading
          title={"CUPONS"}
          heading={"Special Offers"}
          description={
            "Get the best and most exciting bonus today on your journey"
          }
        />
        <div>
          <Offers />
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="section-layout border">
        <Heading
          title={"ADVANTAGES"}
          heading={"Why Choose Us?"}
          description={
            "We present many guarantees and advantages when you rent a car with us for your trip"
          }
        />
        <Features />
      </section>
    </div>
  );
};

export default Home;
