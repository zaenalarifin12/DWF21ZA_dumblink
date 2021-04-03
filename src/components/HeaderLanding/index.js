import React, { useState, useContext, useEffect } from "react";
import Login from "../Login";
import Register from "../Register";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useHistory, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  CLEAR_FOOD,
  HIDE_MODAL_AUTH_ALL,
  HIDE_MODAL_LOGIN,
  LOGOUT,
  SHOW_MODAL_LOGIN,
  SHOW_MODAL_REGISTER,
  HIDE_MODAL_REGISTER,
  AUTH_ERROR,
} from "../../config/Constants";
import { ModalAuthContext } from "../../context/ModalAuthContext";
import { API } from "../../config/api";

function HeaderLanding() {
  const router = useHistory();

  const [user, setUser] = useState(null);

  const [state, dispatch] = useContext(AuthContext);

  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  // const checkAuth = async () => {
  //   try {
  //     const response = await API.get("/check-auth");

  //     if (response.status === 401) {
  //       dispatch({
  //         type: AUTH_ERROR,
  //       });
  //     }

  //     setUser(response.data.data.user);
  //   } catch (error) {
  //     dispatch({
  //       type: AUTH_ERROR,
  //     });
  //   }
  // };

  useEffect(() => {
    // checkAuth();
  }, []);
  // FUNCTION FOR MODAL AUTH

  const hideModalAll = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_AUTH_ALL,
    });
  };

  const showModalLogin = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_LOGIN,
    });
  };

  const hideModalLogin = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_LOGIN,
    });
  };

  const showModalRegister = () => {
    dispatchAuthModal({
      type: SHOW_MODAL_REGISTER,
    });
  };

  const hideModalRegister = () => {
    dispatchAuthModal({
      type: HIDE_MODAL_REGISTER,
    });
  };

  const handleLogout = () => {
    dispatch({
      type: LOGOUT,
    });

    router.push("/");
  };

  return (
    <div className="bg-primary-gray container-fluid d-flex flex-column flex-md-row align-items-center py-3 px-5 position-relative" style={{zIndex: 100}}>
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link to={`/`}>
          <img style={{ width: 140 }} src="/assets/icons/logo.svg" />
        </Link>
      </h5>

      <Button
        className="btn btn-md bg-primary-gray btn-primary-gray text-primary-black font-weight-bold mr-4 "
        onClick={showModalLogin}
      >
        Login
      </Button>

      <Login
        show={stateAuthModal.login}
        onHide={hideModalAll}
        showRegister={showModalRegister}
      />

      <Button
        className="btn btn-md btn-primary-yellow text-white font-weight-bold"
        onClick={showModalRegister}
      >
        Register
      </Button>

      <Register
        show={stateAuthModal.register}
        onHide={hideModalAll}
        showLogin={showModalLogin}
      />
    </div>
  );
}

export default withRouter(HeaderLanding);
