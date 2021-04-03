import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";

import Hero from "../components/Hero";
import SideBar from "../components/SideBar";

function AddLink() {
  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    links: [],
  });

  const { image, title, description, links } = form;

  const onChange = (e) => {
    const tempForm = { ...form };
    tempForm[e.target.name] =
      e.target.type === "file" ? e.target.files[0] : e.target.value;

    setForm(tempForm);

    console.log(tempForm);
  };

  return (
    <Body>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-5">
        <Row className="d-flex justify-content-between px-4 py-4">
          <h1 className="h4">Create Link</h1>

          <Button className="btn btn-primary-yellow btn-md text-white font-weight-bold">
            Publish Link
          </Button>
        </Row>

        <div className="m-4">
          <Row>
            <Col className="bg-white rounded">
              <div className="p-3">
                <Row>
                  <Col xs={3}>
                    <img
                      src="/assets/images/preview-image.png"
                      style={{ width: 100 }}
                    />
                  </Col>
                  <Col className="d-flex align-items-end mb-3">
                    <Button className="btn btn-primary-yellow text-white btn-sm px-3">
                      Upload
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <div class="form-group mt-4 col-12">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      onChange={(e) => onChange(e)}
                      class="form-control form-custom"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                  </div>
                </Row>
                <Row>
                  <div class="form-group mt-2 col-12">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      onChange={(e) => onChange(e)}
                      class="form-control form-custom"
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                  </div>
                </Row>

                <Row className="mt-5 d-flex align-items-center bg-primary-gray p-2">
                  <Col xs={3}>
                    <div class="image-upload">
                      <label for="file-input">
                        <img
                          src="/assets/images/preview-image.png"
                          style={{ height: 100 }}
                        />
                      </label>

                      <input
                        id="file-input"
                        type="file"
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                  </Col>
                  <Col className="d-flex align-items-end p-0">
                    <Row>
                      <div class="form-group col-12">
                        <label>Title Link</label>
                        <input
                          type="text"
                          name="links[0][titleLink]"
                          onChange={(e) => onChange(e)}
                          class="form-control form-custom bg-primary-gray"
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                      </div>
                      <div class="form-group col-12">
                        <label>Url Link</label>
                        <input
                          type="text"
                          name="links[0][urlLink]"
                          onChange={(e) => onChange(e)}
                          class="form-control form-custom bg-primary-gray"
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                      </div>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-5 d-flex align-items-center bg-light p-2">
                  <Col xs={3}>
                    <img
                      src="/assets/images/preview-image.png"
                      style={{ width: 100 }}
                    />
                  </Col>
                  <Col className="d-flex align-items-end p-0">
                    <Row>
                      <div class="form-group col-12">
                        <label>Title Link</label>
                        <input type="email" class="form-control" />
                        {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                      </div>
                      <div class="form-group col-12">
                        <label>Url Link</label>
                        <input type="email" class="form-control" />
                        {/* <small id="emailHelp" class="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small> */}
                      </div>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-center">
                <img src="/assets/images/framer-phone.png" width="300" />
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </Body>
  );
}

export default AddLink;
