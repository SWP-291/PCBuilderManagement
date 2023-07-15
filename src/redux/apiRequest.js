
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "./authSlice";
import { updateStart, updateSuccess, updateFailed, getDataSuccess} 
from "./userSlice";
import jwt from 'jwt-decode' // import dependency
import { toast } from 'react-toastify';


export const loginUser = async (user, dispatch, navigate) =>{
    dispatch(loginStart());
    axios.post(`https://localhost:7262/api/Authenticate/login`, user)
    .then(function (response) {
        
        const user = jwt(response.data.token.token); 
        const refreshToken = response.data.token.refreshToken;
        const expriresIn = response.data.token.expriresIn;

        localStorage.setItem("currentUser: ",user);
        localStorage.setItem("refreshToken: ",refreshToken);
        localStorage.setItem("expriresIn: ",expriresIn);
        
        dispatch(loginSuccess(user));
        dispatch(getDataSuccess(user))
        toast.success(response.data.message);
        if (user.role === 'Admin') navigate("/admin");
        else if (user.role === 'user') navigate("/");
        console.log(user.role);
      })
      .catch(function (error) {
        toast.error(error.response.data.message)
        dispatch(loginFailed());
      });
}
// export const getUsers = async (id, dispatch) => {
//     dispatch(getUsersStart());
//     axios.get(`https://localhost:7262/api/User/${id}`,id)
//     .then(function (response){
//         dispatch(getUsersSuccess(response.data));
//         console.log(response.data)
//     }) 
//     .catch (function (error) {
//         dispatch(getUsersFailed());
//     })
// }

export const updateProfileUsers = async (id, dispatch, updateInfo) => {
    dispatch(updateStart());
    dispatch(loginSuccess(updateInfo));
    axios.put(`https://localhost:7262/api/User/${id}`,updateInfo)
    .then(function (response){
        dispatch(updateSuccess(response.data));
        toast.success(response.data.message);
    }) 
    .catch (function (error) {
        dispatch( updateFailed());
        toast.error(error.response.data.message);
    })
}
