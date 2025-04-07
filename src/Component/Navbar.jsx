import React from 'react'
import { FaCartPlus } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';

const Navbar = () => {
  return (
    <header>
      <nav className="container mx-auto flex justify-between">
        {/* logo */}
        <div>
          <a href="/" className="font-black text-3xl">
            Logo
          </a>
        </div>
        {/* desktop menu */}
        <div>
          <ul className="flex gap-7 texy-lg font-semibold">
            <li>
              <a href="product">Home</a>
            </li>
            <li>
              <a href="todos">Todos</a>
            </li>
            <li>
              <a href="cart">Cart</a>
            </li>
            <li>
              <a href="blog">Blog</a>
            </li>
          </ul>
        </div>
        {/* cart  */}
        <div className="flex gap-4 text-2xl">
          <IoSearchOutline />
          <FaCartPlus />
        </div>
      </nav>
    </header>
  );
}

export default Navbar