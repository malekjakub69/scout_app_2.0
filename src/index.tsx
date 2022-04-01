import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./app/app";
import { UserContextProvider } from "./libs/contexts/user-context/user-context-provider";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
