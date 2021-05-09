import {GET_TESTS, ADD_TEST, EDIT_TEST, DELETE_TEST, SEARCH_TESTS, IMPORT_TEST} from '../actions/types.js'
import {editState} from "../utils/editState";


const initialState = {
    tests: [],
    addTestErrors: {},
    updateTestErrors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TESTS:
            return {
                ...state,
                tests: action.payload
            }
        case SEARCH_TESTS:
            return {
                ...state,
                tests: action.payload
            }
        case ADD_TEST:
            if (!action.payload.test_id) {
                return {
                    ...state,
                    addTestErrors: action.payload,
                }
            } else {
                return {
                    ...state,
                    tests: [...state.tests, action.payload],
                    addTestErrors: {},
                }
            }
        case IMPORT_TEST:
            return {
                ...state,
                tests: [...state.tests, action.payload],
            }
        case EDIT_TEST:
            if (!action.payload.test_id) {
                return {
                    ...state,
                    updateTestErrors: action.payload
                }
            } else {
                editState(state.tests, 'test_id', action.payload.test_id, action.payload)
                return {
                    ...state,
                    tests: [...state.tests],
                    updateTestErrors: {}
                }
            }

        case DELETE_TEST:
            return {
                ...state,
                tests: state.tests.filter((test) => test.test_id !== action.payload)
            };
        default:
            return state;
    }
}