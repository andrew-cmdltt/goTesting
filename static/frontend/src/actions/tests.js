import axios from 'axios'

import {
    ADD_TEST, DELETE_TEST, EDIT_TEST, GET_TEST,
    GET_TESTS, SEARCH_TESTS, IMPORT_TEST
} from "./types";
import {tokenConfig} from "./auth";
const FileDownload = require('js-file-download');

// GET TESTS
export const getTests = () => (dispatch, getState) => {
    axios.get('/api/tests/', tokenConfig(getState))
        .then(res => {
            console.log(res.data)
            dispatch({
                type: GET_TESTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// ADD TEST
export const addTest = (test) => (dispatch, getState) => {
    axios
        .post('/api/tests/', test, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_TEST,
                payload: res.data,
            });
            console.log(res.data)
        })
        .catch(err => console.log(err));
}

// GET TEST
export let getTest = (id) => (dispatch, getState) => {
    axios.get(`/api/test/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TEST,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// EDIT TEST
export const editTest = (test, id) => (dispatch, getState) => {
    axios
        .put(`/api/test/${id}/`, test, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_TEST,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// DELETE TEST
export const deleteTest = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/test/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_TEST,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// SEARCH TESTS
export let searchTests = (params) => (dispatch, getState) => {
    axios.post(`/api/search-tests/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_TESTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// EXPORT TEST
export let exportTest = (id) => (dispatch, getState) => {
    axios.get(`/api/export/${id}/`, tokenConfig(getState))
        .then(res => {
            console.log(res.data)
            FileDownload(JSON.stringify(res.data), `${id}.json`);
        }).catch(err => console.log(err))
}

// IMPORT TEST
export let importTest = (form_data) => (dispatch, getState) => {
    axios.post(`/api/import/`, form_data, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${getState().auth.token}`
        }
    })
        .then(res => {
            dispatch({
                type: IMPORT_TEST,
                payload: res.data
            })
            console.log(res.data)
        })
        .catch(err => console.log(err))
}



