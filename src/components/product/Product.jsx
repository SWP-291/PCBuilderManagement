import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "../product/Template.scss";
import Row from "react-bootstrap/Row";
import ItemsModal from "../modal/ItemsModal";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [componentType, setComponentType] = useState([]);
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [originalComponents, setOriginalComponents] = useState([]);
  const [toastProps, setToastProps] = useState({});
  const [ramQuantity, setRamQuantity] = useState(1);
  const [hddQuantity, setHddQuantity] = useState(1);
  const [ssdQuantity, setSsdQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showTotalPrice, setShowTotalPrice] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `https://localhost:7262/api/PC/PCWithComponent/${id}`
      );
      const responseData = await response.json();
      const pcData = responseData.data;
      setProduct(pcData);

      setOriginalComponents(pcData.components);
      setLoading(false);
    };

    getProducts();
  }, []);

  useEffect(() => {
    if (product.components) {
      const defaultSelectedComponents = product.components.map((component) => ({
        id: component.id,
        name: component.name,
        price: component.price || 0,
      }));
      setSelectedComponents(defaultSelectedComponents);
    }
  }, [product.components]);

  useEffect(() => {
    if (selectedComponents.length > 0) {
      calculateTotalPrice(selectedComponents);
    }
  }, [selectedComponents]);

  const calculateTotalPrice = (components) => {
    const totalPrice = components.reduce((total, component) => {
      return total + (component.price || 0);
    }, 0);
    setTotalPrice(totalPrice);
    setShowTotalPrice(false);
  };

  const handleComponentSelect = async (componentType, component) => {
    // Create a new array with the updated component
    const updatedSelectedComponents = selectedComponents.map(
      (selectedComponent) => {
        if (selectedComponent.name.includes(componentType)) {
          return { ...component };
        }
        return selectedComponent;
      }
    );

    try {
      const temporarySelectedComponents = updatedSelectedComponents.map(
        (component) => component.id
      );
      localStorage.setItem(
        "temporarySelectedComponents",
        JSON.stringify(temporarySelectedComponents)
      );
      console.log("Temporary components saved successfully");

      setSelectedComponents(updatedSelectedComponents);
      console.log(
        "updated components saved successfully",
        updatedSelectedComponents
      );

      setProduct((prevProduct) => ({
        ...prevProduct,
        components: updatedSelectedComponents,
      }));

      setShowModal(false);
      // setSelectedComponents(updatedSelectedComponents);
      calculateTotalPrice(updatedSelectedComponents);
      setTimeout(() => {
        setShowTotalPrice(true);
      }, 1000);
      setSelectedComponentType(null);
    } catch (error) {
      console.error("Error updating components:", error.response);
      console.error("Error updating components:", error.response.data);
    }
  };

  const handleBuyNow = async () => {
    try {
      const temporarySelectedComponents = localStorage.getItem(
        "temporarySelectedComponents"
      );

      const parsedSelectedComponents = temporarySelectedComponents
        ? JSON.parse(temporarySelectedComponents)
        : [];

      const response = await axios.post(
        `https://localhost:7262/api/PC/CreatePCWithComponentsFromTemplate?templateId=${id}`,
        parsedSelectedComponents,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Call conducted successfully");

      localStorage.removeItem("temporarySelectedComponents");
      window.location.href = "/payment";
    } catch (error) {
      console.error("Error conducting API call:", error.response);
      console.error("Error conducting API call:", error.response.data);
    }
  };

  const openComponentModal = (component) => {
    let componentType = "";
    if (component.name.includes("CPU")) {
      componentType = "CPU";
    } else if (component.name.includes("Main")) {
      componentType = "Main";
    } else if (component.name.includes("VGA")) {
      componentType = "VGA";
    } else if (component.name.includes("PSU")) {
      componentType = "PSU";
    } else if (component.name.includes("Ram")) {
      componentType = "Ram";
    } else if (component.name.includes("SSD")) {
      componentType = "SSD";
    } else if (component.name.includes("HDD")) {
      componentType = "HDD";
    }

    setSelectedComponentType(componentType);
    const updatedComponent = product.components.find(
      (comp) => comp.id === component.id
    );
    setSelectedComponent(component);
    setShowModal(true);
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-5">
          <Skeleton height={400} />
        </div>
        <div className="col-md-7">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} />
        </div>
      </>
    );
  };

  const detail = product.detail || "";
  const detailChunks = detail.split(". ");

  const descrip = product.description || "";
  // const descripChunks = descrip.split(".|").join("|").split("|");
  const descripChunks = descrip.split(".");

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 pt-4 image-main">
          <img
            src={product.image}
            alt={product.name}
            height="400px"
            width="400px"
          />
        </div>

        <div className="col-md-6 pt-4">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          <p>{product.summary}</p>
          <p className="rate fw-bolder">
            Rating 4.9
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4 price-text">
            {product.price && typeof product.price === "number" ? (
              <p>
                {product.price.toLocaleString("vi-VN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
                <span className="small-currency">₫</span>
              </p>
            ) : (
              <p>Price not available</p>
            )}
          </h3>
          <p className="lead-type">
            {detailChunks.map((chunk, index) => (
              <p key={index} className="lead">
                {chunk.trim()}
              </p>
            ))}
          </p>
        </div>
        <div className="container py-5 fluid customize">
          <div className="row">
            <div className="col-md-8">
              <div className="title">
                <h1>SELECT YOUR COMPONENTS</h1>
              </div>

              <div className="box-table">
                {product.components && product.components.length > 0 ? (
                  <table className="ae-table">
                    <tbody>
                      {product.components.map((component, index) => (
                        <tr key={index}>
                          <td className="category-name">
                            {index === 0
                              ? "1. CPU"
                              : index === 1
                              ? "2. Main"
                              : index === 2
                              ? "3. VGA"
                              : index === 3
                              ? "4. PSU"
                              : index === 4
                              ? "5. Ram"
                              : index === 5
                              ? "6. SSD"
                              : index === 6
                              ? "7.HDD"
                              : ""}
                          </td>
                          <td style={{ width: "30%" }}>
                            <div className="item-drive">
                              <div className="contain-item-drive">
                                <div className="flex image-category">
                                  {component.name.includes("CPU") && (
                                    <img src={component.image} alt="CPU" />
                                  )}
                                  {component.name.includes("Mainboard") && (
                                    <img
                                      src={component.image}
                                      alt="Mainboard"
                                    />
                                  )}
                                  {component.name.includes("VGA") && (
                                    <img src={component.image} alt="VGA" />
                                  )}
                                  {component.name.includes("PSU") && (
                                    <img src={component.image} alt="PSU" />
                                  )}
                                  {component.name.includes("Ram") && (
                                    <img src={component.image} alt="Ram" />
                                  )}
                                  {component.name.includes("SSD") && (
                                    <img src={component.image} alt="SSD" />
                                  )}
                                  {component.name.includes("HDD") && (
                                    <img src={component.image} alt="HDD" />
                                  )}
                                  {component.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="component-price">
                            <div className="price-wrapper">
                              {component.name.includes("Ram") ||
                              component.name.includes("HDD") ||
                              component.name.includes("SSD") ? (
                                <div className="d-flex d-flex-center box-price">
                                  <span className="d-price fw-bold">
                                    {component.price &&
                                    typeof component.price === "number" ? (
                                      <p>
                                        {component.price.toLocaleString(
                                          "vi-VN",
                                          {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                          }
                                        )}
                                      </p>
                                    ) : (
                                      <p>Price not available</p>
                                    )}
                                  </span>
                                </div>
                              ) : (
                                <span className="d-price fw-bold">
                                  {component.price &&
                                  typeof component.price === "number" ? (
                                    <p>
                                      {component.price.toLocaleString("vi-VN", {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                      })}
                                    </p>
                                  ) : (
                                    <p>Price not available</p>
                                  )}
                                </span>
                              )}

                              <div className="btn-select ml-auto">
                                <Button
                                  onClick={() => openComponentModal(component)}
                                >
                                  Select
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No components available</p>
                )}
              </div>
            </div>
            <div className="col-md-4 configure-descip-container">
              <div className="configure-descip-sticky">
                <div className="configure-descrip">
                  <h2 className="title">Description</h2>
                  <p className="description">
                    {descripChunks.map((chunk, index) => (
                      <p key={index} className="description-container">
                        {chunk.trim()}
                      </p>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {showTotalPrice && (
            <div className="price-changed" onClick={handleComponentSelect}>
              Total Price Changed:{" "}
              <span className="positive-change">
                {totalPrice.toLocaleString("vi-VN", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
              <span className="small-currency positive-change">₫</span>
            </div>
          )}

          <NavLink to="/payment">
            <Button type="submit" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            closeButton={false}
            className="toast-container"
            toastClassName="toast-success"
          />
          {showModal && (
            <ItemsModal
              closeModel={() => setShowModal(false)}
              handleComponentSelect={handleComponentSelect}
              selectedComponents={selectedComponents}
              selectedLocation={selectedComponentType}
              componentType={componentType}
              component={selectedComponent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
