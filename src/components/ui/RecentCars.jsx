import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";
import CarCard from "../utilities/CarCard.jsx";
import Marquee from "react-fast-marquee";

const RecentCars = () => {
  const [recentCars, setRecentCars] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { loading, setLoading } = useAuth();

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(`/recentcars`);
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
        <Marquee gradient={false} pauseOnHover={true}>
          {recentCars.map((car) => (
            <div key={car._id} className="mx-2 overflow-hidden">
              <CarCard layout="grid" carData={car} />
            </div>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default RecentCars;
