import "./newPc.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
export default function NewPc() {
  const initialState = {
    name: "",
    summary: "",
    detail: "",
    description: "",
    price: "",
    discount: "",
    templateId: "",
    isPublic: false,
    designBy: "",
    image: "",
    isTemplate: false,
  };

  const error_init = {
    name_err: "",
    summary_err: "",
    detail_err: "",
    description_err: "",
    price_err: "",
    discount_err: "",
    templateId_err: "",
    isPublic_err: false,
    designBy_err: "",
    image_err: "",
    isTemplate: false,
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const {
    name,
    summary,
    detail,
    description,
    price,
    discount,
    templateId,
    isPublic,
    designBy,
    image,
  } = state;
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (id) {
      getOnePc(id);
    }
  }, [id]);

  // Function to fetch and set the PC data
  const getOnePc = async (id) => {
    try {
      const res = await axios.get(`https://localhost:7262/api/PC/${id}`, id);

      if (res.status === 200) {
        setState(res.data);
      }
      console.log("API response:", state);
    } catch (error) {
      console.error("Fetch PC data failed:", error);
    }
  };

  const updatePc = async (pcId, data) => {
    try {
      const res = await axios.put(
        `https://localhost:7262/api/PC/${pcId}`,
        data
      );
      console.log("update date: ", res.data);
      if (res.status === 200) {
        toast.success(`Updated Pc successfully ~`);
        navigate("/pc");
      }
    } catch (error) {
      toast.error("Update Pc failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const addNewPc = async (data) => {
    try {
      // console.log('addPc: ', data);
      const res = await axios.post(`https://localhost:7262/api/PC`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New Pc has been added successfully ~");
        navigate("/pc");
      } else {
        toast.error("New Pc has been added failed ~");
      }
    } catch (error) {
      toast.error("Add New Pc failed:", error);
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

    if (summary.trim() === "") {
      errors.sumary_err = "Sumary is required";
      isValid = false;
    }

    if (detail.trim() === "") {
      errors.detail_err = "Detail is required";
      isValid = false;
    }

    if (description.trim() === "") {
      errors.description_err = "Description is required";
      isValid = false;
    }

    if (isNaN(price) || parseInt(price) < 0 || price === "") {
      errors.price_err = "Price must be a positive number and more than 0";
      isValid = false;
    }

    if (isNaN(discount) || parseInt(discount) < 0 || discount === "") {
      errors.discount_err =
        "Discount must be a positive number and more than 0";
      isValid = false;
    }

    if (parseInt(designBy) < 0 || parseInt(designBy) > 4 || designBy === "") {
      errors.designBy_err = "Design by = {1, 2, 3}";
      isValid = false;
    }

    if (
      isNaN(templateId) ||
      parseInt(templateId) > 1 ||
      parseInt(templateId) < 0 ||
      templateId === ""
    ) {
      errors.templateId_err = "Template Id must be 0 or 1 (0: False, 1: True)";
      isValid = false;
    }

    if (image.trim() === "") {
      errors.image_err = "Image is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (id) updatePc(id, state);
      else addNewPc(state);
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
    <div className="container py-5 newPc">
      <div className="form">
        <h2>{id ? "Edit Pc" : "Create Pc"}</h2>
        <form onSubmit={handleSubmit}>
          <Col md className="contentPc">
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
            <Col md className="contentPc" id="abc">
              <label htmlFor="summary">Sumary: </label>
              <input
                type="text"
                name="summary"
                value={state.summary}
                onChange={handleInputChange}
              />
              {errors.summary_err && (
                <span className="error">{errors.summary_err}</span>
              )}
            </Col>
            <Col md className="contentPc" id="abc">
              <label htmlFor="detail">Detail: </label>
              <input
                type="text"
                name="detail"
                value={state.detail}
                onChange={handleInputChange}
              />
              {errors.detail_err && (
                <span className="error">{errors.detail_err}</span>
              )}
            </Col>
            <Col md className="contentPc" id="abc">
              <label htmlFor="description">Description: </label>
              <input
                type="description"
                name="description"
                value={state.description}
                onChange={handleInputChange}
              />
              {errors.description_err && (
                <span className="error">{errors.description_err}</span>
              )}
            </Col>
          </Row>

          <Row>
            <Col md className="contentPc">
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
            <Col md className="contentPc">
              <label htmlFor="discount">Discount: </label>
              <input
                type="number"
                name="discount"
                value={state.discount}
                onChange={handleInputChange}
              />
              {errors.discount_err && (
                <span className="error">{errors.discount_err}</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col md className="contentPc" id="check">
              <div>
                <label htmlFor="isPublic">Is Public?</label>
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={state.isPublic}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
            <Col md className="contentPc" id="check">
              <div>
                <label htmlFor="isTemplate">Is Template?</label>
                <input
                  type="checkbox"
                  name="isTemplate"
                  checked={state.isTemplate}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md className="contentPc">
              <label htmlFor="templateId">Template ID : </label>
              <input
                type="number"
                name="templateId"
                value={state.templateId}
                onChange={handleInputChange}
              />
              {errors.templateId_err && (
                <span className="error">{errors.templateId_err}</span>
              )}
            </Col>
            <Col md className="contentPc">
              <label htmlFor="desigBy">Design by: </label>
              <input
                type="number"
                name="designBy"
                value={state.designBy}
                onChange={handleInputChange}
              />
              {errors.designBy_err && (
                <span className="error">{errors.designBy_err}</span>
              )}
            </Col>
          </Row>
          <Col md className="contentPc">
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              name="image"
              value={state.image}
              onChange={handleInputChange}
            />
            {errors.image_err && (
              <span className="error">{errors.image_err}</span>
            )}
          </Col>
          <div className="form-button">
            <Button type="submit">{id ? "Update Pc" : "Create Pc"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
