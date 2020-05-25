import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { logout } from "../../sideEffects/apis/auth";

function Navigation() {
  const [userData, setUserData] = useState(null);

  const history = useHistory();
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    console.log(history);
  }, []);

  useEffect(() => {
    return () => {
      setUserData(null);
    };
  });

  const logOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
    window.location.reload();
  };

  return (
    <div className="navigation-nav">
      <div className="custom-container">
        <nav className="navbar  navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">
            <img
              src="https://brand-mobile-assets.s3-eu-west-1.amazonaws.com/Logo+(1).png"
              alt="carbon log"
              className="img-fluid logo"
            />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <button onClick={logOut}>LOGOUT</button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default withRouter(Navigation);
