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
    const [checkInfoSignup, setCheckInfoSignup] = useState('')
    let usernameRef = useRef('')
    let passwordRef = useRef('')
    let confirmPasswordRef = useRef('')
    let phoneNumRef = useRef('')
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
            let number = phoneNumRef.current.value
            if (
                number.length <= 13 && number.length > 0 &&
                passwordRef.current.value.length >= 6 &&
                res.data == true &&
                passwordRef.current.value == confirmPasswordRef.current.value
            ) {
                let data = {
                    phone: phoneNumRef.current.value,
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
                }
                console.log(data)
                Signup(data).then()
                alert('????ng k?? th??nh c??ng')
            } else {
                alert('????ng k?? kh??ng th??nh c??ng !!!')
            }
        })
    }

    return (
        <>
            <div style={{ backgroundColor: "#F9F9F9" }}>
                <div className="container" style={{ paddingTop: "13em" }}>
                    <div className="sign-in"><h4>????ng nh???p</h4></div>
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
                                    <p>T??i kho???n</p>
                                    <input
                                        autoComplete='on'
                                        ref={usernameRef}
                                        type="text"
                                        placeholder="T??i kho???n..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>M???t kh???u</p>
                                    <input
                                        autoComplete='on'
                                        ref={passwordRef}
                                        type="password"
                                        placeholder="M???t kh???u..."
                                    />
                                </div>
                                <input type="submit" className='hidden' />
                                <div className="check">
                                    <input type="checkbox" /><span>Nh??? m???t kh???u?</span>
                                </div>
                                {checkInfo != '' ? <p className='text-red-500 text-sm'>{checkInfo}</p> : ''}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignin()}>????ng nh???p</button><br />
                                    <Link to="#" className="button-fogot">Qu??n m???t kh???u?</Link>
                                </div>
                                <button className="sign-up" onClick={() => setIsSignup(true)}>????ng k??</button>
                            </form> : null}

                            {isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>T??i kho???n</p>
                                    <input
                                        ref={usernameRef}
                                        type="text" placeholder="T??i kho???n..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>M???t kh???u</p>
                                    <input
                                        ref={passwordRef}
                                        type="password" placeholder="M???t kh???u..."
                                    />
                                </div>
                                <div className="con-password active">
                                    <p>Nh???p l???i m???t kh???u</p>
                                    <input
                                        ref={confirmPasswordRef}
                                        type="password"
                                        placeholder="password"
                                    />
                                </div>
                                <div className="con-password active" >
                                    <p >S??? ??i???n tho???i</p>
                                    <input
                                        ref={phoneNumRef}
                                        type="number"
                                        placeholder="phone"
                                    />
                                </div>
                                {/* {checkInfoSignup != '' ? <p className='text-red-500 text-sm'>{checkInfoSignup}</p> : ''} */}
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={() => handleSignup()}>????ng k??</button><br />
                                    <br />
                                    <span className="button-acc">B???n ???? c?? t??i kho???n?</span><Link to="/main/Signin" onClick={() => setIsSignup(false)}>????ng nh???p</Link>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

