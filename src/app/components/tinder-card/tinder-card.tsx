import React from "react";
import "./tinder-card.scss";

function TinderBodyCard({ children, img }: any) {
  return (
    <div className="card TinderCard">
      <div className={"Name"}>{children}</div>
    </div>
  );
}

export default TinderBodyCard;
