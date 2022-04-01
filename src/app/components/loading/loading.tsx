import React from "react";
import "./loading.scss";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function TinderBodyCard() {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="loading">
      <Spin size={"large"} indicator={antIcon} />
      <br />
      <br />
      <p className={"text"}> Načítání... </p>
    </div>
  );
}

export default TinderBodyCard;
