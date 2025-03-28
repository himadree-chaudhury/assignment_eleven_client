import { useState } from "react";
import axios from "axios";

const CarSearch = () => {
  const [searchData, setSearchData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    pickupDate: "",
    dropoffDate: "",
    pickupTime: "10:30",
    dropoffTime: "10:30",
  });

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/cars/search",
        {
          params: searchData,
        }
      );
      console.log("Search Results:", response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pick-up Location"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Drop-off Location"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="date"
          name="pickupDate"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dropoffDate"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="time"
          name="pickupTime"
          className="border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="time"
          name="dropoffTime"
          className="border p-2 rounded"
          onChange={handleChange}
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default CarSearch;
