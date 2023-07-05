import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "../customize/Customize.scss";
import Row from "react-bootstrap/Row";
import ItemsModal from "../modal/ItemsModal";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";

export default function CustomizePC() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [componentType, setComponents] = useState([]);
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [cpuList, setCpuList] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(
        `https://localhost:7262/api/PC/PCWithComponent/${id}`
      );
      const responseData = await response.json();
      const pcData = responseData.data;
      setProduct(pcData);
      setLoading(false);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCpuList = async () => {
      const response = await fetch("https://localhost:7262/api/Component");
      const data = await response.json();
      setCpuList(data);
    };

    getCpuList();
  }, []);

  useEffect(() => {
    if (product.components) {
      const defaultSelectedComponents = product.components.map((component) => ({
        id: component.id,
        name: component.name,
      }));
      setSelectedComponents(defaultSelectedComponents);
    }
  }, [product.components]);

  useEffect(() => {
    if (selectedComponentType && product.components) {
      const filtered = product.components.filter((component) =>
        component.name.includes("CPU")
      );
      setFilteredComponents(filtered);
      console.log(filtered);
    } else {
      setFilteredComponents([]);
    }
  }, [selectedComponentType, product.components]);

  console.log(selectedComponentType);

  const openComponentModal = (componentType, component) => {
    setSelectedComponentType(componentType.name);
    setSelectedComponent(component);
    setShowModal(true);
  };

  const handleComponentSelect = (componentType, component) => {
    const updatedSelectedComponents = selectedComponents.map(
      (selectedComponent) => {
        if (selectedComponent.name === selectedComponentType) {
          return component;
        }
        return selectedComponent;
      }
    );

    setSelectedComponents(updatedSelectedComponents);
    setShowModal(false);
    setSelectedComponentType(null);
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
                {chunk.trim()} {/* Remove extra whitespace */}
              </p>
            ))}
          </p>
        </div>
        <div className="container py-5 fluid customize">
          <Row>
            <div className="title">
              <h1>SELECT YOUR COMPONENTS</h1>
            </div>
          </Row>

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
                                <img
                                  src={component.image}
                                  alt="CPU"
                                  style={{ marginLeft: "-90px" }}
                                />
                              )}
                              {component.name.includes("Mainboard") && (
                                <img src={component.image} alt="Mainboard" />
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
                                    {component.price.toLocaleString("vi-VN", {
                                      minimumFractionDigits: 0,
                                      maximumFractionDigits: 0,
                                    })}
                                  </p>
                                ) : (
                                  <p>Price not available</p>
                                )}
                              </span>
                              <span className="price-separator">x</span>
                              <input
                                className="count-p"
                                type="number"
                                min="1"
                                max="50"
                              />
                              <span className="price-separator">=</span>
                              <span className="sum-price">Sum display</span>
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
                              onClick={() =>
                                openComponentModal(
                                  component,
                                  selectedComponents
                                )
                              }
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
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
          {showModal && (
            <ItemsModal
              closeModel={() => setShowModal(false)}
              handleComponentSelect={handleComponentSelect}
              selectedComponents={selectedComponents}
              componentType={componentType}
              component={selectedComponent}
              filteredComponents={filteredComponents}
            />
          )}
        </div>
      </div>
    </div>
  );
}
