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
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import { dateFormat } from "../../components/utilities/dateUtilities";

const BookingRequests = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [acceptBookingId, setAcceptBookingId] = useState(null);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  useEffect(() => {
    const getBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axiosSecure(`/requests/${user?.email}`);
        setBookings(data);
      } catch (e) {
        toast.error(e);
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, [user]);

  // Sort bookings based on selected option
  const sortedBookings = [...bookings].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.dateBooked) - new Date(a.dateBooked);
      case "oldest":
        return new Date(a.dateBooked) - new Date(b.dateBooked);
      case "price-low":
        return a.totalPrice - b.totalPrice;
      case "price-high":
        return b.totalPrice - a.totalPrice;
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

  const handleAcceptBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: "confirmed",
      });
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "confirmed" } : booking
        )
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
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking
        )
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Booking Requests</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your car booking requests
          </p>
        </div>

        <div className="flex gap-4 mt-4 md:mt-0">
          {/* Add Car button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <Link to={"/mycars"}>My Cars</Link>
          </motion.div>
          {/* Sort dropdown */}
          <div className="relative right-0">
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
      ) : sortedBookings.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
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
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider "
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {sortedBookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="even:bg-ash-light dark:even:bg-ash hover:bg-ash-hover dark:hover:bg-ash-dark *:text-sm "
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-16">
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
                        {new Date(booking.dateBooked).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        {dateFormat(booking.pickupDate)} :
                        {dateFormat(booking.returnDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        $&nbsp;
                        {(Math.ceil(
                          new Date(booking.returnDate) -
                            new Date(booking.pickupDate)
                        ) /
                          86400000 +
                          1) *
                          (parseInt(booking.price) + 85)}
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
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
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
                                <FiUserCheck className="w-5 h-5" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCancelBookingId(booking._id)}
                                className="text-error hover:text-error-hover"
                              >
                                <FiUserX className="w-5 h-5" />
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
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow"
        >
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
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
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            >
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Confirm Acceptation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to accept this booking request for&nbsp;
                <span className="font-semibold">
                  {bookings.find((b) => b._id === acceptBookingId)?.name}
                </span>
                ?
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setAcceptBookingId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-centric"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleAcceptBooking(acceptBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-success text-white rounded-md hover:bg-success-hover transition-colors flex-centric"
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
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
            >
              <h3 className="text-lg font-medium mb-4 dark:text-white">
                Confirm Cancellation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to cancel your booking for&nbsp;
                <span className="font-semibold">
                  {bookings.find((b) => b._id === cancelBookingId)?.name}
                </span>
                ? Cancellation fees may apply.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setCancelBookingId(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-centric"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleCancelBooking(cancelBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-centric"
                >
                  <FiCheck className="mr-2" />
                  Confirm Cancellation
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingRequests;
