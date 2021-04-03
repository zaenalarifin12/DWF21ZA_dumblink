import React from "react";
import { Col, Row } from "react-bootstrap";

function Preview2({ linkData }) {
  return (
    <>
      <div className="container pt-5">
        {/*  */}
        <div
          className="py-5"
          style={{
            backgroundColor: "#C5D4D1",
            paddingLeft: 200,
            paddingRight: 200,
          }}
        >
          <div className="d-flex justify-content-center">
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              className="rounded-circle border border-white"
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

          {linkData?.links?.map((link) => {
            return (
              <>
                <Row
                  className="d-flex align-items-center bg-white my-2 py-2"
                  style={{
                    borderRadius: "50px 50px 50px 50px",
                  }}
                >
                  <Col className="d-flex justify-content-end">
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
                  <Col>
                    <a
                      style={{
                        color: "#412E28",
                      }}
                      href={`https://${link.url}`}
                      className="text-center"
                    >
                      {link.title}
                    </a>
                  </Col>
                </Row>
              </>
            );
          })}
        </div>

        {/*  */}
      </div>
    </>
  );
}

export default Preview2;
