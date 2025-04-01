import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { checkAvailability } from "../../components/utilities/avaibalityCheck.js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Loading from "../../components/ui/Loading.jsx";

const MyCars = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cars, setCars] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(`/mycars/${user?.email}`);
        setCars(data);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getCars();
  }, [user]);

  // Sort cars based on selected option
  const sortedCars = [...cars].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case "oldest":
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const handleDelete = (id) => {
    setCars(cars.filter((car) => car._id !== id));
    setDeleteConfirmation(null);
  };

  return (
    <div className="section-layout">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Cars</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your listed vehicles
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          {/* Add Car button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <FiPlus />
            <Link to={"/allcars"}>Add Car</Link>
          </motion.div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-all"
            >
              <span>
                {sortOptions.find((opt) => opt.value === sortOption)?.label}
              </span>
              <FiChevronDown
                className={`transition-transform ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSortDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      sortOption === option.value
                        ? "bg-gray-100 dark:bg-gray-700"
                        : ""
                    }`}
                    onClick={() => {
                      setSortOption(option.value);
                      setShowSortDropdown(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : sortedCars.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "Image",
                  "Model",
                  "Daily Price",
                  "Bookings",
                  "Availability",
                  "Date Added",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {sortedCars.map((car) => (
                  <motion.tr
                    key={car._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-16">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={car.photoURL}
                          alt={car.name}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {car.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        ${car.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {car.rent_count}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          checkAvailability(car.pickupDate, car.returnDate)
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {checkAvailability(car.pickupDate, car.returnDate)
                          ? "Available"
                          : "Unavailable"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(car.dateAdded).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Link to={`/updatecar/${car._id}`}>
                            <FiEdit className="w-5 h-5" />
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setDeleteConfirmation({
                              id: car._id,
                              model: car.name,
                            })
                          }
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
            You haven't added any cars yet
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors mx-auto"
          >
            <FiPlus />
            <span>Add Your First Car</span>
          </motion.button>
        </motion.div>
      )}

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            >
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {deleteConfirmation.model}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmation.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCars;
