import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import {
  FiCalendar,
  FiCheck,
  FiDroplet,
  FiMapPin,
  FiSettings,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { IoTicket } from "react-icons/io5";
import useAuth from "../hooks/useAuth.jsx";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
import { checkAvailability } from "../components/utilities/avaibalityCheck.js";
import toast from "react-hot-toast";
import Loading from "../components/ui/Loading.jsx";
import { useForm } from "react-hook-form";

const CarDetails = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [car, setCar] = useState([]);
  const [title, setTitle] = useState("driveXpress");
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Fetch Car Data
  useEffect(() => {
    const getCar = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(`/cars/${id}`);
        setCar(data);
        setTitle(`${data.name} | driveXpress`);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getCar();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // Submit Data To Backeed
    try {
      await axiosSecure.post(`/bookings`, {
        carID: car._id,
        photoURL: car.photoURL,
        name: car.name,
        type: car.type,
        price: car.price,
        ...data,
        dateBooked: new Date(),
        bookedBy: user.email,
      });
    } catch (e) {
      toast.error(e);
    } finally {
      setBookingConfirmation(null);
      toast.success("Car Booked Successfully!");
    }
  };
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <title>{title}</title>
      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-layout"
      >
        {/* Car Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold dark:text-white">{car.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{car.type}</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <IoTicket className="text-yellow-400 mr-1" />
              <span className="text-gray-500 ml-2 dark:text-gray-400">
                {car.rent_count} Bookings
              </span>
            </div>
          </div>
        </motion.div>

        {/* Requirements & Benefits */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div
              className="lg:col-span-2 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={car.photoURL}
                alt={car.name}
                className="w-full h-64 md:h-96 object-contain rounded-xl shadow-lg"
              />
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Rental Requirements",
                  items: [
                    "Valid driver's license",
                    "Minimum age 20",
                    "Credit card required",
                    "Proof of insurance",
                    "No smoking",
                  ],
                },
                {
                  title: "Included Benefits",
                  items: [
                    "Unlimited mileage",
                    "24/7 support",
                    "No hidden fees",
                    "Free additional driver",
                    "Child seat on request",
                  ],
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm h-full"
                >
                  <h3 className="font-semibold mb-3 dark:text-white">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specifications */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="p-2 bg-primary rounded-full mr-3">
                    <FiUsers className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Passengers
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.passengers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-secondary rounded-full mr-3">
                    <FiDroplet className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Fuel Type
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-accent rounded-full mr-3">
                    <FiSettings className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Transmission
                    </p>
                    <p className="font-medium dark:text-white">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="p-2 bg-success rounded-full mr-3">
                    <FiCalendar className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Year</p>
                    <p className="font-medium dark:text-white">{car.year}</p>
                  </div>
                </div>
                {/* New Location Field */}
                <div className="flex items-center">
                  <div className="p-2 bg-warning rounded-full mr-3">
                    <FiMapPin className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Location</p>
                    <p className="font-medium dark:text-white">
                      {car.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {car?.features?.split(",").map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="dark:text-gray-300">{feature.trim()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {car.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden sticky top-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Price Section */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold dark:text-white">
                    ${car.price}
                    <span className="text-sm font-normal"> /day</span>
                  </h3>
                  {checkAvailability(car.pickupDate, car.returnDate) ? (
                    <motion.span
                      initial={{ scale: 0.95 }}
                      animate={{
                        scale: 1,
                        background: [
                          "linear-gradient(90deg, #28b4df, #8f97ef)",
                          "linear-gradient(90deg, #8f97ef, #6b54e6)",
                          "linear-gradient(90deg, #6b54e6, #28b4df)",
                        ],
                        backgroundSize: "200% 200%",
                      }}
                      transition={{
                        scale: { duration: 0.3, type: "spring" },
                        background: {
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        },
                      }}
                      className="rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                    >
                      Available
                    </motion.span>
                  ) : (
                    <motion.span
                      initial={{ scale: 0.95 }}
                      animate={{
                        scale: [1, 0.98, 1],
                        backgroundColor: "#f3f4f6",
                        color: "#6b7280",
                        borderColor: "#e5e7eb",
                      }}
                      transition={{
                        scale: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        backgroundColor: { duration: 0.2 },
                      }}
                      className="rounded-full border px-3 py-1 text-xs font-semibold shadow-sm"
                    >
                      Unavailable
                    </motion.span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Mileage
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.mileage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Travelled
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.distanceTravelled} km
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Location
                    </span>
                    <span className="font-medium dark:text-white">
                      {car.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      Added
                    </span>
                    <span className="font-medium dark:text-white">
                      {new Date(car.dateAdded).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-3 dark:text-white">
                  Pricing Breakdown
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "Base Rate", value: `$${car.price}` },
                    { label: "Insurance", value: "Included" },
                    { label: "Taxes & Fees", value: "$85" },
                    {
                      label: "Estimated Total",
                      value: `$${parseInt(car.price) + 85}`,
                      highlight: true,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex justify-between py-1 ${item.highlight ? "border-t border-gray-200 dark:border-gray-700 pt-3 font-bold" : ""}`}
                    >
                      <span
                        className={`${item.highlight ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`${item.highlight ? "text-primary dark:text-blue-400" : "font-medium dark:text-white"}`}
                      >
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <div className="p-6 pt-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setBookingConfirmation({
                      id: car._id,
                      model: car.name,
                    })
                  }
                  disabled={!checkAvailability(car.pickupDate, car.returnDate)}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    checkAvailability(car.pickupDate, car.returnDate)
                      ? "btn-primary"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {checkAvailability(car.pickupDate, car.returnDate)
                    ? "Book Now"
                    : "Currently Unavailable"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Booking Confirmation Modal */}
      <AnimatePresence>
        {bookingConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            >
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Confirm Booking
              </h3>
              {/* Rental Period */}
              <motion.div
                variants={itemVariants}
                className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                  <FiCalendar className="mr-2" /> Rental Period
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pickupDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      id="pickupDate"
                      {...register("pickupDate", {
                        required: "Pickup date is required",
                      })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.pickupDate
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
                    />
                    {errors.pickupDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.pickupDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="returnDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Return Date *
                    </label>
                    <input
                      type="date"
                      id="returnDate"
                      {...register("returnDate", {
                        required: "Return date is required",
                      })}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.returnDate
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                      } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
                    />
                    {errors.returnDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.returnDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
              {/* Submit Button */}
              <motion.div className="flex-centric justify-end gap-3 mt-8">
                <motion.button
                  onClick={() => setBookingConfirmation(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-centric"
                >
                  <FiX className="mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-centric"
                >
                  <FiCheck className="mr-2" />
                  Confirm
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CarDetails;
