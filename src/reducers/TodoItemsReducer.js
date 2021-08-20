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
} from "../actions/types";

const initialState = {
  todos: null,
  current: null,
  loading: true,
  errors: null,
  success: null,
};



 // eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
    return{
      ...state,
      todos: action.payload,
      loading: false
    }


    //add todos
    case ADD_TODO:
    return{
      ...state,
      todos: [action.payload.data, ...state.todos ],
      loading: false,
      success: action.payload.message
    }


    //update todos
    case UPDATE_TODO:
    return{
      ...state,
      todos: state.todos.map(todo => todo.id === action.payload.data.id ? action.payload.data : todo),
      loading: false,
      success: action.payload.message
    }


    case DELETE_TODO:
    return{
      ...state,
      todos: state.todos.filter(tod => tod.id !== action.payload),
      success: 'Item deleted successfully'
    }
  

    case GET_TODO:
      return{
        ...state,
        current: action.payload,
        errors: null,
        success: null,
      }


    case TODO_ERRORS:
      return{
        ...state,
        errors:action.payload,
        success: null,
      }


    case SET_TODO_LOADING:
      return {
        ...state,
        loading: true,
      };


    case CLEAR_TODO_CURRENT:
      return {
        ...state,
        current: null,
      };


    case CLEAR_TODOS:
      return {
        ...state,
        todos: null,
      };


    case CLEAR_TODO_ERRORS:
      return {
        ...state,
        errors: null,
      };

      
    default:
      return state;
  }
};
