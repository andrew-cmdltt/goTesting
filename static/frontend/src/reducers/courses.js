import {ADD_COURSE, EDIT_COURSE, GET_COURSES, LISTENING} from '../actions/types.js'
import {DELETE_COURSE, SEARCH_COURSES} from "../actions/types";
import {editState} from "../utils/editState";
import auth from "./auth";

const initialState = {
    courses: [],
    addCourseErrors: {},
    updateCourseErrors: {},
    listeningResult: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses: action.payload,
            }
        case SEARCH_COURSES:
            return {
                ...state,
                courses: action.payload
            }
        case ADD_COURSE:
            if (!action.payload.id) {
                return {
                    ...state,
                    addCourseErrors: action.payload,

                }
            } else {
                return {
                    ...state,
                    courses: [...state.courses, action.payload],
                    addCourseErrors: {},
                    listeningResult: "INSERT"
                }
            }
        case DELETE_COURSE:
            return {
                ...state,
                courses: state.courses.filter((course) => course.id !== action.payload),
                listeningResult: "DELETE"
            };
        case EDIT_COURSE:
            if (!action.payload.id) {
                return {
                    ...state,
                    updateCourseErrors: action.payload,
                }
            } else {
                editState(state.courses, 'id', action.payload.id, action.payload)
                return {
                    ...state,
                    courses: [...state.courses],
                    updateCourseErrors: {},
                    listeningResult: "INSERT"
                }
            }
        case LISTENING:
            if (action.payload) {
                console.log("is listening")
                console.log(action.user.cidentificator)
                let response = JSON.parse(action.payload)
                if (action.user.cidentificator !== response.user) {
                    switch (response.action) {
                        case "UPDATE":
                            console.log("UPDATE")
                            editState(state.courses, 'id', response.data.id, response.data)
                            return {
                                ...state,
                                courses: [...state.courses],
                                listeningResult: response.action
                            }
                        case "INSERT":
                            console.log("INSERT")
                            return {
                                ...state,
                                courses: [...state.courses, response.data],
                                listeningResult: response.action
                            }
                        case "DELETE":
                            console.log("DELETE")
                            return {
                                ...state,
                                courses: state.courses.filter((course) => course.id !== response.data.id),
                                listeningResult: response.action
                            }
                    }
                }
            }
            // listening()
            return state

        default:
            return state;
    }
}


