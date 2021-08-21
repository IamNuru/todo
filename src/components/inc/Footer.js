import { connect } from "react-redux"
const Footer = ({theme: {light}}) => {
  return (
    <footer className={`page-footer ${light ? 'footer-lt' : 'footer-dt'}`}>
      <div className="footer-copyright">
        <div className="container text-center">
          © 2021 All right reserved. version <span style={{color:'rgb(240, 81, 107)'}}>{process.env.REACT_APP_VERSION}</span>. Open for Job. Email me via abdulainurudeentitiaka@gmail.com
        </div>
      </div>
    </footer>
  );
};

const mapStateToProps = state =>({
  theme: state.theme
})

export default connect(mapStateToProps)(Footer);
