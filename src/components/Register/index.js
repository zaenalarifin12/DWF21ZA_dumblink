import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import {
  AUTH_ERROR,
  HIDE_MODAL_AUTH_ALL,
  REGISTER,
} from "../../config/Constants";
import { API, setAuthToken } from "../../config/api";
import { ModalAuthContext } from "../../context/ModalAuthContext";
import SweetAlert from "react-bootstrap-sweetalert";

function Register(props) {
  let history = useHistory();

  const [state, dispatch] = useContext(AuthContext);
  const [stateAuthModal, dispatchAuthModal] = useContext(ModalAuthContext);

  const initialState = {
    email: "",
    password: "",
    name: "",
  };

  const [data, setData] = useState(initialState);

  const [textError, setTextError] = useState("");

  const [modalError, setModalError] = useState(false);

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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

      const response = await API.post("/register", body, config).catch(
        (error) => {
          if (error.response.status == 400) {
            setModalError(true);
            setTextError(error.response.data.error.message);
          }

          if (error.response.status == 409) {
            setModalError(true);
            setTextError(error.response.data.message);
          }
        }
      );

      dispatch({
        type: REGISTER,
        payload: response.data.data.user,
      });

      setAuthToken(response.data.data.user.token);

      dispatchAuthModal({
        type: HIDE_MODAL_AUTH_ALL,
      });

      history.push("/template");
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
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
              onConfirm={() => setModalError(false)}
              timeout={100000}
            ></SweetAlert>
          </>
        ) : (
          <></>
        )}
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title>
            <h1 className="text-primary-black">Register</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleFormSubmit(e)}>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                className="border border-choco bg-light"
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </Form.Group>

            <div className="mt-5"></div>
            <Button type="submit" className="btn-block btn-primary-yellow text-white">
              Register
            </Button>
          </Form>

          <p className="text-secondary text-center mt-2">
            Already have an account ? Klik{" "}
            <span
              onClick={props.showLogin}
              className="font-weight-bold"
              style={{ cursor: "pointer" }}
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

export default Register;
