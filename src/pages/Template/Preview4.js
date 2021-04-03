import React from "react";
import { Col, Row } from "react-bootstrap";
import Blur from "react-blur";

function Preview4({ linkData }) {
  return (
    <>
      <Blur
        img={`http://localhost:5000/uploads/${linkData?.image}`}
        blurRadius={5}
        enableStyles
        style={{ height: "100vh", paddingTop: 70 }}
      >
        <Row>
          <Col></Col>
          <Col>
            <div
              style={{
                backgroundColor: "#FFFF",
              }}
            >
              <div className="">
                <img
                  style={{
                    width: "100%",

                    objectFit: "cover",
                  }}
                  className=""
                  src={`http://localhost:5000/uploads/${linkData?.image}`}
                />
              </div>

              <h1
                className="text-center"
                style={{
                  color: "#412E28",
                }}
              >
                {linkData?.title}
              </h1>
              <p
                style={{
                  color: "#412E28",
                }}
                className="text-center"
              >
                {linkData?.description}
              </p>

              <br />
              <div>
                {linkData?.links?.map((link, index) => {
                  if (index < 2) {
                    return (
                      <>
                        <div className="d-flex align-items-center bg-white my-2 py-2 pl-2 border-top">
                          <img
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "cover",
                            }}
                            className="rounded-circle"
                            src={`http://localhost:5000/uploads/${link.image}`}
                          />

                          <a
                            style={{
                              color: "#412E28",
                            }}
                            href={`https://${link.url}`}
                            className="text-center ml-3"
                          >
                            {link.title}
                          </a>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="d-flex align-items-center bg-white my-2 py-2 pl-2 border-top">
                          <img
                            style={{
                              height: "50px",
                              width: "50px",
                              objectFit: "cover",
                            }}
                            className="rounded-circle"
                            src={`http://localhost:5000/uploads/${link.image}`}
                          />

                          <a
                            style={{
                              color: "#412E28",
                            }}
                            href={`https://${link.url}`}
                            className="text-center ml-3"
                          >
                            {link.title}
                          </a>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Blur>
    </>
  );
}

export default Preview4;
