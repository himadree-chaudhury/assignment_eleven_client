import React from "react";
import Header from "../components/Header";
import solid1 from "../assets/rocket.png";
import solid2 from "../assets/check.png";
import solid3 from "../assets/user.png";
import solid4 from "../assets/shield.png";
import solid5 from "../assets/flip.png";
import solid6 from "../assets/layers.png";

const Home = () => {
  return (
    <div className="">
      <Header />
      {/* Why Choose Us Section */}
      <section className="section-layout border">
        <p className="text-center text-secondary">ADVANTAGES</p>
        <h2>Why Choose Us?</h2>
        <p className="text-center pb-5">
          We present many guarantees and advantages when you rent a car with us
          for your trip. Here are some of the advantages that you will get
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 *:p-2 *:shadow *:hover:scale-105 *:hover:shadow-xl *:transition-transform *:duration-300 ">
          <div className="flex-centric gap-5">
            <img src={solid1} alt="Rocket" />
            <div className="space-y-3">
              <h3>Easy Rent</h3>
              <p>
                Rent a car at our rental with an easy and fast process without
                disturbing your productivity
              </p>
            </div>
          </div>
          <div className="flex-centric gap-5">
            <img src={solid2} alt="Check Mark" />
            <div className="space-y-3">
              <h3>Premium Quality</h3>
              <p>
                Our cars are always maintained engine health and cleanliness to
                provide a more comfortable driving experience
              </p>
            </div>
          </div>
          <div className="flex-centric gap-5">
            <img src={solid3} alt="User" />
            <div className="space-y-3">
              <h3>Professional Agent</h3>
              <p>
                You can ask your travel companion to escort and guide your
                journey
              </p>
            </div>
          </div>
          <div className="flex-centric gap-5">
            <img src={solid4} alt="Shield" />
            <div className="space-y-3">
              <h3>Car Safety</h3>
              <p>
                We guarantee the safety of the engine on the car always running
                well with regular checks on the car engine
              </p>
            </div>
          </div>
          <div className="flex-centric gap-5">
            <img src={solid5} alt="Flip" />
            <div className="space-y-3">
              <h3>Refund</h3>
              <p>
                Our service guarantee provides a money back opportunity if the
                car does not match the information provided
              </p>
            </div>
          </div>
          <div className="flex-centric gap-5">
            <img src={solid6} alt="Layers" />
            <div className="space-y-3">
              <h3>Live Monitoring</h3>
              <p>
                Our service provides direct customer monitoring to monitor trips
                in terms of safety and comfort
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
