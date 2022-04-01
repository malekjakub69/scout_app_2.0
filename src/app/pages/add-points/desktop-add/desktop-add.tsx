import { Col, Row } from "antd";
import React from "react";
import "./desktop-add.scss";
import ListItem from "../../../components/list-item/list-item";
import { IMember } from "../../../../libs/types/IMember";

function DesktopAdd({ membersOnMeet, membersNoMeet, membersAdd, membersRemove }: any) {
  return (
    <div className={"desktopAdd"}>
      <Row>
        <Col className={"leftSide"} span={12}>
          <h1>Přítomní členové</h1>
          {membersOnMeet.map((item: IMember) => (
            <ListItem addData={membersAdd} removeData={membersRemove} key={item.id} onMeetData={item} />
          ))}
        </Col>
        <Col className={"rightSide"} span={12}>
          <h1>Nepřítomní členové</h1>
          {membersNoMeet.map((item: IMember) => (
            <ListItem addData={membersAdd} removeData={membersRemove} key={item.id} noMeetData={item} />
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default DesktopAdd;
