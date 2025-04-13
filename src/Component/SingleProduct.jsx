// src/pages/SingleProductPage.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-600">Product not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-64 object-cover rounded"
      />
      <p className="mt-4 text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold text-lg text-black">${product.price}</p>
    </div>
  );
};

export default SingleProduct;
