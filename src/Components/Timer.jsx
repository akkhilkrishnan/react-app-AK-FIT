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
    console.log('props::::', props)
    const { timerTrigger, setTimerTrigger } = useContext(TimerContext)

    console.log('timer component')
    let rawArr = props.array;
    let arr = []
    rawArr.map((item) => {
        arr.push(item.on)
        if(item.off)arr.push(item.off)
        if (item.hyd) arr.push(item.hyd)

    })  
    console.log('arrrr', arr)
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
        console.log('inside pause')
        setPauseToggle(!pauseToggle)
        resumeTime = time
    }

    const handleClose = () => {
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
        <div className="bg-red">
            {arr.length != i && <div className=" pause-btn bg-end" >
                {/* <Button variant="contained" onClick={() => handlePause(seconds)}>{pauseBtnLabel}</Button> */}
                {pauseToggle ?
                    <img className="play-pause-btn" src={"assets/images/play.svg"} alt="logo image" onClick={() => handlePause(seconds)} /> :
                    <img className="play-pause-btn" src={"assets/images/pause.svg"} alt="logo image" onClick={() => handlePause(seconds)} />}
            </div>}
            <div className="bg-end">
                <div className="video-container">
                    <video width="400" src={"assets/images/squats.webm"} autoPlay={true} loop={true} />
                    <div>{rawArr[i].workout}</div>
                </div>


                <div className="array-container bg-end">

                    <img className="timer-close-btn" src={"assets/images/timer-close.svg"} onClick={handleClose} alt="logo image" />
                    {!prepare ?
                        (arr.length == i) ?
                            <div className="timer=container bg-end">
                                <div className="timer-style last-label">Good Job! Well Done</div>
                            </div>
                            : <div className={onFlag ? "timer-container bg-red" : " timer-container bg-blue"}>
                                <div className="timer-style timer-label">{label}</div>
                                <div className="circular" onClick={() => handlePause(seconds)}>
                                    <CircularProgressbar

                                        value={seconds} maxValue={arr[i]} text={seconds}
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
                            <div className="circular" onClick={() => handlePause(seconds)}>

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
                        return <div className={(i == index) ? "current-workout" : ""} key={index} onClick={() => handleArrayClick(index)}>{index + 1}{(index == 0) ? '. PREPARE: ' : (index % 2 == 0) ? '. REST: ' : '. WORK: '}{item}</div>
                    })}</div>}
                </div>
            </div>
        </div>
    )
}

export default Timer;