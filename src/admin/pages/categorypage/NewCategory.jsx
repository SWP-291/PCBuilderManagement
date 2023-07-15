import React from "react";
import "./newCategory.css";

export default function NewCategory() {
  return (
    <div className="newCategory">
      <h1 className="addCategoryTitle">New Category</h1>
      <form className="addCategoryForm">
        <div className="addCategoryItem">
          <label>ID</label>
          <input type="text" placeholder="Category ID" />
        </div>
        <div className="addCategoryItem">
          <label>Name</label>
          <input type="text" placeholder="Name Category" />
        </div>
        <div className="addCategoryItem">
          <label>Parent ID</label>
          <input type="text" placeholder="Parent ID" />
        </div>
        <div className="addCategoryItem">
          <label>Brand ID</label>
          <input type="text" placeholder="Category ID" />
        </div>
        <button className="addCategoryButton">Create</button>
      </form>
    </div>
  );
}
