import { GET_CATEGORIES, UPDATE_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY } from "../actions/types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

const url = 'https://nextjs-mern-blog.herokuapp.com/api'
export const getCategories = () => async dispatch => {
    await axios.get(`${url}/categories`).then(res=> dispatch({
        type: GET_CATEGORIES,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const addCategory = (data) => async dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    };
    await axios.post(`${url}/categories`,JSON.stringify(data),config).then(res=> dispatch({
        type: ADD_CATEGORY,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};

export const deleteCategory = (id) => async dispatch => {
    await axios.delete(`${url}/categories/${id}`).then(res=> dispatch({
        type: DELETE_CATEGORY,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
};