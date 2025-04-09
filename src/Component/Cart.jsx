import React, { useEffect, useState } from "react";

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
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row border rounded p-4"
            >
              {/* Image & Info */}
              <div className="flex gap-5 w-full md:w-1/2 ">
                <div className="bg-gray-200 p-2 rounded">
                  <img
                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="font-semibold">{item.title}</h1>
                  <p>${item.price}</p>
                  <span>Quantity: {item.quantity}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="w-full md:w-1/2 mt-4 md:mt-0 flex flex-col items-end justify-between">
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 mb-2"
                >
                  Delete
                </button>
                <div className="bg-gray-200 w-[100px] flex justify-center space-x-4 rounded-full">
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <span className="w-[16px] text-center">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(index)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="w-full lg:w-4/12 border border-black rounded p-6 space-y-6 h-fit">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Summary</h2>
          <div className="flex justify-between">
            <h2>Price</h2>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between">
            <h2>Tax</h2>
            <p>${tax}</p>
          </div>
          <div className="flex justify-between border-b-2 pb-3">
            <h2>Shipping</h2>
            <p>${shipping}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <h2>Total</h2>
            <p>${total}</p>
          </div>
        </div>
        <button className="py-2 px-4 w-full bg-black text-white rounded hover:bg-gray-800 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
