import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import { errorBeep2 } from "../components/inc/Beeps";
import {isEmptyObject} from "../components/inc/checkIsEmpty"
import { success_message } from "../components/inc/Messages"

import {REGISTER_USER, LOGIN_USER,UPDATE_USER, USER_ERROR, CLEAR_USER_ERRORS, LOGOUT_USER} from "./types"

//configuration
const config ={
    headers:{
        'Content-type' :'application/json'
    }
}





//actions
//CREATE AN ACCOUNT
export const register = (data) => async (dispatch) =>{
    await axios.post(`${process.env.REACT_APP_API_URL}/register/user`, data, config)
    .then(res =>{
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
        M.toast({ html: success_message(res.data.message) });
        //update local storage with res.data
        localStorage.setItem("todo_user", JSON.stringify(res.data.data))
    }).catch(err =>{
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.errors
        })
    })
}





//login user
export const login = (data) =>async (dispatch) =>{
    await axios.post(`${process.env.REACT_APP_API_URL}/login/user`, data, config)
    .then(res =>{
        if(isEmptyObject(res?.data?.data)){
            errorBeep2()
            dispatch({
                type: USER_ERROR,
                payload: "Something went wrong"
            })
        }else{
           dispatch({
                type: LOGIN_USER,
                payload: res.data
            }) 
        }
        //update local storage with res.data
        localStorage.setItem("todo_user", JSON.stringify(res.data.data))
    }).catch(err =>{
        errorBeep2()
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.errors
        })
    })
}




//reset user password
export const resetPassword = (data) => async (dispatch) =>{
    await axios.post(`${process.env.REACT_APP_API_URL}/resetpassword/user`, data, config)
    .then(res =>{
        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
        M.toast({ html: success_message(res.data.message) });
        //update local storage with res.data
        localStorage.setItem("todo_user", JSON.stringify(res.data.data))
    }).catch(err =>{
        errorBeep2()
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.errors
        })
    })
}





//log user out
export const logout = () =>{
    localStorage.removeItem('todo_user')
    M.toast({ html: success_message("Logout successful") });
    return{
        type: LOGOUT_USER
    }
}





//clear errors
export const clearErrors = () =>{
    return{
        type: CLEAR_USER_ERRORS
    }
}


