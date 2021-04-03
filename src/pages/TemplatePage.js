import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Body from "../components/Body";
import HeaderHome from "../components/HeaderHome";
import SideBar from "../components/SideBar";

function Template() {
  return (
    <Body>
      <main
        role="main"
        class="col-md-9 ml-sm-auto col-lg-10 px-md-4 bg-light d-flex justify-content-around pt-4"
      >
        <Link to={`add-link`}>
          <img src="/assets/images/template-preview-1.png" width="350px" />
        </Link>
        <Link to={`add-link`}>
          <img src="/assets/images/template-preview-2.png" width="350px" />
        </Link>
        <Link to={`add-link`}>
          <img src="/assets/images/template-preview-3.png" width="350px" />
        </Link>
        <Link to={`add-link`}>
          <img src="/assets/images/template-preview-4.png" width="350px" />
        </Link>
      </main>
    </Body>
  );
}

export default Template;
