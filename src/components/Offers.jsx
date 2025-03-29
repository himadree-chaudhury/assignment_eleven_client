import React from "react";
import { Link } from "react-router-dom";
import cupon from "../assets/cupon.png";

const Offers = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // 0 = Sunday, ..., 5 = Friday
  const lastAprilDate = new Date(currentDate.getFullYear(), 3, 30); // April is month 3 (0-based)

  // *Calculate days until next Friday
  const daysUntilFriday = (5 - currentDay + 7) % 7 || 7; // Days left until next Friday
  currentDate.setDate(currentDate.getDate() + daysUntilFriday); // Move to next Friday

  // *Calculate the time left for next Friday
  const nextFriday = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // *Calculate the time left for the last April date (April 30th)
  const timeDiffApril = lastAprilDate - new Date();
  const daysLeftForApril = Math.ceil(timeDiffApril / (1000 * 60 * 60 * 24));
  const lastDayOfApril = lastAprilDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // *Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedTomorrow = tomorrow.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <div className="md:w-[45%] border border-text-secondary-dark rounded-lg">
        <div className="flex-centric justify-between bg-gradient-to-r from-primary-hover to-primary rounded-t-lg **:text-text-primary p-2">
          <div>
            <p className="font-semibold">Unlimited</p>
            <h1 className="font-extrabold text-4xl py-2">12% OFF !</h1>
            <p>Only {daysUntilFriday} days left...</p>
          </div>
          <img src={cupon} alt="Cupon Ticket" className="-rotate-12 w-32" />
        </div>
        <div className="p-2 mb-2">
          <div className="flex-centric justify-between">
            <h3>Get on enery Friday!</h3>
            <h3>#1</h3>
          </div>
          <p className="mb-5">{nextFriday}</p>
          <Link className="btn-primary">More...</Link>
        </div>
      </div>
      <div className="md:w-[45%] border border-text-secondary-dark rounded-lg">
        <div className="flex-centric justify-between bg-gradient-to-r from-accent-hover to-accent rounded-t-lg **:text-text-primary-dark p-2">
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="font-extrabold text-4xl py-2">$30 OFF !</h1>
            <p>Only {daysLeftForApril} days left...</p>
          </div>
          <img src={cupon} alt="Cupon Ticket" className="-rotate-12 w-32" />
        </div>
        <div className="p-2 mb-2">
          <div className="flex-centric justify-between">
            <h3>Luxary cars on this winter!</h3>
            <h3>#2</h3>
          </div>
          <p className="mb-5">{lastDayOfApril}</p>
          <Link className="btn-accent">More...</Link>
        </div>
      </div>
      <div className="md:w-[45%] border border-text-secondary-dark rounded-lg">
        <div className="flex-centric justify-between bg-gradient-to-r from-secondary-hover to-secondary rounded-t-lg **:text-text-primary p-2">
          <div>
            <p className="font-semibold">Limited</p>
            <h1 className="font-extrabold text-4xl py-2">$99/day</h1>
            <p>Only for five family members</p>
          </div>
          <img src={cupon} alt="Cupon Ticket" className="-rotate-12 w-32" />
        </div>
        <div className="p-2 mb-2">
          <div className="flex-centric justify-between">
            <h3>Get on family package!</h3>
            <h3>#3</h3>
          </div>
          <p className="mb-5">{formattedTomorrow}</p>
          <Link className="btn-secondary">More...</Link>
        </div>
      </div>
    </div>
  );
};

export default Offers;
