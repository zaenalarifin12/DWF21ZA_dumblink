import React from "react";
import { Col, Row } from "react-bootstrap";

function Preview2({ linkData }) {
  return (
    <>
      <div
        className="mx-auto position-absolute"
        style={{
          backgroundColor: "#8db2be",
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
        <div
        className="rounded"
          style={{
            backgroundColor: "#C5D4D1",
            paddingBottom: 5,
          }}
        >
          <div className="d-flex justify-content-center mt-4 pt-4">
            <img
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              className="rounded-circle border border-white"
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
              color: "#412E28",
            }}
            className="text-center"
          >
            {linkData?.description != ""
              ? linkData?.description
              : "Description Empty"}
          </p>

          <br />

          {linkData?.links?.map((link) => {
            return (
              <>
                <Row
                  className="d-flex justify-content-center bg-white my-2 py-2"
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    borderRadius: "50px 50px 50px 50px",
                  }}
                >
                  <a
                    style={{
                      color: "#412E28",
                    }}
                    href={`https://${link.url}`}
                    className="text-center"
                  >
                    {link.titleLink != "" ? link.titleLink : "link empty"}
                  </a>
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
