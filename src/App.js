import './App.scss';
import DesignWorkoutPage from './Pages/DesignWorkoutPage'
import ViewMembersInfo from './Pages/ViewMembersInfo'
import GetMemberInfo from './Pages/getMemberInfo';
import Header from "./Components/Header";
import Home from "./Pages/Home";
import {TimerContext} from './Context/TimerContext';
// import ModalApp from './Components/modall';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import Timer from './Components/Timer';
import ModalApp from './Components/modall';

function App() {
  const [timerTrigger, setTimerTrigger] = useState(false);
  let [timerArr, setTimerArr] = useState([]);

// let timerArr=[]
  // let timerTrigger=useContext(TimerContext)
  console.log('context:::', timerTrigger,TimerContext,timerArr)

  return (
    <TimerContext.Provider value={{timerTrigger,setTimerTrigger,timerArr,setTimerArr}}>
    <div className="App">
      {!timerTrigger?<div><Header />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="home/designworkout" element={<DesignWorkoutPage />}></Route>
        <Route path="designworkout" element={<DesignWorkoutPage />}></Route>
        <Route path="home/addnewmember" element={<GetMemberInfo />}></Route>
        <Route path="addnewmember" element={<GetMemberInfo />}></Route>
        <Route path="home/viewmemberdetails" element={<ViewMembersInfo />}></Route>
        <Route path="viewmemberdetails" element={<ViewMembersInfo />}></Route>
      </Routes></div>
:
      <Timer array={timerArr}/>}

    </div>

     </TimerContext.Provider>


  );
}

export default App;