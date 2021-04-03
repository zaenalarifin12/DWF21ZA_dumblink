import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";
import { Link, useHistory } from "react-router-dom";
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
      class="col-md-3 col-lg-2 bg-white d-md-block bg-light sidebar collapse"
    >
      <div class="sidebar-sticky pt-3 pl-4">
        <ul class="nav flex-column">
          <li class="nav-item d-flex justify-content-start my-3">
            <Link to={`/template`} class="nav-link active  ">
              <div className="d-flex align-self-center">
                <img src="/assets/icons/template.svg" />{" "}
                <span className="text-primary-yellow h4 ml-3 my-auto">
                  Template
                </span>
              </div>
            </Link>
          </li>

          <li class="nav-item d-flex justify-content-start my-3">
            <Link to={`/my-account`} class="nav-link">
              <div className="d-flex align-self-center">
                <img src="/assets/icons/profile.svg" />{" "}
                <span className="text-primary-black h4 ml-3 my-auto">
                  Profile
                </span>
              </div>
            </Link>
          </li>

          <li class="nav-item d-flex justify-content-start my-3">
            <Link to={`/my-link`} class="nav-link active  ">
              <div className="d-flex align-self-center">
                <img src="/assets/icons/profile.svg" />{" "}
                <span className="text-primary-black h4 ml-3 my-auto">
                  Template
                </span>
              </div>
            </Link>
          </li>
        </ul>

        <ul class="nav flex-column mb-2" style={{ marginTop: 550 }}>
          <li class="nav-item d-flex justify-content-start my-3">
            <Button class="btn"
            style={{backgroundColor: "#FFFF", border: "none"}}
            
            onClick={handleLogout}>
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
