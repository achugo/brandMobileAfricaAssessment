import React, { useState } from "react";
import { Route, Link, Switch, Redirect, Router } from "react-router-dom";
import { logout } from "./sideEffects/apis/auth";
import "../src/scss/style.css";
import Home from "./components/Home/Home";
import ConnectedRegister, {
  Login,
} from "./components/Authentication/Authentication";
import history from "./history";
//imports for connected app
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isBusy } from "./creators/loaderCreator";
import { setUser, deleteUser } from "./creators/userCreator";
import SingleEmployee from "./components/Home/SingleEmployee";

const getUserFromStorage = () => {
  if (localStorage) {
    return JSON.parse(localStorage.getItem("user"));
  }
  return null;
};

const App = (props) => {
  const search = props.history.location.search;
  const url = search ? search.substring(search.indexOf("=") + 1) : "";
  const userFromLocal = getUserFromStorage();
  if (!props.user) {
    props.isBusy(true);
    props.setUser(userFromLocal);
    props.isBusy(false);
  }
  const user = props.user || userFromLocal;
  console.log("user", user);

  const [knownPage, setKnownPage] = useState(true);

  // const onLogout = () => {
  //   logout();
  //   props.deleteUser();
  //   props.history.push("/");
  // };

  return (
    <div className="container-fluid  px-0">
      <div className="row">
        {props.loading && <Spinner />}

        <div className="col-md-12">
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  user && localStorage.getItem("token") ? (
                    <Home />
                  ) : (
                    <Redirect to="/login?redirectUrl=/" />
                  )
                }
              />

              <Route
                exact
                path="/employee/:id"
                render={() =>
                  user ? (
                    <SingleEmployee />
                  ) : (
                    <Redirect to="/login?redirectUrl=/" />
                  )
                }
              />
              <Route
                path="/register"
                render={() => (
                  <ConnectedRegister {...props} url={url} user={user} />
                )}
              />
              <Route
                path="/login"
                render={() => <Login {...props} url={url} user={user} />}
              />

              <Route
                render={() => (
                  <NotFound setKnownPage={(isKnown) => setKnownPage(isKnown)} />
                )}
              />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

const Spinner = () => {
  return <p>Loading...</p>;
};

const NotFound = ({ setKnownPage }) => {
  setKnownPage(false);
  return (
    <p>
      Page not found. Go to home <Link to="/">Home</Link>
    </p>
  );
};

const mapStateToProps = ({ user, loading }) => {
  return { loading, user };
};

const ConnectedApp = withRouter(
  connect(mapStateToProps, { setUser, deleteUser, isBusy })(App)
);

export default ConnectedApp;
