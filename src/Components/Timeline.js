
import React from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
function Timeline(props) {
  // const { days, workoutList, oneWeekWorkout } = props;
  // eslint-disable-next-line no-undef
  const [steps, setSteps] = React.useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  //   const ref = useRef();

  return (
    <>
      {/* {workoutList && workoutList.length > 0 && <div className="timeline-style">
        <div className="line-style"></div>
        <div className="sec-line-style" style={{ height: `${(oneWeekWorkout.length) * 100}px`}}>
          <div >
            <span className="first-dot">
              <img src="assets/images/sun.svg" alt="logo image" />
            </span>
            <div className="dot-series">
              {days.map((day, i) => (
                <span className="dot" key={i}>
                <p style={{ top: `${i * 100}px`}}>  {day}</p>
                  <img src={"assets/images/" + `${day}` + ".svg"} alt="logo image" />
                  <img src={"assets/images/sun.svg"} alt="logo image" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>} */}

<div className="timeline-container" style={{margin:'0px auto 20px auto', width:'90%', }}>
      <Stepper activeStep={2}>
        {steps.map((label, index) => {
          // const stepProps: { completed?: true } = {};
          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      </div>
    </>
  )
}

export default Timeline;