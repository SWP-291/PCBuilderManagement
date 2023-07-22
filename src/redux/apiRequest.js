import axios from "axios";
import {
  loginSuccess,
  logoutSuccess,
} from "./authSlice";
import {
  updateStart,
  updateSuccess,
  updateFailed,
  getDataSuccess,
  getAllListPcStart,
  getAllListPcSuccess,
  getAllListPcFailed,
} from "./userSlice";
import {
  getAllPcStart,
  getAllPcSuccess,
  getAllPcFailed,
  getAllComponentsStart,
  getAllComponentsSuccess,
  getAllComponentsFailed,
  getAllCategoryStart,
  getAllCategorySuccess,
  getAllCategoryFailed,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailed,
  getAllBrandStart,
  getAllBrandSuccess,
  getAllBrandFailed,
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailed,
} from "./adminSlice";
import jwt from "jwt-decode"; // import dependency
import { toast } from "react-toastify";

export const loginUser = async (user, dispatch, navigate) => {
  axios.post(`https://localhost:7262/api/Authenticate/login`, user)
    .then(function (response) {
      // dispatch(loginSuccess(response.data.token.token));
      // localStorage.setItem('token',response.data.token.token);
      // localStorage.setItem("refreshToken", response.data.token.refreshToken);
      // localStorage.setItem("expiresIn", response.data.token.expiresIn);
      // toast.success(response.data.message);
      
      const token = response.data.token.token;
      const userDTO = response.data.token.userDTO;
      
      // const currentUser = response.data.token.userDTO;
      const decodedUser = jwt(token); // Decode the token
      // console.log(decodedUser);
      const refreshToken = response.data.token.refreshToken;
      const expiresIn = response.data.token.expiresIn;
      localStorage.setItem("userDTO", JSON.stringify(userDTO));
      localStorage.setItem("currentUser", JSON.stringify(decodedUser));
      localStorage.setItem("tokenUser", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiresIn", expiresIn);

      dispatch(loginSuccess(decodedUser));
      // const token = response.data.token;

      // const decodedUser = jwt(token); // Decode the token
      // console.log(decodedUser);
      // const refreshToken = response.data.token.refreshToken;
      // const expiresIn = response.data.token.expiresIn;

      // localStorage.setItem("currentUser", JSON.stringify(decodedUser));
      // localStorage.setItem("tokenUser", token);
      // // localStorage.setItem("refreshToken", refreshToken);
      // // localStorage.setItem("expiresIn", expiresIn);

      // dispatch(loginSuccess(decodedUser));
      toast.success(response.data.message);
      
      if (decodedUser.role === "Admin") {
        getAllPc(dispatch);
        getAllComponents(dispatch);
        getAllCategories(dispatch);
        getAllUsers(dispatch);
        getAllBrands(dispatch);
        getAllOrders(dispatch);
        navigate("/note");
      } else if (decodedUser.role === "Customer") {
        getAllListPc(dispatch);
        dispatch(getDataSuccess(decodedUser));
        navigate("/");
      } else {
        toast.error("Unauthorized access");
      }
    })
    .catch(function (error) {
      toast.error(error.response.data.message);
    });
};
export const logoutUser = async (dispatch, navigate) => {
  try {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tokenUser");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expriresIn");

    dispatch(logoutSuccess());

    toast.success("Logged out successfully.");
  } catch (error) {
    toast.error("Logout failed. Please try again.");
  }
};

// Update the loginUser function to handle logout

// export const getUsers = async (dispatch) => {
//     dispatch(getUsersStart());
//     axios.get(`https://localhost:7262/api/User`)
//     .then(function (response){
//         dispatch(getUsersSuccess(response.data));
//         console.log(response.data)
//     })
//     .catch (function (error) {
//         dispatch(getUsersFailed());
//     })
// }

// export const logoutUser = async (dispatch, navigate) => {
//     dispatch(logoutStart());
//     axios.get(``)
//     .then(function (response){
//         dispatch(logoutSuccess(response.data));
//     })
//     .catch (function (error) {
//         dispatch(logoutFailed());
//     })
// }

export const getAllListPc = async (dispatch) => {
  dispatch(getAllListPcStart());
  const token = localStorage.getItem("tokenUser");
  axios
    .get(`https://localhost:7262/api/PC/GetListByCustomer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(function (response) {
      dispatch(getAllListPcSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllListPcFailed());
    });
};

export const getAllPc = async (dispatch) => {
  dispatch(getAllPcStart());
  axios
    .get(`https://localhost:7262/api/PC/GetListByAdmin`)
    .then(function (response) {
      dispatch(getAllPcSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllPcFailed());
    });
};

export const getAllComponents = async (dispatch) => {
  dispatch(getAllComponentsStart());
  axios
    .get(`https://localhost:7262/api/Component`)
    .then(function (response) {
      dispatch(getAllComponentsSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllComponentsFailed());
    });
};

export const getAllCategories = async (dispatch) => {
  dispatch(getAllCategoryStart());
  axios
    .get(`https://localhost:7262/api/Category`)
    .then(function (response) {
      dispatch(getAllCategorySuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllCategoryFailed());
    });
};

export const getAllUsers = async (dispatch) => {
  dispatch(getAllUsersStart());
  axios
    .get(`https://localhost:7262/api/User`)
    .then(function (response) {
      dispatch(getAllUsersSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllUsersFailed());
    });
};

export const getAllBrands = async (dispatch) => {
  dispatch(getAllBrandStart());
  axios
    .get(`https://localhost:7262/api/Brand`)
    .then(function (response) {
      dispatch(getAllBrandSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllBrandFailed());
    });
};

export const getAllOrders = async (dispatch) => {
  dispatch(getAllOrderStart());
  axios
    .get(`https://localhost:7262/api/Order`)
    .then(function (response) {
      dispatch(getAllOrderSuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllOrderFailed());
    });
};

export const updateProfileUsers = async (id, dispatch, updateInfo) => {
  dispatch(updateStart());
  dispatch(loginSuccess(updateInfo));
  axios
    .put(`https://localhost:7262/api/User/${id}`, updateInfo)
    .then(function (response) {
      dispatch(updateSuccess(response.data));
      toast.success(response.data.message);
    })
    .catch(function (error) {
      dispatch(updateFailed());
      toast.error(error.response.data.message);
    });
};