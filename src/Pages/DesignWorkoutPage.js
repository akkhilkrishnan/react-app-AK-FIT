
import React, { useEffect, useState, createContext, useContext } from "react";
import workouts from "../Data/workouts.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "../Components/card";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
function DesignWorkoutPage() {
  let workoutListArr = [];

  const [workout_type, setWorkout_type] = useState("cardio");
  const [workoutSpec, setWorkoutSpec] = useState("bodyweight");
  const [noOfWorkouts, setNoOfWorkouts] = useState(8);
  const [onTime, setOnTime] = useState(40);
  const [offTime, setOffTime] = useState(20);
  const [sets, setSets] = useState(2);
  const [laps, setLaps] = useState(2);


  const [workout_arr, setWorkout_arr] = useState([]);
  let [workout_obj, setWorkout_obj] = useState({});
  const [activebtn, setActivebtn] = useState(false);
  const [multiArrayLength, setMultiArrayLength] = useState(0);
  useEffect(() => {
    setActivebtn(true)
  }, [])

  const handleChange = (event) => {
    setWorkout_type(event.target.value);
    console.log(event.target.value);
  };
  const validateWorkout = (workoutList, workout) => {
    let splitWorkoutList = []
    workoutList.map((item) => {
      splitWorkoutList = splitWorkoutList.concat(item.split(' '))
    })

    let splitWorkoutName = workout.split(' ')

    // console.log('testt::',splitWorkoutName, splitWorkoutList)

    console.log(splitWorkoutList.includes(splitWorkoutName[1]))
    return splitWorkoutName.some((item) => splitWorkoutList.includes(item))
  }
  const generateWorkout = () => {
    for (let i = 0; i < noOfWorkouts; i++) {
      let workout =
        workouts[workout_type][
        Math.floor(Math.random() * workouts[workout_type].length)
        ];
      if (workoutListArr.includes(workout) || validateWorkout(workoutListArr, workout)) i = i - 1;
      else workoutListArr.push(workout);
    }
    return workoutListArr
  }
  const handleClick = () => {
    setWorkout_arr(generateWorkout());
    // workout_obj={}
    mapToObject(workout_arr)
    workoutListArr = [];
  };
  const mapToObject = (arr) => {
    let obj = {}
    workout_obj['workouttype'] = workout_type;
    workout_obj['workouts'] = arr;
    workout_obj['onTime'] = onTime;
    workout_obj['offTime'] = offTime;
    workout_obj['sets'] = sets;
    workout_obj['laps'] = laps;
    obj = workout_obj
    return obj
  }
  const pcallback = (oneWeekWorkout, multiArrayLength) => {
    setMultiArrayLength(multiArrayLength)
    console.log('inside parent call backkk', oneWeekWorkout, multiArrayLength)
    if (oneWeekWorkout.length == 5 || multiArrayLength.length == 4)
      setActivebtn(false)
    else if (oneWeekWorkout.length == 0)
      setActivebtn(true)
  }
  return (
    <div className="workout-layout">
      <div className="type-style">
        {/* <h2>Workout Designer</h2> */}
        <FormControl >
          <InputLabel id="demo-simple-select-label">Workout Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={workout_type}
            label="Type of workout"
            onChange={handleChange}
            size={'small'}
          >
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="cardio">Cardio</MenuItem>
            <MenuItem value="core">Core</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Specifications</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={workoutSpec}
          >
            <FormControlLabel value="bodyweight" control={<Radio />} label="Body Weight" onChange={(e) => setWorkoutSpec(e.target.value)} />
            <FormControlLabel value="equipment" control={<Radio />} label="Equipment Based" />
            <FormControlLabel value="both" control={<Radio />} label="Combined" />
          </RadioGroup>
        </FormControl>
        <div className="input-field-style">
          <TextField
            id="standard-basic"
            label="No of workouts"
            type="number"
            size={"small"}
            value={noOfWorkouts}
            onChange={(e) => setNoOfWorkouts(e.target.value)}
          />

        </div>
        <div className="timing-record">
          <TextField
            id="standard-basic"
            label="On Time"
            type="number"
            size={"small"}
            value={onTime}
            onChange={(e) => setOnTime(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Off Time"
            type="number"
            size={"small"}
            value={offTime}
            onChange={(e) => setOffTime(e.target.value)}
          />
        </div>
        <div className="timing-record"  >
          <TextField
            id="standard-basic"
            label="Sets"
            type="number"
            size={"small"}
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Laps"
            type="number"
            size={"small"}
            value={laps}
            onChange={(e) => setLaps(e.target.value)}
          />
        </div>
        {activebtn && <Button className="btn-style" variant="contained" onClick={handleClick}>
          Frame Workout
        </Button>}
        {(multiArrayLength.length == 4 && !activebtn) ? <div className="success-style"> saved workout for the month</div> : <></>}
      </div>
      <Card workout_obj={workout_obj} pcallback={pcallback} />
    </div>
  );
}
export default DesignWorkoutPage;

