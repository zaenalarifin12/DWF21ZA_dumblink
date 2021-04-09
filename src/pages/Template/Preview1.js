import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Preview1.scss";

function Preview1({ linkData }) {
  return (
    <div>
      <div className="container mx-auto mt-5 container-custom">
        <div className="d-flex justify-content-center">
          <img
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
            className="rounded-circle"
            src={`http://localhost:5000/uploads/${linkData?.image}`}
          />
        </div>

        <h1 className="text-center h2 ">{linkData?.title}</h1>
        <p className="text-center">{linkData?.description}</p>

        <br />

        {linkData?.links?.map((link) => {
          return (
            <>
              <Row className="d-flex align-items-center my-2 py-2 link">
                <Col xs={5}>
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                    src={`http://localhost:5000/uploads/${link.image}`}
                  />
                </Col>
                <Col className="d-flex">
                  <a
                    href={`https://${link.url}`}
                    className="text-center text-white"
                  >
                    {link.title}
                  </a>
                </Col>
              </Row>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Preview1;
