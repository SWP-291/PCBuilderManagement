import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "../customize/Customize.scss";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ItemsModal from "../modal/ItemsModal";
import cpu from "../assets/image/cpu.png";
import ram from "../assets/image/ram.png";
import gpu from "../assets/image/gpu.png";
import hdd from "../assets/image/hdd.png";
import ssd from "../assets/image/ssd.png";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import cpuheatsink from "../assets/image/cpuheatsick.png";

export default function CustomizePC() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponents, setSelectedComponents] = useState([]);

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
    if (product.components) {
      const defaultSelectedComponents = product.components.map((component) => ({
        id: component.id,
        type: component.type,
        name: component.name,
      }));
      setSelectedComponents(defaultSelectedComponents);
    }
  }, [product.components]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
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

  // const descriptionLines = 5;
  const description = product.description || "";
  const descriptionChunks = description.split(".");

  const ShowProduct = () => {
    const openComponentModal = (componentType, component) => {
      setSelectedComponentType(componentType);
      setSelectedComponent(component);
      setOpenModal(true);

      const renderSelectedComponents = () => {
        return selectedComponents.map((component) => (
          <div key={component.id} className="selected-component">
            <h4>{component.type}</h4>
            <p>{component.name}</p>
          </div>
        ));
      };
    };

    const handleComponentSelect = (component) => {
      const updatedSelectedComponents = selectedComponents.map(
        (selectedComponent) => {
          if (selectedComponent.type === selectedComponentType) {
            return component;
          }
          return selectedComponent;
        }
      );

      setSelectedComponents(updatedSelectedComponents);
      setOpenModal(false);
    };

    return (
      <>
        <div className="col-md-6 pt-4">
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
          <p className="lead fw-bolder">
            Rating 4.9
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">
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
          <p
            className="lead"
            // style={{
            //   maxHeight: `${descriptionLines * 2}em`,
            //   overflow: "auto",
            // }}
          >
            {descriptionChunks.map((chunk, index) => (
              <p key={index} className="lead">
                {chunk.trim()} {/* Xóa khoảng trắng thừa */}
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
          <Row style={{ width: "1150px", height: "200px" }}>
            {product.components &&
              product.components.map((component) => {
                const isSelected = selectedComponents.find(
                  (selectedComponent) => selectedComponent.id === component.id
                );

                return (
                  <Col key={component.id}>
                    <div className={`select ${isSelected ? "selected" : ""}`}>
                      <img src={component.image} alt={component.name} />
                      <p style={{ width: "500px" }}>{component.name}</p>
                    </div>

                    <div className="price">
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
                      <Button
                        onClick={() =>
                          openComponentModal(component.type, component)
                        }
                      >
                        Select
                      </Button>
                    </div>
                  </Col>
                );
              })}
            <NavLink to="/payment">
              <Button type="submit">Buy Now</Button>
            </NavLink>
          </Row>
        </div>
        {openModal && (
          <ItemsModal
            closeModel={() => setOpenModal(false)}
            handleComponentSelect={handleComponentSelect}
          />
        )}
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
    </div>
  );
}
