import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import { Route, Routes } from "react-router-dom";
import Products from "../product/Products";
import Product from "../product/Product";
import CustomizePC from "../product/CustomizePC";
import About from "../about/About";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Payment from "../payment/Payment";
import Customize from "../customize/Customize";
import Policy from "../policy/Policy";
function Routers() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/PC/:id" element={<Product />} />
        <Route path="/customize-pc/:id" element={<CustomizePC />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Routers;
