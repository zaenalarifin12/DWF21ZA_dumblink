import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useMutation, useQuery } from "react-query";
import { withRouter } from "react-router";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";
import SideBar from "../components/SideBar";
import { API } from "../config/api";

function MyAccount() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const { name, email } = form;

  const [success, setSuccess] = useState(false);

  const {
    data: user,
    loading: loadingUser,
    error: errorUser,
    refetech: refetechUser,
  } = useQuery("profileCache", async () => {
    const response = await API.get("/check-auth");

    setForm({
      name: response.data.data.user.name,
      email: response.data.data.user.email,
    });

    return response;
  });

  const handleInputChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const approve = useMutation(async (id) => {
    const body = JSON.stringify({
      name: name,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await API.put(`/user`, body, config);

    if (response.status == 200) {
      setSuccess(true);
    }
  });

  const handleApprove = () => {
    approve.mutate();
  };
  return (
    <Body>
      {success ? (
        <>
          <SweetAlert
            success
            title="Account updated"
            onConfirm={() => {
              setSuccess(false);
            }}
            timeout={5000}
          ></SweetAlert>
        </>
      ) : (
        <></>
      )}
      <main role="main" class=" bg-light col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-4">
        <Row className="d-flex justify-content-between px-4 py-2">
          <h1 className="h4">My Information</h1>
        </Row>

        <div className="m-4">
          <Row>
            <Col className="bg-white rounded">
              <div className="py-4">
                <Row>
                  <div class="form-group col-12">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => handleInputChange(e)}
                      class="form-control form-custom"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                  </div>
                </Row>
                <Row>
                  <div class="form-group mt-2 col-12">
                    <label>Email</label>
                    <input
                      type="email"
                      disabled
                      value={email}
                      class="form-control form-custom px-2"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="mt-4 d-flex justify-content-end">
            <Button
              onClick={() => handleApprove()}
              className="btn btn-primary-yellow btn-sm text-white font-weight-bold px-4 mr-3"
            >
              Save Account
            </Button>
            <Button className="btn btn-primary-danger btn-sm text-white font-weight-bold px-4">
              Delete Account
            </Button>
          </Row>
        </div>
      </main>
    </Body>
  );
}

export default MyAccount;
