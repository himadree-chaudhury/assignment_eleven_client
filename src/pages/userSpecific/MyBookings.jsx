import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrash2,
  FiCalendar,
  FiChevronDown,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiX,
  FiCheck,
  FiCornerDownLeft,
} from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import { useForm } from "react-hook-form";
import { differenceInDays, format } from "date-fns";

const MyBookings = () => {
  const navigate = useNavigate();
  // *Context States
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data States
  const [bookings, setBookings] = useState([]);

  // *Sort States
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // *Booking Manipulation States
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [modifyBookingId, setModifyBookingId] = useState(null);
  const [modifyPickupDate, setModifyPickupDate] = useState("");
  const [modifyReturnDate, setModifyReturnDate] = useState("");

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
        `/bookings/${user?.email}?page=${currentPage + 1}&limit=${itemsPerPage}&sort=${sortOption}`,
      );
      setBookings(data.bookings || []);
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

  const handleCancelBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: "cancelled",
      });
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking,
        ),
      );
      toast.success("Booking Cancelled Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setCancelBookingId(null);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleModifyBooking = async (data) => {
    try {
      await axiosSecure.patch(`/bookings/${modifyBookingId}`, {
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
      });
      setModifyPickupDate(data.pickupDate);
      setModifyReturnDate(data.returnDate);
      toast.success("Booking Date Modified Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setModifyBookingId(null);
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
      <title>My Bookings | driveXpress</title>
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your {totalItems} reservations
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
            <Link to={"/allcars"}>New Rent</Link>
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
      ) : bookings.length > 0 ? (
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
                  "Status",
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
                {bookings.map((booking) => (
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
                        {modifyPickupDate
                          ? format(new Date(modifyPickupDate), "dd-MM-yyyy")
                          : format(new Date(booking.pickupDate), "dd-MM-yyyy")}
                        &nbsp;:&nbsp;
                        {modifyReturnDate
                          ? format(new Date(modifyReturnDate), "dd-MM-yyyy")
                          : format(new Date(booking.returnDate), "dd-MM-yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium">
                        $&nbsp;
                        {modifyPickupDate && modifyReturnDate
                          ? (differenceInDays(
                              new Date(booking.returnDate),
                              new Date(booking.pickupDate),
                            ) +
                              1) *
                            (Number(booking.price) + 85)
                          : booking.totalPrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`capitalize ${
                            booking.status === "confirmed"
                              ? "text-success"
                              : booking.status === "pending"
                                ? "text-warning"
                                : "text-error"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex gap-3">
                        {booking.status !== "cancelled" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setModifyBookingId(booking._id),
                                  reset({
                                    pickupDate: booking.pickupDate,
                                    returnDate: booking.returnDate,
                                  });
                              }}
                              className="flex-centric bg-warning hover:bg-warning-hover flex-col gap-1 rounded-md px-3 py-1 text-white transition-colors"
                            >
                              <FiCalendar className="h-3 w-3" />
                              <span>Modify Date</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setCancelBookingId(booking._id)}
                              className="flex-centric bg-error hover:bg-error-hover text-text-primary-dark flex-col gap-1 rounded-md px-3 py-1 transition-colors"
                            >
                              <FiTrash2 className="h-3 w-3" />
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
          className="rounded-lg bg-white py-12 text-center shadow dark:bg-gray-800"
        >
          <h3 className="mb-4 text-xl font-medium text-gray-600 dark:text-gray-400">
            You don't have any bookings yet
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary hover:bg-primary-dark rounded-md px-6 py-2 text-white transition-colors"
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
                  {bookings.find((b) => b._id === cancelBookingId)?.name}
                </span>
                ? Cancellation fees may apply.
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

      {/* Modify Booking Modal */}
      <AnimatePresence>
        {modifyBookingId && (
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
                Modify Booking Dates
              </h3>
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                Current rental period:&nbsp;
                <span className="font-semibold">
                  {format(
                    new Date(
                      bookings.find(
                        (b) => b._id === modifyBookingId,
                      )?.pickupDate,
                    ),
                    "dd-MM-yyyy",
                  )}
                  &nbsp;to&nbsp;
                  {format(
                    new Date(
                      bookings.find(
                        (b) => b._id === modifyBookingId,
                      )?.returnDate,
                    ),
                    "dd-MM-yyyy",
                  )}
                </span>
              </p>
              {/* Hook Form */}
              <form
                onSubmit={handleSubmit(handleModifyBooking)}
                className="pt-2"
              >
                {/* Rental Period */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="pickupDate"
                      className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      New Pickup Date *
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
                      New Return Date *
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
                {/* Buttons */}
                <div className="flex-centric mt-8 justify-end gap-3">
                  <motion.span
                    onClick={() => setModifyBookingId(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-centric cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </motion.span>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-centric rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    <FiCheck className="mr-2" />
                    Update Date
                  </motion.button>
                </div>
              </form>
              {/* ------------------------------- */}
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

export default MyBookings;
