import React from 'react';
import CarCard from '../components/CarCard';

const AllCar = () => {
    return (
      <div className="section-layout">
        This is All car Page.
        <section className="grid grid-cols-3 gap-6">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </section>
      </div>
    );
};

export default AllCar;