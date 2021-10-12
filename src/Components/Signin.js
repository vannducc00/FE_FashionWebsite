import React, { Component, useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { Signup, checksignup, checksignin, checkpermissions, countcart } from "../Service"

export default function Signin(props) {
    const [isSignup, setIsSignup] = useState(false)
    const [checkInfo, setCheckInfo] = useState(true)
    const [checkInfoSignup, setCheckInfoSignup] = useState(true)
    const [arrCheckSignup, setArrCheckSignup] = useState([])
    const [userNameVal, setUserNameVal] = useState('')
    const [passwordVal, setPasswordVal] = useState('')
    const [confirmPasswordVal, setConfirmPasswordVal] = useState('')
    const [phoneVal, setPhoneVal] = useState('')

    useEffect(() => {
        let getIdCustomer = localStorage.getItem("iduser")
        if (getIdCustomer !== null) {
            props.history.push("/")
        }

    }, [])

    const handleSignin = () => {
        let userName = userNameVal
        let password = passwordVal
        let dataCheck = {
            username: userName,
            password: password
        }
        checksignin(dataCheck).then(res => {
            if (res.data === false) {
                checkpermissions(dataCheck).then(res => {
                    if (res.data === false && userNameVal == '' || passwordVal == '') {
                        setCheckInfo(false)
                    } else {
                        localStorage.setItem("username", userName)
                        localStorage.setItem("iduser", res.data.id)
                        props.history.push("/statistical")
                        window.location.reload(true)
                    }
                })
            } else {
                localStorage.setItem("username", userName)
                localStorage.setItem("iduser", res.data.id)
                props.history.push("/")
                window.location.reload(true)
            }
        })
    }

    const handleSignup = () => {
        // kiểm tra xem trong database có trùng username hay ko
        let dataCheck = {
            username: userNameVal
        }
        checksignup(dataCheck).then(res => {
            if (
                phoneVal > 13 ||
                passwordVal < 6 ||
                res.data == false ||
                passwordVal != confirmPasswordVal
            ) {
                setCheckInfoSignup(false)
            } else {
                // username ko trùng tên thì sẽ đc signup
                console.log(userNameVal)
                console.log(passwordVal)
                console.log(phoneVal)
                let data = {
                    phone: phoneVal,
                    username: userNameVal,
                    password: passwordVal
                }
                Signup(data).then(() => console.log('oke'))
            }
        })
    }

    const handleInputPhone = (e) => {
        let currentValue = e.target.value
        if (currentValue !== null || currentValue !== "") {
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setPhoneVal(currentValue)
    }

    return (
        <>
            <div style={{ backgroundColor: "#F9F9F9" }}>
                <div className="container" style={{ paddingTop: "13em" }}>
                    <div className="sign-in"><h4>Sign in</h4></div>
                    <div className="row" style={{ paddingBottom: "50px" }}>
                        <div className="col-md-6">
                            <img src="/Image/undraw_Online_shopping.svg" alt="" style={{ width: "100%", padding: "50px" }} />
                        </div>
                        <div className="col-md-6" style={{ borderLeft: "1px solid #e2e2e2" }}>

                            {/* form signin is show */}
                            {!isSignup ? <div className="form-sign-in">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input value={userNameVal} style={userNameVal != '' ? {} : !checkInfo ? { border: "1px solid rgb(221, 48, 48)" } : {}} type="text" placeholder="user name" onChange={(e) => setUserNameVal(e.target.value)} />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input value={passwordVal} style={passwordVal != '' ? {} : !checkInfo ? { border: "1px solid rgb(221, 48, 48)" } : {}} type="password" placeholder="password" onChange={(e) => setPasswordVal(e.target.value)} />
                                </div>
                                <div className="check">
                                    <input type="checkbox" /><span>Remember me?</span>
                                </div>
                                {userNameVal != '' && passwordVal != '' ? null : !checkInfo ? <p style={{ color: "red", fontSize: "12px", fontStyle: "italic" }}>please check information !!!</p> : ''}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignin()}>Sign in</button><br />
                                    <Link to="" className="button-fogot">Forgot Password?</Link>
                                </div>
                                <button className="sign-up" onClick={() => setIsSignup(true)}>Sign up</button>
                            </div> : null}

                            {/* form signup is show */}
                            {isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input value={userNameVal} style={userNameVal != '' ? {} : !checkInfoSignup ? { border: "1px solid rgb(221, 48, 48)" } : {}} type="text" placeholder="user name" onInput={(e) => setUserNameVal(e.target.value)} />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input value={passwordVal} style={passwordVal != '' ? {} : !checkInfoSignup ? { border: "1px solid rgb(221, 48, 48)" } : {}} type="password" placeholder="password" onInput={(e) => setPasswordVal(e.target.value)} />
                                </div>
                                <div className="con-password active">
                                    <p>Confirm Password</p>
                                    <input value={confirmPasswordVal} style={confirmPasswordVal != '' ? {} : !checkInfoSignup ? { border: "1px solid rgb(221, 48, 48)" } : {}} type="password" placeholder="password" onInput={(e) => setConfirmPasswordVal(e.target.value)} />
                                </div>
                                <div className="con-password active" >
                                    <p >Phone</p>
                                    <input value={phoneVal} style={phoneVal != '' || phoneVal.length < 13 ? {} : !checkInfoSignup ? { border: "1px solid rgb(221, 48, 48) " } : {}} type="text" placeholder="phone" onInput={(e) => handleInputPhone(e)} />
                                </div>
                                {userNameVal != '' && passwordVal != '' && phoneVal != '' && confirmPasswordVal != '' ? null : !checkInfoSignup ? <p style={{ color: "red", fontSize: "12px", fontStyle: "italic" }}>please check information !!!</p> : null}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignup()}>Sign up</button><br />
                                    <br />
                                    <span className="button-acc">Already have an account?</span><Link to="/Signin" onClick={() => setIsSignup(false)}>Sign in</Link>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

