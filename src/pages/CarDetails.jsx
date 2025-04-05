import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiDroplet,
  FiMapPin,
  FiSettings,
  FiUsers,
  FiWifi,
  FiX,
} from "react-icons/fi";
import axios from "axios";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { checkAvailability } from "../components/utilities/dateUtilities.js";
import useAuth from "../hooks/useAuth.jsx";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
import Loading from "../components/ui/Loading.jsx";

const CarDetails = () => {
  const navigate = useNavigate();

  // *Context States
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data States
  const [loading, setLoading] = useState(true);
  const [car, setCar] = useState([]);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);
  const [title, setTitle] = useState("driveXpress");

  // *Hook Form States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // *Fetch Car Details
  useEffect(() => {
    const getCar = async () => {
      try {
        window.scrollTo(0, 0);
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/${id}`,
        );
        setCar(data);
        setTitle(`${data.name} | driveXpress`);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getCar();
  }, [id]);

  // *Handle Submit Booking Data
  const onSubmit = async (data) => {
    try {
      await axiosSecure.post(`/bookings`, {
        carID: car._id,
        photoURL: car.photoURL,
        name: car.name,
        type: car.type,
        addedBy: car.addedBy,
        price: car.price,
        ...data,
        totalPrice:
          (differenceInDays(
            new Date(data.returnDate),
            new Date(data.pickupDate),
          ) +
            1) *
          (Number(car.price) + 85),
        dateBooked: new Date(),
        bookedBy: user.email,
        status: "pending",
      });
      toast.success("Car Booked Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setBookingConfirmation(null);
      navigate("/mybookings");
    }
  };

  // *Animation Variants
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

  // *Show Loading Spinner While Fetching Data
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
        <motion.div variants={itemVariants}>
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <div>
              <h1>{car.name}</h1>
              <p>{car.type}</p>
            </div>
            <div className="flex-centric text-primary mt-4 gap-2 md:mt-0 dark:text-white">
              <FiCheckCircle />
              <span>{car.rent_count} Bookings</span>
            </div>
          </div>
        </motion.div>

        {/* Requirements & Benefits */}
        <motion.div variants={itemVariants} className="mb-8">
          {/* Display Car Image And Details */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <motion.div
              className="overflow-hidden rounded-xl lg:col-span-2"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src={car.photoURL}
                alt={car.name}
                className="h-64 w-full rounded-xl object-cover shadow-lg md:h-96"
              />
            </motion.div>
            {/* Rental Requirements And Benefits */}
            <motion.div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  className="card h-full p-5"
                >
                  <h3 className="mb-3 font-semibold dark:text-white">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.items.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-success mt-1 mr-2 flex-shrink-0" />
                        <p className="">{item}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Specifications */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:col-span-2"
          >
            {/* Specifications */}
            <motion.div
              className="card p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="mb-4 text-xl font-semibold">Specifications</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <div className="bg-primary mr-3 rounded-full p-2">
                    <FiUsers className="text-white" />
                  </div>
                  <div>
                    <p>Passengers</p>
                    <p className="font-medium dark:text-white">
                      {car.passengers}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-secondary mr-3 rounded-full p-2">
                    <FiDroplet className="text-white" />
                  </div>
                  <div>
                    <p>Fuel Type</p>
                    <p className="font-medium dark:text-white">
                      {car.fuelType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-accent mr-3 rounded-full p-2">
                    <FiSettings className="text-white" />
                  </div>
                  <div>
                    <p>Transmission</p>
                    <p className="font-medium dark:text-white">
                      {car.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-success mr-3 rounded-full p-2">
                    <FiCalendar className="text-white" />
                  </div>
                  <div>
                    <p>Year</p>
                    <p className="font-medium dark:text-white">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-warning mr-3 rounded-full p-2">
                    <FiMapPin className="text-white" />
                  </div>
                  <div>
                    <p>Location</p>
                    <p className="font-medium dark:text-white">
                      {car.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-error mr-3 rounded-full p-2">
                    <FiWifi className="text-white" />
                  </div>
                  <div>
                    <p>GPS</p>
                    <p className="font-medium dark:text-white">OBD</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="card p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="mb-4 text-xl font-semibold">Features</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {car?.features?.split(",").map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="bg-primary mr-2 h-2 w-2 rounded-full"></div>
                    <span className="dark:text-gray-300">{feature.trim()}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="card p-6"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="mb-4 text-xl font-semibold">Description</h2>
              <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                {car.description}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Booking Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="card sticky top-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Price Section */}
              <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                <div className="mb-2 flex items-center justify-between">
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
                          "linear-gradient(90deg, #28b4df, #0078a6)",
                          "linear-gradient(90deg, #9a5ae6, #6a2dbf)",
                          "linear-gradient(90deg, #845ae6, #5429b3)",
                        ],
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
                <h2 className="mb-3 text-lg font-semibold dark:text-white">
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
                      className={`flex justify-between py-1 ${
                        item.highlight
                          ? "border-t border-gray-200 pt-3 font-bold dark:border-gray-700"
                          : ""
                      }`}
                    >
                      <span
                        className={`${
                          item.highlight
                            ? "text-gray-800 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`${
                          item.highlight
                            ? "text-primary dark:text-blue-400"
                            : "font-medium dark:text-white"
                        }`}
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
                  className={`w-full rounded-md py-3 font-semibold ${
                    checkAvailability(car.pickupDate, car.returnDate)
                      ? "btn-primary"
                      : "cursor-not-allowed bg-gray-200 text-gray-500"
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
        {bookingConfirmation &&
          (user ? (
            user.email !== car.addedBy ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-centric fixed inset-0 z-50 backdrop-blur-md"
              >
                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="card w-full max-w-md rounded-lg p-6"
                >
                  <h3 className="mb-4">Confirm Booking</h3>
                  {/* Rental Period */}
                  <motion.div
                    variants={itemVariants}
                    className="mb-6 rounded-lg p-4"
                  >
                    <h3 className="text-accent mb-3 flex items-center text-lg font-semibold">
                      <FiCalendar className="mr-2" /> Rental Period
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="pickupDate">Pickup Date *</label>
                        <input
                          type="date"
                          id="pickupDate"
                          {...register("pickupDate", {
                            required: "Pickup date is required",
                          })}
                          className={`border px-4 py-2 ${
                            errors.pickupDate && "border-error focus:ring-error"
                          } `}
                        />
                        {errors.pickupDate && (
                          <p className="error-massage">
                            {errors.pickupDate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="returnDate">Return Date *</label>
                        <input
                          type="date"
                          id="returnDate"
                          {...register("returnDate", {
                            required: "Return date is required",
                          })}
                          className={`border px-4 py-2 ${
                            errors.returnDate && "border-error focus:ring-error"
                          } `}
                        />
                        {errors.returnDate && (
                          <p className="error-massage">
                            {errors.returnDate.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                  {/* Submit Button */}
                  <motion.div className="flex-centric mt-8 justify-end gap-3">
                    <motion.span
                      onClick={() => setBookingConfirmation(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-centric rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <FiX className="mr-2" />
                      Cancel
                    </motion.span>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-centric bg-success hover:bg-success-hover rounded-md px-4 py-2 text-white transition-colors"
                    >
                      <FiCheck className="mr-2" />
                      Confirm
                    </motion.button>
                  </motion.div>
                </motion.form>
              </motion.div>
            ) : (
              toast.error("You Can Not Book Your Own Car")
            )
          ) : (
            toast.error("Please Login First")
          ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default CarDetails;
