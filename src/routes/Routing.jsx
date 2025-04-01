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
import PrivateRoute from "./PrivateRoute";
import BookingRequests from "../pages/userSpecific/BookingRequests";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/allcars" element={<AllCar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
          <Route path="/cardetails/:id" element={<CarDetails />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default Routing;
