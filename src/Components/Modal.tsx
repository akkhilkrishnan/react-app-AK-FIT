import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Modal = (props) => {
  const { type } = props;
  return (
    <div
      className="overlay"
      style={{
        height: `${type === "delete" ? "25%" : "50%"}`,
        width: `${type === "delete" ? "30%" : "60%"}`,

        top: `${type === "delete" ? "25%" : "10%"}`,
      }}
    >
      {type === "delete" && (
        <div>
          <p style={{ textAlign: "center", fontSize: "14px" }}>
            Are you sure you want to remove the member?
          </p>
          <div className="overlay-delete-btns">
            <button className="btn-style" onClick={props.closeModal}>
              Yes
            </button>
            <button className="btn-style" onClick={props.closeModal}>
              No
            </button>
          </div>
        </div>
      )}

      {type === "update" && (
        <div>
          <img
            src="/assets/images/closeModal.svg"
            alt="logo"
            onClick={props.closeModal}
          />
          <p style={{ textAlign: "center", fontSize: "16px" }}>
            Update Memebership
          </p>
          {/* <p>Member Name:</p> */}
          <div
          // className="update-overlay-inputs"
          >
            <h5>Membership Details</h5>
            <div className="fields" style={{ justifyContent: "space-between" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Joining date"
                  // required
                  // slotProps={{ textField: { size: "small", required: true } }}
                  // value={memberDetails.joiningdate}
                  // onChange={(newValue) => (memberDetails["doj"] = newValue)}
                />
              </LocalizationProvider>
              <TextField
                required
                id="subscription"
                select
                label="subscription"
                defaultValue="Monthly"
                // helperText="Please select member subscription"
                // size="small"
                // prop
                // sx={{ width: 250 }}
                // onChange={(newValue) =>
                //   (memberDetails["subscription"] = newValue.target.value)
                // }
              >
                <MenuItem key="MON" value="Monthly">
                  Monthly
                </MenuItem>
                <MenuItem key="QRT" value="Quarterly">
                  Quarterly
                </MenuItem>
                <MenuItem key="HFY" value="Half-yearly">
                  Half-yearly
                </MenuItem>
                <MenuItem key="ANL" value="Annual">
                  Annual
                </MenuItem>
              </TextField>
              <TextField
                required
                size="small"
                id="standard-basic"
                label="Amount Paid"
                variant="filled"
                // value={memberDetails.amountpaid}
                // onChange={(newValue) =>
                //   (memberDetails["amountpaid"] = newValue.target.value)
                // }
              />
            </div>
          </div>
          <div className="update-overlay-btns" style={{ marginTop: "30px" }}>
            <button className="btn-style" onClick={props.closeModal}>
              Update
            </button>
            <button className="btn-style" onClick={props.closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
