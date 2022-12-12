import React from 'react';
import Product from './Product';

const Home = () => {
  const product = {
    name: 'blue shirt',
    images: [{ url: 'https://i.ibb.co/DRST11n/1.webp' }],
    price: 'Rs. 250',
    _id: 'ali',
  };
  return (
    <div className="container border-solid border border-red-600 mx-auto max-w-full px-4 flex flex-row gap-x-1.5">
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
      <Product product={product} />
    </div>
  );
};

export default Home;
