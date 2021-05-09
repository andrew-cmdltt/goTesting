import axios from 'axios'

import {GET_USERS, ADD_USER, GET_USER, EDIT_USER, DELETE_USER, SEARCH_USERS} from "./types";
import {tokenConfig} from "./auth";

// GET USERS
export const getUsers = () => (dispatch, getState) => {
    axios.get('/api/users/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET USER
export let getUser = (id) => (dispatch, getState) => {
    axios.get(`/api/user/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// DELETE USER
export const deleteUser = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/user/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_USER,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD USER
export const addUser = (user) => (dispatch, getState) => {
    axios
        .post('/api/users/', user, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_USER,
                payload: res.data,
            });
            console.log(res.data)

        })
        .catch(err => console.log(err));
};

// EDIT USER
export const editUser = (user, id) => (dispatch, getState) => {
    axios
        .put(`/api/user/${id}/`, user, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_USER,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// SEARCH USERS
export let searchUsers = (params) => (dispatch, getState) => {
    axios.post(`/api/search-users/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_USERS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}