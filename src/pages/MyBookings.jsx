import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const MyBookings = () => {
  // Sample booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      carImage: "https://source.unsplash.com/random/300x200/?toyota",
      carModel: "Toyota Corolla 2023",
      bookingDate: "2023-11-15T10:30:00",
      pickupDate: "2023-11-20",
      returnDate: "2023-11-25",
      totalPrice: 450,
      status: "confirmed",
    },
    {
      id: 2,
      carImage: "https://source.unsplash.com/random/300x200/?honda",
      carModel: "Honda Civic 2022",
      bookingDate: "2023-11-10T14:45:00",
      pickupDate: "2023-11-18",
      returnDate: "2023-11-22",
      totalPrice: 380,
      status: "pending",
    },
    {
      id: 3,
      carImage: "https://source.unsplash.com/random/300x200/?bmw",
      carModel: "BMW X5 2023",
      bookingDate: "2023-11-05T09:15:00",
      pickupDate: "2023-11-12",
      returnDate: "2023-11-15",
      totalPrice: 620,
      status: "cancelled",
    },
    {
      id: 4,
      carImage: "https://source.unsplash.com/random/300x200/?mercedes",
      carModel: "Mercedes-Benz C-Class 2023",
      bookingDate: "2023-10-28T16:20:00",
      pickupDate: "2023-11-10",
      returnDate: "2023-11-17",
      totalPrice: 890,
      status: "confirmed",
    },
  ]);

  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [modifyBookingId, setModifyBookingId] = useState(null);
  const [newDates, setNewDates] = useState({ pickup: "", return: "" });

  // Sort bookings based on selected option
  const sortedBookings = [...bookings].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.bookingDate) - new Date(a.bookingDate);
      case "oldest":
        return new Date(a.bookingDate) - new Date(b.bookingDate);
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

  const handleCancelBooking = (id) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      )
    );
    setCancelBookingId(null);
  };

  const handleModifyBooking = (id) => {
    if (newDates.pickup && newDates.return) {
      setBookings(
        bookings.map((booking) =>
          booking.id === id
            ? {
                ...booking,
                pickupDate: newDates.pickup,
                returnDate: newDates.return,
              }
            : booking
        )
      );
      setModifyBookingId(null);
      setNewDates({ pickup: "", return: "" });
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your car reservations
          </p>
        </div>

        <div className="mt-4 md:mt-0">
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

      {sortedBookings.length > 0 ? (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Car Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Car Model
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rental Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {sortedBookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ backgroundColor: "#f9fafb" }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-16">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={booking.carImage}
                          alt={booking.carModel}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {booking.carModel}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {formatDateTime(booking.bookingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {booking.pickupDate} to {booking.returnDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        ${booking.totalPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`text-sm capitalize ${
                            booking.status === "confirmed"
                              ? "text-green-600 dark:text-green-400"
                              : booking.status === "pending"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-3">
                        {booking.status !== "cancelled" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setModifyBookingId(booking.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
                            >
                              <FiCalendar className="w-3 h-3" />
                              <span>Modify Date</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCancelBookingId(booking.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs"
                            >
                              <FiTrash2 className="w-3 h-3" />
                              <span>Cancel</span>
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
            You don't have any bookings yet
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Browse Available Cars
          </motion.button>
        </motion.div>
      )}

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {cancelBookingId && (
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
                Confirm Cancellation
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to cancel your booking for{" "}
                <span className="font-semibold">
                  {bookings.find((b) => b.id === cancelBookingId)?.carModel}
                </span>
                ? Cancellation fees may apply.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setCancelBookingId(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => handleCancelBooking(cancelBookingId)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modify Booking Modal */}
      <AnimatePresence>
        {modifyBookingId && (
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
                Modify Booking Dates
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Current rental period:{" "}
                <span className="font-semibold">
                  {bookings.find((b) => b.id === modifyBookingId)?.pickupDate}{" "}
                  to{" "}
                  {bookings.find((b) => b.id === modifyBookingId)?.returnDate}
                </span>
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Pickup Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    value={newDates.pickup}
                    onChange={(e) =>
                      setNewDates({ ...newDates, pickup: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Return Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                    value={newDates.return}
                    onChange={(e) =>
                      setNewDates({ ...newDates, return: e.target.value })
                    }
                    min={
                      newDates.pickup || new Date().toISOString().split("T")[0]
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setModifyBookingId(null);
                    setNewDates({ pickup: "", return: "" });
                  }}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleModifyBooking(modifyBookingId)}
                  disabled={!newDates.pickup || !newDates.return}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    !newDates.pickup || !newDates.return
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  Update Dates
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
