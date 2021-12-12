import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import "../Style/style.css"
import { searchProducts } from "../Service"
import { connect } from 'react-redux'

export default function Navigation(props) {
    const arrNav = [
        {
            name: 'Nữ',
            path: '/main/productwomen'
        },
        {
            name: 'Nam',
            path: '/main/productmen'
        },
        {
            name: 'Trẻ em',
            path: '/main/children'
        },
        {
            name: 'Bộ sưu tập',
            path: '/main/homecollection'
        },
        {
            name: 'jean cao cấp',
            path: '/main/jeancouture'
        },
        {
            name: 'thời trang atelier',
            path: '/main/atelierfashion'
        }
    ]
    const [currentUserName, setcurrentUserName] = useState(null)
    const [listMenu, setListMenu] = useState(arrNav)
    const [isShowSearch, setIsShowSearch] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [arrProduct, setArrProduct] = useState([])
    const [notFoundPro, setnotFoundPro] = useState('')
    let location = useLocation()
    const history = useHistory()

    const searchItem = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("iduser") != null && localStorage.getItem('username')) {
            setIsLogin(true)
            setcurrentUserName(localStorage.getItem('username'))
        }
    }, [])
    useEffect(() => {
        if (props.currentUserName != null) {
            setIsLogin(true)
            setcurrentUserName(props.currentUserName)
        }
    }, [props.currentUserName])

    const signOut = () => {
        setIsLogin(false)
        props.history.push("/main/signin")
        localStorage.removeItem("iduser")
        localStorage.removeItem("username")
        localStorage.removeItem("key_check")
    }

    const handleSearch = () => {
        let currentValue = searchItem.current.value
        searchProducts(currentValue).then(res => {
            let arrProduct = []
            if (res.data == '') {
                setnotFoundPro('No products found !!!')
            } else {
                res.data.map((item) => {
                    item.name = item.name.toLowerCase()
                    arrProduct.push(item)
                })
                setnotFoundPro('')
            }
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
        setnotFoundPro('')
    }

    return (
        <>
            <div className="Header">
                <div className="contact-us" style={{ backgroundColor: "#f5f5f5" }}>
                    <div className="row">
                        <div className="col-4">
                            <ul className='pl-10'>
                                <li className=" cursor-pointer"><span className='text-sm'><i className="far fa-phone-alt mr-2 text-lg"></i>+84 97551239</span></li>
                                <li className="ml-10 cursor-pointer"><span className='text-sm'><i className="far fa-envelope mr-2 text-lg"></i>vannducc00@gmail.com</span></li>
                            </ul>
                        </div>
                        <div className="col-4" style={{ textAlign: "center", fontSize: "30px" }}>
                            <i className="fal fa-crown"></i>
                        </div>
                        <div className="col-4">
                            <ul className='float-right pr-5'>
                                <li>
                                    {!isLogin ?
                                        <span className="btn-sign-in cursor-pointer" onClick={() => history.push('/main/signin')}>Đăng nhập</span> :
                                        <div className="con-select cursor-pointer">
                                            <div>
                                                <i className="far fa-user-circle"></i><span>{currentUserName}</span>
                                            </div>
                                            <div className="menu-select cursor-pointer">
                                                <p className={localStorage.getItem('key_check') ? 'hidden' : 'block'} onClick={() => history.push('/profile')}>Hồ sơ</p>
                                                <p className={localStorage.getItem('key_check') ? 'block' : 'hidden'} onClick={() => history.push('/system')}>Hệ thống</p>
                                                <p className="sign-out" onClick={signOut}>Đăng xuất</p>
                                            </div>
                                        </div>
                                    }
                                </li>
                                <li><i className="fal fa-heart text-lg mx-4 cursor-pointer"></i></li>
                                <li>
                                    <Link to="/main/cart/:customerid" className="btn-sign-in cart">
                                        <i className="fal fa-shopping-bag text-lg"></i>
                                        <span style={{ padding: "0px 1px 0px 5px" }}>Giỏ</span>
                                        {props.countBag >= 0 && isLogin ? `: ${props.countBag}` : `: ${0}`}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="title-web">
                    <Link className="brand-name" to="/main/home">Fashion</Link>
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
                            <h3>Tìm kiếm</h3>
                            <form style={{ borderBottom: "0.2px solid black" }} onSubmit={(e) => {
                                e.preventDefault()
                                handleSearch()
                            }}>
                                <input type="submit" style={{ display: 'none' }} />
                                <input ref={searchItem} type="text" placeholder="Tìm kiếm" />
                                <i className="fal fa-search" onClick={handleSearch}></i>
                            </form>
                        </div>
                    </div>
                    <div className="container" style={{ paddingTop: "5em", overflow: "auto" }}>
                        {notFoundPro != '' ? <p className='text-2xl flex items-center justify-center mt-10'>{notFoundPro}</p> : ''}
                        <div className="row" style={{ overflow: "auto", maxHeight: "40em" }}>
                            {arrProduct.map((item, index) => (
                                <div className="col-md-3" style={{ width: "15em", margin: "1em 0", position: "relative" }} key={index}>
                                    <Link to={"/main/detail/" + item.id} style={{ textDecoration: "none", color: "black" }} onClick={() => closeSearch()}>
                                        <div>
                                            <img src={item.Image} alt="" style={{ width: "100%" }} />
                                            <p style={{ textTransform: "capitalize", paddingBottom: "2.5em", paddingTop: "10px" }}>{item.name}</p>
                                            <p style={{ position: "absolute", bottom: "0" }}>{item.price} đ</p>
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