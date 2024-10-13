import React, { useEffect, useState } from "react";

import {
  formatDate,
  isJoiningDateThisMonth,
  parseDate,
} from "../Helper/helperFunctions.js";

function Home() {
  // const [menuList, setMenuList] = useState(['Design Workout','Add New Member','View Member Details','Add Workouts'])
  const [membersData, setMembersData] = useState([]);
  const [targetSale, setTargetSale] = useState(200000);

  const currentDate = new Date();

  useEffect(() => {
    getmembersData();
  }, []);
  const getmembersData = () => {
    fetch("http://localhost:5000/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMembersData(data);
      });
  };
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter members who joined this month
  const currentMonthMembers = membersData.filter((member) => {
    if (member && member.joiningDate) {
      const membershipStartDate = new Date(parseDate(member.joiningDate));

      // Check if membershipStartDate is valid
      return (
        !isNaN(membershipStartDate) && // Ensure it's a valid date
        membershipStartDate.getMonth() === currentMonth &&
        membershipStartDate.getFullYear() === currentYear
      );
    }
    return false;
  });
  // Sum the amounts paid by those members
  const currentMonthSale = currentMonthMembers.reduce((acc, member) => {
    return acc + Number(member.totalPaid);
  }, 0);
  const salesRatio = currentMonthSale / targetSale;
  const percentage = Math.ceil(salesRatio * 100);
  console.log(currentMonthMembers);
  // Assuming you want to store the filtered members in newMember
  const convertedMembers = currentMonthMembers.filter((member) => {
    return member.status === "converted";
  });

  return (
    <>
      <div className="home-container">
        <div style={{ display: "flex" }}>
          <div
            style={{ backgroundColor: "#5fce9b" }}
            className="dashboard-card"
          >
            <div style={{ fontSize: "26px" }}>{percentage}%</div>
            <div>Sales</div>
          </div>
          <div
            style={{ backgroundColor: "#67b6d6" }}
            className="dashboard-card"
          >
            <div style={{ fontSize: "26px" }}>{currentMonthMembers.length}</div>
            <div>Walk-ins</div>
          </div>
          <div
            style={{ backgroundColor: "#e87354" }}
            className="dashboard-card"
          >
            <div style={{ fontSize: "26px" }}>
              {convertedMembers.length}/{currentMonthMembers.length}
            </div>
            <div>Conversions</div>
          </div>
          <div
            style={{ backgroundColor: "#ecc85d" }}
            className="dashboard-card"
          >
            {" "}
            <div>Sales</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
