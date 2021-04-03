import React from "react";
import { withRouter } from "react-router";
import HeaderLanding from "../components/HeaderLanding";
import Hero from "../components/Hero";

function LandingPage() {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <HeaderLanding />

      <Hero />

    </div>
  );
}

export default withRouter(LandingPage);
