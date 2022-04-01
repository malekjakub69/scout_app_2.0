import axios from "axios";

const loginToken = localStorage.getItem("loginToken");
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
} else {
  // production code
}
export default axios.create({
  baseURL:
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost"
      : "http://skaut.4fan.cz/scout_api",
  headers: {
    "Content-type": "application/json",
    Token: loginToken ? loginToken : "",
  },
});
