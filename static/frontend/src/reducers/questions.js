import {
    GET_QUESTIONS,
    ADD_QUESTION,
    EDIT_QUESTION,
    DELETE_QUESTION,
    GET_ALL_QUESTIONS,
    SEARCH_QUESTIONS
} from "../actions/types";
import {editState} from "../utils/editState";

const initialState = {
    questions: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_QUESTIONS:
        case SEARCH_QUESTIONS:
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            }
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload],
            }
        case EDIT_QUESTION:
            editState(state.questions, 'nkey', action.payload.nkey, action.payload)
            return {
                ...state,
                questions: [...state.questions]
            }
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter((question) => question.nkey !== action.payload)
            };
        default:
            return state;
    }
}