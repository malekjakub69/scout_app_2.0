import React, { useState, useContext } from "react";
import { Input } from "antd";
import "./login.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../../libs/contexts/user-context/user-context-provider";
import Loading from "../../../components/loading/loading";
import MyButton from "../../../components/my-button/my-button";

function Login() {
  const { loginUser, wait, loggedInCheck } = useContext(UserContext)!;

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: any) => {
    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setErrMsg("Prosím vyplň všechna pole!");
      return;
    }

    if (loginUser) {
      const data = await loginUser(formData);
      if (data.success) {
        setLoading(true);
        if (loggedInCheck) {
          await loggedInCheck();
          window.location.pathname = "/";
          return;
        }
      }
      setErrMsg(data.message);
    }
  };

  if (loading || wait) return <Loading />;

  return (
    <>
      <div className="screen-1">
        {errMsg && <div className="error">{errMsg}</div>}
        <form>
          <div className="email">
            <label htmlFor="email">Email</label>
            <div className="sec-2">
              <Input onChange={onChangeInput} type="email" name="email" id="email" placeholder="email@gmail.com" />
            </div>
          </div>
          <div className="password">
            <label htmlFor="password">Heslo</label>
            <div className="sec-2">
              <Input
                onChange={onChangeInput}
                className="pas"
                type="password"
                name="password"
                id="password"
                placeholder="············"
              />
            </div>
          </div>
          <MyButton onClick={submitForm} htmlType="submit" className="login">
            Přihlásit se
          </MyButton>
          <NavLink to={"/register"}>
            <MyButton className={"register"} type="default" width={"300px"}>
              Registrovat se
            </MyButton>
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default Login;
