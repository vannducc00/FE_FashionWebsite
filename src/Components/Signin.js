import { set } from 'date-fns/esm';
import React, { Component, useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { Signup, checksignup, checksignin, checkpermissions, countcart } from "../Service"

export default function Signin(props) {
    const [isSignup, setIsSignup] = useState('')
    const [checkInfo, setCheckInfo] = useState(true)
    const [checkInfoSignup, setCheckInfoSignup] = useState(true)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const phoneNumRef = useRef(null)

    useEffect(() => {
        let getIdCustomer = localStorage.getItem("iduser")
        if (getIdCustomer !== null) {
            props.history.push("/")
        }
    }, [])

    const handleSignin = () => {
        let dataCheck = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        checksignin(dataCheck).then(res => {
            if (res.data == false) {
                checkpermissions(dataCheck).then(res => {
                    if (res.data == false || dataCheck.username == '' || dataCheck.password == '') {
                        setCheckInfo('This field is required !!!')
                    } else {
                        localStorage.setItem("username", dataCheck.username)
                        props.setcurrentUserName(dataCheck.username)
                        localStorage.setItem("iduser", res.data.id)
                        localStorage.setItem("key_check", res.data.key_check)
                        props.history.push("/")
                    }
                })
            } else {
                props.setcurrentUserName(dataCheck.username)
                localStorage.setItem("username", dataCheck.username)
                localStorage.setItem("iduser", res.data.id)
                props.history.push("/")
            }
        })
    }

    const handleSignup = () => {
        let dataCheck = {
            username: usernameRef.current.value
        }
        checksignup(dataCheck).then(res => {
            if (
                phoneNumRef.current.value > 13 ||
                passwordRef.current.value < 6 ||
                res.data == false ||
                passwordRef.current.value != confirmPasswordRef.current.value
            ) {
                setCheckInfoSignup('This field is required. !!!')
            } else {
                let data = {
                    phone: phoneNumRef.current.value,
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                }
                Signup(data).then(() => console.log('oke'))
            }
        })
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
                            {!isSignup ? <form className="form-sign-in" autoComplete='on' onSubmit={(e) => {
                                e.preventDefault()
                                handleSignin()
                            }}>
                                <div className="con-username active">
                                    <p>Username</p>
                                    <input
                                        autoComplete='on'
                                        ref={usernameRef}
                                        type="text"
                                        placeholder="username"
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input
                                        autoComplete='on'
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>
                                <input type="submit" className='hidden' />
                                <div className="check">
                                    <input type="checkbox" /><span>Remember me?</span>
                                </div>
                                {checkInfo != '' ? <p className='text-red-500 text-sm'>{checkInfo}</p> : ''}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignin()}>Sign in</button><br />
                                    <Link to="#" className="button-fogot">Forgot Password?</Link>
                                </div>
                                <button className="sign-up" onClick={() => setIsSignup(true)}>Sign up</button>
                            </form> : null}

                            {isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input
                                        ref={usernameRef}
                                        type="text" placeholder="username"
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input
                                        ref={passwordRef}
                                        type="password" placeholder="password"
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Confirm Password</p>
                                    <input
                                        ref={confirmPasswordRef}
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="con-password active" >
                                    <p >Phone</p>
                                    <input
                                        ref={phoneNumRef}
                                        type="number"
                                        placeholder="phone"
                                    />
                                </div>
                                {checkInfoSignup != '' ? <p className='text-red-500 text-sm'>{checkInfoSignup}</p> : ''}
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

