import React, { useContext, useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import "./add-points.scss";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../libs/contexts/user-context/user-context-provider";
import axios from "../../../libs/api/base";

import { IMember } from "../../../libs/types/IMember";
import { IMeet } from "../../../libs/types/IMeet";

import { Select } from "antd";
import Loading from "../../components/loading/loading";
import MyButton from "../../components/my-button/my-button";
import MobileSwipe from "./mobile-swipe/mobile-swipe";
import DesktopAdd from "./desktop-add/desktop-add";

const { Option } = Select;

function AddPoints() {
  const { troop_id } = useParams<{ troop_id: string }>();
  const { user } = useContext(UserContext)!;

  const [membersOnMeet, setMembersOnMeet] = useState([] as IMember[]);
  const [membersNoMeet, setMembersNoMeet] = useState([] as IMember[]);
  const [meets, setMeets] = useState([] as IMeet[]);
  const [loading, setLoading] = useState(true);
  const [selectedMeet, setSelectedMeet] = useState(null);

  useEffect(() => {
    document.title = "Bodování - " + document.title;

    const fetchData = async () => {
      var url = "members/getMembersWhereTroop.php?troop_id=" + troop_id;
      var response = await axios.get(url);
      var data = response.data;
      setMembersNoMeet(data.body);

      url = "meets/getMeetsWhereTroop.php?troop_id=" + troop_id;
      response = await axios.get(url);
      data = response.data;
      setMeets(data.body);

      setLoading(false);
    };
    fetchData();
  }, [troop_id]);

  if (loading) {
    return <Loading />;
  }

  const membersAdd = (id: number) => {
    const member: IMember | undefined = membersNoMeet.find((item) => item.id === id);
    if (member) {
      const members: IMember[] = membersOnMeet;
      members.push(member);
      setMembersOnMeet(members);
      setMembersNoMeet(membersNoMeet.filter((item: IMember) => item !== member));
    }
  };

  const membersRemove = (id: number) => {
    const member: IMember | undefined = membersOnMeet.find((item) => item.id === id);
    if (member) {
      const members: IMember[] = membersNoMeet;
      members.push(member);
      setMembersNoMeet(members);
      setMembersOnMeet(membersOnMeet.filter((item: IMember) => item !== member));
    }
  };

  return (
    <div className="AddPoints">
      {!selectedMeet ? (
        <div className={"ChooseMeet"}>
          <div>Schůzka</div>
          <Select
            onSelect={(item: any) => {
              setSelectedMeet(item);
            }}
            className={"select"}
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
          >
            {meets &&
              meets.map((meet: IMeet, index: number) => (
                <Option key={meet.id}>
                  {meet.date} - {meet.topic}
                </Option>
              ))}
          </Select>
        </div>
      ) : (
        <>
          <MyButton style={window.innerWidth > 800 ? { display: "inline" } : {}} onClick={() => setSelectedMeet(null)}>
            Uložit
          </MyButton>
          <MyButton style={window.innerWidth > 800 ? { display: "inline" } : {}} onClick={() => setSelectedMeet(null)}>
            Zpět
          </MyButton>
          <MobileView>
            <MobileSwipe members={membersNoMeet} membersAdd={membersAdd} membersRemove={membersRemove} />
          </MobileView>
          <BrowserView>
            <DesktopAdd
              membersOnMeet={membersOnMeet}
              membersNoMeet={membersNoMeet}
              membersAdd={membersAdd}
              membersRemove={membersRemove}
            />
          </BrowserView>
        </>
      )}
    </div>
  );
}

export default AddPoints;
