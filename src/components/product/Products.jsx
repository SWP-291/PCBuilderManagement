import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink, useNavigate } from "react-router-dom";
import "./product.css";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://localhost:7262/api/PC/GetListByCustomer",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
            },
          }
        );
        console.log(localStorage.getItem("currentUser"));

        if (componentMounted) {
          setData(response.data);
          console.log(response.data);
          setFilter(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    const handleViewDetail = (productId) => {
      console.log(`View detail for product ${productId}`);
    };

    const handleBuyNow = (product) => {
      console.log("Product:", product);
      navigate(
        `/payment?url=${product.url}&price=${product.price}&image=${
          product.image
        }&name=${encodeURIComponent(product.name)}`
      );
    };

    const getProductButtons = (product) => {
      if (product.isTemplate) {
        return (
          <>
            <div className="button container">
              <NavLink
                to={`/PCDetail/${product.id}`}
                className="btn detail-button"
                onClick={() => handleViewDetail(product.id)}
              >
                View Details
              </NavLink>
              <button
                className="btn buy-button"
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
            </div>
          </>
        );
      }
    };

    return (
      <>
        <div className="row">
          {filter.map((pro) => {
            return (
              <div className="col-md-3 mb-4" key={pro.id}>
                <div className="card h-100 text-center p-2">
                  <NavLink
                    to={`/PCDetail/${pro.id}`}
                    className="btn"
                    onClick={() => handleViewDetail(pro.id)}
                  >
                    <img
                      src={pro.image}
                      className="card-img-top"
                      alt={pro.name}
                      height="250px"
                    />
                    <div className="card-body">
                      <h5 className="card-title mb-0">{pro.name}</h5>
                      <p className="card-text">
                        {pro.price.toLocaleString("vi-VN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                        <span className="small-currency">₫</span>
                      </p>
                      {getProductButtons(pro)}
                    </div>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="hero">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12 mb-5">
              <h1 className="display-6 text-center fw-bold animated-text">
                Begin With Your Choices
              </h1>
              <p
                className="mb-4 animated-text1"
                style={{
                  margin: "0 150px",
                  textAlign: "center",
                  fontSize: "24px",
                }}
              >
                Choose the service that suits your needs. We offer a range of
                options, including 24/7 on-demand troubleshooting support and
                personalized PC consultation for customizing your PC.
              </p>
            </div>
          </div>
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
