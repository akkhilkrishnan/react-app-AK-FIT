import React, { useEffect, useState } from "react";

import {
  formatDate,
  isJoiningDateThisMonth,
  indianCurrency,
  parseDate,
} from "../Helper/helperFunctions.js";

function Home() {
  // const [menuList, setMenuList] = useState(['Design Workout','Add New Member','View Member Details','Add Workouts'])
  const [membersData, setMembersData] = useState([]);
  const [targetSale, setTargetSale] = useState(200000);

  const currentDate = new Date();

  useEffect(() => {
    const interval = setInterval(() => getmembersData(), 5000);
    return () => clearInterval(interval);
  }, []);
  const getmembersData = () => {
    fetch(`http://localhost:5000/data?limit=${50}&skip=${0}&flag=${"all"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMembersData(data);
        console.log(membersData);
      });
  };
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter members who joined this month
  const currentMonthMembers = membersData.filter((member) => {
    if (member && member.joiningDate && member.status !== "Pending Approval") {
      const startdate = new Date(member.joiningDate);
      // Check if membershipStartDate is valid
      return (
        !isNaN(startdate) && // Ensure it's a valid date
        startdate.getMonth() === currentMonth &&
        startdate.getFullYear() === currentYear
      );
    }
    return false;
  });

  console.log(currentMonthMembers);
  // Sum the amounts paid by those members
  const currentMonthSale = currentMonthMembers.reduce((acc, member) => {
    return acc + Number(member.totalPaid);
  }, 0);

  console.log("sdsdasd", currentMonthSale);
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
            <div className="dashcard-font">This month sales</div>

            <div className="dashcard-number">
              {indianCurrency.format(currentMonthSale)}
            </div>
          </div>
          <div
            style={{ backgroundColor: "#67b6d6" }}
            className="dashboard-card"
          >
            <div className="dashcard-font">Walk-ins</div>

            <div className="dashcard-number">{currentMonthMembers.length}</div>
          </div>
          <div
            style={{ backgroundColor: "#e87354" }}
            className="dashboard-card"
          >
            <div className="dashcard-font">Conversions</div>
            <div className="dashcard-number">
              {convertedMembers.length}/{currentMonthMembers.length}
            </div>
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
