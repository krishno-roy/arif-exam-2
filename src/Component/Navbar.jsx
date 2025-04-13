import React, { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load cart count from localStorage
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    // Initial load
    updateCartCount();

    // Listen for cart updates
    window.addEventListener("cartUpdated", updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      setSearchOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50">
          {/* Logo */}
          <div>
            <Link to="/" className="font-black text-3xl text-black">
              <img src={Logo} alt="" className="h-15" />
            </Link>
          </div>

          {/* Desktop Menu */}
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

          {/* Icons */}
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

          {/* Hamburger Icon */}
          <div
            className="md:hidden text-3xl text-black flex items-center gap-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex gap-4 text-2xl text-black items-center">
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
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </div>
        </nav>

        {/* Mobile Menu */}
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
      </header>

      {/* Search Popup */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
            >
              <IoClose />
            </button>
            <form onSubmit={handleSearch} className="mt-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-black"
                >
                  <IoSearchOutline />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
