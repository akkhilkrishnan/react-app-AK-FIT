import { Checkbox } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate=useNavigate()
const loginHandle=()=>{
    navigate("/home")
}
    const [signupFlag, setSignupFlag] = useState(true)
    return (
        <div style={{ margin: '10%' }}>
            <div className="login-page">
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className="login-image">
                        <img src="assets/images/payroll.jpg" width="100%" height="100%" alt="loading" />
                    </div>
                    <div className="user-content">
                        {signupFlag ? <>
                            <div className="login-header">
                                <p className="title-login-page">Welcome Back!</p>
                                <p style={{ margin: 'unset', color: '#949393'}}>Signin to your account</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <input type="text" placeholder="Username or Email"></input>
                            </div>
                            <div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                                    <input type="password" placeholder="Password"></input>
                                </div>
                                <p style={{ display: 'flex', justifyContent: 'start', margin: '8px 0 0 20px', fontSize: "12px", cursor: 'pointer', color: '#515050' }} onClick={() => console.log('forgottt')}>Forgot Password?</p>

                            </div>
                            <button onClick={loginHandle}>Login</button>
                            <div style={{display:'flex', alignItems:"center", justifyContent:"center"}}>
                            <input style={{width:"fit-content"}}type="checkbox" id="remember" name="remember" value='true' />
                            <label for="remember" style={{fontSize:'14px'}}>remember me</label>
                            </div>
                            <div style={{ display: 'flex', height: '40px', justifyContent: 'center' }}>
                                <span style={{ fontSize: '14px', fontWeight:'100 !important' }}>Not a member?<span className="link" onClick={() => setSignupFlag(!signupFlag)}> Sign up now</span></span>
                            </div>

                        </>
                            :
                            <>
                            <div className="login-header"> <p className="title-login-page">Create Account</p></div>
                               
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <input type="text" placeholder="User Name"></input>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <input style={{ width: '140px' }} type="text" placeholder="First name"></input>
                                    <input style={{ width: '140px' }} type="text" placeholder="Last Name"></input>                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <input style={{ width: '110px' }} type="date" placeholder="DOB"></input>
                                    <input style={{ width: '170px' }} type="text" placeholder="Email Id"></input>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <input type="password" placeholder="Password"></input>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <input type="password" placeholder="Confirm Password"></input>
                                </div>
                                <button>Sign Up</button>
                                <span style={{ fontSize: "14px" }}>Already Have an account?<span className="link" onClick={() => setSignupFlag(!signupFlag)}> Login Here</span></span>


                            </>}

                    </div>
                </div>
            </div>
        </div>)
}
export default LoginPage