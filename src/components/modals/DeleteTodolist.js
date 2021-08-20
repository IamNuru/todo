import { connect } from "react-redux";
import { deleteTodolist } from "../../actions/TodolistActions";
import { error_message } from "../inc/Messages";
import M from "materialize-css/dist/js/materialize.min.js";

const DeleteTodolist = ({ todos , current_todolist, deleteTodolist }) => {
  //delete a todolist
  const deleteTodo = () => {
    if (todos?.length > 0) {
      M.toast({html: error_message("Please delete all todos connected to this todolist" ),});
    }else{
      deleteTodolist(current_todolist?.id)
    }
  };

  return (
    <div id="deleteTodolist" className="modal">
      <div className="modal-header" style={{ textAlign: "right" }}>
        <a href="#!" className="modal-close material-icons header-modal-close">
          close
        </a>
      </div>
      <div className="modal-content py-0">
        <h4 className="text-center">
          <i className="large material-icons deleteCan">delete</i>
        </h4>
        <p>
          You are about to delete{" "}
          <span style={{fontWeight:'600'}}>{current_todolist && current_todolist.name}</span>
        </p>
        <p className="my-4">Are you sure you want to delete?</p>
        <p
          style={{
            color: "red",
            fontSize: "16px",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          Make sure you delete all todos in this todolist folder
        </p>
      </div>
      <div className="modal-footer" style={{ textAlign: "right" }}>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          No
        </a>
        <button
          onClick={() => deleteTodo(current_todolist && current_todolist.id)}
          href="#!"
          className="px-2 py-1 red modal-close waves-effect btn-flat"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  current_todolist: state.todolist.current_todolist,
  todos: state.todo.todos,
});

export default connect(mapStateToProps, { deleteTodolist })(DeleteTodolist);
