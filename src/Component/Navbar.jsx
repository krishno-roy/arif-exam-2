import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupItems, setPopupItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
      setPopupItems(cart);
      setShowPopup(true);

      // Auto close popup after 3s
      setTimeout(() => setShowPopup(false), 30000);
    };

    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  const handleRemoveFromCart = (productId) => {
    // Get current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Filter out the item with the matching product ID
    const updatedCart = cart.filter((item) => item.id !== productId);

    // Update localStorage with the new cart
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Dispatch an event to notify the Navbar to update cart count and popup items
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <header className="bg-white shadow-md relative">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-10" />
        </Link>

        <ul className="hidden md:flex gap-7 text-lg font-semibold text-gray-700">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todos">Todos</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </ul>

        <div className="hidden md:flex gap-4 text-2xl text-black items-center">
          <button onClick={() => setSearchOpen(true)}>
            <IoSearchOutline className="cursor-pointer" />
          </button>
          <Link to="/cart" className="relative">
            <FaCartPlus className="cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-4 text-3xl">
          <button onClick={() => setSearchOpen(true)}>
            <IoSearchOutline />
          </button>
          <Link to="/cart" className="relative">
            <FaCartPlus />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </nav>

      {showPopup && (
        <div className="absolute right-6 top-20 bg-white border border-gray-300 rounded-lg shadow-lg w-sm z-50">
          <div className="p-4">
            {/* Close Button at Top Left */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 left-4 text-2xl text-gray-500 hover:text-black"
            >
              <IoMdClose />
            </button>

            <h3 className="font-semibold mb-2">Added to Cart</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {popupItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2  border p-2 rounded relative"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-17  bg-cover object-cover prodcutimg  "
                  />
                  <div className="text-sm">
                    <p>{item.title.slice(0, 20)}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>${item.price}</p>
                  </div>
                  {/* Add a "Remove" button */}
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 hover:underline ml-2 absolute right-4"
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/cart")}
              className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Go to Checkout
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full mt-2 text-sm text-gray-600 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium text-gray-700">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/todos" onClick={() => setMenuOpen(false)}>
                Todos
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              <IoClose />
            </button>
            <form onSubmit={handleSearch} className="mt-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
              />
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
