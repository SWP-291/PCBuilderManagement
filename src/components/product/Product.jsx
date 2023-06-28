import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import "../customize/Customize.scss";

// import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
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

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // useEffect(() => {
  //   const getProducts = async () => {
  //     setLoading(true);
  //     const response = await fetch(`
  //     https://fakestoreapi.com/products?fbclid=IwAR1YHbn0JC-X1bwdexd9rH09-Oc5JZIDlt3VVcgy9q917OzNyWxktCdaem8/${id}`);
  //     const responseData = await response.json();
  //     setProduct(responseData.data);
  //     setLoading(false);

  //   };
  //   getProducts();
  // }, []);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProducts();
  }, []);

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

  const ShowProduct = () => {
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
          <p className="lead fw-bolder">
            Rating 4.9
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">{product.price}</h3>
          <p className="lead">{product.description}</p>
        </div>
        <div className="container py-5 customize">
          <Row>
            <div className="title">
              <h1>SELECT YOUR COMPONENTS</h1>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Form.Group className="mb-4">
                  <img src={cpu} alt="CPU" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>CPU</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
                <Form.Group className="mb-4">
                  <img src={ram} alt="RAM" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>RAM</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
                <Form.Group className="mb-4">
                  <img src={gpu} alt="GPU" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>GPU</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-4">
                  <img src={ssd} alt="SSD" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>SSD</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
                <Form.Group className="mb-4">
                  <img src={hdd} alt="HDD" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>HDD</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
                <Form.Group className="mb-4">
                  <img src={cpuheatsink} alt="CPU Heatsink" />
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    <Form.Label>CPU HEATSINK</Form.Label>
                  </Button>
                  {openModal && <ItemsModal closeModel={setOpenModal} />}
                </Form.Group>
              </Row>
              <NavLink to="/payment">
                <Button type="submit">Buy Now</Button>
              </NavLink>
            </Form>
          </Row>
        </div>
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
