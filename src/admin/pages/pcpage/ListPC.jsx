import React, { useEffect, useSelector, useDispatch } from "react";
import "./listPC.css";
import { Link } from "react-router-dom";
import { getAllPc, editPcAPI, deletePcAPI } from "../../../redux/apiRequest";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";

const ListPC = () => {
  // const [pc, setPC] = useState([]);
  const data = useSelector((state) => state.admin.pcs.pc.data);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllPc(dispatch);
  }, []);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        // await deletePcAPI(id); // Call the API to delete the order
        const updatedData = data.filter((item) => item.id !== id);
        // setPC(updatedData); // Update the data state
      } catch (error) {
        console.error("Error deleting order:", error);
        // Set an error state or display an error message to the user
      }
    }
  };

  return (
    <section className="pc-section">
      <h2 className="title">
        PCs List
        <Link to="/newPC">
          <button className="btn-create">Create PC</button>
        </Link>
      </h2>

      <div className="pc-list">
        {data.map((item) => (
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
