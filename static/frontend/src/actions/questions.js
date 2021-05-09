import axios from 'axios'

import {
    ADD_QUESTION,
    EDIT_QUESTION,
    GET_QUESTION,
    GET_QUESTIONS,
    DELETE_QUESTION,
    GET_ALL_QUESTIONS, SEARCH_QUESTIONS
} from "./types";
import {tokenConfig} from "./auth";

// GET QUESTIONS
export const getQuestions = (testId) => (dispatch, getState) => {
    axios.get(`/api/questions/${testId}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET ALL QUESTIONS
export const getAllQuestions = () => (dispatch, getState) => {
    axios.get(`/api/questions/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_QUESTIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// ADD QUESTION
export const addQuestion = (question) => (dispatch, getState) => {
    axios.post(`/api/questions/`, question, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_QUESTION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// EDIT QUESTION
export const editQuestion = (question, id) => (dispatch, getState) => {
    axios
        .put(`/api/question/${id}/`, question, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_QUESTION,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// GET QUESTION
export let getQuestion = (id) => (dispatch, getState) => {
    axios.get(`/api/question/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_QUESTION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE QUESTION
export const deleteQuestion = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/question/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_QUESTION,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// SEARCH QUESTIONS
export let searchQuestions = (params) => (dispatch, getState) => {
    axios.post(`/api/search-questions/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_QUESTIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}




