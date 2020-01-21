import axios from "axios";

import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from "./types";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get("/api/users")
    .then(res => {
      return dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteUsers = id => (dispatch, getState) => {
  axios
    .delete("/api/users", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_USERS,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const addUsers = user => (dispatch, getState) => {
  axios
    .post("/api/users", user, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_USERS,
        payload: res.data
      })
    )
    .then(() => {
      dispatch(getUsers());
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
