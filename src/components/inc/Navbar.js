import React from "react";
import logo from '../../images/logo.jpg';
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { logout } from "../../actions/User";
import Theme from "../theme/Theme"

const Navbar = ({user:{loggedin}, theme:{light}, logout}) => {
  return (
    <nav className={`${light ? 'navbar-lt' : 'navbar-dt'}`}>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
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
        <div className="right theme-container" style={{marginRight: '4rem'}}>
          <Theme />
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state =>({
  user : state.user,
  theme: state.theme
})

export default connect(mapStateToProps, { logout })(Navbar);
