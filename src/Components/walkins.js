import React, { useEffect, useState } from "react";
import { formatDate } from "../Helper/helperFunctions";

export default function Walkins(props) {
  const { currentMonthMembers } = props;
  return (
    <div>
      <div className="homepage-card">
        <p className="home-headings">Walk-Ins</p>
        {currentMonthMembers.map((member) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "8px",
                color: "#a44e09",
              }}
            >
              <div> {member.name}</div>
              <div>
                {member.membershipstart
                  ? formatDate(member.membershipstart)
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
