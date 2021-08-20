import { Fragment } from "react";
import img from "../../images/unauthorised.svg";
import { Link } from "react-router-dom";

const UnAuthorisedPage = () => {
  return (
    <Fragment>
      <div className="unauthorised-page">
        <img
          src={img}
          alt="Unauthorised Page"
        />
        <p className="mt-4 text-center">
          Please <Link to="/login" className="px-1">Login </Link> to get access to your resource or head back {" "}
          <Link to="/" className="px-1">
            Home <i className="material-icons">home</i>
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default UnAuthorisedPage;
