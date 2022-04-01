import React, { useState } from "react";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import MyButton from "../../../components/my-button/my-button";
import axios from "../../../../libs/api/base";

async function newPassword(credentials: any) {
  console.log(credentials);
  return axios
    .post("/login/newPassword.php", {
      ...credentials,
    })
    .then((data) => data);
}

function NewPassword() {
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secure: "",
  });

  const onChangeInput = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: any) => {
    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setErrMsg("Vyplň všechna pole!");
      return;
    }
    const data = await newPassword(formData);
    if (data.data.success) {
      window.location.pathname = "/";
    }
    setErrMsg(data.data.message);
  };

  return (
    <>
      <div className="screen-1">
        {errMsg && <div className="error">{errMsg}</div>}
        <form>
          <div className="email">
            <label htmlFor="email">Email</label>
            <div className="sec-2">
              <Input onChange={onChangeInput} type="email" name="email" placeholder="email@gmail.com" />
            </div>
          </div>
          <div className="name">
            <label htmlFor="email">Bezpečnostní kód</label>
            <div className="sec-2">
              <Input onChange={onChangeInput} type="text" name="secure" placeholder="AAAAAAAAAA" />
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
                placeholder="············"
              />
            </div>
          </div>
          <MyButton onClick={submitForm} className="login">
            Obnovit heslo
          </MyButton>
          <NavLink to={"/login"}>
            <MyButton className={"register"}>Přihlásit se</MyButton>
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default NewPassword;
