import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Link, NavLink, useHistory } from "react-router-dom";
import { LOGOUT } from "../../config/Constants";
import { AuthContext } from "../../context/AuthContext";

function SideBar() {
  const history = useHistory();

  const [stateAuth, dispatchAuth] = useContext(AuthContext);

  const handleLogout = () => {
    dispatchAuth({
      type: LOGOUT,
    });

    history.push("/");
  };

  return (
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 position-fixed bg-white d-md-block bg-light sidebar collapse"
    >
      <div class="sidebar-sticky pt-3 pl-4">
        <ul class="nav flex-column">
          <li class="nav-item d-flex justify-content-start mb-3">
            <NavLink
              activeClassName="text-primary-yellow"
              to={`/template`}
              class="nav-link"
            >
              <div className="d-flex align-self-center">
                <img className="" src="/assets/icons/template.svg" />{" "}
                <NavLink
                  to={`/template`}
                  activeClassName="text-primary-yellow"
                  className="h4 ml-3 my-auto"
                  style={{
                    color: "#121313",
                    textDecoration: "none",
                  }}
                >
                  Template
                </NavLink>
              </div>
            </NavLink>
          </li>

          <li class="nav-item d-flex justify-content-start my-3">
            <div class="nav-link ">
              <div className="d-flex align-self-center">
                <img src="/assets/icons/profile.svg" />{" "}
                <NavLink
                  to={`my-account`}
                  activeClassName="text-primary-yellow"
                  className="h4 ml-3 my-auto"
                  style={{
                    color: "#121313",
                    textDecoration: "none",
                  }}
                >
                  Profile
                </NavLink>
              </div>
            </div>
          </li>

          <li class="nav-item d-flex justify-content-start mt-3 mb-4">
            <Link to={`/my-link`} class="nav-link active  ">
              <div className="d-flex align-self-center">
                <img src="/assets/icons/profile.svg" />{" "}
                <NavLink
                  to={`/my-link`}
                  activeClassName="text-primary-yellow"
                  className="h4 ml-3 my-auto"
                  style={{
                    color: "#121313",
                    textDecoration: "none",
                  }}
                >
                  My Link
                </NavLink>
              </div>
            </Link>
          </li>
        </ul>

        <ul class="nav flex-column mb-2" style={{ marginTop: 300 }}>
          <li class="nav-item d-flex justify-content-start my-3">
            <Button
              class="btn"
              style={{ backgroundColor: "#FFFF", border: "none" }}
              onClick={handleLogout}
            >
              <div className="d-flex align-self-center">
                <img src="/assets/icons/logout.svg" />{" "}
                <span className="text-primary-black h4 ml-3 my-auto">
                  Logout
                </span>
              </div>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
