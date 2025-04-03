import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import CarCard from "../components/utilities/CarCard";
import { FiChevronDown, FiGrid, FiList, FiSearch } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import useAuth from "../hooks/useAuth.jsx";
import toast from "react-hot-toast";
import Loading from "../components/ui/Loading.jsx";
import axios from "axios";

const AllCar = () => {
  // *Context State
  const { loading, setLoading } = useAuth();

  // *Props State
  const [cars, setCars] = useState([]);
  const [layout, setLayout] = useState("grid");

  // *Query States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // *Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 9;

  // *Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20 },
  };

  // *Fetch Cars With Queries

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);

        // *Fetching
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars?page=${currentPage + 1}&limit=${itemsPerPage}&search=${searchTerm}&sort=${sortOption}`,
        );

        setCars(data.cars || []);
        setTotalItems(data.totalCount || 0);
        setTotalPages(data.totalPages);
      } catch (e) {
        toast.error(e?.message || "Error fetching cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, itemsPerPage, searchTerm, sortOption, setLoading]);

  // *Handle SortOptions
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

  return (
    <div className="section-layout">
      <title>Available Cars | driveXpress</title>
      {/* Header with search and controls */}
      <div className="mb-8 space-y-6">
        <div>
          <h2 className="text-left">Available Vehicles</h2>
          <p>Choose your perfect ride</p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          {/* Search input */}
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="Search by model, brand, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex w-full gap-4 md:w-auto">
            {/* Layout toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLayout(layout === "grid" ? "list" : "grid")}
              className="btn"
            >
              {layout === "grid" ? (
                <>
                  <FiList className="text-lg" />
                  <span>List View</span>
                </>
              ) : (
                <>
                  <FiGrid className="text-lg" />
                  <span>Grid View</span>
                </>
              )}
            </motion.button>

            {/* Sort dropdown */}
            <div className="relative z-[50]">
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
                  className={`transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
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
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOption === option.value ? "bg-gray-100 dark:bg-gray-700" : ""}`}
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
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p>
          {totalItems} {totalItems === 1 ? "vehicle" : "vehicles"}
          &nbsp;found
          {totalItems > 0 && (
            <span>
              (showing {currentPage * itemsPerPage + 1}-
              {Math.min((currentPage + 1) * itemsPerPage, totalItems)})
            </span>
          )}
        </p>
      </div>

      {/* Content with animated layout transition */}
      {loading ? (
        <Loading />
      ) : (
        <AnimatePresence mode="wait">
          {cars.length > 0 ? (
            layout === "grid" ? (
              <motion.div
                key="grid"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {cars.map((car) => (
                  <motion.div key={car._id} variants={itemVariants}>
                    <CarCard layout="grid" carData={car} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="space-y-4"
              >
                {cars.map((car) => (
                  <motion.div key={car._id} variants={itemVariants}>
                    <CarCard layout="list" carData={car} />
                  </motion.div>
                ))}
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center"
            >
              <h3>No vehicles found matching your search</h3>
              <button
                onClick={() => setSearchTerm("")}
                className="text-primary mt-4 px-4 py-2 hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}

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
    </div>
  );
};

export default AllCar;
