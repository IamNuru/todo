import { useState , useEffect} from "react";
import { connect } from "react-redux"
import { updateTodolist, getTodolist } from "../../actions/TodolistActions";
import { error_message } from "../inc/Messages";
import M from "materialize-css/dist/js/materialize.min.js";

const EditTodolist = ({ current, errors, getTodolist, updateTodolist }) => {

    //state
    const [todolistName, setTodolistName] = useState('')

    useEffect(() => {
      if (current) {
        setTodolistName(current.name)
      }
    }, [current])

    //ON INPUT CHANGES
    const onChange = (e) =>{
        setTodolistName(e.target.value)
    }

    //submit the form
    const onSubmit = async (e) =>{
        e.preventDefault()
        if(current.id === ''){
          M.toast({html: error_message('Something went wrong, Please refresh page.')})
        }
        const data = {
          todolistName : todolistName,
        }
        await updateTodolist(current.id, data)
        await getTodolist(current.id)
        setTodolistName('')
    }


  return (
    <div id="editTodolist" className="modal">
      <div className="modal-header" style={{textAlign:'right'}}>
        <a href="#!" className="modal-close material-icons header-modal-close">close</a>
      </div>
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h5 className="text-center">Edit TodoList</h5>
          <div className="row py-0">
            <div className="input-field col s12">
              <input type="text" name="todolistName" value={todolistName} onChange={onChange} />
            </div>
          </div>
        </div>
        <div className="wrong" style={{color: 'red', marginTop: '-3rem',textAlign: 'center'}}>
          {
            errors && errors.todolistName[0]
          }
        </div>
        
        <div className="modal-footer">
          <button type="submit" className="modal-close waves-effect waves-light btn">
            <i className="material-icons left">update</i>Update
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state =>({
  errors: state.todolist.errors,
  current: state.todolist.current_todolist,
})
export default connect(mapStateToProps, { getTodolist, updateTodolist})(EditTodolist);
