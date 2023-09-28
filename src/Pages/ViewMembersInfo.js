import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Components/Modal.tsx";
function ViewMembersInfo() {
  const navigate = useNavigate();

  const [membersData, setMembersData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [modalType, setModalType] = useState(null);


  useEffect(() => {
    getmembersData();
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
        console.log("data", data);
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
    setModalType("update")
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
const handleDelete=(index)=>{
  console.log(membersData[index]);
  setOpenModal(true);
  setModalType("delete")
}

const closeModal = () => {
  setOpenModal(false);
};
  return (
    <div className="view-container">
      <div className="first-record-style">
        <h4>MEMBER NAME</h4>
        <h4>DATE OF JOINING</h4>
        <h4>SUBSCRIPTION</h4>
        <h4>PAID AMOUNT</h4>
        <h4>EXPIRY DATE</h4>
      </div>

      {membersData.map((member, index) => {
        return (
          <div
            onClick={() => handleRecordClick(index)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              key={index}
              className="record-style"
              //  style={
              //       calculateExpiryDate(member.doj, member.subscription).expireFlag
              //         ? { backgroundColor: "#DC0000" }
              //         : { backgroundColor: "#4AAc2c"}
              //     }
            >
              <div
                style={{
                  color: `${
                    calculateExpiryDate(member.doj, member.subscription)
                      .memberStatusColor
                  }`,
                  fontWeight: 100 ,
                  fontSize: "16px",
                  textTransform:'capitalize'
                }}
              >
                {member.name}
              </div>
              <div>{new Date(member.doj).toString().slice(0, 15)}</div>
              <div>{member.subscription ? member.subscription : "Monthly"}</div>
              <div>{currencyFormatter(member.amountpaid)}</div>
              <div className="exp-field-style">
                {
                  calculateExpiryDate(member.doj, member.subscription)
                    .expiryDate
                }
              </div>
              <button
                className="update-btn"
                variant="contained"
                onClick={() => {
                  extendHandle(index);
                }}
              >
                Update Subscription
              </button>
              <img
                style={{ marginLeft: "10px", cursor: "pointer" }}
                src="assets/images/deleteIcon.svg"
                onClick={() => handleDelete(index)}
                ></img>
            </div>
          </div>
        );
      })}
      {openModal && <Modal openModal={openModal} type={modalType}closeModal={closeModal} />}
    </div>
  );
}

export default ViewMembersInfo;
