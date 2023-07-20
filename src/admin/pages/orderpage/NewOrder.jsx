import React, { useState, useEffect } from "react";
import "./newOrder.scss";
import { useNavigate } from "react-router-dom";
import { createOrderAPI } from "../../utils/api/OrderAPI";

export default function NewOrder() {
  const [id, setId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [pcId, setPcId] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [statusId, setStatusId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const fetchData = async () => {
    try {
      // Make an API call to retrieve the data
      const response = await createOrderAPI(); // Assuming the createOrderAPI function retrieves the data
      if (response && response.data) {
        const orderData = response.data;
        // Update the state variables with the received data
        setId(orderData.id);
        setOrderDate(orderData.orderDate);
        setPcId(orderData.pcId);
        setUserId(orderData.userId);
        setAmount(orderData.amount);
        setStatusId(orderData.statusId);
        setPaymentId(orderData.paymentId);
        setData(orderData);
      } else {
        setError("Invalid response");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
      setError("Error fetching order data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      id,
      orderDate,
      pcId,
      userId,
      amount,
      statusId,
      paymentId,
    };

    try {
      const response = await createOrderAPI(orderData);
      if (response && response.data) {
        console.log("Order created:", response.data);
        setData(response.data);
      } else {
        setError("Invalid response");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Error creating order");
    }
  };

  return (
    <div className="newOrder">
      <h1 className="addOrderTitle">New Order</h1>
      <form className="addOrderForm" onSubmit={handleSubmit}>
        <div className="addOrderItem">
          <label>ID</label>
          <input
            value={id}
            disabled="disabled"
            type="text"
            placeholder="Order ID"
          />
        </div>
        <div className="addOrderItem">
          <label>Order Date</label>
          <input
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            type="date"
            placeholder="Name Category"
          />
        </div>
        <div className="addOrderItem">
          <label>PC ID</label>
          <input
            value={pcId}
            onChange={(e) => setPcId(e.target.value)}
            type="text"
            placeholder="PC ID"
          />
        </div>
        <div className="addOrderItem">
          <label>User ID</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="text"
            placeholder="User ID"
          />
        </div>
        <div className="addOrderItem">
          <label>Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            placeholder="Amount"
          />
        </div>
        <div className="addOrderItem">
          <label>Status ID</label>
          <input
            value={statusId}
            onChange={(e) => setStatusId(e.target.value)}
            type="text"
            placeholder="Status ID"
          />
        </div>
        <div className="addOrderItem">
          <label>Payment ID</label>
          <input
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            type="text"
            placeholder="Payment ID"
          />
        </div>
        <button className="addOrderButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
