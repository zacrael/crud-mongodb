import { GET_USERS, ADD_USERS, DELETE_USERS, USERS_LOADING } from '../action/types';
const initialState = {
	users: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false
			};
		case DELETE_USERS:
			return {
				...state,
				users: state.users.filter(user => user._id !== action.payload)
			};
		case ADD_USERS:
			return {
				...state,
				users: [action.payload, ...state.users]
			};
		case USERS_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
