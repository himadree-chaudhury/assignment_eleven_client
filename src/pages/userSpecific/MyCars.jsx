import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { checkAvailability } from "../../components/utilities/dateUtilities.js";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Loading from "../../components/ui/Loading.jsx";

const MyCars = () => {
  // *Context States
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data State
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  // *Sort States
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
  useEffect(() => {
    const getCars = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        // *Fetching
        const { data } = await axiosSecure(
          `/mycars/${user?.email}?page=${currentPage + 1}&limit=${itemsPerPage}&sort=${sortOption}`,
        );
        setCars(data.cars);
        setTotalItems(data.totalCount || 0);
        setTotalPages(data.totalPages);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, [axiosSecure, user?.email, currentPage, itemsPerPage, sortOption]);

  // *Handle Pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  // *Handle Delete Action
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

  // *Sort Options Array
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low To High" },
    { value: "price-high", label: "Price: High To Low" },
  ];

  return (
    <div className="section-layout">
      <title>My Cars | driveXpress</title>
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-left">My Cars</h1>
          <p>Manage your {totalItems} vehicles</p>
        </div>

        <div className="mt-4 flex gap-4 md:mt-0">
          {/* Add Car Button */}
          <Link to="/addcar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-hover flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
            >
              <FiPlus />
              Add Car
            </motion.div>
          </Link>

          {/* Sort Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="btn"
            >
              <span>
                {sortOptions.find((opt) => opt.value === sortOption)?.label}
              </span>
              <FiChevronDown
                className={`transition-transform ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              />
            </motion.button>

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
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-container min-w-full">
            <thead className="table-head">
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
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {cars.map((car) => (
                  <motion.tr
                    key={car._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <div className="h-10 w-16 flex-shrink-0">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={car.photoURL}
                          alt={car.name}
                        />
                      </div>
                    </td>
                    <td>
                      <div>{car.name}</div>
                    </td>
                    <td>
                      <div>${car.price}</div>
                    </td>
                    <td>
                      <div>{car.rent_count}</div>
                    </td>
                    <td>
                      <div
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                          checkAvailability(car.pickupDate, car.returnDate)
                            ? "text-success bg-green-100"
                            : "text-error bg-red-100"
                        }`}
                      >
                        {checkAvailability(car.pickupDate, car.returnDate)
                          ? "Available"
                          : "Unavailable"}
                      </div>
                    </td>
                    <td>{format(new Date(car.dateAdded), "dd-MM-yyyy")}</td>
                    {/* Action Buttons */}
                    <td>
                      <div className="flex gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-warning hover:text-warning-hover"
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
                          className="text-error hover:text-error-hover"
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
          className="card py-12 text-center"
        >
          <h3 className="mb-4">You haven't added any cars yet</h3>
          <Link to="/allcars">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex-centric mx-auto w-fit gap-2"
            >
              <FiPlus />
              Add Your First Car
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-centric fixed inset-0 z-50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="card w-full max-w-md rounded-lg p-6"
            >
              <h3 className="mb-4">Confirm Deletion</h3>
              <p className="mb-6">
                Are you sure you want to delete&nbsp;
                <span className="font-semibold">{deleteConfirmation.name}</span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <FiX className="mr-2" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDelete(deleteConfirmation.id)}
                  className="flex-centric bg-error hover:bg-error-hover rounded-md px-4 py-2 text-white transition-colors"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
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
            pageLinkClassName={"pagination"}
            previousLinkClassName={"pagination"}
            nextLinkClassName={"pagination"}
            breakLinkClassName={"flex-centric w-8 h-8 cursor-pointer"}
            activeLinkClassName={"bg-primary text-white"}
            disabledLinkClassName={"hidden"}
          />
        </motion.div>
      )}
    </div>
  );
};

export default MyCars;
