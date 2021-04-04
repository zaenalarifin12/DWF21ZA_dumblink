import React from "react";
import HeaderHome from "../HeaderHome";
import SideBar from "../SideBar";

function Body({ children, title }) {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <HeaderHome title={title} />

      <div class="container-fluid bg-white">
        <div class="row">
          <SideBar />

          {children}
        </div>
      </div>
    </div>
  );
}

export default Body;
