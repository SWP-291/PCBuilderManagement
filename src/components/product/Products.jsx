import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink, useNavigate } from "react-router-dom";
import "./product.css";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let componentMounted = true;

  // useEffect(() => {
  //   const getProducts = async () => {
  //     setLoading(true);
  //     const response = await fetch("https://fakestoreapi.com/products");
  //     if (componentMounted) {
  //       setData(await response.clone().json());
  //       setFilter(await response.json());
  //       setLoading(false);
  //       console.log(filter);
  //     }
  //     return () => {
  //       componentMounted = false;
  //     };
  //   };

  //   getProducts();
  // }, []);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        "https://localhost:7262/api/PC/GetListByCustomer"
      );

      if (componentMounted) {
        const responseData = await response.json();
        setData(responseData.data);
        setFilter(responseData.data);
        setLoading(false);
      }
      return () => {
        componentMounted = false;
      };
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

  // const filterProduct = (isTemplate) => {
  //   const updatedList = data.filter((x) => x.isTemplate === isTemplate);
  //   setFilter(updatedList);
  // };

  const ShowProducts = () => {
    const handleViewDetail = (productId) => {
      // Handle the view detail action
      console.log(`View detail for product ${productId}`);
    };

    const handleBuyNow = (product) => {
      // Handle the buy now action
      console.log("Product:", product);
      navigate(
        `/payment?url=${product.url}&price=${product.price}&image=${
          product.image
        }&name=${encodeURIComponent(product.name)}`
      );
    };

    const handleCustomizePC = (productId) => {
      // Handle the customize PC action
      console.log(`Customize PC for product ${productId}`);
    };

    const getProductButtons = (product) => {
      if (product.isTemplate) {
        return (
          <>
            <NavLink
              to={`/PCDetail/${product.id}`}
              className="btn btn-outline-primary detail-button"
              onClick={() => handleViewDetail(product.id)}
            >
              Detail
            </NavLink>
            <button
              className="btn btn-outline-primary buy-button"
              onClick={() => handleBuyNow(product)}
            >
              Buy Now
            </button>
          </>
        );
      } else {
        return (
          <>
            <NavLink
              to={`/customize-pc-detail/${product.id}`}
              className="btn btn-outline-primary detail-button"
              onClick={() => handleViewDetail(product.id)}
            >
              Detail
            </NavLink>
            <NavLink
              to={`/customize-pc/${product.id}`}
              className="btn btn-outline-primary buy-button"
              onClick={() => handleCustomizePC(product.id)}
            >
              Customize PC & Buy
            </NavLink>
          </>
        );
      }
    };

    return (
      <>
        {/* <div className="buttons d-flex justify-content-center mb-3 pb-3">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct(true)}
          >
            PC Template
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct(false)}
          >
            Customize PC
          </button>
        </div> */}
        <div className="row">
          {filter.map((pro) => {
            return (
              <div className="col-md-3" key={pro.id}>
                <div className="card h-100 text-center p-4">
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
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 text-center fw-bold">List Product</h1>
            <hr />
          </div>
        </div>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}
