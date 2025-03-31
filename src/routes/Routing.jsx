import React from "react";
import { Routes, Route } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AllCar from "../pages/AllCar";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MyCars from "../pages/userSpecific/MyCars";
import MyBookings from "../pages/userSpecific/MyBookings";
import AddCar from "../pages/carHandling/AddCar";
import UpdateCar from "../pages/carHandling/UpdateCar";
import Error from "../pages/Error";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/allcars" element={<AllCar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/updatecar/:id" element={<UpdateCar />} />
          <Route path="/mycars" element={<MyCars />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/cardetails/:id" element={<CarDetails />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Routing;
