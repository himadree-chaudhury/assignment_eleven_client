import React from "react";
import { Routes, Route } from "react-router";
import Root from "../layouts/Root";
import AddCar from "../pages/AddCar";
import CarDetails from "../pages/CarDetails";
import AllCar from "../pages/AllCar";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyCars from "../pages/MyCars";
import MyBookings from "../pages/MyBookings";
import Register from "../pages/Register";
import UpdateCar from "../pages/UpdateCar";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/allcar" element={<AllCar />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/updatecar" element={<UpdateCar />} />
          <Route path="/mycars" element={<MyCars/>} />
          <Route path="/mybookings" element={<MyBookings/>} />
          <Route path="/cardetails" element={<CarDetails />} />
        </Route>
          <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Routing;
