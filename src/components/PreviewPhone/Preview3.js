import React from "react";
import { Col, Row } from "react-bootstrap";
import Blur from "react-blur";

function Preview3({ linkData }) {
  return (
    <>
      <Blur
        img={`${
          linkData?.imagePreviewUrl != ""
            ? linkData?.imagePreviewUrl
            : "/assets/images/preview-image.png"
        }`}
        className="mx-auto position-absolute"
        blurRadius={5}
        enableStyles
        style={{
          width: 270,
          height: 550,
          left: 70,
          paddingLeft: 15,
          paddingRight: 20,
          zIndex: 1,
          marginTop: "1rem",
          paddingTop: "1rem",
          marginBottom: "5rem",
          PaddingBottom: "5rem",
        }}
      >
        <Row>
          <Col></Col>
          <Col>
            <div className="container pt-4 mx-auto ">
              {/*  */}
              <div className="py-2 mt-4 mx-auto bg-white shadow-lg rounded">
                <div className="d-flex justify-content-center">
                  <img
                    style={{
                      width: "190px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    className=""
                    src={`${
                      linkData?.imagePreviewUrl != ""
                        ? linkData?.imagePreviewUrl
                        : "/assets/images/preview-image.png"
                    }`}
                  />
                </div>

                <h1
                  className="text-center h4 mt-2"
                  style={{
                    wordWrap: "break-word",
                    color: "#333333",
                  }}
                >
                  {linkData?.title != "" ? linkData?.title : "Title Empty"}
                </h1>
                <p
                  style={{
                    wordWrap: "break-word",
                    color: "#333333",
                  }}
                  className="text-center"
                >
                  {linkData?.description != ""
                    ? linkData?.description
                    : "Description Empty"}
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
                          className="mx-1 p-1 rounded-circle"
                          href={`https://${link.url}`}
                        >
                          <img
                            style={{
                              height: "20px",
                              width: "20px",
                              objectFit: "cover",
                            }}
                            className="rounded-circle "
                            src={`${
                              link.imagePreviewUrl != ""
                                ? link.imagePreviewUrl
                                : "/assets/images/preview-image.png"
                            }`}
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
