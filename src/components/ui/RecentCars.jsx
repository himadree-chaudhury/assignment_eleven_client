import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";
import CarCard from "../utilities/CarCard.jsx";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentCars = () => {
  const [recentCars, setRecentCars] = useState([]);
  const { loading, setLoading } = useAuth();

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
            {recentCars.map((car) => (
              <div key={car._id} className="mx-2 overflow-hidden">
                <CarCard layout="grid" carData={car} />
              </div>
            ))}
          </Marquee>
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
