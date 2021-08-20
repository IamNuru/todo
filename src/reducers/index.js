import { combineReducers } from "redux";
import TodoItemsReducer from "./TodoItemsReducer";
import Todolists from "./Todolists";
import User from "./User";

export default combineReducers({
    todo: TodoItemsReducer,
    todolist: Todolists,
    user: User,
});
