import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (!product) {
      navigate("/products");
    }
  }, [product, navigate]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Products
      </button>

      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="mb-4 h-96 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500?text=Image+Not+Available";
              }}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <div className="flex items-center mb-4">
            <span className="text-yellow-400 text-lg">★ {product.rating}</span>
            <span className="text-gray-500 ml-2">
              ({product.stock} in stock)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-black">
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
            {product.discountPercentage && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>
          <p className="text-sm text-gray-500 mb-6">
            Category: <span className="capitalize">{product.category}</span>
          </p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border rounded-full">
              <button
                onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                className="px-4 py-2 text-xl font-bold hover:text-indigo-600"
              >
                -
              </button>
              <span className="px-4 text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-4 py-2 text-xl font-bold hover:text-indigo-600"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-gray-400 text-white py-3 px-6 rounded-full text-lg font-medium transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
