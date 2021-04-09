import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Nav, Navbar, NavDropdown, Button, Row } from "react-bootstrap";
import "./index.scss";
import { AuthContext } from "../../context/AuthContext";
import { LOGOUT } from "../../config/Constants";

function HeaderHome({ title }) {
  const history = useHistory();

  const [stateAuth, dispatchAuth] = useContext(AuthContext);

  const handleLogout = () => {
    dispatchAuth({
      type: LOGOUT,
    });

    history.push("/");
  };

  return (
    <>
      <Navbar
        className="forMobile d-flex justify-content-between bg-white"
        bg="light"
        expand="lg"
      >
        <Navbar.Brand href="#home">
          <Link to={`/`}>
            <img style={{ width: 140 }} src="/assets/icons/logo.svg" />{" "}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <li class="nav-item d-flex justify-content-start mt-2">
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
            <li class="nav-item d-flex justify-content-start">
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
            </li>{" "}
            <li class="nav-item d-flex justify-content-start">
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
            <Row className="mt-3">

            </Row>
            <Row class="nav-item d-flex justify-content-start">
              <Button
                class="btn ml-2"
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
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <nav class="navbar sticky-top bg-white flex-md-nowrap py-3 forPC">
        <div class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 d-flex justify-content-center">
          <Link to={`/`}>
            <img style={{ width: 140 }} src="/assets/icons/logo.svg" />{" "}
          </Link>
        </div>

        <div className="col d-flex justify-content-start">
          <h1 className="h4 ml-5 text-primary-dark font-weight-bold">
            {title}
          </h1>
        </div>
      </nav>
    </>
  );
}

export default HeaderHome;
