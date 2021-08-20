import { connect } from "react-redux";
import { deleteTodo } from "../../actions/TodoActions";

const ConfirmDelete = ({ current, deleteTodo }) => {
  return (
    <div id="confirmDelete" className="modal">
      <div className="modal-header" style={{ textAlign: "right" }}>
        <a href="#!" className="modal-close material-icons header-modal-close">
          close
        </a>
      </div>
      <div className="modal-content py-0 text-center">
        <h4 className="text-center">
          <i className="large material-icons deleteCan">delete</i>
        </h4>
        <p>
          You are about to delete{" "}
          <span className="bold">{current && current.title}</span>
        </p>
        <p className="my-4">Are you sure you want to delete?</p>
      </div>
      <div className="modal-footer" style={{ textAlign: "right" }}>
        <a href="#!" className="modal-close waves-effect waves-green btn-flat">
          No
        </a>
        <button
          onClick={() => deleteTodo(current && current.id)}
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
  current: state.todo.current,
});

export default connect(mapStateToProps, { deleteTodo })(ConfirmDelete);
