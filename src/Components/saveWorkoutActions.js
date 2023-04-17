import React from "react";
import Button from "@mui/material/Button";

function SaveActions(props) {
  const { weeklyWorkout, multiWeekArr } = props
  const handleWeekButton = (i) => {
    console.log('indexx', i)
  }

  return (<> <div className="save-btn-container">
    {

      (weeklyWorkout && weeklyWorkout.length == 5) && <Button className="save-btn" variant="contained" onClick={() => props.storeWeeklyWorkouts()}>
        Save workouts
      </Button>
    }
    {(multiWeekArr && multiWeekArr.length >= 1) ? multiWeekArr.map((week, index) => {
      return (<div className="week-btn-style"><Button variant='contained'onClick={handleWeekButton}>{'week ' + (index+1)+' workouts'}</Button></div>)
    }) : <></>

    }
  </div></>)
}
export default SaveActions
