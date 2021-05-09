import {GET_ANSWERS, ADD_ANSWER, GET_ALL_ANSWERS, SEARCH_ANSWERS} from "../actions/types";

const initialState = {
    answers: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ANSWERS:
        case SEARCH_ANSWERS:
        case GET_ANSWERS:
            return {
                ...state,
                answers: action.payload
            }
        case ADD_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload],
            }
        default:
            return state;
    }
}