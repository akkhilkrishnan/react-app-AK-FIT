import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const navigate = useNavigate();

  const [menuList, setMenuList] = useState([
    "Dashboard",
    // "Member Attendance",
    "Design Workout",
    "View Member Details",
    "Add New Member",
    // "Add Workouts",
    // "Employee Payroll",
    // "Meal plans",
  ]);
  const [activeTab, setActiveTab] = useState("Home");
  const handleClick = (menuName) => {
    navigate(`/${menuName.toLowerCase().replace(/ /g, "")}`);
    setActiveTab(menuName);
  };
  return (
    <div className="side-bar">
      <Navbar>
        <Nav>
          <p
            style={{ textAlign: "left", paddingLeft: "20px", fontSize: "14px" }}
          >
            Navigation
          </p>
          <div className="nav-container">
            {menuList.map((menuItem, index) => {
              // console.log('seletesds:::', selected[index])
              return (
                <div
                  className={
                    menuItem == activeTab
                      ? "nav-selected-style nav-menu"
                      : "nav-menu"
                  }
                  key={index}
                  onClick={() => handleClick(menuItem)}
                >
                  <span className="nav-img-style">
                    <img
                      src="assets/images/member.svg"
                      style={{ margin: "0px 8px 0 0" }}
                      alt="loading"
                    />
                  </span>
                  {menuItem}
                </div>
              );
            })}
          </div>
        </Nav>
      </Navbar>
    </div>
  );
};

export default SideNavBar;
