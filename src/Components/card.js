
import React, { useEffect, useState, createContext, useContext } from "react";
import SaveActions from "./saveWorkoutActions";
import Timeline from "./Timeline";
import { workoutContext } from "../Context/TimerContext";
import structuredClone from '@ungap/structured-clone';

var oneWeekWorkoutArr = []
function Card(props) {


  let [oneWeekWorkout, setOneWeekWorkout] = useState([]);

  let [oneWeek, setOneWeek] = useState([]);

  const [multiWeekArr, setMultiWeekArr] = useState([]);
  const [addFlag, setAddFlag] = useState(false);


  const [showSave, setShowsave] = useState(true);
  // const [addFlag, setAddFlag] = useState(false);

  const [successMsg, setsuccessMsg] = useState('Added workout for');
  const [days, setdays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  let workout_obj = {}
  workout_obj = props.workout_obj
  let workoutList = workout_obj.workouts

  useEffect(() => {
    setShowsave(true)
    if (addFlag && workoutList!=[]) {
      oneWeekWorkoutArr.push(structuredClone(workout_obj))
      setOneWeekWorkout(oneWeekWorkoutArr)
      props.pcallback(oneWeekWorkout, multiWeekArr.length)
      setAddFlag(false)
    }

  }, [workoutList,addFlag])


  const storeoneWeekWorkouts = () => {
    multiWeekArr.push(oneWeekWorkout)
    setMultiWeekArr([...multiWeekArr])
    console.log('mmultiwekkk::::', multiWeekArr)
    setOneWeekWorkout([])
    oneWeekWorkout = []
    oneWeekWorkoutArr=[]
    props.pcallback(oneWeekWorkout, multiWeekArr)
  }

  const addWorkoutHandle = () => {
    console.log('oneWeekWorkout::::',oneWeekWorkout)
    setShowsave(false)
    setAddFlag(true)
    // props.pcallback(oneWeekWorkout, multiWeekArr.length)
  }

  return (
    <>
      <div className="card-timeline-container">
        <div>
          <div className="card-style">
          <div className="card-heading"> <div>*{days[oneWeekWorkout.length] + ' ' + workout_obj.workouttype} Workout *</div> 
          {showSave && <img src="assets/images/add-workout.svg" alt="logo image" onClick={addWorkoutHandle} />}

            </div>
            {workoutList && workoutList.length > 0 ?
              <ol>

                {workout_obj.workouts.map((workout, i) => {
                  return <li
                    key={i}>{workout}</li>;
                })}
              </ol> : <div className="fallback-msg">Frame workout for the day</div>}
            {workoutList && workoutList.length > 0 && <div className="timing-style">
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
            </div>}
          </div>
          {!showSave && oneWeekWorkout.length > 0 && <p className="success-style">{successMsg + ' ' + days[oneWeekWorkout.length - 1] + '!'}</p>}
        </div>

        <Timeline
          workoutList={workoutList}
          oneWeekWorkout={oneWeekWorkout}
          days={days} />
      </div>
      <SaveActions oneWeekWorkout={oneWeekWorkout} multiWeekArr={multiWeekArr} storeoneWeekWorkouts={storeoneWeekWorkouts} />
    </>
  )
}


export default Card;
