
import React from "react";


function Timeline(props){
  const   {days,workoutList,weeklyWorkout}=props;
//   const ref = useRef();

    return(
        <>
        {workoutList && workoutList.length > 0 && <div className="timeline-style">
        <div className="line-style"></div>
        <div className="sec-line-style" style={{ height: `${(weeklyWorkout.length) * 100}px`}}>
          <div >
            <span className="first-dot">
              <img src="assets/images/sun.svg" alt="logo image" />
            </span>
            <div className="dot-series">
              {days.map((day, i) => (
                <span className="dot" key={i}>
                <p style={{ top: `${i * 100}px`}}>  {day}</p>
                  {/* <img src={"assets/images/" + `${day}` + ".svg"} alt="logo image" /> */}
                  <img src={"assets/images/sun.svg"} alt="logo image" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>}
      </>
    )
}

export default Timeline;