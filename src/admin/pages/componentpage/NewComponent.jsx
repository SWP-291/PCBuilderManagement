import React from "react";
import "./newComponent.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
export default function NewComponent() {
  const URL = "https://localhost:7262/api/Component";
  const initialState = {
    name: "",
    image: "",
    price: "",
    summary: "",
    description: "",
    brandId: "",
    categoryId: "",
  };

  const error_init = {
    name_err: "",
    price_err: "",
    brandId_err: "",
    categoryId_err: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const { name, image, price, summary, description, brandId, categoryId } =
    state;
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (id) {
      getOneComponent(id);
    }
  }, [id]);

  // Function to fetch and set the PC data
  const getOneComponent = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`, id);

      if (res.status === 200) {
        setState(res.data);
      }
      console.log("API response:", state);
    } catch (error) {
      console.error("Fetch component data failed:", error);
    }
  };
  const updateComponent = async (pcId, data) => {
    try {
      const res = await axios.put(`${URL}/${pcId}`, data);
      console.log("update date: ", res.data);
      if (res.status === 200) {
        toast.success(`Updated component successfully ~`);
        navigate("/components");
      }
    } catch (error) {
      toast.error("Update component failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const addNewComponent = async (data) => {
    try {
      console.log("addcom: ", data);
      const res = await axios.post(`${URL}`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New component has been added successfully ~");
        navigate("/components");
      } else {
        toast.error("New component has been added failed ~");
      }
    } catch (error) {
      toast.error("Add new component failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  // validate
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

    if (isNaN(price) || parseInt(price) < 0 || price === "") {
      errors.price_err = "Price must be a positive number and more than 0";
      isValid = false;
    }

    if (isNaN(brandId) || parseInt(brandId) < 0 || brandId === "") {
      errors.brandId_err = "BrandID is require more than 0";
      isValid = false;
    }

    if (isNaN(categoryId) || parseInt(categoryId) < 0 || categoryId === "") {
      errors.categoryId_err = "Category is require more than 0";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (id) updateComponent(id, state);
      else addNewComponent(state);
    } else {
      toast.error("Some info is invalid ~ Pls check again");
    }
  };

  const handleInputChange = (event) => {
    // const { name, value, type, checked } = event.target;
    //   setState((prevState) => ({ ...prevState, [name]: value }));
    const { name, value } = event.target;
    setState((state) => ({ ...state, [name]: value }));
  };
  return (
    <div className="container py-5 newComponent">
      <div className="form">
        <h2>{id ? "Edit Component" : "Create Component"}</h2>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="contentComponent">
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
          </Row>
          <Row>
            <Col className="contentComponent">
              <label htmlFor="image">Image: </label>
              <input
                type="text"
                name="image"
                value={state.image}
                onChange={handleInputChange}
              />
              {/* {errors.image_err && <span className='error'>{errors.image_err}</span>} */}
            </Col>
          </Row>

          <Row>
            <Col className="contentComponent">
              <label htmlFor="price">Price: </label>
              <input
                type="number"
                name="price"
                value={state.price}
                onChange={handleInputChange}
              />
              {errors.price_err && (
                <span className="error">{errors.price_err}</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col md className="contentComponent" id="abc">
              <label htmlFor="summary">Sumary: </label>
              <input
                type="text"
                name="summary"
                value={state.summary}
                onChange={handleInputChange}
              />
              {/* {errors.summary_err && <span className='error'>{errors.summary_err}</span>} */}
            </Col>
            <Col md className="contentComponent" id="abc">
              <label htmlFor="description">Description: </label>
              <input
                type="description"
                name="description"
                value={state.description}
                onChange={handleInputChange}
              />
              {/* {errors.description_err && <span className='error'>{errors.description_err}</span>} */}
            </Col>
          </Row>

          <Row>
            <Col md className="contentComponent">
              <label htmlFor="brandId">Brand ID : </label>
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
            <Col md className="contentComponent">
              <label htmlFor="categoryId">Category ID: </label>
              <input
                type="number"
                name="categoryId"
                value={state.categoryId}
                onChange={handleInputChange}
              />
              {errors.categoryId_err && (
                <span className="error">{errors.categoryId_err}</span>
              )}
            </Col>
          </Row>

          <div className="form-button">
            <Button type="submit">
              {id ? "Update Component" : "Create Component"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
