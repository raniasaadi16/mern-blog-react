import { GET_ALLUSERS, GET_USER, DELETE_USER, CLEAR_MSG } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

const url = 'https://nextjs-mern-blog.herokuapp.com/api'
//const url = 'http://loaclhost:5000/api'

export const getAllUsers = () => async dispatch => {
    await axios.get(`${url}/users`).then(res=> dispatch({
        type: GET_ALLUSERS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const getUser = (id) => async dispatch => {
    await axios.get(`${url}/users/${id}`).then(res=> dispatch({
        type: GET_USER,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const deleteUser = (id) => async dispatch => {
    await axios.delete(`${url}/users/${id}`).then(res=> dispatch({
        type: DELETE_USER,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}