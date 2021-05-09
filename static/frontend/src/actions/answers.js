import axios from 'axios'

import {GET_ANSWERS, ADD_ANSWER, GET_ALL_ANSWERS, SEARCH_ANSWERS} from "./types";
import {tokenConfig} from "./auth";

// GET ANSWERS
export const getAnswers = (testId) => (dispatch, getState) => {
    axios.get(`/api/answers/${testId}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ANSWERS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET ALL ANSWERS
export const getAllAnswers = () => (dispatch, getState) => {
    axios.get(`/api/answers/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ALL_ANSWERS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// ADD ANSWER
export const addAnswer = (answer) => (dispatch, getState) => {
    axios.post(`/api/answers/`, answer, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_ANSWER,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// SEARCH ANSWERS
export let searchAnswers = (params) => (dispatch, getState) => {
    axios.post(`/api/search-answers/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_ANSWERS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}





