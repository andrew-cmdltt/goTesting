import axios from 'axios'

import {ADD_COURSE, DELETE_COURSE, EDIT_COURSE, GET_COURSE, GET_COURSES, LISTENING, SEARCH_COURSES} from "./types";
import {tokenConfig} from "./auth";

// GET COURSES
export const getCourses = () => (dispatch, getState) => {
    axios.get('/api/courses/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COURSES,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET COURSE
export let getCourse = (id) => (dispatch, getState) => {
    axios.get(`/api/course/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_COURSE,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE USER
export const deleteCourse = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/course/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_COURSE,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD USER
export const addCourse = (course) => (dispatch, getState) => {
  axios
    .post('/api/courses/', course, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_COURSE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
// EDIT USER
export const editCourse = (course, id) => (dispatch, getState) => {
  axios
    .put(`/api/course/${id}/`, course, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: EDIT_COURSE,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

// SEARCH COURSES
export let searchCourses = (params) => (dispatch, getState) => {
    axios.post(`/api/search-courses/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_COURSES,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export let listening = () => (dispatch, getState) => {
    // console.log("function was called")
    axios.get(`/api/listening/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LISTENING,
                payload: res.data,
                user: getState().auth.user
            })
        }).catch(err => console.log(err))
}