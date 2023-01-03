import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Link
      to={product._id}
      className="w-[14vmax] h-auto border-solid border-blue-400 border flex flex-col m-[2vmax] pb-[0.5vmax] transition-all duration-500"
    >
      <img src={product.images[0].url} alt={product.name} className="w-full" />
      <p>{product.name}</p>
      <span>{product.price}</span>
    </Link>
  );
};

export default Product;
