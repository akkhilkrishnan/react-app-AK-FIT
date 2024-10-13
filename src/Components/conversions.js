import React, { useEffect, useState } from "react";
import { formatDate } from "../Helper/helperFunctions";

export default function Convertions(props) {
  const { currentMonthMembers } = props;
  return (
    <div>
      <div className="homepage-card">
        <p className="home-headings">Conversions</p>
        {currentMonthMembers.map((member) => {
          return (
            <div style={{ display: "flex", gap: "10px" }}>
              <div> {member.name} paid</div>
              <div style={{ color: "#00c0ffb3" }}> ₹{member.totalPaid}</div>
              <span>on</span>
              <div style={{ color: "#00c0ffb3" }}>
                {" "}
                {member.membershipstart != null
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
