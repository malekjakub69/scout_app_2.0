import React from "react";
import "./not-found.scss";
import { Redirect } from "react-router-dom";

function NotFound() {
  if (window.location.pathname === "/") return <Redirect to={"/home"} />;

  return (
    <div>
      <h1> 404 : Page "{window.location.pathname}" not found </h1>
    </div>
  );
}

export default NotFound;
