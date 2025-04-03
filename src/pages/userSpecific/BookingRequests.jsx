import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiCheck,
  FiCornerDownLeft,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import { format } from "date-fns";

const BookingRequests = () => {
  const navigate = useNavigate();
  // *Context States
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data States
  const [requests, setRequests] = useState([]);

  // *Sort States
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // *Requests Manipulation States
  const [acceptBookingId, setAcceptBookingId] = useState(null);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  const getBookings = async () => {
    try {
      setLoading(true);
      window.scrollTo(0, 0);

      // *Fetching
      const { data } = await axiosSecure(
        `/requests/${user?.email}?page=${currentPage + 1}&limit=${itemsPerPage}&sort=${sortOption}`,
      );
      setRequests(data.requests || []);
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
    getBookings();
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

  const handleAcceptBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: "confirmed",
      });
      setRequests(
        requests.map((booking) =>
          booking._id === id ? { ...booking, status: "confirmed" } : booking,
        ),
      );
      toast.success("Request Accepted Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setAcceptBookingId(null);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: "cancelled",
      });
      setRequests(
        requests.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking,
        ),
      );
      toast.success("Request Cancelled Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setCancelBookingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FiCheckCircle className="text-green-500" />;
      case "pending":
        return <FiClock className="text-yellow-500" />;
      case "cancelled":
        return <FiXCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="section-layout">
      <title>Booking Requests | driveXpress</title>
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Booking Requests</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your {totalItems} booking requests
          </p>
        </div>

        <div className="mt-4 flex gap-4 md:mt-0">
          {/* Add Car button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
          >
            <Link to={"/mycars"}>My Cars</Link>
          </motion.div>
          {/* Sort dropdown */}
          <div className="relative right-0">
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
      ) : requests.length > 0 ? (
        <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                {[
                  "Image",
                  "Model",
                  "Booking Date",
                  "Rental Period",
                  "Total Price",
                  "Request From",
                  "Actions",
                ].map((heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-300"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {requests.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="even:bg-ash-light dark:even:bg-ash hover:bg-ash-hover dark:hover:bg-ash-dark *:text-sm"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-16 flex-shrink-0">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={booking.photoURL}
                          alt={booking.name}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">{booking.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {format(
                          new Date(booking.dateBooked),
                          "dd-MM-yyyy HH:MM",
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {format(new Date(booking.pickupDate), "dd-MM-yyyy")}
                        &nbsp;:&nbsp;
                        {format(new Date(booking.returnDate), "dd-MM-yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        $&nbsp;
                        {booking.totalPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`${
                            booking.status === "confirmed"
                              ? "text-success"
                              : booking.status === "pending"
                                ? "text-warning"
                                : "text-error"
                          }`}
                        >
                          {booking.bookedBy}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex gap-3">
                        {booking.status !== "cancelled" &&
                          booking.status !== "confirmed" && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setAcceptBookingId(booking._id)}
                                className="text-success hover:text-success-hover"
                              >
                                <FiUserCheck className="h-5 w-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCancelBookingId(booking._id)}
                                className="text-error hover:text-error-hover"
                              >
                                <FiUserX className="h-5 w-5" />
                              </motion.button>
                            </>
                          )}
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
            You don't have any booking request yet
          </h3>
        </motion.div>
      )}

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {acceptBookingId && (
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
                Confirm Acceptation
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to accept this booking request for&nbsp;
                <span className="font-semibold">
                  {requests.find((b) => b._id === acceptBookingId)?.name}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setAcceptBookingId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleAcceptBooking(acceptBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-success hover:bg-success-hover flex-centric rounded-md px-4 py-2 text-white transition-colors"
                >
                  <FiCheck className="mr-2" />
                  Confirm Acceptation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {cancelBookingId && (
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
                Confirm Cancellation
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Are you sure you want to cancel your booking for&nbsp;
                <span className="font-semibold">
                  {requests.find((b) => b._id === cancelBookingId)?.name}
                </span>
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setCancelBookingId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleCancelBooking(cancelBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-centric rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  <FiCheck className="mr-2" />
                  Confirm Cancellation
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

export default BookingRequests;
