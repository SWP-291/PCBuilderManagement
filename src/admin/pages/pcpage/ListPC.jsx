import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/DashboardHeader/Header";
import "./listPC.css";
import { Link } from "react-router-dom";
import { getPcAPI, editPcAPI, deletePcAPI } from "../../utils/api/PcAPI";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";

const ListPC = () => {
  const [pc, setPC] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getPcAPI();
      setPC(response.data);
    } catch (error) {
      console.error("Error fetching pc data:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deletePcAPI(id); // Call the API to delete the order
        const updatedData = pc.filter((item) => item.id !== id);
        setPC(updatedData); // Update the data state
      } catch (error) {
        console.error("Error deleting order:", error);
        // Set an error state or display an error message to the user
      }
    }
  };

  return (
    <section className="pc-section">
      <DashboardHeader btnText="New PC" />
      <h2 className="title">
        PCs List
        <Link to="/newPC">
          <button className="btn-create">Create PC</button>
        </Link>
      </h2>

      <div className="pc-list">
        {pc.map((item) => (
          <div key={item.id} className="pc-box">
            <h3 className="pc-name">{item.name}</h3>
            <p>ID: {item.id}</p>
            <img className="pc-image" src={item.image}></img>
            <p className="pc-description">Template ID: {item.templateId}</p>
            <p className="pc-price">Price: ${item.price}</p>
            <>
              <button className="btn-update">Update</button>
              <button
                className="btn-delete"
                onClick={() => handleDeleteClick(item.id)}
              >
                Delete
              </button>
            </>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListPC;
