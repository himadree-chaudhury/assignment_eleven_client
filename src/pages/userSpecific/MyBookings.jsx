import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { differenceInDays, format } from "date-fns";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ui/Loading";

const MyBookings = () => {
  // *Context States
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data States
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);

  // *Sort States
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // *Booking Manipulation States
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [modifyBookingId, setModifyBookingId] = useState(null);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  // *Hook Form States
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // *Get All Bookings
  useEffect(() => {
    const getAllBookings = async () => {
      try {
        const { data } = await axiosSecure(`/bookings/${user?.email}`);
        setAllBookings(data.bookings);
      } catch (e) {
        toast.error(e);
      }
    };
    getAllBookings();
  }, [axiosSecure, user?.email]);

  // *Get Paginated Bookings
  const getBookings = React.useCallback(async () => {
    try {
      setLoading(true);
      window.scrollTo(0, 0);

      // *Fetching
      const { data } = await axiosSecure(
        `/bookings/${user?.email}?page=${currentPage + 1}&limit=${itemsPerPage}&sort=${sortOption}`,
      );
      setBookings(data.bookings);
      setTotalItems(data.totalCount || 0);
      setTotalPages(data.totalPages);
    } catch (e) {
      toast.error(e);
    } finally {
      setLoading(false);
    }
  }, [axiosSecure, user?.email, currentPage, itemsPerPage, sortOption]);

  useEffect(() => {
    getBookings();
  }, [getBookings]);

  // *Handle Pagination
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };

  // *Handle Booking Cancel
  const handleCancelBooking = async (id) => {
    try {
      await axiosSecure.patch(`/bookings/${id}`, {
        status: "cancelled",
      });
      toast.success("Booking Cancelled Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setCancelBookingId(null);
      getBookings();
    }
  };

  // *Handle Booking Date Modify
  const handleModifyBooking = async (data) => {
    try {
      await axiosSecure.patch(`/bookings/${modifyBookingId}`, {
        pickupDate: data.pickupDate,
        returnDate: data.returnDate,
        // *Calc Total Days * (Price + Fee)
        totalPrice:
          (differenceInDays(
            new Date(data.returnDate),
            new Date(data.pickupDate),
          ) +
            1) *
          (Number(bookings.find((b) => b._id === modifyBookingId)?.price) + 85),
      });
      toast.success("Booking Date Modified Successfully!");
    } catch (e) {
      toast.error(e);
    } finally {
      setModifyBookingId(null);
      getBookings();
    }
  };

  // *Sort Options Array
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  // *Get Status Icon Based On Booking Status
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
          <h1>My Bookings</h1>
          <p>View and manage your {totalItems} reservations</p>
        </div>

        <div className="mt-4 flex gap-4 md:mt-0">
          {/* New Book Button */}
          <Link to="/allcars">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
            >
              <FiPlus />
              New Book
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
      ) : bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table-container min-w-full">
            <thead className="table-head">
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
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {bookings.map((booking) => (
                  <motion.tr
                    key={booking._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>
                      <div className="h-10 w-16 flex-shrink-0">
                        <img
                          className="h-10 w-16 rounded object-cover"
                          src={booking.photoURL}
                          alt={booking.name}
                        />
                      </div>
                    </td>
                    <td>
                      <div>{booking.name}</div>
                    </td>
                    <td>
                      <div>
                        {format(
                          new Date(booking.dateBooked),
                          "dd-MM-yyyy HH:MM",
                        )}
                      </div>
                    </td>
                    <td>
                      <div>
                        {format(new Date(booking.pickupDate), "dd-MM-yyyy")}
                        &nbsp;:&nbsp;
                        {format(new Date(booking.returnDate), "dd-MM-yyyy")}
                      </div>
                    </td>
                    <td>
                      <div>
                        $&nbsp;
                        {booking.totalPrice}
                      </div>
                    </td>
                    <td>
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
                    {/* Action Buttons */}
                    <td>
                      <div className="flex gap-3">
                        {booking.status !== "cancelled" &&
                          booking.status !== "confirmed" && (
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
          className="card py-12 text-center"
        >
          <h3 className="mb-4">You don't have any bookings yet</h3>
          <Link to="/allcars">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex-centric gap- mx-auto w-fit"
            >
              Browse Available Cars
            </motion.div>
          </Link>
        </motion.div>
      )}

      {/* Cancel Booking Modal */}
      <AnimatePresence>
        {cancelBookingId && (
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
              <h3 className="mb-4">Confirm Cancellation</h3>
              <p className="mb-6">
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
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleCancelBooking(cancelBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-centric bg-error hover:bg-error-hover rounded-md px-4 py-2 text-white transition-colors"
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
            className="flex-centric fixed inset-0 z-50 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="card w-full max-w-md rounded-lg p-6"
            >
              <h3 className="mb-4">Modify Booking Dates</h3>
              <p className="mb-2">
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
                {/* Modify Rental Period */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="pickupDate">New Pickup Date *</label>
                    <input
                      type="date"
                      id="pickupDate"
                      {...register("pickupDate", {
                        required: "Pickup date is required",
                      })}
                      className={`border px-4 py-2 ${
                        errors.pickupDate && "border-error focus:ring-error"
                      } `}
                    />
                    {errors.pickupDate && (
                      <p className="error-massage">
                        {errors.pickupDate.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="returnDate">New Return Date *</label>
                    <input
                      type="date"
                      id="returnDate"
                      {...register("returnDate", {
                        required: "Return date is required",
                      })}
                      className={`border px-4 py-2 ${
                        errors.returnDate && "border-error focus:ring-error"
                      } `}
                    />
                    {errors.returnDate && (
                      <p className="error-massage">
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
                    className="flex-centric rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </motion.span>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-centric bg-warning hover:bg-warning-hover rounded-md px-4 py-2 text-white transition-colors"
                  >
                    <FiCheck className="mr-2" />
                    Update Date
                  </motion.button>
                </div>
              </form>
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

      {/* Bookings Chart */}
      {allBookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          <h3 className="my-3 text-left">Bookings Overview</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Status Distribution */}
            <div className="card p-4">
              <h4 className="mb-4">Booking Status Distribution</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(
                      allBookings.reduce((acc, booking) => {
                        acc[booking.status] = (acc[booking.status] || 0) + 1;
                        return acc;
                      }, {}),
                    ).map(([status, count]) => ({
                      status: status.charAt(0).toUpperCase() + status.slice(1),
                      count,
                    }))}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Number of Bookings">
                      {Object.entries(
                        allBookings.reduce((acc, booking) => {
                          acc[booking.status] = (acc[booking.status] || 0) + 1;
                          return acc;
                        }, {}),
                      ).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry[0] === "confirmed"
                              ? "oklch(50% 0.2 145)"
                              : entry[0] === "pending"
                                ? "oklch(55% 0.2 80)"
                                : "oklch(55% 0.2 25)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Price Distribution */}
            <div className="card p-4">
              <h4 className="mb-4">Price Distribution</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={(() => {
                        // Group Bookings By Price Range
                        const priceGroups = allBookings.reduce(
                          (acc, booking) => {
                            const priceRange =
                              booking.totalPrice < 500
                                ? "$0-$500"
                                : booking.totalPrice < 1000
                                  ? "$500-$1000"
                                  : "$1000+";
                            acc[priceRange] = (acc[priceRange] || 0) + 1;
                            return acc;
                          },
                          {},
                        );
                        // Map Grouped Data To An Array
                        return Object.entries(priceGroups).map(
                          ([name, value]) => ({ name, value }),
                        );
                      })()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {["$0-$500", "$500-$1000", "$1000+"].map(
                        (range, index) => (
                          <Cell
                            key={`cell-${range}`}
                            fill={
                              [
                                "oklch(50.81% 0.127 224.54)", // Purple
                                "oklch(50% 0.211 284.33)", // Blue
                                "oklch(50% 0.128 278.61)", // Green
                              ][index]
                            }
                          />
                        ),
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bookings By Car Model */}
          <div className="card mt-8 p-4">
            <h4 className="mb-4">Bookings By Car Model</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(
                    allBookings.reduce((acc, booking) => {
                      acc[booking.name] = (acc[booking.name] || 0) + 1;
                      return acc;
                    }, {}),
                  ).map(([name, count]) => ({ name, count }))}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    fill="oklch(50.81% 0.127 224.54)"
                    name="Number of Bookings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MyBookings;
