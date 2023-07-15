import React from "react";
import "./newBrand.css";

export default function NewBrand() {
  return (
    <div className="newBrand">
      <h1 className="addBrandTitle">New Brand</h1>
      <form className="addBrandForm">
        <div className="addBrandItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addBrandItem">
          <label>ID</label>
          <input type="text" placeholder="ID Brand" />
        </div>
        <div className="addBrandItem">
          <label>Name</label>
          <input type="text" placeholder="Name Brand" />
        </div>
        <div className="addBrandItem">
          <label>Origin</label>
          <input type="text" placeholder="Origin Brand" />
        </div>
        <div className="addBrandItem">
          <label>Status</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addBrandButton">Create</button>
      </form>
    </div>
  );
}
