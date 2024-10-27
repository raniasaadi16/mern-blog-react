import { IS_LOADED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL, ACTIVATE_ACCOUNT, ACTIVATE_FAIL, RESEND_ACTIVATE, CLEAR_MSG, ADD_PROFILE, FORGET_PASS, RESET_PASS, RESET_PASSGET, UPDATE_PASS, UPDATE_EMAIL, UPDATE_ME, CONFIRM_NEWEMAIL, DELETE_ME } from "./types";
import { returnErrors } from "./errorsAction";

const url = 'https://blog-api.raniadev.tech/api'
//const url = 'http://loaclhost:5000/api'

export const loadUser = () => async dispatch => {
    try {
        const res = await fetch(`${url}/users/isLoggedin`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            },
        })
        const data = await res.json()
        dispatch({
            type: USER_LOADED,
            payload: data
        })
    }catch(err){
        dispatch({type: AUTH_ERROR})
    }
    dispatch({type: IS_LOADED});
}

export const register = ({firstName,lastName,email,password,passwordConfirm})=> async dispatch =>{
    try{
        const res = await fetch(`${url}/users/signup`, {
            method: 'POST',
            body: JSON.stringify({firstName,lastName,email,password,passwordConfirm}),
            credentials:'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        const data = await res.json()
        if(!res.ok){
            console.log(data)
            throw data
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message,err.status,'REGISTER_FAIL'));
        dispatch({type: REGISTER_FAIL})
    }
};

export const login = ({email,password}) => async dispatch => {
    try{
        const data = JSON.stringify({email,password});
        const res = await fetch(`${url}/users/login` ,{
            method: 'POST',
            body: data,
            headers:{
                'Content-Type': 'application/json',
                //"Access-Control-Allow-Origin": url,
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        }) 
        const logData = await res.json()
        if(!res.ok){
            throw logData
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: logData
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
        dispatch({type: LOGIN_FAIL})
    }
};

// export const login = ({email,password}) => dispatch => {
//     const data = JSON.stringify({email,password});
//     const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//     };
//     axios.post(`${url}/users/login`,data,config).then(res=> 
//         dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data})
//     ).catch(err=> {
//         dispatch(returnErrors(err.response.data.message, err.response.data.status));
//         dispatch({type: LOGIN_FAIL})
//     })
// };
export const activateAccount = (activeToken)=> async dispatch=> {
    try {
        const res = await fetch(`${url}/users/activateAccount/${activeToken}`, {
            method: 'GET',
        })
        const data = await res.json()
        dispatch({
            type: ACTIVATE_ACCOUNT,
            payload: data
        })
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
        dispatch({type: ACTIVATE_FAIL})
    }
};

export const addProfile = (data) => async dispatch=>{
    //const data = { picture, about, facebook, instagram, behance};
    try{
        const res = await fetch(`${url}/users/profile`, {
            method: 'PATCH',
            body: data,
            headers:{
                //"Access-Control-Allow-Origin": url,
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        })
        const profData = await res.json()
        if(!res.ok){
            throw profData
        }
        dispatch({type: ADD_PROFILE,payload: profData});
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const resendEmail = (email) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/resendEmailToken`, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if(!res.ok){
            console.log(data)
            throw data
        }
        dispatch({type: RESEND_ACTIVATE,payload: data});

    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
};

export const forgetPassword = (email) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/forgetPassword`, {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: FORGET_PASS,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
};

export const ressetPasswordGet = (token) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/ressetPassword/${token}`, {
            method: 'GET'
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: RESET_PASSGET,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message, err.status, 'GET_RESSET'));
    }
};

export const ressetPassword = (token,{password, passwordConfirm}) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/ressetPassword/${token}`, {
            method: 'PATCH',
            body: JSON.stringify({password, passwordConfirm}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: RESET_PASS,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
};

export const updatePassword = ({currentPass, password, passwordConfirm}) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/updatePassword`, {
            method: 'PATCH',
            body: JSON.stringify({currentPass, password, passwordConfirm}),
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
                //"Access-Control-Allow-Origin": url
            },
            credentials: "include"
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: UPDATE_PASS,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const updateEmail = ({newEmail, password}) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/updateEmail`, {
            method: 'PATCH',
            body: JSON.stringify({newEmail, password}),
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include"
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: UPDATE_EMAIL,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const updateMe = ({firstName, lastName}) => async dispatch => {
    try{
        const res = await fetch(`${url}/users/updateMe`, {
            method: 'PATCH',
            body: JSON.stringify({firstName, lastName}),
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
                //"Access-Control-Allow-Origin": url
            },
            credentials: "include"
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({type: UPDATE_ME,payload: data});
    }catch(err){
        dispatch(returnErrors(err.message, err.status));
    }
};

export const confirmNewEmail = (token)=> async dispatch=> {
    try{
        const res = await fetch(`${url}/users/confirmNewEmail/${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({
            type: CONFIRM_NEWEMAIL,
            payload: data
        })    
    }catch(err){
        dispatch(returnErrors(err.message,err.status));
    }
};

export const logout = () => async dispatch => {
    try{
        const res = await fetch(`${url}/users/logout`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            },
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }catch(err){
        dispatch(returnErrors(err.response.data.message, err.response.data.status))
    }
    dispatch({type: IS_LOADED});
}

export const clearMsg = () => {
    return {
        type: CLEAR_MSG
    }
}
