import React from "react";
import logo from '../../images/logo.jpg';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { logout } from "../../actions/User";

const Navbar = ({user:{loggedin}, logout}) => {
  return (
    <nav className="bg-default" style={{padding:'0rem 2rem'}}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        
        {
          loggedin ?
          <ul className="right">
            <li>
              <Link to="#!" onClick={() => logout()}>Logout</Link>
            </li>
          </ul>
          :
          <>
            <ul className="right">
              <li>
                <Link to="/register">register</Link>
              </li>
            </ul>
            <ul className="right">
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
        </>
        }
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state =>({
  user : state.user
})

export default connect(mapStateToProps, { logout })(Navbar);
