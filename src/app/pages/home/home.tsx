import React, { useContext } from "react";
import "./home.scss";
import { UserContext } from "../../../libs/contexts/user-context/user-context-provider";
import MyButton from "../../components/my-button/my-button";

function Home() {
  const { user } = useContext(UserContext)!;

  return (
    <div className={"home"}>
      <MyButton href={user ? "/2/navigation" : "/2/show_points"}>Šestka</MyButton>
      <MyButton href={user ? "/1/navigation" : "/1/show_points"}>Pětka</MyButton>
      {user && user.id > 0 ? (
        <MyButton href={"/logout"}>Odhlásit se</MyButton>
      ) : (
        <MyButton href={"/login"}>Přihlásit se</MyButton>
      )}
      {user && user.roles.includes("ROLE_FULL_ADMIN") && (
        <>
          <MyButton href={"/changeRoles"}>Změna práv</MyButton>
        </>
      )}
    </div>
  );
}

export default Home;
