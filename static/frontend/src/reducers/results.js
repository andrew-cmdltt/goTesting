import {ADD_RESULT, GET_RESULTS, SEARCH_RESULTS} from '../actions/types.js'

const initialState = {
    results: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_RESULTS:
        case GET_RESULTS:
            return {
                ...state,
                results: action.payload
            }
        case ADD_RESULT:
            return {
                ...state,
                results: [...state.results, action.payload],
            }
        default:
            return state;

    }
}