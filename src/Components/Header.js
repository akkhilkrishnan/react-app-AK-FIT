
import { bottomNavigationActionClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { Outlet, Link, Router } from "react-router-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import Button from "@mui/material/Button";

function Header() {
  const menuList=['Design Workout','Add New Member','View Member Details','Add Workouts']
  const [openDropDown, setOpenDropDown] = useState([])

  //   const [menuList, setMenuList] = useState([{
//     "name": "Design Workout",
//     'active': false
//   }, {
//     "name": "Add New Member",
//     'active': false
//   }, {
//     "name": "View Member Details",
//     'active': true
//   }, 
//   {
//     "name": "Add Workouts",
//     'active': true
//   }
//   {
//     "name": "Add Workouts",
//     'active': true
//   }
// ]
//   )
  const [activeTab, setActiveTab] = useState('Home')

  const handleClick = (menuName) => {
  setActiveTab(menuName)
  }
  const handleLogoCLick = () => {
    setActiveTab('/home')

    }
  const handleLogin=()=>{
    console.log('loginnn')
    setOpenDropDown(!openDropDown)

  }
  return (
    <div className="header">
      <Link to="home" className="home-logo" onClick={()=>handleLogoCLick}>
      <img style={{width:'45px'}}src="assets/images/gritLogo.png" alt="logo image" />
        {/* <span>GRIT</span> */}
        <img style={{width:'70px'}} src="assets/images/gritNameImg.png" alt="logo image" />

      </Link>
      <div className="menu-container">
      <Navbar>
        <Nav>
          <ul>
            {menuList.map((menuItem, index) => {
              // console.log('seletesds:::', selected[index])
              return (<li className={menuItem==activeTab ? 'selected-style' : ''} key={index}> <Link to={menuItem.toLowerCase().replace(/ /g, '')} onClick={() => {
                handleClick(menuItem);
              }}>{menuItem}</Link></li>)
            })}

          </ul>
        </Nav>
      </Navbar>
      </div>
      <div className="search-container">
        {/* <div className="search-box">
               <input class="mainLoginInput" type="text" placeholder="&#61442; Search on Marketplace"/>
                 <i className="fa fa-search"></i> 
             </div> */}
        {/* <Button className="login-btn" variant="contained" >Login/Sign-up</Button> */}
        <img  className="login-btn"src="assets/images/loginIcon.svg" alt="logo image" onClick={handleLogin}></img>
      </div>
      {openDropDown&&<div>
<ul>
  <li>Log out</li>
</ul>

        </div>}
    </div>
  );
}
export default Header;

