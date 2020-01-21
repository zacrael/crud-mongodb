import axios from "axios";
import { returnErrors } from "./errorAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  GET_USERS
} from "../action/types";
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};
// Check token & load user

// register user
export const register = ({ name, email, password, image }) => dispatch => {
  // header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // request body
  const body = JSON.stringify({ name, email, password, image });
  axios
    .post("/api/users", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const addRoom = ({ status, room, description }) => dispatch => {
  // header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // request body
  const body = JSON.stringify({ status, room, description });
  axios
    .post("/api/room", body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const login = ({ email, password }) => async dispatch => {
  // Request body
  const body = JSON.stringify({ email, password });
  dispatch({ type: USER_LOADING });
  axios
    .post("api/users/signin", body, config)
    .then(async res => {
      await setToken(res.data.token);
      dispatch({
        type: USER_LOADED,
        type: LOGIN_SUCCESS,

        payload: res.data
      });

      // window.location.href = "/index";
    })
    .catch(err => {
      // message.error(
      //   err.response.data
      //     ? err.response.data.message
      //     : "An error has occured, please try again."
      // );
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// export const loadUSer = () => (dispatch, getState) => {
//   // User loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get("/api/users", tokenConfig(getState))
//     .then(res =>
//       dispatch({
//         type: GET_USERS,
//         payload: res.data
//       })
//     )
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR
//       });
//     });
// };
// login user
// export const login = ({ email, password }) => dispatch => {
//   // const config = {
//   //   headers: {
//   //     "Content-Type": "application/json"
//   //   }
//   // };

//   // Headers

//   // Request body
//   const body = JSON.stringify({ email, password });

//   axios
//     .post("api/users/signin", body, config)
//     .then(res =>
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data
//       })
//     )
//     .catch(err => {
//       dispatch(
//         returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
//       );
//       dispatch({
//         type: LOGIN_FAIL
//       });
//     });
// };

// // logout user
// export const logout = () => {
//   return {
//     type: LOGOUT_SUCCESS
//   };
// };
// // setup config header and token
// export const tokenConfig = getState => {
//   // get token from localstorage
//   const token = getState().auth.token;
//   // headers
//   const config = {
//     headers: {
//       "Content-type": "application/json"
//     }
//   };
//   // if token,add to header
//   if (token) {
//     config.headers["x-auth-token"] = token;
//   }
//   return config;
// };
// logout user
export const logout = history => {
  window.location.href = "/Home";
  return {
    type: LOGOUT_SUCCESS
  };
};

// setup config header and token
export const tokenConfig = getState => {
  // get token from localstorage
  const token = getToken();
  // if token,add to header
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};

export const setToken = token => {
  // get token from localstorage
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};
