import Navbar from "../navbar/Navbar";
import Home from "../home/Home";
import { Route, Routes } from "react-router-dom";
import Products from "../product/Products";
import Product from "../product/Product";
import DetailTemplate from "../product/DetailTemplate";
import About from "../about/About";
import Contact from "../contact/Contact";
import Login from "../login/Login";
import Payment from "../payment/Payment";
import Customize from "../customize/Customize";
import DetailCustomize from "../customize/DetailCustomize";
import Policy from "../policy/Policy";
function Routers() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/PCDetail/:id" element={<Product />} />
        <Route path="/PC/:id" element={<DetailTemplate />} />
        <Route path="/customize-pc/:id" element={<Customize />} />
        <Route path="/customize-pc-detail/:id" element={<DetailCustomize />} />
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
