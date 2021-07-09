import axios from 'axios';
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import { Signup, checksignup, checksignin } from "../Service"

export default class Signin extends Component {
    constructor() {
        super()
        this.state = {
            isSignup: false,
            arrCheckSignup: []
        }
        this.userSignup = React.createRef()
        this.passwordSignup = React.createRef()
        this.retypePasswordSignup = React.createRef()
        this.phoneSignup = React.createRef()
    }

    handleChangeSignup = () => {
        this.setState({ isSignup: true })
    }

    nextSignin = () => {
        this.setState({ isSignup: false })
    }

    handleSignup = () => {
        let dataCheck = {
            username: this.userSignup.current.value
        }
        checksignup(dataCheck).then(res => {
            console.log(res.data)
            if (
                this.passwordSignup.current.value == this.retypePasswordSignup.current.value &&
                this.phoneSignup.current.value.length == 10 &&
                res.data == true && this.passwordSignup.current.value.length >= 6
            ) {
                let data = {
                    phone: this.phoneSignup.current.value,
                    username: this.userSignup.current.value,
                    password: this.passwordSignup.current.value
                }
                Signup(data).then(req => (
                    console.log("Please check your login information !!!")
                ))
                alert("Sign Up Success!")
            } else {
                console.log("Please check your login information !!!")
            }
        })
    }

    handleSignin = () => {
        let dataCheck = {
            username: this.userSignup.current.value,
            password: this.passwordSignup.current.value
        }
        checksignin(dataCheck).then(res => {
            if (res.data == false) {
                alert("Please check your login information !!!!")
            } else {
                localStorage.setItem("username", this.userSignup.current.value)
                localStorage.setItem("iduser", res.data.id)
                window.location.reload(true)
            }
        })
    }

    componentDidMount() {
        if (localStorage.getItem("iduser") != null) {
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "#F9F9F9" }}>
                <div className="container" style={{ paddingTop: "13em" }}>
                    <div className="sign-in"><h4>Sign in</h4></div>
                    <div className="row" style={{ paddingBottom: "50px" }}>
                        <div className="col-md-6">
                            <img src="/Image/undraw_Online_shopping.svg" alt="" style={{ width: "100%", padding: "50px" }} />
                        </div>
                        <div className="col-md-6" style={{ borderLeft: "1px solid #e2e2e2" }}>
                            {!this.state.isSignup ? <div className="form-sign-in">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input ref={this.userSignup} type="text" placeholder="user name" />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input ref={this.passwordSignup} type="password" placeholder="password" />
                                </div>
                                <div className="check">
                                    <input type="checkbox" /><span>Remember me?</span>
                                </div>
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={this.handleSignin}>Sign in</button><br />
                                    <Link to="" className="button-fogot">Forgot Password?</Link>
                                </div>
                                <button className="sign-up" onClick={this.handleChangeSignup}>Sign up</button>
                            </div> : null}

                            {this.state.isSignup ? <div className="form-sign-up">
                                <div className="con-username active">
                                    <p>User name</p>
                                    <input ref={this.userSignup} type="text" placeholder="user name" />
                                </div>
                                <div className="con-password active">
                                    <p>Password</p>
                                    <input ref={this.passwordSignup} type="password" placeholder="password" />
                                </div>
                                <div className="con-password active">
                                    <p>Retype Password</p>
                                    <input ref={this.retypePasswordSignup} type="password" placeholder="password" />
                                </div>
                                <div className="con-password active">
                                    <p>Phone</p>
                                    <input ref={this.phoneSignup} type="number" placeholder="phone" />
                                </div>
                                <div className="con-button-sign">
                                    <button className="btn-sign-in" onClick={this.handleSignup}>Sign up</button><br />
                                    <br />
                                    <span className="button-acc">Already have an account?</span><Link to="/Signin" onClick={this.nextSignin}>Sign in</Link>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
