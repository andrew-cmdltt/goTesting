import axios from 'axios'

import {
    GET_RESULTS,
    ADD_RESULT, SEARCH_RESULTS
} from "./types";
import {tokenConfig} from "./auth";

// GET TESTS
export const getResults = () => (dispatch, getState) => {
    axios.get('/api/results/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_RESULTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// ADD TEST
export const addResult = (result) => (dispatch, getState) => {
    axios
        .post('/api/results/', result, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_RESULT,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
}

// SEARCH RESULTS
export let searchResults = (params) => (dispatch, getState) => {
    axios.post(`/api/search-results/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_RESULTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}





