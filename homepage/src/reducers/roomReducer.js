import {
  GET_ROOMS,
  ADD_ROOMS,
  DELETE_ROOMS,
  ROOMS_LOADING
} from "../action/types";

const initialState = {
  rooms: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        loading: false
      };
    case DELETE_ROOMS:
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload)
      };
    case ADD_ROOMS:
      return {
        ...state,
        rooms: [action.payload, ...state.rooms]
      };
    case ROOMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
