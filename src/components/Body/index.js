import React from "react";
import HeaderHome from "../HeaderHome";
import SideBar from "../SideBar";

function Body({ children }) {
  return (
    <div style={{ backgroundColor: "#E5E5E5" }}>
      <HeaderHome />

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
