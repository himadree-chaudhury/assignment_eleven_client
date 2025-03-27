import React from "react";
import { Routes, Route } from "react-router";
import Root from "../layouts/Root";
import Home from "../layouts/Home";
import AddCar from "../pages/AddCar";
import CarDetails from "../pages/CarDetails";
import AllCar from "../pages/AllCar";
import Error from "../pages/Error";

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/addcar" element={<AddCar />} />
          <Route path="/cardetails" element={<CarDetails />} />
          <Route path="/allcar" element={<AllCar />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routing;
