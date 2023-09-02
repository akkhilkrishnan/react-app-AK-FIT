
import React, { useEffect, useState, createContext, useContext } from "react";
import SaveActions from "./saveWorkoutActions";
import Timeline from "./Timeline";
// import { workoutContext } from "../Context/TimerContext";
import structuredClone from '@ungap/structured-clone';
import TextField from "@mui/material/TextField";
import { workoutContext } from "../Context/workoutContext";
var oneWeekWorkoutArr = []
function Card(props) {
  const { workout_obj, setWorkout_obj } = useContext(workoutContext)

  let [editIndex, setEditIndex] = useState(-1);
  let [editInput, setEditInput] = useState('');
  let [editSaveToggle, setEditSaveTogggle] = useState(true);
  let [oneWeekWorkout, setOneWeekWorkout] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);


  // let [oneWeek, setOneWeek] = useState([]);


  const [multiWeekArr, setMultiWeekArr] = useState([]);
  const [addFlag, setAddFlag] = useState(false);


  const [showSave, setShowsave] = useState(false);
  // const [addFlag, setAddFlag] = useState(false);

  const [successMsg, setsuccessMsg] = useState('Added workout for');
  const [days, setdays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  let [showInput, setShowInput] = useState(new Array(8).fill(false));


  useEffect(() => {
    setWorkoutList (workout_obj.workouts)

  }, [workout_obj.workouts])

  useEffect(() => {
    if (addFlag && workoutList != []) {
      oneWeekWorkoutArr.push(structuredClone(workout_obj))
      setOneWeekWorkout(oneWeekWorkoutArr)
      props.pcallback(oneWeekWorkout, multiWeekArr.length)
      setAddFlag(false)
    }

  }, [workout_obj.workouts, addFlag])

  useEffect(() => {
    workoutList && workoutList.length > 1 && setShowsave(true)
    setEditInput('')
  }, [workout_obj.workouts])

  const storeoneWeekWorkouts = () => {
    multiWeekArr.push(oneWeekWorkout)
    setMultiWeekArr([...multiWeekArr])
    console.log('mmultiwekkk::::', multiWeekArr)
    setOneWeekWorkout([])
    oneWeekWorkout = []
    oneWeekWorkoutArr = []
    props.pcallback(oneWeekWorkout, multiWeekArr)
  }

  const addWorkoutHandle = () => {
    console.log('oneWeekWorkout::::', oneWeekWorkout)
    setShowsave(false)
    setAddFlag(true)
    // setEditInput('')
    // setEditIndex(-1)
    // props.pcallback(oneWeekWorkout, multiWeekArr.length)
  }
  const handleEdit = (index) => {
    setEditSaveTogggle(!editSaveToggle)
    if (editSaveToggle) {
      props.EditWorkout(index)
      setEditIndex(index)
    }
    else {
      if (editInput)
        props.EditWorkout(editInput, index)
    }
  }
  const handleRefresh = (index) => {
    props.refreshWorkout(index)
    // editIndex=index
  }
  return (
    <>
      <div className="card-timeline-container">
        <div>
          <div className="card-style">
            <div className="card-heading"> <div>*{days[oneWeekWorkout.length] + ' ' + workout_obj.workouttype} Workout *</div>
              {showSave && editSaveToggle && <img className="add-btn" src="assets/images/add-workout.svg" alt="save image" onClick={addWorkoutHandle} />}

            </div>
            {workoutList && workoutList.length !=0?
              <ol>

                {workoutList.map((workout, i) => {
                  return <div className="workout-container"> <span className="sno-style">{i + 1}. </span>
                    {showInput && editIndex == i && !editSaveToggle ? <TextField
                      id="standard-basic"
                      label="workout"
                      type="text"
                      size={"small"}
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                    /> :
                      <div className="card-list">
                        {(editInput && editIndex == i) ? editInput : workout}
                      </div>}
                    {showSave && <div className="workout-btn-container">
                      <span>
                        {(editSaveToggle || editIndex != i) ? <img className="edit-btn" src="assets/images/edit.svg" alt="" onClick={() => handleEdit(i)} />
                          : <img className="edit-btn" src="assets/images/add-workout.svg" alt="" onClick={() => handleEdit(i)} />}
                      </span>
                      <span><img className="refresh-btn" src="assets/images/refresh.svg" alt="" onClick={() => handleRefresh(i)} /></span>
                    </div>}
                  </div>
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
