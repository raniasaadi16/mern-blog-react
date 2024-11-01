import { IS_LOADED, GET_ALLPOSTS, GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST, CLEAR_MSG, GET_SLIDEPOSTS } from "./types";
import { returnErrors } from "./errorsAction";

const url = 'https://blog-api.raniadev.tech/api'
//const url = 'http://loaclhost:5000/api'

export const getAllPosts = (search) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${search}`,{
            method: 'GET'
        })
        const data = await res.json()
        dispatch({
            type: GET_ALLPOSTS,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
    dispatch({type: IS_LOADED});
};

export const getSlidPosts = () => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/?sort=likeCount&limit=10` ,{
            method: 'GET'
        })
        const data = await res.json()
        dispatch({
            type: GET_SLIDEPOSTS,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
    dispatch({type: IS_LOADED});
};


export const getPost = (id) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${id}` ,{
            method: 'GET'
        })
        const data = await res.json()
        dispatch({
            type: GET_POST,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
    dispatch({type: IS_LOADED});
};

export const createPost = (data) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts`,{
            method: 'POST',
            body: data,
            credentials:'include',
            headers: {
                //'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        const post = await res.json()
        if(!res.ok){
            throw post
        }
        dispatch({
            type: CREATE_POST,
            payload: post
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
    dispatch({type: IS_LOADED});
};

export const updatePost = (id, data) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${id}`,{
            method: 'PATCH',
            body: data,
            credentials:'include',
            headers: {
                //'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        const updata = await res.json()
        if(!res.ok){
            throw updata
        }
        dispatch({
            type: UPDATE_POST,
            payload: updata
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
    dispatch({type: IS_LOADED});
};

export const deletePost = (id) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${id}`,{
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        dispatch({
            type: DELETE_POST,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    }
};

export const likePost = (id) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${id}/likePost`,{
            method: 'PATCH',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
};

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}
