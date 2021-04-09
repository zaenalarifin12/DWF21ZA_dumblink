import React from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";
import SideBar from "../components/SideBar";

function Template() {
  return (
    <Body title="Template">
      <main
        role="main"
        class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light d-flex justify-content-around pt-4"
      >
        <Row>
          <Col sm={12} md={12} lg={3}>
            <Link to={`add-link/1`}>
              <img src="/assets/images/template-preview-1.png" width="100%" />
            </Link>
          </Col>
          <Col sm={12} md={12} lg={3}>
            <Link to={`add-link/2`}>
              <img src="/assets/images/template-preview-2.png" width="100%" />
            </Link>
          </Col>
          <Col sm={12} md={12} lg={3}>
            <Link to={`add-link/3`}>
              <img src="/assets/images/template-preview-3.png" width="100%" />
            </Link>
          </Col>
          <Col sm={12} md={12} lg={3}>
            <Link to={`add-link/4`}>
              <img src="/assets/images/template-preview-4.png" width="100%" />
            </Link>
          </Col>
        </Row>
      </main>
    </Body>
  );
}

export default Template;
