import { GET_USER } from '../actions/types.js'

const initialState = {
    user: [], 
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;

    }
}