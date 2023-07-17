import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutStart,
  logoutSuccess,
  logoutFailed,
  // getUsersStart, getUsersSuccess, getUsersFailed,
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
  getAllCatergoryStart,
  getAllCatergorySuccess,
  getAllCatergoryFailed,
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
  dispatch(loginStart());
  axios
    .post(`https://localhost:7262/api/Authenticate/login`, user)
    .then(function (response) {
      const user = jwt(response.data.token.token);
      const refreshToken = response.data.token.refreshToken;
      const expriresIn = response.data.token.expriresIn;

      localStorage.setItem("currentUser: ", user);
      localStorage.setItem("refreshToken: ", refreshToken);
      localStorage.setItem("expriresIn: ", expriresIn);

      dispatch(loginSuccess(user));

      toast.success(response.data.message);
      if (user.role === "Admin") {
        getAllPc(dispatch);
        getAllComponents(dispatch);
        getAllCatergory(dispatch);
        getAllUsers(dispatch);
        getAllBrand(dispatch);
        getAllOrder(dispatch);
        navigate("/");
      } else if (user.role === "Customer") {
        dispatch(getDataSuccess(user));
        getAllListPc(dispatch);
        navigate("/");
      }
      // else toast.error(error.response.data.message)
    })
    .catch(function (error) {
      toast.error(error.response.data.message);
      dispatch(loginFailed());
    });
};
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
  axios
    .get(`https://localhost:7262/api/PC/GetListByCustomer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
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

export const getAllCatergory = async (dispatch) => {
  dispatch(getAllCatergoryStart());
  axios
    .get(`https://localhost:7262/api/Category`)
    .then(function (response) {
      dispatch(getAllCatergorySuccess(response.data));
      console.log(response.data);
    })
    .catch(function (error) {
      dispatch(getAllCatergoryFailed());
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

export const getAllBrand = async (dispatch) => {
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

export const getAllOrder = async (dispatch) => {
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
