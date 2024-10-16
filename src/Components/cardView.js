import React, { memo, useEffect, useState } from "react";
import { formatUrl } from "../Helper/helperFunctions";
export default function CardView(props) {
  const { membersData } = props;
  return (
    <div className="member-card-container">
      {membersData.map((member) => {
        return (
          <div className="membercard">
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <img
                src={
                  member.url
                    ? formatUrl(member.url)
                    : `/assets/images/image_NeeravBafna.jpg`
                }
                class="card-avatar"
                alt="Avatar"
              />
              <div className="member-profile">
                <div className="name-style"> {member.name.toUpperCase()}</div>
                <div className="phn-style"> {member.phone}</div>
                <div className="phn-style"> {member.email}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
