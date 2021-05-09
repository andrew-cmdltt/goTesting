import axios from 'axios'

import {
    GET_ORGANIZATIONS,
    GET_ORGANIZATION,
    ADD_ORGANIZATION,
    DELETE_ORGANIZATION, EDIT_ORGANIZATION, SEARCH_ORGANIZATIONS
} from "./types";
import {tokenConfig} from "./auth";

// GET ORGANIZATIONS
export const getOrganizations = () => (dispatch, getState)  => {
    axios.get('/api/organizations/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ORGANIZATIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// GET ORGANIZATION
export let getOrganization = (id) => (dispatch, getState) => {
    axios.get(`/api/organization/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_ORGANIZATION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// ADD ORGANIZATION
export const addOrganization = (organization) => (dispatch, getState) => {
    axios
        .post('/api/organizations/', organization, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_ORGANIZATION,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// DELETE ORGANIZATION
export const deleteOrganization = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/organization/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_ORGANIZATION,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// EDIT ORGANIZATION
export const editOrganization = (organization, id) => (dispatch, getState) => {
    axios
        .put(`/api/organization/${id}/`, organization, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: EDIT_ORGANIZATION,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};

// SEARCH ORGANIZATIONS
export let searchOrganizations = (params) => (dispatch, getState) => {
    axios.post(`/api/search-organizations/`, params, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SEARCH_ORGANIZATIONS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}


