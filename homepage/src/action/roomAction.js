import axios from "axios";
import {
  GET_ROOMS,
  ADD_ROOMS,
  UPDATE_ROOMS,
  DELETE_ROOMS,
  ROOMS_LOADING
} from "./types";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";

export const getRoom = () => dispatch => {
  dispatch(setroomsLoading());
  axios
    .get("api/room")
    .then(res => {
      return dispatch({
        type: GET_ROOMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteAppointment = id => (dispatch, getState) => {
  axios
    .delete("appointment/${id}", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ROOMS,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addRoom = form => (dispatch, getState) => {
  axios
    .post("appointment", form, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ROOMS,
        payload: res.data
      })
    )
    .then(() => dispatch(getRoom()))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateAppointment = (id, form) => (dispatch, getState) => {
  dispatch(setroomsLoading());
  axios
    .put("appointment/${id}", form, tokenConfig(getState))
    .then(res => dispatch(getRoom()))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setroomsLoading = () => {
  return {
    type: ROOMS_LOADING
  };
};
