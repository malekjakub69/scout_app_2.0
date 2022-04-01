import React, { useRef, useState } from "react";
import "./mobile-swipe.scss";
import { IMember } from "../../../../libs/types/IMember";
import TinderCard from "react-tinder-card";

import TinderBodyCard from "../../../components/tinder-card/tinder-card";

function MobileSwipe({ children, members, membersAdd, membersRemove }: any) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const currentIndexRef = useRef(currentIndex);

  const swiped = (direction: any, nameToDelete: string, index: number) => {
    console.log(`${nameToDelete} (${index}) left the screen to ${direction}!`, currentIndexRef.current);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (id: number, direction: any, idx: number) => {
    console.log(`${id} (${idx}) leaving the screen to ${direction}!`, currentIndexRef.current);
  };

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  if (members && currentIndex === -1) {
    setCurrentIndex(members.length);
  }

  return (
    <div className={"mobileSwipe"}>
      {members &&
        members.map((member: IMember, index: number) => (
          <TinderCard
            className="swipe"
            key={member.key}
            onSwipe={(dir: any) => swiped(dir, member.name, index)}
            preventSwipe={["up", "down"]}
            swipeThreshold={10}
            onCardLeftScreen={(direction) => outOfFrame(member.id, direction, index)}
          >
            <TinderBodyCard>
              {(member.name ?? " --  ") + " "}
              {(member.nickname ?? " -- ") + " "}
              {(member.surname ?? " -- ") + " "}
            </TinderBodyCard>
          </TinderCard>
        ))}
    </div>
  );
}

export default MobileSwipe;
