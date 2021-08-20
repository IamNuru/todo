import { connect } from "react-redux";
import EditTodolist from "../../modals/EditTodolist";
import DeleteTodolist from "../../modals/DeleteTodolist";

const TodolistSummary = ({ todos}) => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="todolist-summary-wrapper">
      <div className="todolist-summary">
        <EditTodolist />
        <DeleteTodolist />
        <h4 className="h4 text-center w-full title">Summary</h4>
        <div className="todolist-summary-content">
          <div className="todolist-summary-content-div">
            <span>Total Todos: </span>
            <span>{todos && todos?.length}</span>
          </div>
          <div className="todolist-summary-content-div">
            <span>Completed: </span>
            <span>
              {todos && todos?.length > 0
                ? todos.filter((t) => parseInt(t.completed) === 1).length
                : "0"}
            </span>
          </div>
          <div className="todolist-summary-content-div">
            <span>Failed: </span>
            <span>
              {todos && todos?.length > 0
                ? todos.filter(
                    (t) =>
                      Math.round(Math.abs(new Date(today && today))) >
                      Math.round(Math.abs(new Date(t.deadline)))
                  ).length
                : "0"}
            </span>
          </div>
        </div>
        <div className="todolist-summary-footer">
          <button data-target="editTodolist" className="btn modal-trigger">
            <i className="material-icons left">edit</i>Edit
          </button>
          <button
            data-target="deleteTodolist"
            className="btn modal-trigger red"
          >
            <i className="material-icons left">delete_forever</i>Drop
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todo.todos,
});
export default connect(mapStateToProps, {  })(
  TodolistSummary
);
