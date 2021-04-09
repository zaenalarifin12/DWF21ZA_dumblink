import { Button, Col, Row } from "react-bootstrap";
import React from "react";
import "./index.scss"

function Hero() {
  return (
    <div className="bg-primary-yellow" style={{ minHeight: "100vh" }}>
      {/* <img
        src="/assets/images/Vector-2.png"
        style={{
          position: "absolute",
          width: 2051.09,
          height: 1119,
          left: -500.82,
          bottom: -50,
        }}
      />
     

      <img
        src="/assets/images/Ellipse-1.png"
        style={{
          position: "absolute",
          // width: 467,
          height: 446,
          right: 0,
          top: 120,
        }}
      />

      <img
        src="/assets/images/Ellipse-2.png"
        style={{
          position: "absolute",
          width: 467,
          // height: 446,
          left: 0,
          bottom: -60,
        }}
      /> */}

      <div className=" container-fluid pt-5 px-5">
        <div className="row">
          <Col
            sm={12}
            md={12}
            lg={6}
            className="my-auto text-white pt-sm-0"
            style={{ paddingTop: 100 }}
          >
            <h1
              style={{
                fontSize: "72px",
                fontFamily: "Times New Roman",
              }}
            >
              The Only Link <br /> You’ll Ever Need
            </h1>
            <Col>
              <Row>
                <span
                  style={{
                    fontSize: "20px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  Add a link for your Social Bio and optimize your social media
                  traffic.
                </span>
              </Row>
              <Row className="mt-5">
                <span
                  style={{
                    fontSize: "24px",
                    fontFamily: "Times New Roman",
                  }}
                >
                  safe, fast and easy to use
                </span>
              </Row>
            </Col>
            <div>
              <Row style={{ marginTop: 100, marginBottom: 20 }}>
                <Col>
                  <Button className="btn btn-block btn-lg btn-primary-black text-white font-weight-bold display-1 mt-5">
                    Get Started For Free
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </div>
          </Col>
          <Col>
            <img
              src="/assets/images/PC.png"
              className="pc"
            />
            <img
              src="/assets/images/Phone.png"
              className="phone"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default Hero;
