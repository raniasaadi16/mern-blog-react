import { IS_LOADED, GET_COMMENTS, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, CLEAR_MSG } from "./types";
import axios from 'axios';
import { returnErrors } from "./errorsAction";

const url = 'https://nextjs-mern-blog.herokuapp.com/api'
//const url = 'http://loaclhost:5000/api'

export const getAllComments = (id) => async dispatch => {
    await axios.get(`${url}/posts/${id}/comments`).then(res=> dispatch({
        type: GET_COMMENTS,
        payload: res.data
    })).catch(err=>{
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    });
   // dispatch({type: IS_LOADED});
};

export const createPost = (id,content) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify(content),
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
            type: CREATE_COMMENT,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
  
   // dispatch({type: IS_LOADED});
};

export const deleteComment = (postId, commentId) => async dispatch => {
    try{
        const res = await fetch(`${url}/posts/${postId}/comments/${commentId}`,{
            method: 'DELETE',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        dispatch({
            type: DELETE_COMMENT,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.response.data.message,err.response.data.status));
    }

};

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}
