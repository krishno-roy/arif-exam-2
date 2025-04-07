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
    <div className="container mx-auto flex gap-3">
      <div className="w-8/12 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex border rounded">
              <div className="flex gap-5 p-4 w-1/2">
                <div className="bg-gray-200 p-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h1>{item.title}</h1>
                  <p>${item.price}</p>
                  <span>Quantity: {item.quantity}</span>
                </div>
              </div>
              <div className="w-1/2 p-3 flex flex-col items-end">
                <button
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer mb-2 text-red-500"
                >
                  Delete
                </button>
                <div className="bg-gray-200 w-[100px] flex justify-center space-x-4 rounded-full mt-18">
                  <button onClick={() => decreaseQuantity(index)}>-</button>
                  <span className="w-[16px] text-center">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(index)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-4/12 border border-black rounded p-4 space-y-4 h-[300px] flex flex-col justify-between">
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
          <div className="flex justify-between">
            <h2>Total</h2>
            <p>${total}</p>
          </div>
        </div>
        <button className="text-center py-2 px-4 w-full bg-black text-white rounded">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
