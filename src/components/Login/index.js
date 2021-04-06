import React, { useState, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { HIDE_MODAL_AUTH_ALL, LOGIN } from "../../config/Constants";
import Register from "../Register";
import { API, setAuthToken } from "../../config/api";
import { ModalAuthContext } from "../../context/ModalAuthContext";
import SweetAlert from "react-bootstrap-sweetalert";

function Login(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(AuthContext);
  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  const initialState = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);
  const [modalError, setmodalError] = useState(false);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const [textError, setTextError] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setData({
      ...data,
    });

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(data);

      const response = await API.post("/login", body, config).catch((error) => {
        if (error.response.status == 400) {
          setmodalError(true);
          setTextError(error.response.data.error.message);
        }

        if (error.response.status == 404) {
          setmodalError(true);
          setTextError(error.response.data.message);
        }
        if (error.response.status == 401) {
          setmodalError(true);
          setTextError(error.response.data.message);
        }
      });

      dispatch({
        type: LOGIN,
        payload: response.data.data.user,
      });

      setAuthToken(response.data.data.user.token);

      dispatchAuthModal({
        type: HIDE_MODAL_AUTH_ALL,
      });

      history.push("/template");
    } catch (error) {}
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {modalError ? (
          <>
            <SweetAlert
              danger
              title={textError}
              onConfirm={() => setmodalError(false)}
              timeout={100000}
              style={{ position: "absolute", zIndex: 101 }}
            ></SweetAlert>
          </>
        ) : (
          <></>
        )}

        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>
            <h1 className="text-primary-black">Login</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={handleInputChange}
                
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
              />
            </Form.Group>

            <div className="mt-5"></div>
            <Button
              type="submit"
              disabled={data.isSubmiting}
              className="btn-block btn-primary-yellow text-white"
            >
              Login
            </Button>
          </Form>

          <p className="text-secondary text-center mt-2">
            Don't have an account ? Klik{" "}
            <span
              onClick={props.showRegister}
              style={{ cursor: "pointer" }}
              className="font-weight-bold"
            >
              {" "}
              Here{" "}
            </span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(Login);
