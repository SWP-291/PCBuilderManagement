import React from "react";
import "./newBrand.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
export default function NewBrand() {
  const initialState = {
    name: "",
    logo: "",
    origin: "",
    status: false,
  };

  const error_init = {
    name_err: "",
    logo_err: "",
    origin_err: "",
    status_err: false,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { name, logo, origin, status } = state;
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (id) {
      getOneBrand(id);
    }
  }, [id]);

  // Function to fetch and set the PC data
  const getOneBrand = async (id) => {
    try {
      const res = await axios.get(`https://localhost:7262/api/Brand/${id}`, id);
      if (res.status === 200) {
        setState(res.data.data);
      }
      console.log("API response:", state);
    } catch (error) {
      console.error("Fetch Brand data failed:", error);
    }
  };

  const updateBrand = async (brandId, data) => {
    try {
      const res = await axios.put(
        `https://localhost:7262/api/Brand/${brandId}`,
        data
      );
      console.log("update date: ", res.data);
      if (res.status === 200) {
        toast.success(`Updated Brand successfully ~`);
        navigate("/brands");
      }
    } catch (error) {
      toast.error("Update Brand failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const addNewBrand = async (data) => {
    try {
      console.log("Brand: ", data);
      const res = await axios.post(`https://localhost:7262/api/Brand`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New Brand has been added successfully ~");
        navigate("/brands");
      } else {
        toast.error("New Brand has been added failed ~");
      }
    } catch (error) {
      toast.error("Add New Brand failed:", error);
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

    if (origin.trim() === "") {
      errors.origin_err = "Origin is required";
      isValid = false;
    }

    if (logo.trim() === "") {
      errors.logo_err = "Logo is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (id) updateBrand(id, state);
      else addNewBrand(state);
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
  };
  return (
    <div className="container py-5 newBrand">
      <div className="form">
        <h2>{id ? "Edit Brand" : "Create Brand"}</h2>
        <form onSubmit={handleSubmit}>
          <Col md className="contentBrand">
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
            <Col md className="contentBrand">
              <label htmlFor="origin">Origin: </label>
              <input
                type="text"
                name="origin"
                value={state.origin}
                onChange={handleInputChange}
              />
              {errors.origin_err && (
                <span className="error">{errors.origin_err}</span>
              )}
            </Col>
          </Row>
          <Col md className="contentBrand">
            <label htmlFor="logo">Logo: </label>
            <input
              type="text"
              id="file"
              name="logo"
              value={state.logo}
              onChange={handleInputChange}
            />
            {errors.logo_err && <span className="error">{errors.logo}</span>}
          </Col>
          <Row>
            <Col md className="contentBrand" id="check">
              <div>
                <label htmlFor="status">Status (active or not):</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={state.isPublic}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
          </Row>

          <div className="form-button">
            <Button type="submit">
              {id ? "Update Brand" : "Create Brand"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
