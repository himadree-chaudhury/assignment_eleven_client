import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiCalendar,
  FiCheck,
  FiDollarSign,
  FiFileText,
  FiList,
  FiSettings,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { FaCar } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddCar = () => {
  const navigate = useNavigate();
  // *Context States
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Hook Form States
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // *Handles Form Submission
  const onSubmit = async (data) => {
    // *Initialize Rent Count
    const rent_count = 0;
    try {
      await axiosSecure.post(`/cars`, {
        ...data,
        price: Number(data.price),
        rent_count,
        addedBy: user.email,
        dateAdded: new Date(),
      });
      toast.success("Car Added Successfully!");
      navigate("/allcars");
    } catch (e) {
      toast.error(e);
    }
  };

  // *Animation Variants
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="section-layout min-h-screen"
    >
      <title>Add Car | driveXpress</title>
      <div className="mx-auto max-w-2xl">
        <motion.div variants={itemVariants}>
          <h2>Add New Car</h2>
          <p className="pb-2 text-center">
            Fill Out The Form To Add A New Vehicle To Your Rental Fleet
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="card p-6 sm:p-8"
          variants={containerVariants}
        >
          {/* Basic Information Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-primary mb-3 flex items-center text-lg font-semibold">
              <FaCar className="mr-2" /> Basic Information
            </h3>
            {/* Form Fields For Car Name, Type, Photo, Etc. */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name">Car Name *</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Car Name Is Required",
                    minLength: {
                      value: 3,
                      message: "Name Must Be At Least 3 Characters",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.name && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. Mercedes Benz GLE"
                />
                {errors.name && (
                  <p className="error-massage">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="type">Vehicle Type *</label>
                <input
                  type="text"
                  id="type"
                  {...register("type", {
                    required: "Vehicle Type Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.type && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. SUV, Sedan, Hatchback"
                />
                {errors.type && (
                  <p className="error-massage">{errors.type.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="photoURL">Car Photo *</label>
                <input
                  id="photoURL"
                  type="url"
                  {...register("photoURL", {
                    pattern: {
                      value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
                      message: "Please Enter A Valid Image URL",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.photoURL && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. https://example.com/photo.jpg"
                />
                {errors.photoURL && (
                  <p className="error-massage">{errors.photoURL.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="driverLicense">Driver's License Number *</label>
                <input
                  type="text"
                  id="driverLicense"
                  {...register("driverLicense", {
                    required: "License Number Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.driverLicense && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. Y1234567"
                />
                {errors.driverLicense && (
                  <p className="error-massage">
                    {errors.driverLicense.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="registrationNumber">
                  Vehicle Registration Number *
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  {...register("registrationNumber", {
                    required: "Registration Number Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.registrationNumber && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. ABC 1234"
                />
                {errors.registrationNumber && (
                  <p className="error-massage">
                    {errors.registrationNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  {...register("location", {
                    required: "Location Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.location && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 123 Luxury Car Avenue, Miami, FL"
                />
                {errors.location && (
                  <p className="error-massage">{errors.location.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Rental Period Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-accent mb-3 flex items-center text-lg font-semibold">
              <FiCalendar className="mr-2" /> Rental Period
            </h3>
            {/* Form Fields For Pickup And Return Dates */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="pickupDate">From *</label>
                <input
                  type="date"
                  id="pickupDate"
                  {...register("pickupDate", {
                    required: "Pickup Date Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.pickupDate && "border-error focus:ring-error"
                  } `}
                />
                {errors.pickupDate && (
                  <p className="error-massage">{errors.pickupDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="returnDate">To *</label>
                <input
                  type="date"
                  id="returnDate"
                  {...register("returnDate", {
                    required: "Return Date Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.returnDate && "border-error focus:ring-error"
                  } `}
                />
                {errors.returnDate && (
                  <p className="error-massage">{errors.returnDate.message}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-warning mb-3 flex items-center text-lg font-semibold">
              <FiDollarSign className="mr-2" /> Pricing
            </h3>
            {/* Form Field For Daily Rate */}
            <div>
              <label htmlFor="price">Daily Rate ($) *</label>
              <input
                type="number"
                id="price"
                {...register("price", {
                  required: "Daily Rate Is Required",
                  min: {
                    value: 1,
                    message: "Price Must Be Greater Than 0",
                  },
                })}
                className={`border px-4 py-2 ${
                  errors.price && "border-error focus:ring-error"
                } `}
              />
              {errors.price && (
                <p className="error-massage">{errors.price.message}</p>
              )}
            </div>
          </motion.div>

          {/* Specifications Section */}
          <motion.div variants={itemVariants} className="mb-6 rounded-lg p-4">
            <h3 className="text-success mb-3 flex items-center text-lg font-semibold">
              <FiSettings className="mr-2" /> Specifications
            </h3>
            {/* Form Fields For Passengers, Fuel Type, Transmission, Etc. */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="passengers">Passengers (max) *</label>
                <input
                  type="number"
                  id="passengers"
                  {...register("passengers", {
                    required: "Passenger Count Is Required",
                    min: {
                      value: 1,
                      message: "Must Have At Least 1 Passenger",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.passengers && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 5"
                />
                {errors.passengers && (
                  <p className="error-massage">{errors.passengers.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="fuelType">Fuel Type *</label>
                <select
                  id="fuelType"
                  {...register("fuelType", {
                    required: "Fuel Type Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.fuelType && "border-error focus:ring-error"
                  } `}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
                {errors.fuelType && (
                  <p className="error-massage">{errors.fuelType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="transmission">Transmission *</label>
                <select
                  id="transmission"
                  {...register("transmission", {
                    required: "Transmission Is Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.transmission && "border-error focus:ring-error"
                  } `}
                >
                  <option value="">Select Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
                {errors.transmission && (
                  <p className="error-massage">{errors.transmission.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  {...register("year", {
                    required: "Year Is Required",
                    min: {
                      value: 2000,
                      message: "Year Must Be 2000 Or Later",
                    },
                    max: {
                      value: new Date().getFullYear() + 1,
                      message: "Year Cannot Be In The Future",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.year && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 2022"
                />
                {errors.year && (
                  <p className="error-massage">{errors.year.message}</p>
                )}
              </div>

              {/* Mileage Field */}
              <div>
                <label htmlFor="mileage">Mileage (kmpl) *</label>
                <input
                  type="number"
                  id="mileage"
                  {...register("mileage", {
                    required: "Mileage Is Required",
                    min: {
                      value: 0,
                      message: "Mileage Cannot Be Negative",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.mileage && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 25"
                />
                {errors.mileage && (
                  <p className="error-massage">{errors.mileage.message}</p>
                )}
              </div>

              {/* Distance Travelled Field */}
              <div>
                <label htmlFor="distanceTravelled">
                  Distance Travelled (km) *
                </label>
                <input
                  type="number"
                  id="distanceTravelled"
                  {...register("distanceTravelled", {
                    required: "Distance Travelled Is Required",
                    min: {
                      value: 0,
                      message: "Distance Cannot Be Negative",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.distanceTravelled && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. 5000"
                />
                {errors.distanceTravelled && (
                  <p className="error-massage">
                    {errors.distanceTravelled.message}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Features Input */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Features Input */}
            <div className="rounded-lg p-4">
              <h3 className="text-error mb-3 flex items-center text-lg font-semibold">
                <FiList className="mr-2" /> Features
              </h3>
              <div>
                <label htmlFor="features">
                  Enter Features (comma separated) *
                </label>
                <textarea
                  id="features"
                  {...register("features", {
                    required: "Features Are Required",
                  })}
                  className={`border px-4 py-2 ${
                    errors.features && "border-error focus:ring-error"
                  } `}
                  placeholder="e.g. Panoramic Sunroof, Heated Seats, Apple CarPlay"
                  rows={3}
                />
                {errors.features && (
                  <p className="error-massage">{errors.features.message}</p>
                )}
              </div>
            </div>

            {/* Description Input */}
            <div className="rounded-lg p-4">
              <h3 className="text-accent-hover mb-3 flex items-center text-lg font-semibold">
                <FiFileText className="mr-2" /> Description
              </h3>
              <div>
                <label htmlFor="description">Vehicle Description *</label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description Is Required",
                    minLength: {
                      value: 20,
                      message: "Description Must Be At Least 20 Characters",
                    },
                  })}
                  className={`border px-4 py-2 ${
                    errors.description && "border-error focus:ring-error"
                  } `}
                  rows={4}
                  placeholder="e.g. The Mercedes-Benz GLE combines luxury with versatility, offering premium comfort and advanced technology in a sophisticated SUV package. Perfect for both city driving and long journeys."
                />
                {errors.description && (
                  <p className="error-massage">{errors.description.message}</p>
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
              className="flex-centric bg-primary hover:bg-primary-hover focus:ring-primary w-full rounded-md border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <FiCheck className="mr-2" />
              Add Vehicle
            </motion.button>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AddCar;
