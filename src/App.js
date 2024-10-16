import "./App.scss";
import DesignWorkoutPage from "./Pages/DesignWorkoutPage";
import ViewMembersInfo from "./Pages/ViewMembersInfo";
import GetMemberInfo from "./Pages/getMemberInfo";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { TimerContext } from "./Context/TimerContext";

// import ModalApp from './Components/modall';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Timer from "./Components/Timer";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LoginPage from "./LoginPage";
import SideNavBar from "./Components/sideNavBar.tsx";
import Dashboard from "./Pages/Dashboard.tsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [timerTrigger, setTimerTrigger] = useState(false);
  let [timerArr, setTimerArr] = useState([]);

  // let timerArr=[]
  // let timerTrigger=useContext(TimerContext)
  console.log("context:::", timerTrigger, TimerContext, timerArr);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
      <TimerContext.Provider
        value={{ timerTrigger, setTimerTrigger, timerArr, setTimerArr }}
      >
        <div className="App">
          {!timerTrigger ? (
            <div>
              <Header />
              <SideNavBar />
              <div style={{ marginLeft: "170px" }}>
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route
                    path="home/designworkout"
                    element={<DesignWorkoutPage />}
                  ></Route>
                  <Route
                    path="designworkout"
                    element={<DesignWorkoutPage />}
                  ></Route>
                  <Route
                    path="home/addnewmember"
                    element={<GetMemberInfo />}
                  ></Route>
                  <Route path="addmember" element={<GetMemberInfo />}></Route>
                  <Route
                    path="home/memberdetails"
                    element={<ViewMembersInfo />}
                  ></Route>
                  <Route
                    path="memberdetails"
                    element={<ViewMembersInfo />}
                  ></Route>
                  <Route path="dashboard" element={<Home />}></Route>
                </Routes>
              </div>
            </div>
          ) : (
            <Timer array={timerArr} />
          )}
        </div>
      </TimerContext.Provider>
    </ThemeProvider>
  );
}

export default App;
