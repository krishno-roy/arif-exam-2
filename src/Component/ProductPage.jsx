import React, { useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router";

const ProductPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Start with 8 products
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setAllProducts(data.products);

        // Extract unique categories and add "all" option
        const uniqueCategories = [
          ...new Set(data.products.map((p) => p.category)),
        ];
        setCategories(["all", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    alert(`${product.title} added to cart!`);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more products
  };

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setVisibleCount(8); // Reset to 8 products when category changes
            }}
            className={`px-4 py-2 rounded-full capitalize ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            } transition`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
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
                className="font-semibold text-lg mb-2 cursor-pointer hover:underline"
                onClick={() =>
                  navigate(`/product/${product.id}`, { state: { product } })
                }
              >
                {product.title}
              </h3>

              <div className="mb-3">
                <span className="text-lg font-bold">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercentage / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    navigate(`/product/${product.id}`, { state: { product } })
                  }
                  className="p-2 bg-gray-200 rounded hover:bg-gray-300 cursonre-pointer"
                >
                  <IoEyeSharp size={80} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button (only shows if more products available) */}
      {visibleCount < filteredProducts.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleViewMore}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
          >
            View More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
