import React, { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { toast } from "react-toastify";
import pc from "../assets/image/payment.png";
import { useSelector } from "react-redux";

const Payment = () => {
  const [validated, setValidated] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productName = searchParams.get("name");
  const productPrice = searchParams.get("price");
  const [payment, setPayment] = useState();
  const productId = searchParams.get("id");
  const userId = useSelector((state) => state.auth.login.currentUser?.id);

  const randomCode = Math.floor(1000 + Math.random() * 9000);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "radio") {
      setPayment(checked ? value : "");
    } else {
      setPayment(value);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      try {
        const paymentData = {
          name: productName,
          amount: parseFloat(productPrice),
          code: randomCode,
          paymentMode: payment,
          paymentTime: "Installments",
        };
        console.log("Payment:", paymentData);

        const paymentResponse = await axios.post(
          "https://localhost:7262/api/Payment",
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Payment created:", paymentResponse.data);

        const orderData = {
          pcId: parseInt(productId),
          amount: parseFloat(productPrice),
          userId: userId,
          statusId: "pending",
          paymentId: "2",
        };

        const orderResponse = await axios.post(
          "https://localhost:7262/api/Order",
          orderData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Order created:", orderResponse.data);

        toast.success("Payment and Order created successfully");
      } catch (error) {
        console.error("Error", error);
        toast.error("Payment not created");
      }
    }
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
              <div>
                <label>
                  <input
                    type="radio"
                    value="Credit Card"
                    name="paymentMethod"
                    onChange={handleInputChange}
                  />
                  Credit Card
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="PayPal"
                    name="paymentMethod"
                    onChange={handleInputChange}
                  />
                  PayPal
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="Debit Card"
                    name="paymentMethod"
                    onChange={handleInputChange}
                  />
                  Debit Card
                </label>
                <br />
                <label>
                  <input
                    type="radio"
                    value="Bank Transfer"
                    name="paymentMethod"
                    onChange={handleInputChange}
                  />
                  Bank Transfer
                </label>
              </div>
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
              <img style={{ width: 100, height: 100 }} src={pc} alt="Product" />
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
