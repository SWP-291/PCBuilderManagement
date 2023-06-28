import React from "react";
import "./home.css";
import image from "../assets/image/background1.png";
import Product from "../product/Products";

export default function Home() {
  return (
    <div className="hero">
      <div className="card text-bg border-0 alitems-center justify-content-center">
        <img src={image} className="card-img" alt="Background" />
        <div className="card-img-overlay">
          <div className="container">
            {/* <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p> */}
          </div>
        </div>
      </div>
      <Product />
    </div>
  );
}
