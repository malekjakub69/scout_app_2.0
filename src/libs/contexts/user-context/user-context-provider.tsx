import { createContext, useState, useEffect } from "react";
import Axios from "../../api/base";

interface IAuthContext {
  user: any;
  wait: boolean;
  registerUser?: ({ email, password }: any) => any;
  loginUser?: ({ email, password }: any) => any;
  loggedInCheck?: () => void;
  logout?: () => void;
}

export const UserContext = createContext({} as IAuthContext | undefined);

export const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [wait, setWait] = useState(false);

  const registerUser = async ({ username, email, password }: any) => {
    setWait(true);
    try {
      const { data } = await Axios.post("login/register.php", {
        username,
        email,
        password,
      });
      setWait(false);
      return data;
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loginUser = async ({ email, password }: any) => {
    setWait(true);
    try {
      const { data } = await Axios.post("login/login.php", {
        email,
        password,
      });
      if (data.success && data.token) {
        localStorage.setItem("loginToken", data.token);
        setWait(false);
        return { success: 1 };
      }
      setWait(false);
      return { success: 0, message: data.message };
    } catch (err) {
      setWait(false);
      return { success: 0, message: "Server Error!" };
    }
  };

  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      const { data } = await Axios.get("login/getUser.php");
      if (data.success && data.user) {
        setUser(data.user);
        return;
      }
      setUser(null);
    }
  };

  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

  const logout = () => {
    localStorage.removeItem("loginToken");
    setUser(null);
  };

  return <UserContext.Provider value={{ registerUser, loginUser, wait, user, loggedInCheck, logout }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
