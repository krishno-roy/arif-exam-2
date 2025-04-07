import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './Component/Home.jsx';
import Todos from './Component/Todos.jsx';
import Blog from './Component/Blog.jsx';
import Cart from './Component/Cart.jsx';



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="product" element={<Home />} />
        <Route path="todos" element={<Todos />} />
        <Route path="cart" element={<Cart />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
