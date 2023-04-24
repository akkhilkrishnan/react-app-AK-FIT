import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { TimerContext } from "../Context/TimerContext";


function ModalComponent(props) {
    const navigate = useNavigate()
      const  {timerTrigger,setTimerTrigger,timerArr,setTimerArr}=useContext(TimerContext)
    let { weekWorkout, openModal } = props;
    const [days, setdays] = useState(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']);
    let hyd = 60;

    const handleStart = (on, off, sets, laps, workouts) => {

        console.log(on, off, sets, laps, workouts)
        generateArrayForTimer(on, off, sets, laps, workouts)

    }
    const generateArrayForTimer = (on, off, sets, laps, workouts) => {
        timerArr.push(10)
        for (let i = 0; i < sets*workouts.length; i++) {
            timerArr.push(on)
            timerArr.push(off)
        }
        timerArr.push(60)
        for (let i = 0; i < sets*workouts.length; i++) {
            timerArr.push(on)
            timerArr.push(off)
        }
        console.log(timerArr)
        setTimerTrigger(true)
        props.closeModal()

    }


    const closeModal = () => {
        props.closeModal()
    }

    return (
            <Modal
                isOpen={openModal}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}

                contentLabel="Example Modal"
            >
                <h2 >WORKOUT FOR THE WEEK</h2>
                <img className="close-btn" src={"assets/images/close.svg"} onClick={closeModal} alt="logo image" />
                {weekWorkout.map((dayWorkout, index) => {
                    return <div className="day-workout-container">
                        <div className="day-workouts" key={index}>
                            <h3> {days[index]} WORKOUT</h3>
                            {dayWorkout.workouts && dayWorkout.workouts.length > 1 &&
                                dayWorkout.workouts.map((workout, i) => {
                                    return (<div className="Modal-workout">
                                        {i + 1}. {workout}
                                    </div>)
                                })}
                        </div>
                        <div className="set-container">
                            <div>on time: {dayWorkout.onTime}</div>
                            <div>off time: {dayWorkout.offTime}</div>
                        </div>
                        <div className="set-container">
                            <div>sets : {dayWorkout.sets}</div>
                            <div>laps: {dayWorkout.laps}</div>
                        </div>
                        <div className="Modal-btn">
                            <Button variant="contained"
                                onClick={() => handleStart(dayWorkout.onTime,
                                    dayWorkout.offTime,
                                    dayWorkout.sets,
                                    dayWorkout.laps,
                                    dayWorkout.workouts)}>START WORKOUT</Button>
                        </div>
                    </div>
                })}

            </Modal>
    )
}


export default ModalComponent;
