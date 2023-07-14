import React from "react";
import "./newPc.css";

export default function NewPC() {
  return (
    <div className="newPC">
      <h1 className="addPcTitle">New PC</h1>
      <form className="addPcForm">
        <div className="addPcItem">
          <label>ID</label>
          <input type="text" placeholder="PC ID" />
        </div>
        <div className="addPcItem">
          <label>Name</label>
          <input type="text" placeholder="Name PC" />
        </div>
        <div className="addPcItem">
          <label>Description</label>
          <input type="text" placeholder="PC Description" />
        </div>
        <div className="addPcItem">
          <label>Price</label>
          <input type="text" placeholder="Price ID" />
        </div>
        <div className="addPcItem">
          <label>Discount</label>
          <input type="text" placeholder="Discount ID" />
        </div>
        <div className="addPcItem">
          <label>Template ID</label>
          <input type="text" placeholder="Template ID" />
        </div>
        <div className="addPcItem">
          <label>IsPublic</label>
          <input type="text" placeholder="IsPublic ID" />
        </div>
        <div className="addPcItem">
          <label>Design By</label>
          <input type="text" placeholder="Design PC" />
        </div>
        <div className="addPcItem">
          <label>Image</label>
          <input type="text" placeholder="Image" />
        </div>
        <button className="addPcButton">Create</button>
      </form>
    </div>
  );
}
