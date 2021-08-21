import { SET_THEME } from "../actions/types"

const initialState = {
    light: true,
    lightTheme:{
        color:"black",
        bgColor:"white"
    },
    darkTheme:{
        color:"white",
        bgColor:"#0e0e0d"
    }
}


if (localStorage.getItem("todo_theme")) {
    if(localStorage.getItem("todo_theme") === "light"){
        initialState.light = true 
    }else{
        initialState.light = false
    }   
}



export default (state = initialState, action) =>{
    switch (action.type) {
        case SET_THEME:
            return{
                ...state,
                light:action.payload,
            }
    
        default:
            return state
    }
}