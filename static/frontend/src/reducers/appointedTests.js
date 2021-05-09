import {ADD_APPOINTED_TEST, DELETE_APPOINTED_TEST, GET_APPOINTED_TESTS} from '../actions/types.js'

const initialState = {
    appointedTests: [],
}
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPOINTED_TESTS:
            return {
                ...state,
                appointedTests: action.payload
            }
        case ADD_APPOINTED_TEST:
            return {
                ...state,
                appointedTests: [...state.appointedTests, action.payload],
            }
        case DELETE_APPOINTED_TEST:
            return {
                ...state,
                appointedTests: state.appointedTests.filter((test) => test.nkey !== action.payload)
            };
        default:
            return state;

    }
}
