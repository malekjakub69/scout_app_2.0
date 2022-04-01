import React from "react";
import "./main-menu.scss";
import { useParams } from "react-router-dom";
import MyButton from "../../components/my-button/my-button";

function MainMenu() {
  const { troop_id } = useParams<{ troop_id: string }>();

  console.log(troop_id);

  return (
    <div className="MainMenu">
      <MyButton href={"/" + troop_id + "/show_points"}>Průběžné výsledky</MyButton>
      <MyButton href={"/" + troop_id + "/add_points"}>Zapsat body</MyButton>
    </div>
  );
}

export default MainMenu;
