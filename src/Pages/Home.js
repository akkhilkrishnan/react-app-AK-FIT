import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home (){
    const [menuList, setMenuList] = useState(['Design Workout','Add New Member','View Member Details','Add Workouts'])
    const handleClick = (menuName) => {
        // setActiveTab(menuName)
        }

return (<><div className="home-container"> 
    {menuList.map((menuItem, index) => {
      return (<Link className='Home-widgets'key={index} to={menuItem.toLowerCase().replace(/ /g, '')} onClick={() => {
        handleClick(menuItem);
      }}>{menuItem.toUpperCase()}</Link>)
    })}

  </div></>)
}
export default Home