import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import { error_message, success_message } from "../components/inc/Messages"
import {
  ADD_TODO_LIST,
  DELETE_TODO_LIST,
  TODO_LIST_ERRORS,
  UPDATE_TODO_LIST,
  GET_TODO_LIST,
  GET_TODO_LISTS,
  SET_TODOLIST_LOADING,
  CLEAR_TODOLIST_ERRORS,
  CLEAR_TODOLIST_CURRENT,
} from "./types";


//configuration to append to request to be made
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};





/**
 *  persist ITEM to server and dispatch to reducer
 * @param {item} item 
 * @returns 
 */
export const addTodolist = (item) => async (dispatch) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/addtodolist`, item, config)
    .then((res) => {
      M.toast({ html: success_message(res.data.message) });
      dispatch({
        type: ADD_TODO_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      let errors = err.response?.data?.errors
     errors ? M.toast({ html: error_message(errors[Object.keys(errors)[0]]) }) 
     : M.toast({ html: error_message('Something went wrong. Refresh Page and try again')})
      dispatch({
        type: TODO_LIST_ERRORS,
        payload: err.response && err.response.data.errors,
      });
    });
};






/**
 * get todolists of a loggedin user by passing in the user id
 * @param {id} id 
 * @returns 
 */
export const getTodolists = (id) => async (dispatch) => {
  setLoading();
  await axios
    .get(`${process.env.REACT_APP_API_URL}/todolists/${id}`, config)
    .then((res) => {
      dispatch({
        type: GET_TODO_LISTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      let errors = err.response?.data?.errors
     errors ? M.toast({ html: error_message(errors[Object.keys(errors)[0]]) }) 
     : M.toast({ html: error_message('Unknown Error. Please Check Internet Connectivity')})
      dispatch({
        type: TODO_LIST_ERRORS,
        payload: "Something went wrong",
      });
    });
};






/**
 * Delete a todolist by passing in the todolist id
 * @param {id} id 
 * @returns 
 */
export const deleteTodolist = (id) => async (dispatch) => {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/todolist/${id}`, config)
    .then((res) => {
      M.toast({ html: success_message(res.data.message) });
      dispatch({
        type: DELETE_TODO_LIST,
      });
    })
    .catch((err) => {
      let errors = err.response?.data?.errors
     errors ? M.toast({ html: error_message(errors[Object.keys(errors)[0]]) }) 
     : M.toast({ html: error_message('Something went wrong. Refresh page and try again')})
      dispatch({
        type: TODO_LIST_ERRORS,
        payload:err.response && err.response.data.errors,
      });
    });
};





/**
 *  update a todolist by passing in the todolist id and the item
 * The id is the todolist id, and item carries the information 
 * of the todolist
 * @param {id} id 
 * @param {item} item 
 * @returns 
 */
export const updateTodolist = (id, item) => async (dispatch) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/updatetodolist/${id}`, item, config)
    .then((res) => {
      M.toast({ html: success_message(res.data.message) });
      dispatch({
        type: UPDATE_TODO_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      let errors = err.response?.data?.errors
     errors ? M.toast({ html: error_message(errors[Object.keys(errors)[0]]) }) 
     : M.toast({ html: error_message('Something went wrong. Refresh page and try again')})
      dispatch({
        type: TODO_LIST_ERRORS,
        payload: err.response && err.response.data.errors,
      });
    });
};






/**
 * get the current todolist object by passing in todolist id tapped from the url
 * @param {id} id 
 * @returns 
 */
export const getTodolist = (id) => async (dispatch) => {
  await axios
    .get(`${process.env.REACT_APP_API_URL}/todolist/${id}`, config)
    .then((res) => {
      dispatch({
        type: GET_TODO_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: TODO_LIST_ERRORS,
        payload: "Something went wrong",
      });
    });
};




/**
 * set the current of state to the data that came in
 * @param {current} data 
 * @returns 
 */
export const setCurrentTodolist = (data) => {
  return { type: GET_TODO_LIST, payload: data };
};





//clear all todos in state by setting todos to null
export const clearTodolistErrors = () => {
  return { type: CLEAR_TODOLIST_ERRORS };
};




//clear current
export const clearCurrent = () => {
  return { type: CLEAR_TODOLIST_CURRENT };
};




//set loading
export const setLoading = () => (dispatch) => {
  dispatch ({ type: SET_TODOLIST_LOADING });
};
