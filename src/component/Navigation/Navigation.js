import React from "react";

const Navigation = ({ routeChange, isSignin }) => {
  if (isSignin) {
    return (
      <nav
        style={{
          marginLeft: "auto"
        }}
        className="ma4"
      >
        <span
          className="f3 link dim black underline pa3 pointer"
          onClick={() => routeChange("signout")}
        >
          {" "}
          Sign Out{" "}
        </span>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          marginLeft: "auto"
        }}
        className="ma4"
      >
        <span
          className="f3 link dim black underline pa3 pointer"
          onClick={() => routeChange("signin")}
        >
          {" "}
          Sign In{" "}
        </span>
        <span
          className="f link dim black underline pa3 pointer"
          onClick={() => routeChange("register")}
        >
          {" "}
          Register{" "}
        </span>
      </nav>
    );
  }
};
export default Navigation;
