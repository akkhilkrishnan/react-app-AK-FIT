import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import members from "../Data/members.json";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function GetMemberInfo(){
    const [memberDetails, setMemberDetails] = useState({});

    const [membersData, setMembersData] = useState([]);
    useEffect(() => {
      getmembersData();
    }, []);
  
    const getmembersData = () => {
      setMembersData(members);
    };

    

    const addMemberHandle = () => {
        console.log(memberDetails);
        membersData.push(memberDetails)
        setMemberDetails(membersData)
        console.log(membersData)
      };

   return (<div>
    <h2>Memeber Details</h2>

    <div className="input-style">
      <TextField
      required
        id="standard-basic"
        label="Member Name"
        variant="standard"
        value={memberDetails.name}
        onChange={event => (memberDetails['name'] =event.target.value)}
      />
      <LocalizationProvider
        label="Date of joining"
        dateAdapter={AdapterDayjs}
      >
        <DatePicker
        required
          value={memberDetails.joiningdate}
          onChange={(newValue) => (memberDetails['joiningdate'] =new Date (newValue))}
        />
      </LocalizationProvider>
      <TextField
      required
        id="standard-basic"
        label="Member Subscription"
        variant="standard"
        value={memberDetails.subscription}
        onChange={(newValue) =>
          (memberDetails['subscription'] = newValue.target.value)
        }
      />
      <TextField
      required
        id="standard-basic"
        label="Amount Paid"
        variant="standard"
        value={memberDetails.amountpaid}
        onChange={(newValue) => (memberDetails['amountpaid'] = newValue.target.value)}
      />
    </div>

    <Button
      className="btn-style"
      variant="contained"
      onClick={() => {
        addMemberHandle();
      }}
    >
      Add Member
    </Button>
  </div>)
}

export default GetMemberInfo;