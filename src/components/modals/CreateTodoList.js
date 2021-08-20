import { useState } from "react";
import { connect } from "react-redux"
import { addTodolist, getTodolists } from "../../actions/TodolistActions";

const CreateTodoList = ({ user, errors, getTodolists, addTodolist }) => {

    //state
    const [todolistName, setTodolistName] = useState('')


    //ON INPUT CHANGES
    const onChange = (e) =>{
        setTodolistName(e.target.value)
    }

    //submit the form
    const onSubmit = async (e) =>{
        e.preventDefault()
        const data = {
          todolistName : todolistName,
          ownerId : user && user.id
        }
        await addTodolist(data)
        await getTodolists(user.id)
        setTodolistName('')
    }


  return (
    <div id="create_todolist_modal" className="modal">
      <div className="modal-header" style={{textAlign:'right'}}>
        <a href="#!" className="modal-close material-icons header-modal-close">close</a>
      </div>
      <form onSubmit={onSubmit}>
        <div className="modal-content">
          <h5 className="text-center">Create New Todo List</h5>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" name="todolistName" value={todolistName} onChange={onChange} />
              <label htmlFor="name">Name</label>
            </div>
          </div>
        </div>
        <div className="wrong" style={{color: 'red', marginTop: '-3rem',textAlign: 'center'}}>
          {
          /* errors && errors.todolistName[0] */
        }
        </div>
        
        <div className="modal-footer">
          <button type="submit" className="modal-close waves-effect waves-light btn">
            <i className="material-icons left">save</i>Create
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = state =>({
  errors: state.todolist.errors,
  user: state.user.user,
})
export default connect(mapStateToProps, { getTodolists, addTodolist})(CreateTodoList);
