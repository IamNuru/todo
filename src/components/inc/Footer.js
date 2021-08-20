const Footer = () => {
  return (
    <footer className="page-footer bg-default">
      <div className="footer-copyright">
        <div className="container text-center">
          © 2021 All right reserved. version {process.env.REACT_APP_VERSION}. Open for Job. Email me via abdulainurudeentitiaka@gmail.com
        </div>
      </div>
    </footer>
  );
};

export default Footer;
