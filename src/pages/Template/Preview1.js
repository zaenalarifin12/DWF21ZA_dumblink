import React from "react";
import { Col, Row } from "react-bootstrap";

function Preview1({ linkData }) {
  return (
    <div>
      <div
        className="container mx-auto mt-5"
        style={{ paddingLeft: 200, paddingRight: 200 }}
      >
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

        <h1 className="text-center">{linkData?.title}</h1>
        <p className="text-center">{linkData?.description}</p>

        <br />

        {linkData?.links?.map((link) => {
          return (
            <>
              <Row className="d-flex align-items-center bg-primary-black my-2 py-2">
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
