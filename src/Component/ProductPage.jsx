import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      });
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const foundIndex = existingCart.findIndex((item) => item.id === product.id);
    if (foundIndex !== -1) {
      existingCart[foundIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={product.thumbnail || product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
              />
             
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 truncate">
                {product.title}
              </h3>
             
              <div>
                <span className="text-lg font-bold text-black">
                  ${product.price}
                </span>
                {product.discountPercentage && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>
             
                <div className="flex justify-between py-5">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-1 bg-black text-white text-sm rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: { product } })
                    }
                    className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                    title="View Details"
                  >
                    <IoEyeSharp size={16} />
                  </button>
                </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
