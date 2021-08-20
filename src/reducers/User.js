import {REGISTER_USER, LOGIN_USER,UPDATE_USER, USER_ERROR,SET_LOGIN, CLEAR_USER_ERRORS, LOGOUT_USER} from "../actions/types"


//initialise state
const initialState = {
    user: null,
    loggedin: false,
    errors: null,
    success: null
}

if (localStorage.getItem("todo_user")) {
    initialState.user = JSON.parse(localStorage.getItem("todo_user"))
    initialState.loggedin = true
  }

// eslint-disable-next-line
export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
        case LOGIN_USER:
        case UPDATE_USER:
            return{
                ...state,
                user: action.payload.data,
                loggedin: true,
                success: action.payload.message,
                errors: null
            }


        case LOGOUT_USER:
            return{
                ...state,
                user: null,
                loggedin: false,
                errors: null
            }



        case SET_LOGIN:
            return{
                ...state,
                user: action.payload,
                loggedin: true,
                errors:null
            }


        case USER_ERROR:
            return{
                ...state,
                errors: action.payload,
                loggedin: false,
                success: null
            }
        

        case CLEAR_USER_ERRORS:
            return{
                ...state,
                errors: null,
                success: null,
            }
    
        default:
            return state
    }
}