import { Fragment } from "react";
import img from "../../images/pagenotfound.svg";
import { Link } from "react-router-dom";

const UnAuthorisedPage = () => {
  return (
    <Fragment>
      <div className="unauthorised-page">
        <h4 className="text-center w-full" style={{margin: "2rem 0rem"}}>PAGE NOT FOUND</h4>
        <img
          src={img}
          alt="404 Page"
        />
        <p className="mt-4 text-center">
         Back to <Link to="/">Home</Link> Page
        </p>
      </div>
    </Fragment>
  );
};

export default UnAuthorisedPage;
