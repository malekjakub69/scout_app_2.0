import React, { useContext } from "react";
import { UserContext } from "../../../../libs/contexts/user-context/user-context-provider";
import { Redirect } from "react-router-dom";

function Logout() {
  const { user, logout } = useContext(UserContext)!;

  if (logout) {
    logout();
  }

  if (!user) {
  }

  return <Redirect to={"/"} />;
}

export default Logout;
