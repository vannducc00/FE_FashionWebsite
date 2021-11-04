import React, { Component, useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { Signup, checksignup, checksignin, checkpermissions, countcart } from "../Service"

export default function Signin(props) {
    const [isSignup, setIsSignup] = useState(false)
    const [checkInfo, setCheckInfo] = useState(true)
    const [checkPhone, setCheckPhone] = useState('')
    const [arrCheckSignup, setArrCheckSignup] = useState([])

    let userSignup = useRef(null)
    let passwordSignup = useRef(null)
    let retypePasswordSignup = useRef(null)
    let phoneSignup = useRef(null)
    let userSignin = useRef(null)

    const handleChangeSignup = () => {
        setIsSignup(true)
    }

    const nextSignin = () => {
        setIsSignup(false)
    }

    const handleSignup = () => {
        let dataCheck = {
            username: userSignup.current.value
        }
        checksignup(dataCheck).then(res => {
            if (
                passwordSignup.current.value == retypePasswordSignup.current.value &&
                phoneSignup.current.value.length < 13 &&
                res.data == true &&
                passwordSignup.current.value.length >= 6
            ) {
                let data = {
                    username: userSignup.current.value,
                    password: passwordSignup.current.value,
                    phone: phoneSignup.current.value
                }
                Signup(data).then(req => (
                    alert("Sign Up Success!")
                ))
            } else {
                alert("Please check your login information !!!")
            }
        })
    }

    const handleSignin = () => {
        let userName = userSignin.current.value
        let password = passwordSignup.current.value
        let dataCheck = {
            username: userName,
            password: password
        }
        checksignin(dataCheck).then(res => {
            if (res.data === false) {
                checkpermissions(dataCheck).then(res => {
                    if (res.data === false) {
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

    useEffect(() => {
        let getIdCustomer = localStorage.getItem("iduser")
        if (getIdCustomer !== null) {
            props.history.push("/")
        }

    }, [])

    const handleInputPhone = (e) => {
        let currentValue = e.target.value
        if (currentValue !== null || currentValue !== "") {
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setCheckPhone(currentValue)
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
                            {!isSignup ? <div className="form-sign-in">
                                <form type="submit" onSubmit={(e) => {
                                    e.preventDefault()
                                    handleSignin()
                                }}>
                                    <div className="con-username active">
                                        <p>User name</p>
                                        <input ref={userSignin} style={checkInfo ? {} : { border: "1px solid rgb(221, 48, 48)" }} type="text" placeholder="user name" />
                                    </div>
                                    <div className="con-password active">
                                        <p>Password</p>
                                        <input style={checkInfo ? {} : { border: "1px solid rgb(221, 48, 48)" }} ref={passwordSignup} type="password" placeholder="password" />
                                    </div>
                                    <div className="check">
                                        <input type="checkbox" /><span>Remember me?</span>
                                    </div>
                                    <input type="submit" style={{ display: 'none' }} />
                                    {checkInfo ? null : <p style={{ color: "red", fontSize: "12px", fontStyle: "italic" }}>please check information !!!</p>}
                                    <div className="con-button-sign">
                                        <button className="btn-sign-in" onClick={handleSignin}>Sign in</button><br />
                                        <Link to="" className="button-fogot">Forgot Password?</Link>
                                    </div>
                                </form>
                                <button className="sign-up" onClick={handleChangeSignup}>Sign up</button>
                            </div> : null}

                            {isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input ref={userSignup} type="text" placeholder="user name" />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input ref={passwordSignup} type="password" placeholder="password" />
                                </div>
                                <div className="con-password active">
                                    <p>Retype Password</p>
                                    <input ref={retypePasswordSignup} type="password" placeholder="password" />
                                </div>
                                <div className="con-password active" >
                                    <p >Phone</p>
                                    <input ref={phoneSignup} value={checkPhone} style={checkPhone.length < 13 ? { border: "1px solid rgb(233, 233, 233) " } : { border: "1px solid red " }} type="text" placeholder="phone" onInput={(e) => handleInputPhone(e)} />
                                </div>
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={handleSignup}>Sign up</button><br />
                                    <br />
                                    <span className="button-acc">Already have an account?</span><Link to="/Signin" onClick={nextSignin}>Sign in</Link>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

