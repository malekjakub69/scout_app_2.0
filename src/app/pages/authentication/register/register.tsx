import React, { useContext, useState } from "react";
import { Input } from "antd";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../../libs/contexts/user-context/user-context-provider";
import MyButton from "../../../components/my-button/my-button";

function Register() {
  const { registerUser } = useContext(UserContext)!;
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    username: "",
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
    e.preventDefault();

    if (!Object.values(formData).every((val) => val.trim() !== "")) {
      setSuccessMsg("");
      setErrMsg("Prosím vyplň všechna pole!");
      return;
    }

    if (registerUser) {
      const data = await registerUser(formData);
      if (data.success) {
        e.target.reset();
        setSuccessMsg("Úspěšně zaregistrován.");
        setErrMsg("");
      } else if (!data.success && data.message) {
        setSuccessMsg("");
        setErrMsg(data.message);
      }
    }
  };

  return (
    <>
      <div className="screen-1">
        {successMsg && <div className="success">{successMsg}</div>}
        {errMsg && <div className="error">{errMsg}</div>}
        <form onSubmit={submitForm}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <div className="sec-2">
              <Input onChange={onChangeInput} type="email" id="email" name="email" placeholder="email@gmail.com" />
            </div>
          </div>
          <div className="name">
            <label htmlFor="email">Jméno</label>
            <div className="sec-2">
              <Input
                onChange={onChangeInput}
                type="name"
                id="username"
                name="username"
                placeholder="Jméno / Přezdívka"
              />
            </div>
          </div>
          <div className="password">
            <label htmlFor="password">Heslo</label>
            <div className="sec-2">
              <Input
                onChange={onChangeInput}
                className="pas"
                type="password"
                id="password"
                name="password"
                placeholder="············"
              />
            </div>
          </div>
          <MyButton htmlType={"submit"} className="login">
            Registrovat se
          </MyButton>
          <NavLink to={"/login"}>
            <MyButton className={"register"} type="default" width={"300px"}>
              Přihlásit se
            </MyButton>
          </NavLink>
        </form>
      </div>
    </>
  );
}

export default Register;
