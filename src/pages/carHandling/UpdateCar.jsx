import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiCheck,
  FiDollarSign,
  FiFileText,
  FiList,
  FiSettings,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/ui/Loading";

const UpdateCar = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [car, setCar] = useState([]);
  const { loading, setLoading, user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getCar = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure(`/cars/${id}`);
      setCar(data);
      reset({
        name: data.name,
        type: data.type,
        photoURL: data.photoURL,
        driverLicense: data.driverLicense,
        registrationNumber: data.registrationNumber,
        location: data.location,
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
        price: data.price,
        passengers: data.passengers,
        fuelType: data.fuelType,
        transmission: data.transmission,
        year: data.year,
        mileage: data.mileage,
        distanceTravelled: data.distanceTravelled,
        features: data.features,
        description: data.description,
      });
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
      return;
    }
    getCar();
  }, []);

  const { _id } = car;

  const onSubmit = async (data) => {
    // Submit Data To Backend
    try {
      await axiosSecure.patch(`/cars/${id}`, {
        ...data,
        price: Number(data.price),
      });
      toast.success("Car Updated Successfully!");
      reset();
      navigate("/allcars");
    } catch (e) {
      toast.error(e);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 },
    },
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="section-layout min-h-screen"
    >
      <title>Update Car | driveXpress</title>
      <div className="mx-auto max-w-2xl">
        <motion.div variants={itemVariants}>
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Update Your Car
          </h2>
          <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
            Fill out the form to update the vehicle from your rental fleet
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-lg bg-white p-6 shadow-lg sm:p-8 dark:bg-gray-800"
          variants={containerVariants}
        >
          {/* Basic Information */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20"
          >
            <h3 className="mb-3 flex items-center text-lg font-semibold text-blue-800 dark:text-blue-200">
              <FaCar className="mr-2" /> Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Car Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Car name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. Mercedes Benz GLE"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Vehicle Type *
                </label>
                <input
                  type="text"
                  id="type"
                  {...register("type", {
                    required: "Vehicle type is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.type
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. SUV, Sedan, Hatchback"
                />
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Car Photo *
                </label>
                <input
                  id="photoURL"
                  type="url"
                  {...register("photoURL", {
                    pattern: {
                      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
                      message: "Please enter a valid image URL",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.type
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. https://example.com/photo.jpg"
                />
                {errors.photoURL && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.photoURL.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="driverLicense"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Driver's License Number *
                </label>
                <input
                  type="text"
                  id="driverLicense"
                  {...register("driverLicense", {
                    required: "License number is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.driverLicense
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. Y1234567"
                />
                {errors.driverLicense && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.driverLicense.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="registrationNumber"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Vehicle Registration Number *
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  {...register("registrationNumber", {
                    required: "Registration Number is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.registrationNumber
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. ABC 1234"
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  {...register("location", {
                    required: "location is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. 123 Luxury Car Avenue, Miami, FL"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Rental Period */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20"
          >
            <h3 className="mb-3 flex items-center text-lg font-semibold text-purple-800 dark:text-purple-200">
              <FiCalendar className="mr-2" /> Rental Period
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="pickupDate"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  From *
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  {...register("pickupDate", {
                    required: "Pickup date is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.pickupDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
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
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  To *
                </label>
                <input
                  type="date"
                  id="returnDate"
                  {...register("returnDate", {
                    required: "Return date is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.returnDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                />
                {errors.returnDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.returnDate.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Pricing */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20"
          >
            <h3 className="mb-3 flex items-center text-lg font-semibold text-purple-800 dark:text-purple-200">
              <FiDollarSign className="mr-2" /> Pricing
            </h3>

            <div>
              <label
                htmlFor="price"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Daily Rate ($) *
              </label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Daily rate is required",
                  min: {
                    value: 1,
                    message: "Price must be greater than 0",
                  },
                })}
                className={`w-full rounded-lg border px-4 py-2 ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
          </motion.div>

          {/* Specifications */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-lg bg-green-50 p-4 dark:bg-green-900/20"
          >
            <h3 className="mb-3 flex items-center text-lg font-semibold text-green-800 dark:text-green-200">
              <FiSettings className="mr-2" /> Specifications
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="passengers"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Passengers (max) *
                </label>
                <input
                  type="number"
                  id="passengers"
                  {...register("passengers", {
                    required: "Passenger count is required",
                    min: {
                      value: 1,
                      message: "Must have at least 1 passenger",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.passengers
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. 5"
                />
                {errors.passengers && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.passengers.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="fuelType"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Fuel Type *
                </label>
                <select
                  id="fuelType"
                  {...register("fuelType", {
                    required: "Fuel type is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.fuelType
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                >
                  <option value="">Select fuel type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.fuelType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.fuelType.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="transmission"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Transmission *
                </label>
                <select
                  id="transmission"
                  {...register("transmission", {
                    required: "Transmission is required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.transmission
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
                {errors.transmission && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.transmission.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  {...register("year", {
                    required: "Year is required",
                    min: {
                      value: 2000,
                      message: "Year must be 2000 or later",
                    },
                    max: {
                      value: new Date().getFullYear() + 1,
                      message: "Year cannot be in the future",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.year
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. 2022"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.year.message}
                  </p>
                )}
              </div>

              {/* New Mileage Field */}
              <div>
                <label
                  htmlFor="mileage"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mileage (kmpl) *
                </label>
                <input
                  type="number"
                  id="mileage"
                  {...register("mileage", {
                    required: "Mileage is required",
                    min: {
                      value: 0,
                      message: "Mileage cannot be negative",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.mileage
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. 25"
                />
                {errors.mileage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mileage.message}
                  </p>
                )}
              </div>

              {/* Distance Travelled Field */}
              <div>
                <label
                  htmlFor="distanceTravelled"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Distance Travelled (km) *
                </label>
                <input
                  type="number"
                  id="distanceTravelled"
                  {...register("distanceTravelled", {
                    required: "Distance travelled is required",
                    min: {
                      value: 0,
                      message: "Distance cannot be negative",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.distanceTravelled
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. 5000"
                />
                {errors.distanceTravelled && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.distanceTravelled.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features & Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                <FiList className="mr-2" /> Features
              </h3>
              <div>
                <label
                  htmlFor="features"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Enter features (comma separated) *
                </label>
                <textarea
                  id="features"
                  {...register("features", {
                    required: "Features are required",
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.features
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  placeholder="e.g. Panoramic Sunroof, Heated Seats, Apple CarPlay"
                  rows={3}
                />
                {errors.features && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.features.message}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
              <h3 className="mb-3 flex items-center text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                <FiFileText className="mr-2" /> Description
              </h3>
              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Vehicle Description *
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 20,
                      message: "Description must be at least 20 characters",
                    },
                  })}
                  className={`w-full rounded-lg border px-4 py-2 ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500 dark:border-gray-600"
                  } bg-white focus:ring-2 focus:outline-none dark:bg-gray-700`}
                  rows={4}
                  placeholder="e.g. The Mercedes-Benz GLE combines luxury with versatility, offering premium comfort and advanced technology in a sophisticated SUV package. Perfect for both city driving and long journeys."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="mt-8">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              <FiCheck className="mr-2" />
              Update Vehicle
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default UpdateCar;
