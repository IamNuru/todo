import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter} from "react-router-dom";
import { addTodo, clearErrors, getTodos} from "../../actions/TodoActions";

export const AddTodoItem = ({ errors, success, addTodo, clearErrors, getTodos }) => {

  const { id } = useParams()
  
  //state
  const [data, setData] = useState({title:'', deadline:''})
  const { title, deadline } = data;


  useEffect(() => {
      if(success){
        setData({
          title: '',
          deadline: ''
          
        });
      }
  }, [success]);


  const onChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
    if(errors){
      clearErrors();
    }
    
  };


  //submit form and persist to localstorage
  const onSubmit = async (e) => {
    e.preventDefault();
    await addTodo(id , data);
    await getTodos(id)
  };

  return (
    <div id="add_todo_modal" className="modal">
      <div className="modal-header" style={{textAlign:'right'}}>
        <a href="#!" className="modal-close material-icons header-modal-close">close</a>
      </div>
      <form onSubmit={onSubmit}>
        <div className="modal-content py-0">
          <h5 className="text-center">Add Todo</h5>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
              />
              <label htmlFor="title">Title</label>
              {errors?.title && (
                <span className="helper-text" style={{ color: "red" }}>
                  {errors.title[0]}
                </span>
              )}
            </div>
            <div className="input-field col s12">
              <input
                type="date"
                name="deadline"
                value={deadline}
                onChange={onChange}
              />
              <label htmlFor="deadline">Deadline</label>
              {errors?.deadline && (
                <span className="helper-text" style={{ color: "red" }}>
                  {errors.deadline[0]}
                </span>
              )}
            </div>
            
          </div>
        </div>
        <div className="modal-footer">
          
          <button
            type="submit"
            className={`modal-close waves-effect waves-light btn`}
            //disabled={errors !== null}
          >
            <i className="material-icons left">save</i>ADD
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  errors: state.todo.errors,
  success: state.todo.success,
});

export default withRouter(connect(mapStateToProps, { addTodo, clearErrors, getTodos })(AddTodoItem));

