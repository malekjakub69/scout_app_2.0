import axios from "axios";

const loginToken = localStorage.getItem("loginToken");

export default axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost"
      : "https://body.zlutaponorka.com/test_app/scout_api/",
  headers: {
    "Content-type": "application/json",
    Token: loginToken ? loginToken : "",
  },
});
