import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setAllProducts(data.products);

        const uniqueCategories = [
          "all",
          ...new Set(data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search from URL query params
  useEffect(() => {
    if (location.search) {
      const searchParams = new URLSearchParams(location.search);
      const searchTerm = searchParams.get("q");
      if (searchTerm) {
        // You can implement search functionality here if needed
        console.log("Search term:", searchTerm);
      }
    }
  }, [location]);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
   

    // Update cart count in navbar
    const event = new Event("cartUpdated");
    window.dispatchEvent(event);
  };

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(8);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Our Products
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-3 rounded-full text-md font-medium transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover cursor-pointer"
              onClick={() =>
                navigate(`/product/${product.id}`, { state: { product } })
              }
            />
            <div className="p-4">
              <h3
                className="text-lg font-semibold mb-2 text-gray-900 cursor-pointer hover:underline"
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
              >
                {product.title.slice(0, 14)}
              </h3>
              <div className="mb-3">
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
              <div className="flex justify-between items-center gap-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-3 px-2 text-lg bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                  className="p-3 bg-gray-200 rounded hover:bg-gray-300 transition"
                >
                  <IoEyeSharp size={25} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleViewMore}
            className="px-10 py-4 text-lg bg-black text-white font-semibold rounded hover:bg-gray-700 transition"
          >
            View More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
