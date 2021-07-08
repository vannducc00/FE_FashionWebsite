import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import "../Style/style.css"

export default class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            currentMenu: "",
            listMenu: ["Women", "Men", "Home Collection", "Jean couture", "atelier fashion", "Sale", "Designers", "la vacanza"],
            isShowSearch: false,
            isLogin: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("iduser") != null) {
            this.setState({ isLogin: true })
        }
    }

    signOut = () => {
        localStorage.removeItem("iduser")
        this.setState({ isLogin: false })
    }

    render() {
        return (
            <>
                <div className="Header">
                    <div className="contact-us" style={{ backgroundColor: "#f5f5f5" }}>
                        <div className="row" style={{}}>
                            <div className="col-4 bar-left">
                                <ul>
                                    <li className=""><span><i className="far fa-phone-alt" style={{ fontSize: "20px" }}></i>Customer Service</span></li>
                                    <li className=""><span><i className="fal fa-map-marker-alt" style={{ fontSize: "20px" }}></i>Boutiques</span></li>
                                </ul>
                            </div>
                            <div className="col-4" style={{ textAlign: "center", fontSize: "30px" }}>
                                <i className="fal fa-crown"></i>
                            </div>
                            <div className="col-4 bar-right">
                                <ul>
                                    <li>{!this.state.isLogin ?
                                        <Link to="/Signin" className="btn-sign-in">Sign in / Register</Link> :
                                        <div className="con-select">
                                            <div>
                                                <i className="far fa-user-circle"></i><span>{localStorage.getItem('username')}</span>
                                            </div>
                                            <div className="menu-select">
                                                <p className="sign-out" onClick={this.signOut}>Sign out</p>
                                            </div>
                                        </div>
                                    }
                                    </li>
                                    <li><i className="fal fa-heart" style={{ fontSize: "20px" }}></i></li>
                                    <li><Link to="/cart" className="btn-sign-in cart"><i className="fal fa-shopping-bag" style={{ fontSize: "20px" }}></i><span style={{ paddingLeft: "5px" }}>Bag</span></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="title-web">
                        <Link className="brand-name" to="/">Fashion</Link>
                    </div>
                    <div className="navigations">
                        <ul>
                            {this.state.listMenu.map((item, index) => (
                                <li className="items" key={index} onClick={() => this.setState({ currentMenu: item })}>
                                    <span className={this.state.currentMenu == item ? "menu-bars--active" : ""}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <i className="fal fa-search search-button" onClick={() => this.setState({ isShowSearch: true })}></i>
                    </div>
                </div>

                {this.state.isShowSearch ?
                    <div className="pro-search">
                        <i className="fal fa-times" onClick={() => this.setState({ isShowSearch: false })}></i>
                        <div className="con-search" style={{ textAlign: "center" }}>
                            <h3>search</h3>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <input type="text" placeholder="Search" />
                                <i className="fal fa-search"></i>
                            </div>
                        </div>
                    </div>
                    : null}
            </>
        )
    }
}
