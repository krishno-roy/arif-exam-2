import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const handleDelete = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      updateLocalStorage(updatedCart);
    } else {
      // Remove item if quantity becomes 0
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const tax = 5;
  const shipping = 5;
  const total = subtotal + tax + shipping;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6">
      {/* Cart Items */}
      <div className="w-full lg:w-8/12 space-y-4">
        {cartItems.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center py-10">
            <p className="text-xl text-gray-500 mt-4">Your cart is empty</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row border rounded p-4 gap-4"
            >
              {/* Image & Info */}
              <div className="flex gap-4 flex-1">
                <div className="bg-gray-100 p-2 rounded flex-shrink-0">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <h1 className="font-semibold text-sm sm:text-base">
                    {item.title}
                  </h1>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <span className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:items-end justify-between">
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base mb-2 sm:mb-0 self-end"
                >
                  <RiDeleteBinLine size={25} />
                </button>
                <div className="bg-gray-200 w-[100px] flex justify-between items-center px-3 py-1 rounded-full">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="text-lg font-bold w-8 h-full"
                  >
                    -
                  </button>
                  <span className="text-center w-16">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="text-lg font-bold w-8 h-full"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary - Hidden when cart is empty */}
      {cartItems.length > 0 && (
        <div className="w-full lg:w-4/12 border border-gray-200 rounded p-6 space-y-6 h-fit sticky top-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-3">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="py-3 px-4 w-full bg-black text-white rounded hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
