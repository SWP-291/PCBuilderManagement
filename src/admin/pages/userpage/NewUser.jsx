import { useState, useEffect } from 'react';
import "./newUser.scss";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Col,Row } from "react-bootstrap";
const NewUser = () => {
  const URL = "https://localhost:7262/api/User";
  const initialState = {
    fullname: "",
    email: "",
    phone: "",
    country: "",
    gender: "",
    password: "",
    address: "",
    avatar: "",
    isActive: false,
    roleId: "",
  };

  const error_init = {
    fullname_err: "",
    email_err: "",
    password_err: "",
    roleId_err: "",
  };
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const {
    fullname,
    email,
    phone,
    country,
    gender,
    password,
    address,
    avatar,
    isActive,
    roleId,
  } = state;
  const [errors, setErrors] = useState(error_init);

  useEffect(() => {
    if (id) {
      getOneUser(id);
    }
  }, [id]);

  // Function to fetch and set the User data
  const getOneUser = async (id) => {
    try {
      const res = await axios.get(`${URL}/${id}`, id);

      if (res.status === 200) {
        setState(res.data.data);
      }
      console.log("API response:", state);
    } catch (error) {
      console.error("Fetch User data failed:", error);
    }
  };
  const updateUser = async (userId, data) => {
    try {
      const res = await axios.put(`${URL}/${userId}`, data);
      console.log("update date: ", res.data);
      if (res.status === 200) {
        toast.success(`Updated User successfully ~`);
        navigate("/users");
      }
    } catch (error) {
      toast.error("Update user failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  const addNewUser = async (data) => {
    try {
      console.log("addPc: ", data);
      const res = await axios.post(`https://localhost:7262/api/User`, data);
      if (res.status === 200 || res.status === 201) {
        toast.success("New User has been added successfully ~");
        navigate("/users");
      } else {
        toast.error("New USer has been added failed ~");
      }
    } catch (error) {
      toast.error("Add new User failed:", error);
      // Handle the error, show error messages, or take other appropriate actions
    }
  };

  // validate
  const validateForm = () => {
    let isValid = true;
    let errors = { ...error_init };

    if (fullname.trim() === "" || fullname.length < 2) {
      errors.fullname_err = "Name is Required";
      if (fullname.length < 2) {
        errors.fullname_err = "Name must be more than 2 words";
      }
      isValid = false;
    }

    if (email.trim() === "") {
      errors.email_err = "Email is required";
      isValid = false;
    } else if (
      !email
        .toLowerCase()
        .match(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
    ) {
      errors.email_err = "It is not email. Email like name@email.com";
    }
    if (roleId.trim() === "" || parseInt(roleId) < 1 || parseInt(roleId) > 3) {
      errors.roleId_err = "RoleId = {1, 2, 3}";
      isValid = false;
    }

    if (password.trim() === "") {
      errors.password_err = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (id) updateUser(id, state);
      else addNewUser(state);
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
    <div className="container py-5 newUser">
      <div className="form">
        <h2>{id ? "Edit User" : "Create User"}</h2>
        <form onSubmit={handleSubmit}>
          <Col md className="contentUser">
            <label htmlFor="fullname">Full Name: </label>
            <input
              type="text"
              name="fullname"
              value={state.fullname}
              onChange={handleInputChange}
            />
            {errors.fullname_err && (
              <span className="error">{errors.fullname_err}</span>
            )}
          </Col>
          <Row>
            <Col md className="contentUser">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                value={state.email}
                onChange={handleInputChange}
              />
              {errors.email_err && (
                <span className="error">{errors.email_err}</span>
              )}
            </Col>
          </Row>

          <Row>
            <Col md className="contentUser">
              <label htmlFor="phone">Phone: </label>
              <input
                type="text"
                name="phone"
                value={state.phone}
                onChange={handleInputChange}
              />
              {/* {errors.phone && <span className='error'>{errors.price_err}</span>} */}
            </Col>
            <Col md className="contentUser">
              <label htmlFor="country">Country: </label>
              <input
                type="text"
                name="country"
                value={state.country}
                onChange={handleInputChange}
              />
              {/* {errors.discount_err && <span className='error'>{errors.discount_err}</span>} */}
            </Col>
          </Row>
          <Row>
            <Col md className="contentUser">
              <label htmlFor="gender">Gender: </label>
              <div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="Male"
                    checked={state.gender === "Male"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="male">Male</label>

                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="Female"
                    checked={state.gender === "Female"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md className="contentUser">
              <label htmlFor="password">Password: </label>
              <input
                type="text"
                name="password"
                value={state.password}
                onChange={handleInputChange}
              />
              {errors.password_err && (
                <span className="error">{errors.password_err}</span>
              )}
            </Col>
          </Row>
          <Row>
            <Col md className="contentUser">
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                name="address"
                value={state.address}
                onChange={handleInputChange}
              />
              {/* {errors.email_err && <span className='error'>{errors.email_err}</span>} */}
            </Col>
          </Row>
          <Row>
            <Col md className="contentUser">
              <label htmlFor="avatar">Avatar: </label>
              <input
                type="text"
                name="avatar"
                value={state.avatar}
                onChange={handleInputChange}
              />
              {/* {errors.a && <span className='error'>{errors.image_err}</span>} */}
            </Col>
          </Row>
          <Row>
            <Col md className="contentUser" id="check">
              <div>
                <label htmlFor="isActive">Is Active?</label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={state.isActive}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
          </Row>

          <Col md className="contentUser">
            <label htmlFor="roleId">
              Role ID (1: Customer, 2: Admin, 3: Employee):{" "}
            </label>
            <input
              type="number"
              name="roleId"
              value={state.roleId}
              onChange={handleInputChange}
            />
            {errors.roleId_err && (
              <span className="error">{errors.roleId_err}</span>
            )}
          </Col>
          <div className="form-button">
            <Button type="submit">{id ? "Update User" : "Create User"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewUser;
