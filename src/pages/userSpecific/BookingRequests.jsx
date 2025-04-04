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
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Loading from "../../components/ui/Loading";
import { format } from "date-fns";

const BookingRequests = () => {
  // *Context States
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // *Data States
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);

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

  // *Get All Bookings
  useEffect(() => {
    const getAllRequests = async () => {
      try {
        const { data } = await axiosSecure(`/requests/${user?.email}`);
        setAllRequests(data.requests);
      } catch (e) {
        toast.error(e);
      }
    };
    getAllRequests();
  }, []);

  // *Get Paginated Requests
  useEffect(() => {
    const getRequests = async () => {
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

    getRequests();
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
          <h1>Booking Requests</h1>
          <p>View and manage your {totalItems} booking requests</p>
        </div>

        <div className="mt-4 flex gap-4 md:mt-0">
          {/* Add Car button */}
          <Link to="/mycars">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary-dark flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
            >
              My Cars
            </motion.div>
          </Link>
          {/* Sort dropdown */}
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
      ) : requests.length > 0 ? (
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
                  "Request From",
                  "Actions",
                ].map((heading, index) => (
                  <th key={index}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {requests.map((booking) => (
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
                    <td>
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
          className="card py-12 text-center"
        >
          <h3 className="mb-4">You don't have any booking request yet</h3>
        </motion.div>
      )}

      {/* Accept Booking Modal */}
      <AnimatePresence>
        {acceptBookingId && (
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
              <h3 className="mb-4">Confirm Acceptation</h3>
              <p className="mb-6">
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
                  className="flex-centric rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <FiCornerDownLeft className="mr-2" />
                  Go Back
                </motion.button>
                <motion.button
                  onClick={() => handleAcceptBooking(acceptBookingId)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-centric bg-success hover:bg-success-hover rounded-md px-4 py-2 text-white transition-colors"
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
                  {requests.find((b) => b._id === cancelBookingId)?.name}
                </span>
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
            pageLinkClassName={"pagination"}
            previousLinkClassName={"pagination"}
            nextLinkClassName={"pagination"}
            breakLinkClassName={"flex-centric w-8 h-8 cursor-pointer"}
            activeLinkClassName={"bg-primary text-white"}
            disabledLinkClassName={"hidden"}
          />
        </motion.div>
      )}

      {/* Booking Requests Chart */}
      {allRequests.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          <h3 className="my-3 text-left">Requests Overview</h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Status Distribution */}
            <div className="card p-4">
              <h4 className="mb-4">Request Status Distribution</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Object.entries(
                      allRequests.reduce((acc, request) => {
                        acc[request.status] = (acc[request.status] || 0) + 1;
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
                    <Bar dataKey="count" name="Number of Requests">
                      {Object.entries(
                        allRequests.reduce((acc, request) => {
                          acc[request.status] = (acc[request.status] || 0) + 1;
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
                        const priceGroups = allRequests.reduce(
                          (acc, request) => {
                            const priceRange =
                              request.totalPrice < 500
                                ? "$0-$500"
                                : request.totalPrice < 1000
                                  ? "$500-$1000"
                                  : "$1000+";
                            acc[priceRange] = (acc[priceRange] || 0) + 1;
                            return acc;
                          },
                          {},
                        );

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
                                "oklch(50.81% 0.127 224.54)",
                                "oklch(50% 0.211 284.33)",
                                "oklch(50% 0.128 278.61)",
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

          {/* Requests by Car Model */}
          <div className="card mt-8 p-4">
            <h4 className="mb-4">Requests by Car Model</h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(
                    allRequests.reduce((acc, request) => {
                      acc[request.name] = (acc[request.name] || 0) + 1;
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
                    name="Number of Requests"
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

export default BookingRequests;
