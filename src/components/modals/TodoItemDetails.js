import {connect } from "react-redux";

const TodoItemDetails = ({current, current_todolist}) => {

  //calculate days left
  const oneDay = 24 * 60 * 60 * 1000;
  const today = new Date().toISOString().slice(0, 10);
  const days_left = Math.round(Math.abs((new Date(today && today) - new Date(current?.deadline && current.deadline ) ) / oneDay && oneDay))
  return (
    <div id="todo_details_modal" className="modal">
      <div className="modal-header" style={{textAlign:'right'}}>
        <a href="#!" className="modal-close header-modal-close">close</a>
      </div>
      {
        current ? <div className="row">
          <div className="modal-header center py-0">
            {
              current.completed === 1 ? <i className="detail-icon material-icons center success">done</i>
              :
              <i className="detail-icon material-icons center danger">clear</i>
            }
          </div>
          <div className="modal-content todo-details">
          <div className="cols12"><span>Title: </span><span>{current.title}</span></div>
          <div className="cols12"><span>Status: </span><span>{current.completed === 1 ? 'Completed' : "Not yet Completed"}</span></div>
          <div className="cols12"><span>Deadline: </span><span>{current.deadline ? current.deadline : 'Today'}</span></div>
          <div className="cols12"><span>Todolist: </span><span>{current_todolist.name}</span></div>
          <div className="cols12">
            <span>Remark: </span>
            <div className="remark">{
              current.completed === 1 
              ? <span className="success">You've done this todo</span>
              : <span className={`${days_left > 3 ? 'success' : 'danger'}`}>
               {
                  current.deadline 
                    ? days_left > 0 
                    ? <span>You have less done {days_left} 
                  &nbsp; day{`${days_left > 1 ? 's' : ''}`} to finish up this todo</span>
                  :
                  days_left < 0 
                    ? <span>Your deadline date expired</span>
                    :
                    <span>You need to complete this todo TODAY</span>
                  :
                  ''
               } 
              </span>
            }</div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#edit_todo_modal" className="modal-close modal-trigger waves-effect waves-light btn color-white" style={{fontWeight:'600', padding: '3px 2rem'}}>Edit</a>
        </div>
        </div>
        
        : <div className="text-red">Something went wrong</div>
      }
    </div>
  );
};


const mapStateToProps = state => ({
  current: state.todo.current,
  current_todolist: state.todolist.current_todolist,
})

export default connect(mapStateToProps)(TodoItemDetails);
