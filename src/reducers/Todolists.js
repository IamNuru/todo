import {
  ADD_TODO_LIST,
  TODO_LIST_ERRORS,
  UPDATE_TODO_LIST,
  GET_TODO_LISTS,
  GET_TODO_LIST,
  SET_TODOLIST_LOADING,
  DELETE_TODO_LIST,
} from "../actions/types";

const initialState = {
  todolists: null,
  current_todolist: null,
  loading: true,
  errors: null,
  success: null,
};



 // eslint-disable-next-line
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODO_LISTS:
      return{
        ...state,
        todolists: action.payload,
        loading: false
      }


    case ADD_TODO_LIST:
      return{
        ...state,
        todolists:  [action.payload.data, ...state.todolists],
        loading: false
      }


    case UPDATE_TODO_LIST:
      return{
        ...state,
        todolists: state.todolists.map(todo => todo.id === action.payload.data.id ? action.payload.data : todo),
        loading: false
      }


    case GET_TODO_LIST:
      return{
        ...state,
        current_todolist: action.payload,
        loading: false
      }


    case TODO_LIST_ERRORS:
      return{
        ...state,
        errors:action.payload,
        success: null,
        loading: false
      }


    case SET_TODOLIST_LOADING:
      return {
        ...state,
        loading: true,
      };


    case DELETE_TODO_LIST:
      return{
        ...state,
        current_todolist: {},
        loading: false
      }
    

    default:
      return state;
  }
};
