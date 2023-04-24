import React from "react";
import { useState, useEffect, useRef, useContext } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Button from "@mui/material/Button";
import { TimerContext } from "../Context/TimerContext";

let i = 0
var setTimer;
let resumeTime;
function Timer(props) {
    const  {timerTrigger,setTimerTrigger}=useContext(TimerContext)

    console.log('timer component')
    let arr = props.array;
    const inputRef = useRef(null);

    //states
    let [seconds, setSeconds] = useState(arr[i])
    let [onFlag, setOnFlag] = useState(true)
    let [label, setLabel] = useState('')
    let [prepare, setPrepare] = useState(true)
    let [onoffColor, setOnoffColor] = useState(true)
    let [pauseToggle, setPauseToggle] = useState(true)
    let [pauseBtnLabel, setPauseBtnLabel] = useState('Start')

    useEffect(() => {
        clearInterval(setTimer)
        timerfunction(arr[0]);
    }, [])
    useEffect(() => {
        return () => {
            setSeconds(0)
        };
    }, []);
    useEffect(() => {
        pauseToggle ? clearInterval(setTimer) : timerfunction(resumeTime)
        pauseToggle ? setPauseBtnLabel('Start') : setPauseBtnLabel('Pause')
    }, [pauseToggle]);




    const handleArrayClick = (index) => {
        clearInterval(setTimer)
        i = index
        timerfunction(arr[index] + 1)

    }
    const handlePause = (time) => {
        setPauseToggle(!pauseToggle)
        resumeTime = time
    }

    const handleClose = () => {
        // console.log(timerTrigger)
        setTimerTrigger(false)
    }

    const timerfunction = (second) => {


        setTimer = setInterval(() => {
            if (second > 0) {
                second -= 1;
                setSeconds(second)

            }
        }, 1000);
    }
    if (i > 0)
        prepare = false
    if (i % 2 != 0) {
        label = 'WORK'
        onoffColor = '#ff0000'
    }
    else {
        onFlag = false
        label = 'REST'
        onoffColor = '#ABFE2F'
    }
    if (seconds == 0) {
        if (arr.length == i)
            clearInterval(setTimer)
        else {
            i += 1
            timerfunction(arr[i] + 1);
        }
    }

    return (
        <>
            <div className=" array-container bg-end">
        {    arr.length != i &&   <div className=" pause-btn bg-end">
                <Button variant="contained" onClick={() => handlePause(seconds)}>{pauseBtnLabel}</Button>
                </div>}
                <img className="timer-close-btn" src={"assets/images/timer-close.svg"} onClick={handleClose} alt="logo image" />
                {!prepare ?
                    (arr.length == i) ?
                        <div className="timer=container bg-end">
                            <div className="timer-style last-label">Good Job! Well Done</div>
                        </div>
                        : <div className={onFlag ? "timer-container bg-red" : " timer-container bg-blue"}>
                            <div className="timer-style timer-label">{label}</div>
                            <div className="circular">
                                <CircularProgressbar value={seconds} maxValue={arr[i]} text={seconds}
                                    styles={buildStyles({
                                        textColor: onoffColor,
                                        pathColor: onoffColor,
                                        trailColor: "#373636",
                                        strokeLinecap: "butt"

                                    })} />

                            </div>
                        </div>
                    :
                    <div className="timer-container">
                        <div className="timer-style timer-label">GET READY!</div>
                        <div className="circular">

                            <CircularProgressbar value={seconds} maxValue={arr[i]} text={seconds}
                                styles={buildStyles({
                                    textColor: onoffColor,
                                    pathColor: onoffColor,
                                    trailColor: "#373636",
                                    strokeLinecap: "butt"

                                })} />

                        </div>
                    </div>
                }
                {(arr.length != i) && <div className="seconds-array">{arr.map((item, index) => {
                    return <div ref={inputRef} key={index} onClick={() => handleArrayClick(index)}>{item}</div>
                })}</div>}
            </div>
        </>

    )
}

export default Timer;