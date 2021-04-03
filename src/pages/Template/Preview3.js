import React from "react";
import { Col, Row } from "react-bootstrap";
import Blur from "react-blur";

function Preview3({ linkData }) {
  return (
    <>
      <Blur
        img={`http://localhost:5000/uploads/${linkData?.image}`}
        blurRadius={5}
        enableStyles
        style={{height: "100vh"}}
      >
        <Row>
          <Col></Col>
          <Col>
            <div className="container pt-5 mx-auto">
              {/*  */}
              <div
                className="py-5 mx-auto bg-white"
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                }}
              >
                <div className="d-flex justify-content-center">
                  <img
                    style={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                    }}
                    className=""
                    src={`http://localhost:5000/uploads/${linkData?.image}`}
                  />
                </div>

                <h1
                  className="text-center"
                  style={{
                    color: "#333333",
                  }}
                >
                  {linkData?.title}
                </h1>
                <p
                  style={{
                    color: "#333333",
                  }}
                  className="text-center"
                >
                  {linkData?.description}
                </p>

                <br />

                <Row className="d-flex justify-content-center">
                  {linkData?.links?.map((link) => {
                    return (
                      <>
                        <a
                          style={{
                            color: "#412E28",
                            border: "1px solid #412E28",
                          }}
                          className="mx-2 p-2 rounded-circle"
                          href={`https://${link.url}`}
                        >
                          <img
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "cover",
                            }}
                            className="rounded-circle "
                            src={`http://localhost:5000/uploads/${link.image}`}
                          />
                        </a>
                      </>
                    );
                  })}
                </Row>
              </div>

              {/*  */}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Blur>
    </>
  );
}

export default Preview3;
