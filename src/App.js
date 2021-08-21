import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import "./index.css";
import "./styles/theme.css";
import Footer from "./components/inc/Footer";
import Navbar from "./components/inc/Navbar";
import HomePage from "./components/pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListTodos from "./components/pages/ListTodos";
import CreateTodoList from "./components/modals/CreateTodoList";
import { Fragment } from "react-is";
import Register from "./components/pages/auth/Register";
import LoginPage from "./components/pages/auth/LoginPage";
import ConfirmDelete from "./components/modals/ConfirmDelete";
import ProtectedRoute from "./components/inc/ProtectedRoute";
import UnAuthorisedPage from "./components/inc/UnAuthorisedPage";
import PageNotFound from "./components/inc/PageNotFound";
import ResetPassword from "./components/pages/auth/ResetPassword";


const App = () => {
  useEffect(() => {
    //initialize materialize jsvsacript
    M.AutoInit();
    //initialize tooltip
    M.Tooltip.init()
  });

  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <div className="App">
            <CreateTodoList />
            <ConfirmDelete />
            <Navbar />
            <div className="content container" id="main-app-wrapper">
              <main>
                <div className="">
                  <Switch>
                    <Route exact path="/" component={HomePage} />
                    <ProtectedRoute exact path="/:id/todos" component={ListTodos} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/resetpassword" component={ResetPassword} />
                    <Route exact path="/un-authorised-page" component={UnAuthorisedPage} />
                    
                    
                    <Route exact path="/*" component={PageNotFound} />
                  </Switch>
                </div>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </Fragment>
    </Provider>
  );
};

export default App;
