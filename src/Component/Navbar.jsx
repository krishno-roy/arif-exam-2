import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50">
        {/* Logo */}
        <div>
          <a href="/" className="font-black text-3xl text-black">
            Logo
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 text-lg font-semibold text-gray-700">
          <li>
            <a href="/todos">Todos</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden md:flex gap-4 text-2xl text-black">
          <IoSearchOutline className="cursor-pointer" />
          <FaCartPlus className="cursor-pointer" />
        </div>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-3xl text-black flex items-center gap-4"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="flex gap-4 text-2xl  text-black">
            <IoSearchOutline className="cursor-pointer" />
            <FaCartPlus className="cursor-pointer" />
          </div>
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-lg font-medium text-gray-700">
            <li>
              <a href="/" onClick={() => setMenuOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/todos" onClick={() => setMenuOpen(false)}>
                Todos
              </a>
            </li>
            <li>
              <a href="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </a>
            </li>
            <li>
              <a href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
