import axios from "axios";
import M from "materialize-css/dist/js/materialize.min.js";
import { error_message, success_message, error_message_with_button,success_message_with_button} from "../components/inc/Messages"

//import todo types
import {
  ADD_TODO,
  DELETE_TODO,
  TODO_ERRORS,
  UPDATE_TODO,
  GET_TODOS,
  GET_TODO,
  SET_TODO_LOADING,
  CLEAR_TODO_ERRORS,
  CLEAR_TODO_CURRENT,
  CLEAR_TODOS,
} from "./types";

//configuration to append to request to be made
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};



/**
 * persist ITEM to server and dispatch to reducer
 * @param {id} id 
 * @param {item} item 
 * @returns 
 */
export const addTodo = (id, item) => async (dispatch) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/additem/${id}`, item, config)
    .then((res) => {
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
      M.toast({ html: success_message_with_button("add", res.data.message) });
    })
    .catch((err) => {
      dispatch({
        type: TODO_ERRORS,
        payload: err.response?.data?.errors,
      });
      let errors = err.response?.data?.errors;
      errors ? M.toast({ html: error_message_with_button("add", errors[Object.keys(errors)[0]])})
            :  M.toast({html: error_message('Something went Wrong, refresh and try again')})
    });
};




/**
 * get todos of a todolist by passing in the todolist id
 * @param {id} id 
 * @returns 
 */
export const getTodos = (id) => async (dispatch) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`);
    const data = await res.json();
    dispatch({
      type: GET_TODOS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_ERRORS,
      payload: "Something went wrong",
    });
  }
};




/**
 * Delete a todo item by passing in the todo item id
 * @param {id} id 
 * @returns 
 */
export const deleteTodo = (id) => async (dispatch) => {
  await axios
    .delete(`${process.env.REACT_APP_API_URL}/todo/${id}`, config)
    .then((res) => {
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({
        type: TODO_ERRORS,
        payload: err.response?.data?.errors,
      });
    });
};




/**
 * update a todo item by passing in the todo id and the item
 * The id is the todo item id, and item carries the information 
 * of the todo
 * @param {id} id 
 * @param {item} item 
 * @returns 
 */
export const updateTodo = (id, item) => async (dispatch) => {
  await axios
    .post(`${process.env.REACT_APP_API_URL}/updatetodo/${id}`, item, config)
    .then((res) => {
      dispatch({
        type: UPDATE_TODO,
        payload: res.data,
      });
      M.toast({ html: success_message_with_button("add", res.data.message) });
    })
    .catch((err) => {
      dispatch({
        type: TODO_ERRORS,
        payload: err.response?.data?.errors,
      });
      let errors = err.response?.data?.errors;
      M.toast({
        html: error_message_with_button("edit", errors[Object.keys(errors)[0]]),
      });
    });
};





/**
 * Update status of a todo.
 * @param {id} id 
 * @param {status} status 
 * @returns 
 */
export const updateStatus = (id, status) => async (dispatch) => {
  //destructure main status of todo
  let stat = { status: status };
  await axios
    .post(`${process.env.REACT_APP_API_URL}/updatestatus/${id}`, stat, config)
    .then((res) => {
      M.toast({ html: success_message(res.data.message) });
      dispatch({
        type: CLEAR_TODO_ERRORS,
      });
    })
    .catch((err) => {
      let errors = err.response?.data?.errors;
      M.toast({ html: error_message(errors[Object.keys(errors)[0]]) });
    });
};




/**
 * set the current of state to the data that came in
 * @param {current} data 
 * @returns 
 */
export const setCurrent = (data) => {
  return { type: GET_TODO, payload: data};
};




/**
 * clear/set any error in state errors to null
 * @returns 
 */
export const clearErrors = () => {
  return { type: CLEAR_TODO_ERRORS };
};




/**
 * clear all todos in state by setting todos to null
 * @returns 
 */
export const clearTodos = () => {
  return {type: CLEAR_TODOS};
};




/**
 * 
 * @returns sets the current state to null
 */
export const clearCurrent = () => {
  return { type: CLEAR_TODO_CURRENT };
};




/**
 * 
 * @returns sets loading in state to true
 */
export const setLoading = () => {
  return {type: SET_TODO_LOADING };
};
