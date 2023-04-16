
import React, { useEffect, useState } from "react";
import { colors } from "@mui/material";
// import Timeline from "./Timeline";
import SaveActions from "./saveWorkoutActions";
import Timeline from "./Timeline";

function Card(props) {
  // console.log(props)
  const [weeklyWorkout, setWeeklyWorkout] = useState([]);
  const [showSave, setShowsave] = useState(true);
  const [successMsg, setsuccessMsg] = useState('Added workout for');
  const [days, setdays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  const { workout_obj } = props
  console.log('workout bject:::', workout_obj)
  let workoutArr = [];
  let workoutList = workout_obj.workouts

  useEffect(() => {
    setShowsave(true)
  }, [workoutList])

  const addWorkoutHandle = () => {


    weeklyWorkout.push(workout_obj)
    setWeeklyWorkout([...weeklyWorkout])
    setShowsave(false)

    console.log('weeklyWorkout:::', weeklyWorkout)
  }
  const saveWorkouthandle = () => {
    setWeeklyWorkout([])
  }
  const calculateHeight = () => {
    console.log(weeklyWorkout.length * 100)
    return 600

  }
  return (
    <>
    <div className="card-timeline-container">
      {workoutList && workoutList.length > 0 && <div><div className="card-style">
      <div className="card-heading"> <div>*{days[weeklyWorkout.length] +' '+workout_obj.workouttype} Workout *</div> {showSave && <img src="assets/images/add-workout.svg" alt="logo image" onClick={async () => { addWorkoutHandle() }} />}</div>
        <ol>

          {workout_obj.workouts.map((workout, i) => {
            return <li
              key={i}>{workout}</li>;
          })}
        </ol>
        <div className="timing-style">
          <div>
            <p>
              ON time:{' ' + workout_obj.onTime}
            </p>
            <p>
              OFF time:{' ' + workout_obj.offTime}
            </p>
          </div>
          <div>
            <p>
              Sets:{' ' + workout_obj.sets}
            </p>
            <p>
              Laps :{' ' + workout_obj.laps}
            </p>
          </div>
        </div>
      </div>
        {!showSave && weeklyWorkout.length > 0 && <p className="success-style">{successMsg + ' ' + days[weeklyWorkout.length - 1] + '!'}</p>}
      </div>
      }
      <Timeline
        workoutList={workoutList}
        weeklyWorkout={weeklyWorkout}
        days={days} />
        </div>
       <SaveActions weeklyWorkout={weeklyWorkout}/>
    </>
  )
}


export default Card;
