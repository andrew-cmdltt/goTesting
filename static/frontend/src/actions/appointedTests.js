import axios from 'axios'
import {ADD_APPOINTED_TEST, DELETE_APPOINTED_TEST, GET_APPOINTED_TESTS} from "./types";
import {tokenConfig} from "./auth";

// GET APPOINTED TESTS
export const getAppointedTests = () => (dispatch, getState) => {
    axios.get(`/api/appointed-tests/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_APPOINTED_TESTS,
                payload: res.data
            })
            console.log(res.data)
        }).catch(err => console.log(err))
}

// DELETE APPOINTED TEST
export const deleteAppointedTest = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/appointed-test/${id}/`, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: DELETE_APPOINTED_TEST,
                payload: id,
            });
        })
        .catch((err) => console.log(err));
};

// ADD APPOINTED TEST
export const addAppointedTest = (test) => (dispatch, getState) => {
    axios
        .post('/api/appointed-tests/', test, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: ADD_APPOINTED_TEST,
                payload: res.data,
            });
        })
        .catch(err => console.log(err));
};




