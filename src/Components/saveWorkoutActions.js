import React from "react";
import Button from "@mui/material/Button";

function SaveActions(props){
const {weeklyWorkout}=props
// const [weeklyWorkout, setWeeklyWorkout] = useState([]);

const saveWorkouthandle = () => {
weeklyWorkout=[]
}
    return(<> <div className="save-btn-container">
    {

      (weeklyWorkout && weeklyWorkout.length == 5) && <Button className="save-btn" variant="contained" onClick={saveWorkouthandle}>
        Save workouts
      </Button>
    }
    </div></>)
}
export default SaveActions
