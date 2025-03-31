import React from "react";
import {useForm} from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import {motion} from "framer-motion";
import {FiCalendar, FiCheck, FiDollarSign, FiFileText, FiList, FiSettings} from "react-icons/fi";
import {FaCar} from "react-icons/fa";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const AddCar = () => {
    const {user} = useAuth();
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm();

    // const featuresArray = car.features.split(",").map((item) => item.trim());
    // Output: ["Panoramic Sunroof", "Heated Seats", "Apple CarPlay"]

    const onSubmit = async (data) => {
        const rent_count = 0;
        console.log(data, rent_count);
        // Submit Data To Backeed
        try {
            await axiosSecure.post(`/cars`, {
                ...data,
                rent_count,
                addedBy: user.email,
                dateAdded: new Date()
            });
            toast.success("Car Added Successfully!");
            reset();
            navigate("/allcars");
        } catch (e) {
            toast.error(e);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {type: "spring", stiffness: 300}
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="min-h-screen section-layout"
        >
            <div className="max-w-2xl mx-auto">
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        Add New Car
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                        Fill out the form to add a new vehicle to your rental fleet
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8"
                    variants={containerVariants}
                >
                    {/* Basic Information */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
                            <FaCar className="mr-2"/> Basic Information
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                            message: "Name must be at least 3 characters"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.name
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Vehicle Type *
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    {...register("type", {
                                        required: "Vehicle type is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.type
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Car Photo *
                                </label>
                                <input
                                    id="photoURL"
                                    type="url"
                                    {...register("photoURL", {
                                        pattern: {
                                            value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i,
                                            message: "Please enter a valid image URL"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.type
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Driver's License Number *
                                </label>
                                <input
                                    type="text"
                                    id="driverLicense"
                                    {...register("driverLicense", {
                                        required: "License number is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.driverLicense
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Vehicle Registration Number *
                                </label>
                                <input
                                    type="text"
                                    id="registrationNumber"
                                    {...register("registrationNumber", {
                                        required: "Registration Number is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.registrationNumber
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    {...register("location", {
                                        required: "location is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.location
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                        className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                            <FiCalendar className="mr-2"/> Rental Period
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="pickupDate"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    From *
                                </label>
                                <input
                                    type="date"
                                    id="pickupDate"
                                    {...register("pickupDate", {
                                        required: "Pickup date is required"
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
                                    To *
                                </label>
                                <input
                                    type="date"
                                    id="returnDate"
                                    {...register("returnDate", {
                                        required: "Return date is required"
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

                    {/* Pricing */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3 flex items-center">
                            <FiDollarSign className="mr-2"/> Pricing
                        </h3>

                        <div>
                            <label
                                htmlFor="price"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                        message: "Price must be greater than 0"
                                    }
                                })}
                                className={`w-full px-4 py-2 rounded-lg border ${
                                    errors.price
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                        className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"
                    >
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center">
                            <FiSettings className="mr-2"/> Specifications
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="passengers"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                            message: "Must have at least 1 passenger"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.passengers
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Fuel Type *
                                </label>
                                <select
                                    id="fuelType"
                                    {...register("fuelType", {
                                        required: "Fuel type is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.fuelType
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Transmission *
                                </label>
                                <select
                                    id="transmission"
                                    {...register("transmission", {
                                        required: "Transmission is required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.transmission
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                            message: "Year must be 2000 or later"
                                        },
                                        max: {
                                            value: new Date().getFullYear() + 1,
                                            message: "Year cannot be in the future"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.year
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                            message: "Mileage cannot be negative"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.mileage
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
                                            message: "Distance cannot be negative"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.distanceTravelled
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3 flex items-center">
                                <FiList className="mr-2"/> Features
                            </h3>
                            <div>
                                <label
                                    htmlFor="features"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Enter features (comma separated) *
                                </label>
                                <textarea
                                    id="features"
                                    {...register("features", {
                                        required: "Features are required"
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.features
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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

                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                            <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200 mb-3 flex items-center">
                                <FiFileText className="mr-2"/> Description
                            </h3>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                >
                                    Vehicle Description *
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: {
                                            value: 20,
                                            message: "Description must be at least 20 characters"
                                        }
                                    })}
                                    className={`w-full px-4 py-2 rounded-lg border ${
                                        errors.description
                                            ? "border-red-500 focus:ring-red-500"
                                            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                    } focus:outline-none focus:ring-2 bg-white dark:bg-gray-700`}
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
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <FiCheck className="mr-2"/>
                            Add Vehicle
                        </motion.button>
                    </motion.div>
                </motion.form>
            </div>
        </motion.div>
    );
};

export default AddCar;
