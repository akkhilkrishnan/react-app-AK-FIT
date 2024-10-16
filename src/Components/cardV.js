import React, { memo, useEffect, useState } from "react";
export default function CardV(props) {
  const { membersData } = props;
  return (
    <div>
      {membersData.map((member) => {
        return (
          <div className="membercard-style">
            <div>
              <div> {member.name}</div>
              <div> {member.phone}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
