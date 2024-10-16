import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "../Components/Modal.tsx";
import TableView from "../Components/tableView.js";
import CardView from "../Components/cardView.js";
import useFetch from "../Hooks/useFetch.js";
import CardV from "../Components/cardV.js";
function ViewMembersInfo() {
  // const [membersData, setMembersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [txtData, setTxtData] = useState(null);
  const [tablecardFlag, setTablecardFlag] = useState(true);
  const { membersData, loading, error } = useFetch(
    `http://localhost:5000/data?limit=${50}&skip=${0}&flag=${""}`
  );

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
    <div>
      <button
        className="view-btn-style tbl"
        onClick={() => {
          setTablecardFlag(!tablecardFlag);
        }}
        disabled={tablecardFlag}
      >
        Table View
      </button>
      <button
        className="view-btn-style crd"
        onClick={() => {
          setTablecardFlag(!tablecardFlag);
        }}
        disabled={!tablecardFlag}
      >
        Card View
      </button>

      <div></div>
      <div
        style={{
          overflow: "auto",
          width: "95%",
          margin: "auto",
        }}
      >
        {tablecardFlag ? (
          <TableView membersData={membersData} />
        ) : (
          <CardView membersData={membersData} />
          // <CardV membersData={membersData} />
        )}
      </div>
    </div>
  );
}

export default ViewMembersInfo;
