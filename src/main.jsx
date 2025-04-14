import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Component/Home.jsx";
import Todos from "./Component/Todos.jsx";
import Blog from "./Component/Blog.jsx";
import Cart from "./Component/Cart.jsx";
import SingleProduct from "./Component/SingleProduct.jsx";
import ProductPage from "./Component/ProductPage.jsx";
import Blog2 from "./Component/Blog2.jsx";
import SingleBlog from "./Component/SingleBlog.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="todos" element={<Todos />} />
        <Route path="cart" element={<Cart />} />
        <Route path="blog" element={<Blog />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="product/:id" element={<SingleProduct />} />
        <Route path="/blog2" element={<Blog2 />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
