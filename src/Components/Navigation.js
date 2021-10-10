import React, { useEffect, useState, useRef } from 'react'
import { Link } from "react-router-dom";
import "../Style/style.css"
import { searchProducts } from "../Service"
import { connect } from 'react-redux'

export default function Navigation(props) {
    const arrNav = [
        {
            name: 'women',
            path: '/productwomen'
        },
        {
            name: 'men',
            path: '/productmen'
        },
        {
            name: 'children',
            path: '/children'
        },
        {
            name: 'home collection',
            path: '/homecollection'
        },
        {
            name: 'jean couture',
            path: '/jeancouture'
        },
        {
            name: 'atelier fashion',
            path: '/atelierfashion'
        }
    ]
    const [listMenu, setListMenu] = useState(arrNav)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [arrProduct, setArrProduct] = useState([])

    const searchItem = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("iduser") != null) {
            setIsLogin(true)
        }
    }, [])

    const signOut = () => {
        localStorage.removeItem("iduser")
        localStorage.removeItem("username")
        setIsLogin(false)
        props.history.push("/signin")
        window.location.reload(true)
    }

    const handleSearch = () => {
        // get current value from tag input --------------------
        let currentValue = searchItem.current.value

        searchProducts(currentValue).then(res => {
            let arrProduct = []
            res.data.forEach((item) => {
                item.name = item.name.toLowerCase()
                arrProduct.push(item)
            })
            setArrProduct(arrProduct)
        })
    }

    const nextSearch = () => {
        document.body.style.height = "100%"
        document.body.style.overflow = "hidden"
        let arrZero = []
        setIsShowSearch(true)
        setArrProduct(arrZero)
    }

    const closeSearch = () => {
        document.body.style.height = "unset"
        document.body.style.overflow = "unset"
        setIsShowSearch(false)
    }

    return (
        <>
            <div className="Header">
                <div className="contact-us" style={{ backgroundColor: "#f5f5f5" }}>
                    <div className="row">
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
                                <li>{!isLogin ?
                                    <Link to="/Signin" className="btn-sign-in">Sign in / Register</Link> :
                                    <div className="con-select">
                                        <div>
                                            <i className="far fa-user-circle"></i><span>{localStorage.getItem('username')}</span>
                                        </div>
                                        <div className="menu-select">
                                            <p className="sign-out" onClick={signOut}>Sign out</p>
                                        </div>
                                    </div>
                                }
                                </li>
                                <li><i className="fal fa-heart" style={{ fontSize: "20px" }}></i></li>
                                <li>
                                    <Link to="/cart/:customerid" className="btn-sign-in cart">
                                        <i className="fal fa-shopping-bag" style={{ fontSize: "20px" }}></i>
                                        <span style={{ padding: "0px 1px 0px 5px" }}>Bag</span>
                                        {props.countBag >= 0 ? ': ' + props.countBag : ': ' + 0}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="title-web">
                    <Link className="brand-name" to="/">Fashion</Link>
                </div>

                {/* --------------------------------- Navigations --------------------------------- */}

                <div className="navigations">
                    <ul>
                        {listMenu.map((item, index) => (
                            <li className="items" key={index} >
                                <Link className="current-menu" to={item.path}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                    <i className="fal fa-search search-button" onClick={nextSearch}></i>
                </div>

            </div>

            {/* --------------------------------- Search product --------------------------------- */}

            {isShowSearch ?
                <div className="pro-search">
                    <i className="fal fa-times" onClick={() => closeSearch()}></i>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="con-search" style={{ textAlign: "center" }}>
                            <h3>search</h3>
                            <div style={{ borderBottom: "0.2px solid black" }}>
                                <input ref={searchItem} type="text" placeholder="Search" />
                                <i className="fal fa-search" onClick={handleSearch}></i>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ paddingTop: "5em", overflow: "auto" }}>
                        <div className="row" style={{ overflow: "auto", maxHeight: "40em" }}>
                            {arrProduct.map((item, index) => (
                                <div className="col-md-3" style={{ width: "15em", margin: "1em 0", position: "relative" }} key={index}>
                                    <Link to={"/detail/" + item.id} style={{ textDecoration: "none", color: "black" }} onClick={() => closeSearch()}>
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
                : null
            }
        </>
    )
}