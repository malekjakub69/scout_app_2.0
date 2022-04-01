import React from "react";
import "./header.scss";
import { GiSubmarine } from "@react-icons/all-files/gi/GiSubmarine";
import { AiFillHome } from "@react-icons/all-files/ai/AiFillHome";

function MyHeader() {
  return (
    <div className="header">
      <h1>
        <a href={"/"}>Bodování</a>
      </h1>
      <h3>
        <GiSubmarine />{" "}
        <a href={"https://www.zlutaponorka.com"}>Žlutá ponorka Třebíč</a>{" "}
        <GiSubmarine />
      </h3>
      {"/" !== window.location.pathname &&
        "/home" !== window.location.pathname &&
        "/logout" !== window.location.pathname && (
          <a href={"/"}>
            <div className={"homeButton"}>
              <AiFillHome />
            </div>
          </a>
        )}
    </div>
  );
}

export default MyHeader;
