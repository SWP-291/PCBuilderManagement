import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const filterProduct = (cate) => {
    const updatedList = data.filter((x) => x.category === cate);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-3 pb-3">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            PC Template
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Customize PC
          </button>
        </div>
        <div className="row">
          {filter.map((pro) => {
            return (
              <div className="col-md-3" key={pro.id}>
                <div className="card h-100 text-center p-4">
                  <img
                    src={pro.image}
                    className="card-img-top"
                    alt={pro.title}
                    height="250px"
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{pro.title}</h5>
                    <p className="card-text">${pro.price}</p>
                    <NavLink
                      to={`/products/${pro.id}`}
                      className="btn btn-primary"
                    >
                      Detail
                    </NavLink>
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
            <h1 className="display-6 text-center fw-bold">Latest Product</h1>
            <hr />
          </div>
        </div>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}
