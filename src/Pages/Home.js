import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginPage from "../LoginPage";

function Home (){
    const [menuList, setMenuList] = useState(['Design Workout','Add New Member','View Member Details','Add Workouts'])
    const handleClick = (menuName) => {
        // setActiveTab(menuName)
        }

return (<><div className="home-container"> 
<div class="container">
  <h2 class="title">
    <span class="title-word title-word-1">G </span>
    <span class="title-word title-word-2">R </span>
    <span class="title-word title-word-3">I </span>
    <span class="title-word title-word-4">T </span>
  </h2>
</div>
      {/* {menuList.map((menuItem, index) => {
        return (<Link className='Home-widgets'key={index} to={menuItem.toLowerCase().replace(/ /g, '')} onClick={() => {
          handleClick(menuItem);
        }}>{menuItem.toUpperCase()}</Link>)
      })} */}
  </div></>)
}
export default Home