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
        },
      );
      console.log("Search Results:", response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">
      <div className="grid grid-cols-6 gap-4">
        <input
          type="text"
          name="pickupLocation"
          placeholder="Pick-up Location"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="dropoffLocation"
          placeholder="Drop-off Location"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          type="date"
          name="pickupDate"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          type="date"
          name="dropoffDate"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          type="time"
          name="pickupTime"
          className="rounded border p-2"
          onChange={handleChange}
        />
        <input
          type="time"
          name="dropoffTime"
          className="rounded border p-2"
          onChange={handleChange}
        />
      </div>
      <button
        className="bg-primary mt-4 rounded px-4 py-2 text-white"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default CarSearch;

// app.get("/api/cars/search", async (req, res) => {
//   try {
//     await client.connect();
//     const db = client.db("rentalDB");
//     const carsCollection = db.collection("cars");

//     const query = {
//       pickupLocation: req.query.pickupLocation,
//       dropoffLocation: req.query.dropoffLocation,
//       availableDates: {
//         $elemMatch: {
//           pickup: req.query.pickupDate,
//           dropoff: req.query.dropoffDate,
//         },
//       },
//     };

//     const cars = await carsCollection.find(query).toArray();
//     res.json(cars);
