import React from "react";
import "./list-item.scss";
import { Button } from "antd";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

function ListItem({ children, onMeetData, noMeetData, addData, removeData }: any) {
  return onMeetData ? (
    <div className={"listItem"}>
      <div key={onMeetData.id} className={"oneItem left"}>
        {onMeetData.name} {onMeetData.nickname} {onMeetData.surname}
        <Button onClick={() => removeData(onMeetData.id)} size={"large"} className={"moveButton addButton"}>
          <CaretRightOutlined />
        </Button>
      </div>
    </div>
  ) : (
    <div className={"listItem"}>
      <div key={noMeetData.id} className={"oneItem right"}>
        <Button onClick={() => addData(noMeetData.id)} size={"large"} className={"moveButton removeButton"}>
          <CaretLeftOutlined />
        </Button>
        {noMeetData.name ?? "--"} {noMeetData.nickname ?? "--"} {noMeetData.surname ?? "--"}{" "}
      </div>
    </div>
  );
}

export default ListItem;
