import React from "react";
import { Routes, Route } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home";
import AllCar from "../pages/AllCar";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/carHandling/AddCar";
import UpdateCar from "../pages/carHandling/UpdateCar";
import MyCars from "../pages/userSpecific/MyCars";
import MyBookings from "../pages/userSpecific/MyBookings";
import BookingRequests from "../pages/userSpecific/BookingRequests";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Error from "../pages/Error";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
  return (
    <div>
      <Routes>
        {/* Root Layout */}
        <Route path="/" element={<Root />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/allcars" element={<AllCar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cardetails/:id" element={<CarDetails />} />

          {/* Private Routes */}
          <Route
            path="/addcar"
            element={
              <PrivateRoute>
                <AddCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/updatecar/:id"
            element={
              <PrivateRoute>
                <UpdateCar />
              </PrivateRoute>
            }
          />
          <Route
            path="/mycars"
            element={
              <PrivateRoute>
                <MyCars />
              </PrivateRoute>
            }
          />
          <Route
            path="/mybookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookingrequests"
            element={
              <PrivateRoute>
                <BookingRequests />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Fallback Route For Undefined Paths */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Routing;
