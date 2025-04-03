import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import { checkAvailability } from "../../components/utilities/dateUtilities.js";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Loading from "../../components/ui/Loading.jsx";

const MyCars = () => {
  const navigate = useNavigate();
  // *Context States
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data State
  const [cars, setCars] = useState([]);

  // *Sort Sates
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // *Delete State
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // *Fetch Cars With Queries
  const getCars = async () => {
    try {
      setLoading(true);
      window.scrollTo(0, 0);

      // *Fetching
      const { data } = await axiosSecure(
        `/mycars/${user?.email}?page=${currentPage + 1}&limit=${itemsPerPage}&sort=${sortOption}`,
      );
      setCars(data.cars || []);
      setTotalItems(data.totalCount || 0);
      setTotalPages(data.totalPages);
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
    getCars();
  }, [axiosSecure, currentPage, itemsPerPage, sortOption, setLoading]);

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // *Handle Pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
      toast.success(`${deleteConfirmation.name} Deleted Successfully`);
    } catch (e) {
      toast.error(e);
    } finally {
      setDeleteConfirmation(null);
    }
  };

  return (
    <div className="section-layout">
      <title>My Cars | driveXpress</title>
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">My Cars</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your {totalItems} vehicles
          </p>
        </div>

        <div className="mt-4 flex gap-4 md:mt-0">
          {/* Add Car button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
          >
            <FiPlus />
            <Link to={"/allcars"}>Add Car</Link>
          </motion.div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 transition-all hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
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
                className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
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
      ) : cars.length > 0 ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-gray-800">
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
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              <AnimatePresence>
                {cars.map((car) => (
                  <motion.tr
                    key={car._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-16 flex-shrink-0">
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
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
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
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {new Date(car.dateAdded).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      <div className="flex gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Link to={`/updatecar/${car._id}`}>
                            <FiEdit className="h-5 w-5" />
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setDeleteConfirmation({
                              id: car._id,
                              name: car.name,
                            })
                          }
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 className="h-5 w-5" />
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
          className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800"
        >
          <h3 className="mb-4 text-xl font-medium text-gray-600 dark:text-gray-400">
            You haven't added any cars yet
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark mx-auto flex items-center gap-2 rounded-md px-6 py-2 text-white transition-colors"
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
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              <h3 className="mb-4 text-lg font-medium dark:text-white">
                Confirm Deletion
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to delete&nbsp;
                <span className="font-semibold">{deleteConfirmation.name}</span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiX className="mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(deleteConfirmation.id)}
                  className="flex-centric rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-centric mt-8"
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={totalPages}
            forcePage={currentPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"flex gap-2 items-center"}
            pageLinkClassName={
              "flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            }
            previousLinkClassName={
              "flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            }
            nextLinkClassName={
              "flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            }
            breakLinkClassName={
              "flex items-center justify-center w-8 h-8 cursor-pointer"
            }
            activeLinkClassName={
              "bg-primary text-white border-primary dark:border-primary hover:bg-primary dark:hover:bg-primary"
            }
            disabledLinkClassName={"hidden"}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MyCars;
