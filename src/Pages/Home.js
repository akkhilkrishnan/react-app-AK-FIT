import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginPage from "../LoginPage";

function Home() {
  // const [menuList, setMenuList] = useState(['Design Workout','Add New Member','View Member Details','Add Workouts'])
  const [membersData, setMembersData] = useState([]);
  const currentDate = new Date();
  const [currentSale, setCurrentSale] = useState(0);
  const [targetSale, setTargetSale] = useState(450000);
  let indianCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits:0
});
  useEffect(() => {
    getmembersData();
  }
    , []);


  const getmembersData = () => {
    fetch("http://localhost:5000/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        response.json()
      )
      .then((data) => {
        console.log("data:::", data[1].amountpaid)
        setMembersData(data);

      });
  };
  useEffect(() => {
    const totalAmount = membersData.reduce((acc, item) => {
      const dojDate = new Date(item.doj);
      if (dojDate.getMonth() === currentDate.getMonth() && dojDate.getFullYear() === currentDate.getFullYear()) {
        return acc + Number(item.amountpaid);
      }
      return acc;
    }, 0);

    setCurrentSale(totalAmount);
  }, [membersData, currentDate]);
  return (<><div className="home-container">
    <div style={{
      display: 'flex', flexWrap:
        "wrap", gap:"40px"
    }}>
      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <h1>CURRENT SALES</h1>
        <div style={{ fontSize: '50px', color: 'Green' }}>  {indianCurrency.format(currentSale)}</div>
        {/* <div style={{fontSize:'50px', color:'Green'}}>  {targetSale}</div> */}
        <h1>TARGET</h1>
        <div style={{ fontSize: '50px', color: 'Green' }}>  {indianCurrency.format(targetSale - currentSale)}</div>
      </div>
      <div>
      <h1>CURRENT SALES</h1>
        <div style={{ fontSize: '50px', color: 'Green' }}>  {indianCurrency.format(currentSale)}</div>
        <h1>TARGET</h1>
        <div style={{ fontSize: '50px', color: 'Green' }}>  {indianCurrency.format(targetSale - currentSale)}</div>
      </div>
    </div>

  </div></>)
}
export default Home