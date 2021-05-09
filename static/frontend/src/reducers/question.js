import { GET_QUESTION } from '../actions/types.js'

const initialState = {
    question: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_QUESTION:
            return {
                ...state,
                question: action.payload
            }
        default:
            return state;

    }
}