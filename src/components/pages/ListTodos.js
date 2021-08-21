import { useEffect } from "react";
import { connect } from "react-redux";
import M from "materialize-css/dist/js/materialize.min.js";

import { useHistory, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import { addTodo, clearErrors, deleteTodo, getTodos, setCurrent, updateStatus} from "../../actions/TodoActions";
import { getTodolist, getTodolists } from "../../actions/TodolistActions";
import { setTheme } from "../../actions/Theme"
import Loader from "../inc/Loader";
import TodolistSummary from "./partials/TodolistSummary";
import AddTodoItem from "../../components/modals/AddTodoItem";
import EditTodoItem from "../../components/modals/EditTodoItem";
import TodoItemDetails from "../../components/modals/TodoItemDetails";
import "../../styles/datatables.css"




const ListTodos = ({
  mytodolists: { current_todolist }, owner: {user},todo:{loading, todos}, theme:{light, lightTheme, darkTheme},
  setCurrent,
  updateStatus,
  getTodolist,
  getTodos,
  getTodolists,
  setTheme
}) => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    //initialize materialize jsvsacript
    M.AutoInit();
  });


  useEffect(() => {
      if(light){
        document.querySelectorAll('.rdt_Table').forEach(function (el){
          el.style.backgroundColor = lightTheme.bgColor
        });
        document.querySelectorAll('.rdt_TableRow').forEach(function (el){
          el.style.backgroundColor = lightTheme.bgColor
        });
        
      }else{
        document.querySelectorAll('.rdt_Table').forEach(function (el){
          el.style.backgroundColor = darkTheme.bgColor
        });
        document.querySelectorAll('.rdt_TableRow').forEach(function (el){
          el.style.backgroundColor = darkTheme.bgColor
        });
      }
    
})

  useEffect(() => {
    if(id){
      getTodolist(id)
      getTodolists(user.id)
      getTodos(id)
    }else{
      history.push("/");
    }
    
    // eslint-disable-next-line
  }, [id]);


  useEffect(() => {
    if (current_todolist &&  Object.keys(current_todolist).length === 0 && current_todolist.constructor === Object) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [current_todolist]);

  const changeStatus = async (t_id, status) => {
    await updateStatus(t_id, status);
    await getTodos(id);
  };

  //style head of table
  const customStyles = {
    headCells: {
      style: {
        paddingLeft: "4px", 
        paddingRight: "8px",
        backgroundColor: "#5b968e",
        minHeight: "42px",
        fontSize: "1.2rem",
      },
    },
  };
  //columns of the table
  const columns = [
    {
      name: "Title",
      selector: (row) => row["title"],
      cell: (row) => (
        <a
          href="#todo_details_modal"
          className="modal-trigger"
          onClick={() => setCurrent(row)}
          style={{fontSize:'17px'}}
        >
          {row["title"]}
        </a>
      ),
      sortable: true,
      grow: 4,
    },
    {
      name: "Status",
      selector: (row) => row["completed"],
      cell: (row) =>
        parseInt(row["completed"]) === 1 ? (
          <i className="material-icons center" style={{color: light ? 'black' : 'white'}}>done</i>
        ) : (
          <i className="material-icons center" style={{color: light ? 'black' : 'white'}}>do_not_disturb</i>
        ),

      sortable: true,
      center: true,
    },
    {
      name: "Switch",
      selector: (row) => row["completed"],
      cell: (row) => (
        <div className="switch" style={{fontSize:"22px"}}>
          <label>
            <input
              type="checkbox"
              checked={(parseInt(row.completed) ===1 ? false : true )}
              onChange={() => changeStatus(row.id, row.completed)}
              value={row.completed}
            />
            <span className="lever"
              style={{backgroundColor: light ? 'gray' :'rgb(236 233 233 / 38%)'}}
              >
            </span>
          </label>
        </div>
      ),

      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <div className="flex center">
          <a
            href="#edit_todo_modal"
            className="modal-trigger mx-4 action-btns"
            onClick={() => setCurrent(row)}
          >
            <i className="material-icons center cursor-pointer mx-4">edit</i>
          </a>
          <a
            href="#confirmDelete"
            className="modal-trigger mx-4 action-btns"
            onClick={() => setCurrent(row)}
          >
            <i className="material-icons center cursor-pointer deleteCan mx-4">
              delete_forever
            </i>
          </a>
        </div>
      ),
      right: true,
    },
  ];

  return (
    <div style={{ marginBottom: "5%" }}>
      <AddTodoItem />
      <EditTodoItem />
      <TodoItemDetails />
      <div className="fixed-action-btn" style={{ top: "0", marginTop: "6%" }}>
        <a
          className="btn-floating btn-large green modal-trigger add-todo-floating-button"
          href="#add_todo_modal"
        >
          <i className="small material-icons">add</i>
        </a>
      </div>
      <div className="todos-header text-center w-full" style={{textTransform:'uppercase'}}>
        {current_todolist && current_todolist.name}
      </div>
      
      <div className="block" style={{marginBottom:'8rem'}}>
        {!loading ? (
              todos?.length > 0 ? (
            <DataTable
              title="Todos"
              columns={columns}
              data={todos}
              customStyles={customStyles}
              pagination={todos.length > 5 && true}
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5 , 10, 15, 20]}
              onChangeRowsPerPage={()  => setTheme(light)}
            />
          ) : (
            <div className="text-center" style={{ marginTop: "5%" }}>
              No Todos in this Todolist Folder Yet
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
      <TodolistSummary />
    </div>
  );
};

const mapStateToProps = (state) => ({
  todo: state.todo,
  mytodolists: state.todolist,
  owner: state.user,
  theme: state.theme
});

export default connect(mapStateToProps, {
  setCurrent,
  deleteTodo,
  addTodo,
  updateStatus,
  clearErrors,
  getTodolist,
  getTodolists,
  getTodos,
  setTheme,
})(ListTodos);
