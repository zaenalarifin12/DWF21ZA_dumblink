import React from "react";
import { Col, Row } from "react-bootstrap";
import Blur from "react-blur";

function Preview4({ linkData }) {
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
            <div
              className="mx-auto rounded"
              style={{
                width: 230,
                backgroundColor: "#FFFF",
              }}
            >
              <div>
                <img
                  style={{
                    width: "100%",
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

                  color: "#412E28",
                }}
              >
                {linkData?.title != "" ? linkData?.title : "Title Empty"}
              </h1>
              <p
                style={{
                  wordWrap: "break-word",

                  color: "#412E28",
                }}
                className="text-center"
              >
                {linkData?.description != ""
                  ? linkData?.description
                  : "Description Empty"}
              </p>

              <div>
                {linkData?.links?.map((link, index) => {
                  return (
                    <>
                      <div className="d-flex align-items-center bg-white my-2 py-2 pl-4 border-top">
                        <img
                          style={{
                            height: "30px",
                            width: "30px",
                            objectFit: "cover",
                          }}
                          className="rounded-circle"
                          src={`${
                            link.imagePreviewUrl != ""
                              ? link.imagePreviewUrl
                              : "/assets/images/preview-image.png"
                          }`}
                        />

                        <a
                          style={{
                            color: "#412E28",
                          }}
                          href={`https://${link.url}`}
                          className="text-center ml-3"
                        >
                          {link.titleLink != "" ? link.titleLink : "link empty"}
                        </a>
                      </div>
                    </>
                  );
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
