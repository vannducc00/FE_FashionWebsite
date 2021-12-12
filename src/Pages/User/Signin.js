import { set } from 'date-fns/esm';
import React, { Component, useState, useEffect, useRef } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";
import { Link } from "react-router-dom";
import { Signup, checksignup, checksignin, checkpermissions, countcart } from "../../Service"

export default function Signin(props) {
    const [isSignup, setIsSignup] = useState('')
    const [checkInfo, setCheckInfo] = useState(true)
    const [checkInfoSignup, setCheckInfoSignup] = useState(true)
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const phoneNumRef = useRef(null)
    const history = useHistory()
    let getIdCustomer = localStorage.getItem("iduser")
    useEffect(() => {
        if (getIdCustomer != null) {
            history.push("/main/home")
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
                        history.push("/system")
                    }
                })
            } else {
                let data = {
                    customer_id: getIdCustomer
                }
                countcart(data).then()
                props.setcurrentUserName(dataCheck.username)
                localStorage.setItem("username", dataCheck.username)
                localStorage.setItem("iduser", res.data.id)
                history.push("/main/home")
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
                    <div className="sign-in"><h4>Đăng nhập</h4></div>
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
                                    <p>Tài khoản</p>
                                    <input
                                        autoComplete='on'
                                        ref={usernameRef}
                                        type="text"
                                        placeholder="Tài khoản..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Mật khẩu</p>
                                    <input
                                        autoComplete='on'
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="Mật khẩu..."
                                    />
                                </div>
                                <input type="submit" className='hidden' />
                                <div className="check">
                                    <input type="checkbox" /><span>Nhớ mật khẩu?</span>
                                </div>
                                {checkInfo != '' ? <p className='text-red-500 text-sm'>{checkInfo}</p> : ''}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignin()}>Đăng nhập</button><br />
                                    <Link to="#" className="button-fogot">Quên mật khẩu?</Link>
                                </div>
                                <button className="sign-up" onClick={() => setIsSignup(true)}>Đăng ký</button>
                            </form> : null}

                            {isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>Tài khoản</p>
                                    <input
                                        ref={usernameRef}
                                        type="text" placeholder="Tài khoản..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Mật khẩu</p>
                                    <input
                                        ref={passwordRef}
                                        type="password" placeholder="Mật khẩu..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Nhập lại mật khẩu</p>
                                    <input
                                        ref={confirmPasswordRef}
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="con-password active" >
                                    <p >Số điện thoại</p>
                                    <input
                                        ref={phoneNumRef}
                                        type="number"
                                        placeholder="phone"
                                    />
                                </div>
                                {checkInfoSignup != '' ? <p className='text-red-500 text-sm'>{checkInfoSignup}</p> : ''}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignup()}>Đăng ký</button><br />
                                    <br />
                                    <span className="button-acc">Bạn đã có tài khoản?</span><Link to="/main/Signin" onClick={() => setIsSignup(false)}>Đăng nhập</Link>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

