import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Components/Modal.tsx";
import { formatDate, formatUrl } from "../Helper/helperFunctions.js";
// const fs = require("fs");
import axios from "axios";

import { ReadData } from "../Components/readData.js";
function ViewMembersInfo() {
  const navigate = useNavigate();
  const data = `Name: Neerav Bafna
DOB: 14/06/2000
Email: nkbafna14@gmail.com
Ph no: 8939264998
Emergency no: 9381024386
Height: 171.5
Weight: 92.20
Medical condition: No


Name: Bharat.M
DOB: 15/08/1987
Email:
Ph no: 9884426430
Emergency no: 9551510786
Height: 185
Weight: 96.25
Medical condition: No


Name: Bhaviya 
DOB: 06/10/2000
Email: bhaviyachawla2000@gmail.com
Ph no: 9080984119
Emergency no: 9789067807
Height: 158
Weight: 63
Medical condition: No


Name: Aswanth Kumar 
DOB: 05/10/1993
Email: nm.aswanth@gmail.com
Ph no: 9789067807
Emergency no: 9840724244
Height: 176
Weight: 90.15
Medical condition: No`;
  const [membersData, setMembersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState(null);
  const [txtData, setTxtData] = useState(null);

  useEffect(() => {
    getmembersData();

    const jsonResultArray = convertToJSONArray(data);
    // console.log("dataaa::::", JSON.stringify(jsonResultArray, null, 2));
    console.log(txtData);
  }, []);

  const getmembersData = () => {
    fetch("http://localhost:5000/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    })
      .then((response) => {
        // console.log(response.data)
        return response.json();
      })
      .then((data) => {
        // console.log("data", data);
        setMembersData(data);
      });
  };

  const fetchMemberDetails = (id) => {
    fetch("http://localhost:5000/fetchMemberDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    })
      .then((response) => {
        // console.log(response.data)
        return response.json();
      })
      .then((data) => {
        console.log("memberDetails:::::", data);
        // setMembersData(data)
      });
  };

  const extendHandle = (record_index) => {
    // let joiningDate = new Date(membersData[record_index].DOJ);
    // membersData[record_index].DOJ = joiningDate.setDate(
    //   joiningDate.getDate() + 7
    // );
    setModalType("update");
    setOpenModal(true);
  };

  const currencyFormatter = (amount) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const handleRecordClick = (index) => {
    // console.log(membersData[index]);
    // fetchMemberDetails(membersData[index]._id)
    // navigate('/:uid')
  };
  const calculateExpiryDate = (doj, subscription) => {
    var joiningDate = new Date(doj);
    let expiryDate;
    // console.log('asdasd', joiningDate, subscription)
    switch (subscription) {
      case "Monthly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 30);
        break;
      case "Quarterly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 90);
        break;
      case "Half-yearly":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 180);
        break;
      case "Annual":
        expiryDate = joiningDate.setDate(joiningDate.getDate() + 365);
        break;
    }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(
      Math.abs((new Date(expiryDate) - new Date()) / oneDay)
    );

    const memberStatusColor =
      new Date(expiryDate) <= new Date()
        ? "#DC0000"
        : diffDays <= 3
        ? "#E6A23c"
        : "#4AAc2c";
    expiryDate = new Date(expiryDate).toString().slice(0, 15);

    return { expiryDate, memberStatusColor };
  };

  const findColor = (expiryDate) => {
    const [day, month, year] = expiryDate.split("-").map(Number);
    const parsedExpiryDate = new Date(year, month - 1, day); // Month is 0-indexed

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffDays = Math.round(
      Math.abs((parsedExpiryDate - new Date()) / oneDay)
    );

    const memberStatusColor =
      parsedExpiryDate <= new Date() // Expired
        ? "#DC0000"
        : diffDays <= 3 // About to expire
        ? "#FFA500"
        : "#4AAc2c"; // Valid

    return memberStatusColor;
  };
  const handleDelete = (index) => {
    console.log(membersData[index]);
    setOpenModal(true);
    setModalType("delete");
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  function convertToJSONArray(dataString) {
    const entries = dataString.trim().split(/\n\s*\n/);
    const jsonArray = [];

    entries.forEach((entry) => {
      const lines = entry.trim().split("\n");
      const jsonObject = {};

      lines.forEach((line) => {
        const [key, value] = line.split(":").map((item) => item.trim());
        jsonObject[key] = value || null; // Use null for empty values
      });

      jsonArray.push(jsonObject);
    });

    return jsonArray;
  }
  // const formatDate = (joiningDate) => {
  //   const [day, month, year] = joiningDate.split("-").map(Number);
  //   const parsedDate = new Date(year, month - 1, day); // Month is 0-indexed

  //   const options = {
  //     weekday: "short",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   };
  //   return parsedDate.toLocaleDateString("en-US", options);
  // };
  return (
    // <div className="view-container">
    //   <div className="first-record-style">
    //     {/* <h4>SNO</h4> */}
    //     <h4>MEMBER NAME</h4>
    //     <h4>DATE OF JOINING</h4>
    //     <h4>STATUS</h4>
    //     <h4>START DATE</h4>
    //     <h4>SUBSCRIPTION</h4>
    //     <h4>PAID AMOUNT</h4>
    //     <h4>EXPIRY DATE</h4>
    //   </div>

    //   {membersData.map((member, index) => {
    //     return (
    //       <div
    //         onClick={() => handleRecordClick(index)}
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           gap: "10px",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div key={index} className="record-style">
    //           <div
    //             style={{
    //               color: `${
    //                 member.membershipend
    //                   ? findColor(member.membershipend)
    //                   : "#E6E6FA"
    //               }`,
    //               fontWeight: 100,
    //               fontSize: "16px",
    //               textTransform: "capitalize",
    //             }}
    //           >
    //             {member.name}
    //           </div>
    //           <div>
    //             {member.joiningDate ? formatDate(member.joiningDate) : "NA"}
    //           </div>
    //           <div>{member.status ? member.status : "NA"}</div>
    //           <div>
    //             {member.membershipstart
    //               ? formatDate(member.membershipstart)
    //               : "NA"}
    //           </div>
    //           <div>
    //             {member.membership !== "" ? member.membership : "Monthly"}
    //           </div>
    //           <div>
    //             {member.totalPaid ? currencyFormatter(member.totalPaid) : "NA"}
    //           </div>
    //           <div className="exp-field-style">
    //             {member.membershipend != null
    //               ? formatDate(member.membershipend)
    //               : "NA"}
    //           </div>
    //           <button
    //             className="update-btn"
    //             variant="contained"
    //             onClick={() => {
    //               extendHandle(index);
    //             }}
    //           >
    //             Renew
    //           </button>
    //           <img
    //             style={{ marginLeft: "10px", cursor: "pointer" }}
    //             src="assets/images/deleteIcon.svg"
    //             onClick={() => handleDelete(index)}
    //           ></img>
    //         </div>
    //       </div>
    //     );
    //   })}
    //   {openModal && (
    //     <Modal openModal={openModal} type={modalType} closeModal={closeModal} />
    //   )}
    // </div>
    <div
      style={{
        overflow: "auto",
        width: "95%",
        margin: "auto",
      }}
    >
      <table>
        <tr>
          <th>MEMBER IMG</th>
          <th>MEMBER NAME</th>
          <th>DATE OF JOINING</th>
          <th>STATUS</th>
          <th>START DATE</th>
          <th>SUBSCRIPTION</th>
          <th>PAID AMOUNT</th>
          <th>EXPIRY DATE</th>
          <th>Phone number</th>
        </tr>
        {membersData.map((member, index) => {
          return (
            <tr>
              <td>
                <img
                  src={
                    member.url
                      ? formatUrl(member.url)
                      : `/assets/images/image_NeeravBafna.jpg`
                  }
                  class="avatar"
                  alt="Profile Avatar"
                />
              </td>
              <td
                key={index}
                style={{
                  color: `${
                    member.membershipend
                      ? findColor(member.membershipend)
                      : "#E6E6FA"
                  }`,
                  fontWeight: 100,
                  fontSize: "16px",
                  textTransform: "capitalize",
                }}
              >
                {member.name}
              </td>
              <td>{member.joiningDate}</td>

              <td>{member.status}</td>

              <td>{member.membershipstart ? member.membershipstart : "NA"}</td>

              <td>{member.membership}</td>
              <td>{member.totalPaid}</td>

              <td>{member.membershipend ? member.membershipend : "NA"}</td>
              <td>{member.membershipend ? member.phone : "NA"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default ViewMembersInfo;
