import { GET_CATEGORIES, UPDATE_CATEGORY, ADD_CATEGORY, DELETE_CATEGORY } from "../actions/types";
import { returnErrors } from "./errorsAction";

const url = 'https://nextjs-mern-blog.herokuapp.com/api'
//const url = 'http://loaclhost:5000/api'

export const getCategories = () => async dispatch => {
    try{
        const res = await fetch(`${url}/categories`,{
            method: 'GET'
        })
        const data = await res.json()
        dispatch({
            type: GET_CATEGORIES,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }

};

export const addCategory = (data) => async dispatch => {
    try{
        const res = await fetch(`${url}/categories` ,{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        }) 
        const catData = await res.json()
        if(!res.ok){
            throw catData
        }
        dispatch({
            type: ADD_CATEGORY,
            payload: catData
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const deleteCategory = (id) => async dispatch => {
    try{
        const res = await fetch(`${url}/categories/${id}` ,{
            method: 'DELETE',
            headers:{
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        }) 
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({
            type: DELETE_CATEGORY,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};