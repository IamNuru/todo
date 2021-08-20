import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { register, clearErrors } from "../../../actions/User"

const Register = ({ user:{errors, success, loggedin} , register, clearErrors }) => {
  //iniatialise state
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    username: "",
    password: "",
  });


  const history  = useHistory()

  //if loggedin redirect to home page
  useEffect(() => {
    if(loggedin) {
      history.push("/")
    }
    //eslint-disable-next-line
  }, [loggedin])


  useEffect(() =>{
    return()=>{
      if(errors || success){
        clearErrors()
      }
    }
    //eslint-disable-next-line
  },[errors, success])


  //destructure variables in data object
  const { username, password } = data;


  
  //when input changes
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrorMessage("");
    if(errors){
      clearErrors()
    }
  };


  //on submit of form to server
  const onSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrorMessage("All fields are required");
    } else {
     register(data)
    }
  };

  return (
    <div className="wrap-auth">
      <form onSubmit={onSubmit} className="container auth-form" autoComplete="">
        <h4 className="mb-4 text-center s12 auth-form-title">Create an Account</h4>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="icon_prefix"
              type="text"
              name="username"
              value={username}
              onChange={onChange}
            />
            <label htmlFor="icon_prefix">Username</label>
            {
              errors && errors.username && <span className="helper-text text-center auth-form-error">{errors.username[0]}</span>
            }
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input
              id="icon_prefix1"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <label htmlFor="icon_prefix1">Password</label>
            {
              errors && errors.password && <span className="helper-text text-center auth-form-error">{errors.password[0]}</span>
            }
          </div>
        </div>
        {errorMessage && (
          <div
            className="helper-text center italic"
            data-error="wrong"
            data-danger="right"
            style={{ color: "red" }}
          >
            {errorMessage}
          </div>
        )}

        <div className="w-full text-right mt-4">
          <button type="submit" className="waves-effect waves-light btn" disabled={errorMessage||errors||success}>
            <i className="material-icons left">save</i>Register
          </button>
        </div>
      </form>
      <br />
      <p className="text-center">
        Already have an account?, Please <Link to="/login">login</Link>
      </p>
    </div>
  );
};

const mapStateToProps = state =>({
  user: state.user
})

export default connect(mapStateToProps, { register, clearErrors })(Register);
