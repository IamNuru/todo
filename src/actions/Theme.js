import { SET_THEME } from "./types"



export const setTheme = val => (dispatch) =>{
    if(val){
        localStorage.setItem("todo_theme", "light")
    }else{
        localStorage.setItem("todo_theme", "dark")
    }
    dispatch({
        type: SET_THEME,
        payload: val
    })
}