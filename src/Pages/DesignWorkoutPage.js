import React, { useEffect, useState, createContext, useContext } from "react";
import workouts from "../Data/workouts.json";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "../Components/card";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import structuredClone from "@ungap/structured-clone";
import { workoutContext } from "../Context/workoutContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
function DesignWorkoutPage() {
  // let workoutListArr = [];

  const [workout_type, setWorkout_type] = useState("cardio");
  const [workoutSpec, setWorkoutSpec] = useState("bodyweight");
  const [noOfWorkouts, setNoOfWorkouts] = useState(8);
  const [onTime, setOnTime] = useState(40);
  const [offTime, setOffTime] = useState(20);
  const [sets, setSets] = useState(2);
  const [laps, setLaps] = useState(2);
  const currentDate = new Date();
  let disableFlag;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [designDetails, setDesignDetails] = useState({
    workouttype: "cardio",
    spec: "bodyweight",
    noofworkouts: 8,
    onTime: 40,
    offTime: 20,
    sets: 2,
    laps: 2,
    startdate: dayjs(currentDate.setDate(currentDate.getDate() + 4)),
  });

  let [workout_arr, setWorkout_arr] = useState([]);
  let [workout_obj, setWorkout_obj] = useState({});
  const [activebtn, setActivebtn] = useState(false);
  const [multiArrayLength, setMultiArrayLength] = useState(0);
  useEffect(() => {
    setActivebtn(true);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setDesignDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // Date.prototype.getWeek = function () {
  //   var onejan = new Date(this.getFullYear(), 0, 1);
  //   return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  // };
  const handleDate = (value) => {
    setDesignDetails((prev) => {
      return { ...prev, startdate: value };
    });
  };
  const validateWorkout = (workoutList, workout) => {
    let splitWorkoutList = [];
    workoutList.map((item) => {
      splitWorkoutList = splitWorkoutList.concat(item.split(" "));
    });
    let splitWorkoutName = workout.split(" ");

    // console.log('testt::',splitWorkoutName, splitWorkoutList)

    console.log(splitWorkoutList.includes(splitWorkoutName[1]));
    return splitWorkoutName.some((item) => splitWorkoutList.includes(item));
  };
  const generateWorkout = () => {
    let workoutListArr = [];
    for (let i = 0; i < designDetails.noofworkouts; i++) {
      let workout =
        workouts[designDetails.workouttype][
          Math.floor(Math.random() * workouts[designDetails.workouttype].length)
        ];
      if (
        workoutListArr.includes(workout) ||
        validateWorkout(workoutListArr, workout)
      )
        i = i - 1;
      else workoutListArr.push(workout);
    }
    return [...workoutListArr];
  };

  const getWeek = (date) => {
    let adjustedDate = date.getDate() + date.getDay();
    let prefixes = ["0", "1", "2", "3", "4", "5"];
    return parseInt(prefixes[0 | (adjustedDate / 7)]) + 1;
  };
  const handleFrame = () => {
    designDetails["workouts"] = [...generateWorkout()];
    setWorkout_obj({ ...designDetails });
  };
  const mapToObject = (arr) => {
    workout_obj["workouttype"] = workout_type;
    workout_obj["workouts"] = arr;
    workout_obj["onTime"] = onTime;
    workout_obj["offTime"] = offTime;
    workout_obj["sets"] = sets;
    workout_obj["laps"] = laps;
  };

  const addDate = (date, number) => {
    return date.setDate(date.getDate() + number);
  };
  const pcallback = (oneWeekWorkout, multiArrayLength) => {
    setMultiArrayLength(multiArrayLength);
    let dt;
    if (designDetails.startdate !== null) {
      dt = designDetails.startdate.toDate();
      dt.setDate(dt.getDate() + 1);
      setDesignDetails({
        ...designDetails,
        startdate: dayjs(dt),
      });
    }
    console.log("inside parent call backkk", oneWeekWorkout, multiArrayLength);
    if (oneWeekWorkout.length == 5 || multiArrayLength.length == 4)
      setActivebtn(false);
    else if (oneWeekWorkout.length == 0) setActivebtn(true);
  };
  const refreshWorkout = (index, list) => {
    console.log("inside refresh", index, workout_obj);
    let workout =
      workouts[workout_type][
        Math.floor(Math.random() * workouts[workout_type].length)
      ];
    list.splice(index, 1, workout);
    // mapToObject(workout_arr)
    designDetails["workouts"] = list;
    setWorkout_obj({ ...designDetails });
  };
  const EditWorkout = (EditInput, index, list) => {
    list[index] = EditInput;
    // setWorkout_arr([...list]);
    // mapToObject(list);
    // setWorkout_obj(workout_obj);
  };

  const validateFrom = () => {
    const {
      workouttype,
      startdate,
      sets,
      laps,
      noofworkouts,
      spec,
      onTime,
      offTime,
    } = designDetails;
    workouttype &&
    startdate &&
    sets &&
    laps &&
    noofworkouts &&
    spec &&
    onTime &&
    offTime
      ? (disableFlag = false)
      : (disableFlag = true);
  };

  console.log(validateFrom());
  return (
    <workoutContext.Provider value={{ workout_obj, setWorkout_obj }}>
      <div className="workout-layout">
        <div className="type-style">
          <div style={{ fontSize: "20px" }}>Workout Designer</div>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Workout Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="workouttype"
              value={designDetails.workouttype}
              label="Type of workout"
              onChange={handleChange}
              size={"small"}
              // prop sx={{ width: 200 }}
            >
              <MenuItem value="strength">Strength</MenuItem>
              <MenuItem value="cardio">Cardio</MenuItem>
              <MenuItem value="core">Core</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <LocalizationProvider size="small" dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                required
                name="startdate"
                slotProps={{ textField: { size: "small" } }}
                value={designDetails.startdate}
                // prop sx={{ width: 200 }}
                onChange={handleDate}
              />
              <small style={{ marginTop: "3px" }}>
                {designDetails.startdate &&
                ["Sunday", "Saturday"].includes(
                  days[designDetails.startdate.toDate().getDay()]
                ) ? (
                  <span style={{ color: "red" }}>Enter a week day</span>
                ) : (
                  designDetails.startdate &&
                  days[designDetails.startdate.toDate().getDay()] +
                    ", " +
                    getWeek(designDetails.startdate.toDate()) +
                    " week of " +
                    monthNames[designDetails.startdate.toDate().getMonth()]
                )}
              </small>
            </LocalizationProvider>
          </FormControl>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Specifications
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="spec"
              prop
              sx={{ width: 300 }}
              onChange={handleChange}
              value={designDetails.spec}
            >
              <FormControlLabel
                value="bodyweight"
                control={<Radio size="small" />}
                label="Body Weight"
              />
              <FormControlLabel
                value="equipment"
                control={<Radio size="small" />}
                label="Equipment Based"
              />
              <FormControlLabel
                value="both"
                control={<Radio size="small" />}
                label="Combined"
              />
              <FormControlLabel
                value="both"
                control={<Radio size="small" />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <TextField
              id="standard-basic"
              label="No of workouts"
              name="noofworkouts"
              type="number"
              size={"small"}
              value={designDetails.noofworkouts}
              onChange={handleChange}
            />
          </FormControl>
          <div className="timing-record">
            <TextField
              id="standard-basic"
              label="On Time"
              name="onTime"
              type="number"
              size={"small"}
              defaultValue={40}
              value={designDetails.ontime}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Off Time"
              name="offTime"
              type="number"
              size={"small"}
              defaultValue={20}
              value={designDetails.offtime}
              onChange={handleChange}
            />
          </div>
          <div className="timing-record">
            <TextField
              id="standard-basic"
              label="Sets"
              name="sets"
              type="number"
              size={"small"}
              defaultValue={2}
              value={designDetails.sets}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Laps"
              name="laps"
              type="number"
              size={"small"}
              defaultValue={2}
              value={designDetails.laps}
              onChange={handleChange}
            />
          </div>
          {activebtn && (
            <button
              className="btn-style"
              variant="contained"
              onClick={() => handleFrame()}
              disabled={disableFlag}
            >
              Frame Workout
            </button>
          )}
          {multiArrayLength.length == 4 && !activebtn ? (
            <div className="success-style"> saved workout for the month!!</div>
          ) : (
            <></>
          )}
        </div>
        <Card
          pcallback={pcallback}
          EditWorkout={EditWorkout}
          refreshWorkout={refreshWorkout}
          month={
            designDetails.startdatemonthNames && [
              designDetails.startdate.toDate().getMonth(),
            ]
          }
          day={
            designDetails.startdate
              ? days[designDetails.startdate.toDate().getDay()]
              : ""
          }
        />
      </div>
    </workoutContext.Provider>
  );
}
export default DesignWorkoutPage;
