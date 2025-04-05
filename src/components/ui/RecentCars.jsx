import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Marquee from "react-fast-marquee";
import Loading from "./Loading.jsx";
import CarCard from "../utilities/CarCard.jsx";

const RecentCars = () => {
  // *Context States
  const [recentCars, setRecentCars] = useState([]);

  // *Data States
  const [loading, setLoading] = useState(true);

  // *Get Recent Cars
  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/recentcars`,
        );
        setRecentCars(data);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Marquee gradient={false} pauseOnHover={true}>
            {/* Render Car Cards */}
            {recentCars.map((car) => (
              <div key={car._id} className="mx-2 overflow-hidden">
                <CarCard layout="grid" carData={car} />
              </div>
            ))}
          </Marquee>
          {/* Button More Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/allcars"
              className="btn-primary flex-centric mx-auto mt-6 w-fit"
            >
              Browse More
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RecentCars;
