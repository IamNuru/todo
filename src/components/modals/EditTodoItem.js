import { useState, useEffect } from "react";
import {connect } from "react-redux"
import { useParams } from "react-router-dom";
import { clearErrors,  updateTodo, getTodos } from "../../actions/TodoActions"

const EditTodoList = ({current,errors, mytodolists, updateTodo,  clearErrors, getTodos}) => {

  const { id } = useParams()
    //state
    const [data, setData] = useState({
      title : '',
      deadline: '',
      todolist:'',
    })
    const { title, deadline, todolist} = data;

    useEffect(() => {
      if (current) {
        setData({
          title: current.title,
          deadline: current.deadline,
          todolist: current.todolist_id,
        })
      }
    }, [current])



    //ON INPUT CHANGES
    const onChange = (e) =>{
        setData({...data, [e.target.name] : e.target.value})
        if(errors){
          clearErrors()
        }
    }

    //submit the form
    const onSubmit = async (e) =>{
        e.preventDefault()
       await updateTodo(current.id, data)
       await getTodos(id)
    }


  return (
    <div id="edit_todo_modal" className="modal">
      <div className="modal-header" style={{textAlign:'right'}}>
        <a href="#!" className="modal-close material-icons header-modal-close">close</a>
      </div>
      <form onSubmit={onSubmit}>
        <div className="modal-content py-0">
          <h5 className="text-center">Edit New Todo List</h5>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" name="title" value={title ? title : ''} onChange={onChange} />
              {errors?.title && (
                <span className="helper-text" style={{ color: "red" }}>
                  {errors.title[0]}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="date" name="deadline" value={deadline ? deadline : ''} onChange={onChange} />
              {errors?.deadline && (
                <span className="helper-text" style={{ color: "red" }}>
                  {errors.deadline[0]}
                </span>
              )}
            </div>
          </div>
          <div className="col s12">
            <select className="browser-default choose-todolist" name="todolist" onChange={onChange}>
              {
                mytodolists?.length > 0 ? 
                (mytodolists.map(tlist => {
                  return <option key={tlist.id} value={tlist.id} selected={current && current.todolist_id} >{tlist.name}</option>
                })) 
                :<option value="" disable="true">Go back and create todolists</option>
              }
              
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="modal-close waves-effect waves-light btn">
            <i className="material-icons left">update</i>UPDATE
          </button>
        </div>
      </form>
    </div>
  );
};


const mapStateToProps = state => ({
  current: state.todo.current,
  errors: state.todo.errors,
  mytodolists: state.todolist.todolists,
})

export default connect(mapStateToProps, {updateTodo, clearErrors, getTodos})(EditTodoList);
