import React, { useEffect, useState } from "react";
import workouts from "../Data/workouts.json";
// import members from "../Data/members.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Generateworkout() {
  let wrk_arr = [];
  const [workout_type, setWorkout_type] = useState("");
  const [no_of_workouts, setNo_of_workouts] = useState("");
  const [workout_arr, setWorkout_arr] = useState([]);


  const handleChange = (event) => {
    setWorkout_type(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = () => {
    for (let i = 0; i < no_of_workouts; i++) {
      let workout =
        workouts[workout_type][
          Math.floor(Math.random() * workouts[workout_type].length)
        ];
      if (wrk_arr.includes(workout)) i = i - 1;
      else wrk_arr.push(workout);
    }
    setWorkout_arr(wrk_arr);
    wrk_arr = [];
  };

  return (
    <div className="workout-list">
      <div className="input-field-style"></div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Workout Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workout_type}
          label="Type of workout"
          onChange={handleChange}
        >
          <MenuItem value="strength">Strength</MenuItem>
          <MenuItem value="cardio">Cardio</MenuItem>
          <MenuItem value="core">Core</MenuItem>
        </Select>
      </FormControl>
      <div className="input-field-style">
        <TextField
          id="standard-basic"
          label="No of workouts"
          variant="standard"
          onChange={(e) => setNo_of_workouts(e.target.value)}
        />
      </div>

      <Button className="btn-style" variant="contained" onClick={handleClick}>
        Frame Workout
      </Button>

      <ol>
        {" "}
        {workout_arr.length > 0 ? (
          workout_arr.map((workout, i) => {
            return <li key={i}>{workout}</li>;
          })
        ) : (
          <> </>
        )}
      </ol>
    </div>
  );
}
export default Generateworkout;
