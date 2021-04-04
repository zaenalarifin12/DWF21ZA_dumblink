import React from "react";
import { Link } from "react-router-dom";

function HeaderHome({ title }) {
  
  return (
    <nav class="navbar sticky-top bg-white flex-md-nowrap py-3">
      <div class="navbar-brand col-md-3 col-lg-2 mr-0 px-3 d-flex justify-content-center">
        <Link to={`/`}>
          <img style={{ width: 140 }} src="/assets/icons/logo.svg" />
        </Link>
      </div>

      <div className="col d-flex justify-content-start">
        <h1 className="h4 ml-5 text-primary-dark font-weight-bold">{title}</h1>
      </div>
    </nav>
  );
}

export default HeaderHome;
