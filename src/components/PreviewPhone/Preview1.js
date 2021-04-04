import React from "react";
import { Col, Row } from "react-bootstrap";

function Preview1({ linkData }) {
  return (
    <div>
      <div
        className="mx-auto position-absolute"
        style={{
          width: 400,
          left: 0,
          paddingLeft: 100,
          paddingRight: 100,
          zIndex: 1,
          marginTop: "3rem",
        }}
      >
        <div className="d-flex justify-content-center">
          <img
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
            }}
            className="rounded-circle"
            src={`${
              linkData?.imagePreviewUrl != ""
                ? linkData?.imagePreviewUrl
                : "/assets/images/preview-image.png"
            }`}
          />
        </div>

        <h1 className="text-center h4 mt-2" style={{ wordWrap: "break-word" }}>
          {linkData?.title != "" ? linkData?.title : "Title Empty"}
        </h1>
        <p className="text-center">
          {linkData?.description != ""
            ? linkData?.description
            : "Description Empty"}
        </p>

        {linkData?.links?.map((link) => {
          return (
            <>
              <Row className="d-flex align-items-center bg-primary-black my-2 py-2">
                <Col xs={3}>
                  <img
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                    src={`${
                      link.imagePreviewUrl != ""
                        ? link.imagePreviewUrl
                        : "/assets/images/preview-image.png"
                    }`}
                  />
                </Col>
                <Col className="d-flex">
                  <a
                    href={`https://${link.urlLink}`}
                    className="text-center text-white"
                  >
                    {link.titleLink != "" ? link.titleLink : "link empty"}
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
