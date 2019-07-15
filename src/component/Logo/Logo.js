import React from "react";
import "./logo.css";
import brain from "./brain.png";
import Tilt from "react-tilt";
const Logo = () => {
  return (
    <div className="ma3 mt2">
      <Tilt
        className="Tilt bx2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: "5px" }} alt="logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
