import { GET_ALLUSERS, GET_USER, DELETE_USER, CLEAR_MSG } from "./types";
import { returnErrors } from "./errorsAction";

const url = 'https://nextjs-mern-blog.herokuapp.com/api'
//const url = 'http://loaclhost:5000/api'

export const getAllUsers = () => async dispatch => {
    try {
        const res = await fetch(`${url}/users`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        dispatch({
            type: GET_ALLUSERS,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const getUser = (id) => async dispatch => {
    try {
        const res = await fetch(`${url}/users/${id}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        dispatch({
            type: GET_USER,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const deleteUser = (id) => async dispatch => {
    try {
        const res = await fetch(`${url}/users/${id}`, {
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        dispatch({
            type: DELETE_USER,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}