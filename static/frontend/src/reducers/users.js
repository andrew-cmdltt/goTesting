import {GET_USERS, ADD_USER, EDIT_USER} from '../actions/types.js'
import {DELETE_USER, SEARCH_USERS} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    users: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ADD_USER:
            console.log(action.payload)

            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.nuserkey !== action.payload)
            };
        case EDIT_USER:
            editState(state.users, 'nuserkey', action.payload.nuserkey, action.payload)
            return {
                ...state,
                users: [...state.users]
            }
        default:
            return state;

    }
}
