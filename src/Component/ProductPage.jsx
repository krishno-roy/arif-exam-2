import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

const ProductPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      });
  }, []);
  

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, { ...product, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert("Product added to cart!");
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 space-y-4">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-gray-100 rounded-xl p-4 shadow-md"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {product.title.slice(0, 25)}
            </h3>
            <p className="text-gray-600 text-sm">
              {product.description.slice(0, 50)}
            </p>
            <p>${product.price}</p>
            <div className="flex justify-between pt-2">
              <button
                onClick={() => handleAddToCart(product)}
                className="py-2 px-4 bg-black text-white rounded hover:bg-black/45"
              >
                Add to cart
              </button>
              <button className="p-4 bg-black text-white rounded-full hover:bg-black/45">
                <IoEyeSharp />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
