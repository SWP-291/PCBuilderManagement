import React from "react";
import "./newComponent.css";

export default function NewComponent() {
  return (
    <div className="newCompo">
      <h1 className="addCompoTitle">New Component</h1>
      <form className="addCompoForm">
        <div className="addCompoItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addCompoItem">
          <label>ID</label>
          <input type="text" placeholder="ID Component" />
        </div>
        <div className="addCompoItem">
          <label>Name</label>
          <input type="text" placeholder="Name Component" />
        </div>
        <div className="addCompoItem">
          <label>Price</label>
          <input type="text" placeholder="Price Component" />
        </div>
        <div className="addCompoItem">
          <label>Description</label>
          <input type="text" placeholder="Description Component" />
        </div>
        <div className="addCompoItem">
          <label>Brand ID</label>
          <input type="text" placeholder="Brand ID" />
        </div>
        <div className="addCompoItem">
          <label>Category ID</label>
          <input type="text" placeholder="Category ID" />
        </div>
        <button className="addCompoButton">Create</button>
      </form>
    </div>
  );
}
