import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ModalComponent from "./ModalComponent";

function SaveActions(props) {
  const { oneWeekWorkout, multiWeekArr, month } = props;
  let [weekWorkout, setWeekWorkout] = useState([]);
  let [showWorkouts, setShowWorkouts] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const handleWeekButton = (i) => {
    console.log("indexx", multiWeekArr[i]);
    openModal();
    setWeekWorkout(multiWeekArr[i]);
    setShowWorkouts(true);
  };
  const handleSaveWorkouts = () => {
    props.storeoneWeekWorkouts();
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = (flag) => {
    if (!flag) setIsOpen(false);
    console.log("closee", isOpen);
  };
  return (
    <>
      <div className="btn-container">
        {" "}
        <div className="save-btn-container">
          {
            <button
              className="btn-style"
              variant="contained"
              disabled={!(oneWeekWorkout && oneWeekWorkout.length == 5)}
              onClick={handleSaveWorkouts}
            >
              Save workouts
            </button>
          }
        </div>
        <div className="week-btn-container">
          <h3 style={{textAlign:'center'}}>{month}MONTH WORKOUTS</h3>
          {multiWeekArr && multiWeekArr.length >= 1 ? (
            multiWeekArr.map((week, index) => {
              return (
                <div className="week-btn-style">
                  <button
                    variant="contained"
                    onClick={() => handleWeekButton(index)}
                    className="btn-style"
                  >
                    {"week " + (index + 1) + " workouts"}
                  </button>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <ModalComponent
        openModal={isOpen}
        weekWorkout={weekWorkout}
        closeModal={closeModal}
      />
    </>
  );
}
export default SaveActions;
