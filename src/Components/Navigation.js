import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import "../Style/style.css"
import { searchProducts } from "../Service"
import { isExists } from 'date-fns';

export default class Navigation extends Component {
    constructor() {
        super()
        this.state = {
            currentMenu: "",
            listMenu: ["Women", "Men", "Home Collection", "Jean couture", "atelier fashion", "Sale", "Designers", "la vacanza"],
            isShowSearch: false,
            isLogin: false,
            arrProduct: []
        }
        this.searchItem = React.createRef()
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

    searchProducts = () => {
        searchProducts(this.searchItem.current.value).then(res => {
            let arrProduct = []
            res.data.map((item) => {
                item.name = item.name.toLowerCase()
                arrProduct.push(item)
            })
            this.setState({ arrProduct: arrProduct })
        })
    }

    handleSearch = () => {
        document.body.style.height = "100%"
        document.body.style.overflow = "hidden"
        let arrZero = []
        this.setState({ isShowSearch: true, arrProduct: arrZero })
    }

    closeSearch = () => {
        document.body.style.height = "unset"
        document.body.style.overflow = "unset"
        this.setState({ isShowSearch: false })
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
                                    <li><Link to="/cart/:customerid" className="btn-sign-in cart"><i className="fal fa-shopping-bag" style={{ fontSize: "20px" }}></i><span style={{ paddingLeft: "5px" }}>Bag</span></Link></li>
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
                        <i className="fal fa-search search-button" onClick={this.handleSearch}></i>
                    </div>
                </div>

                {this.state.isShowSearch ?
                    <div className="pro-search">
                        <i className="fal fa-times" onClick={() => this.closeSearch()}></i>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div className="con-search" style={{ textAlign: "center" }}>
                                <h3>search</h3>
                                <div style={{ borderBottom: "0.2px solid black" }}>
                                    <input ref={this.searchItem} type="text" placeholder="Search" />
                                    <i className="fal fa-search" onClick={this.searchProducts}></i>
                                </div>
                            </div>
                        </div>
                        <div className="container" style={{ paddingTop: "5em", overflow: "auto" }}>
                            <div className="row" style={{ overflow: "auto", maxHeight: "40em" }}>
                                {this.state.arrProduct.map((item, index) => (
                                    <div className="col-md-3" style={{ width: "15em", margin: "1em 0", position: "relative" }} key={index}>
                                        <Link to={"/detail/" + item.id} style={{ textDecoration: "none", color: "black" }} onClick={() => this.closeSearch()}>
                                            <div>
                                                <img src={item.Image} alt="" style={{ width: "100%" }} />
                                                <p style={{ textTransform: "capitalize", paddingBottom: "2.5em", paddingTop: "10px" }}>{item.name}</p>
                                                <p style={{ position: "absolute", bottom: "0" }}>$ {item.price}</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    : null}
            </>
        )
    }
}
