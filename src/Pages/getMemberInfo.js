
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from '@mui/material/Box';

// import members from "../Data/members.json";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function GetMemberInfo() {
  const [memberDetails, setMemberDetails] = useState({});
  async function insertMember(member) {
    await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member)
    })
      .then((response) => {
        return response.json();
      })
      .then((msg) => console.log(msg));
  }
  const addMemberHandle = (member) => {
    console.log(member)
    insertMember(member)

  };

  return (<div className="generate-workout-page">
    <h2>Member Details</h2>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className="input-style">
      <TextField
        required 
        id="standard-basic"
        label="Member Name"
        variant="standard"
        value={memberDetails.name}
        onChange={event => (memberDetails['name'] = event.target.value)}
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
      >
        <DatePicker
          label="DOB"
          required
          value={memberDetails.dob}
          onChange={(newValue) => (memberDetails['dob'] = new Date(newValue))}
        />
        <DatePicker
          label="Joining date"
          required
          value={memberDetails.joiningdate}
          onChange={(newValue) => (memberDetails['joiningdate'] = new Date(newValue))}
        />
      </LocalizationProvider>
      
      <TextField
        required
        id="standard-basic"
        label="Phone Number"
        variant="standard"
        value={memberDetails.phnnumber}
        onChange={(newValue) => (memberDetails['phnnumber'] = newValue.target.value)}
      />
      <TextField
        required
        id="standard-basic"
        label="Email Id"
        variant="standard"
        value={memberDetails.email}
        onChange={(newValue) => (memberDetails['email'] = newValue.target.value)}
      />
      <TextField
        required
        id="standard-basic"
        label="Instagram Id"
        variant="standard"
        value={memberDetails.insta}
        onChange={(newValue) => (memberDetails['insta'] = newValue.target.value)}
      />


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
        addMemberHandle(memberDetails);
      }}
   
    >
      Add Member
    </Button>
    </Box>
  </div>)
}

export default GetMemberInfo;


