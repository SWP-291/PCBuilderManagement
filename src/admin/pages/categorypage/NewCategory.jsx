import React from "react";
import "./newCategory.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
import { getAllCategory } from "../../../redux/apiRequest";
export default function NewCategory() {
  const URL = "https://localhost:7262/api/Category";
  const initialState = {
    name: "",
    parentId: "",
    brandId: "",
  };

  const error_init = {
    name_err: "",
    parentId_err: "",
    brandId_err: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const { name, parentId, brandId } = state;
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (id) {
      getOneCategory(id);
    }
  }, [id]);

  const getOneCategory = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`, id);

      if (res.status === 200) {
        setState(res.data.data);
      }
      console.log("API response:", state);
    } catch (error) {
      console.error("Fetch Category data failed:", error);
    }
  };

  const updateCategory = async (categoryId, data) => {
    try {
      const res = await axios.put(`${URL}/${categoryId}`, data);
      console.log("update date: ", res.data);
      if (res.status === 200) {
        toast.success(`Updated Category successfully ~`);
        navigate("/category");
      }
    } catch (error) {
      toast.error("Update Category failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const addNewCategory = async (data) => {
    try {
      // console.log('addCat: ', data);
      const res = await axios.post(`${URL}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New Category has been added successfully ~");
        navigate("/category");
      } else {
        toast.error("New Category has been added failed ~");
      }
    } catch (error) {
      toast.error("Add New Category failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (name.trim() === "" || name.length < 2) {
      errors.name_err = "Name is Required";
      if (name.length < 2) {
        errors.name_err = "Name must be more than 2 words";
      }
      isValid = false;
    }
    if (isNaN(parentId) || parseInt(parentId) < 1 || parentId === "") {
      errors.parentId_err = "ParentID is required";
      isValid = false;
    }
    if (isNaN(parentId) || parseInt(brandId) < 1 || brandId === "") {
      errors.brandId_err = "BrandID is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (id) updateCategory(id, state);
      else addNewCategory(state);
    } else {
      toast.error("Some info is invalid ~ Pls check again");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // For checkbox inputs, the value will be a string "true" or "false"
    // We convert it to a boolean value
    if (type === "checkbox") {
      setState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
    // setState((state) => ({ ...state, [name]: value }));
  };
  return (
    <div className="container py-5 newCategory">
      <div className="form">
        <h2>{id ? "Edit Category" : "Create Category"}</h2>
        <form onSubmit={handleSubmit}>
          <Col md className="contentCategory">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={state.name}
              onChange={handleInputChange}
            />
            {errors.name_err && (
              <span className="error">{errors.name_err}</span>
            )}
          </Col>
          <Row>
            <Col md className="contentCategory">
              <label htmlFor="parentId">ParentID: </label>
              <input
                type="number"
                name="parentId"
                value={state.parentId}
                onChange={handleInputChange}
              />
              {errors.parentId_err && (
                <span className="error">{errors.parentId_err}</span>
              )}
            </Col>
            <Col md className="contentCategory" id="abc">
              <label htmlFor="brandId">BrandID: </label>
              <input
                type="number"
                name="brandId"
                value={state.brandId}
                onChange={handleInputChange}
              />
              {errors.brandId_err && (
                <span className="error">{errors.brandId_err}</span>
              )}
            </Col>
          </Row>
          <div className="form-button">
            <Button type="submit">
              {id ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
