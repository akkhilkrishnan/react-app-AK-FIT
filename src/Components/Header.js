
import { bottomNavigationActionClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Outlet, Link, Router } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Button from "@mui/material/Button";

function Header() {
  const [menuList, setMenuList] = useState([{
    "name": "Design Workout",
    'active': false
  }, {
    "name": "Add New Member",
    'active': false
  }, {
    "name": "View Member Details",
    'active': true
  }, {
    "name": "View Graph",
    'active': true
  }]
  )
  // const menuList =
  const [activeTab, setActiveTab] = useState('Design Workout')

  let className
  const handleClick = (menuName) => {
  setActiveTab(menuName)
  }
  return (
    <div className="header">
      <div className="home-logo">
        <a href="/" />
        <img src="assets/images/logo.svg" alt="logo image" />

        <span>AK-FIT</span>
      </div>
      <Navbar>
        <Nav>
          <ul>
            {menuList.map((menuItem, index) => {
              // console.log('seletesds:::', selected[index])
              return (<li className={menuItem.name==activeTab ? 'selected-style' : ''} key={index}> <Link to={menuItem.name.toLowerCase().replace(/ /g, '')} onClick={() => {
                handleClick(menuItem.name);
              }}>{menuItem.name}</Link></li>)
            })}

          </ul>
        </Nav>
      </Navbar>
      <div className="search-container">
        {/* <div className="search-box">
               <input class="mainLoginInput" type="text" placeholder="&#61442; Search on Marketplace"/>
                 <i className="fa fa-search"></i> 
             </div> */}
        <Button className="login-btn" variant="contained" >Login/Sign-up</Button>
      </div>
    </div>
  );
}
export default Header;

