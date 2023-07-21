import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
const Payment = () => {
  const [validated, setValidated] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productName = searchParams.get("name");
  const productPrice = searchParams.get("price");
  const productImage = searchParams.get("image");

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-sm-8">
          <div className="py-3">
            <h1 className="title">Biling Detail</h1>
            <hr />
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Col>
              <Form.FloatingLabel
                controlId="validationCustom02"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="fullname"
                  placeholder="Nguyễn Văn A"
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                controlId="validationCustom03"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                controlId="validationCustom04"
                label="Address"
                className="mb-3"
              >
                <Form.Control required type="text" placeholder="ABC-NewYork" />
              </Form.FloatingLabel>
              <Form.FloatingLabel
                controlId="validationCustom05"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control required type="number" placeholder="0123456789" />
              </Form.FloatingLabel>
            </Col>
            <hr />
            <Col>
              <Form.Check
                className="mb-3"
                label="Shipping address is the same as my billing address"
              />
              <Form.Check
                className="mb-3"
                label="Save this information for next time"
              />
            </Col>
            <hr />
            <div className="py-3">
              <h3 className="title">Payment</h3>
            </div>
            <Col>
              <Form.Group>
                <Form.Check
                  className="mb-3"
                  type="radio"
                  label="Credit Card"
                  name="paymentMethod"
                  required
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  label="PayPal"
                  name="paymentMethod"
                  required
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  label="Debit Card"
                  name="paymentMethod"
                  required
                />
                <Form.Check
                  className="mb-3"
                  type="radio"
                  label="Bank Transfer"
                  name="paymentMethod"
                  required
                />
              </Form.Group>
            </Col>
            <Button
              style={{ marginLeft: "75%" }}
              type="submit"
              onClick={handleSubmit}
            >
              CONTINUE TO CHECKOUT
            </Button>
          </Form>
        </div>

        <div className="col-sm 4">
          <div className="py-3">
            <h1 className="title">Summary</h1>
            <hr />
          </div>
          <Col className="md-3">
            <div className="d-flex align-items-center mb-3">
              <img
                style={{ width: 100, height: 100 }}
                src={productImage}
                alt="Product"
              />
              <div className="ms-3">
                <p style={{ fontWeight: 600 }}>{productName}</p>
              </div>
            </div>
          </Col>
          <hr />
          <p style={{ fontWeight: 600 }}>
            Total:{" "}
            {parseFloat(productPrice).toLocaleString("vi-VN", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
