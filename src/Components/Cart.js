import React, { Component, useRef, useState, useEffect } from 'react'
import { showcart, remoteproductcart, payment } from '../Service'
import * as dayjs from 'dayjs'

export default function Cart(props) {
    const [arrProCart, setArrProCart] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [currentMonth, setCurrentMonth] = useState('')
    const [currentYear, setCurrentYear] = useState('')
    const [phone, setPhone] = useState('')
    const [cardNumber, setCardNumber] = useState('')
    const [countCart, setCountCart] = useState(0)
    const takeLastName = useRef(null)
    const takeFirstName = useRef(null)
    const takeAddress = useRef(null)
    const takePhone = useRef(null)
    const takeCardNumber = useRef(null)
    const takeMonth = useRef(null)
    const takeYear = useRef(null)
    let isUser = localStorage.getItem("iduser")

    useEffect(() => {
        showcart(isUser).then(res => {
            let arrProCart = []
            res.data.map((item) => (
                arrProCart.push(item)
            ))
            updateTotal(arrProCart)
            setArrProCart(arrProCart)
        })
    }, [])

    const remoteItem = (item, reduce) => {
        let remoteData = {
            id_cart: item.id_cart
        }
        remoteproductcart(remoteData).then(res => {
            if (res.data === true) {
                let arrProCart = arrProCart
                let indexDelete = arrProCart.findIndex(pro => pro.id_cart === item.id_cart)
                arrProCart.splice(indexDelete, 1)
                updateTotal(arrProCart)
                setArrProCart(arrProCart)
            }
        })
        props.countCart(reduce)
    }

    const updateTotal = (arrayCart) => {
        let totalMoney = 0
        arrayCart.forEach(item => {
            totalMoney += parseInt(item.amount)
        })
        setTotalMoney(totalMoney)
        setCountCart(arrayCart.length)
    }

    const IsComingHome = () => {
        props.history.push("/")
    }

    const handlePay = () => {
        if (takeLastName.current.value !== "" &&
            takeFirstName.current.value !== "" &&
            takeAddress.current.value !== "" &&
            takePhone.current.value !== "" &&
            takeMonth.current.value !== "" &&
            takeYear.current.value !== "" &&
            takeCardNumber.current.value !== "" &&
            takePhone.current.value.length < 13
        ) {
            arrProCart.forEach((item) => {
                let data = {
                    cart_id: item.id_cart,
                    customer_id: localStorage.getItem("iduser"),
                    name: takeFirstName.current.value + takeLastName.current.value,
                    address: takeAddress.current.value,
                    phone: takePhone.current.value,
                    date_payment: dayjs().format("YYYY-MM-DD"),
                    amount: item.amount,
                    type_pr_id: item.type_pr_id
                }
                payment(data).then(req => {
                })
            })
            alert("Payment success !!!")
        } else {
            alert("Payment failed !!!")
        }
    }

    const checkYear = (e) => {
        let currentValue = e.target.value
        let year = new Date().getFullYear()
        if (currentValue !== null || currentValue !== "") {
            currentValue = parseInt(currentValue)
            if (currentValue > year || currentValue < 0) {
                currentValue = year
            }
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setCurrentYear(currentValue)
    }

    const checkMonth = (e) => {
        let currentValue = e.target.value
        if (currentValue !== null || currentValue !== "") {
            currentValue = parseInt(currentValue)
            if (currentValue > 12 || currentValue < 0) {
                currentValue = 12
            }
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setCurrentMonth(currentValue)
    }

    const checkPhone = (e) => {
        let currentValue = e.target.value
        if (currentValue !== null || currentValue !== "") {
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setPhone(currentValue)
    }

    const checkCardNumber = (e) => {
        let currentValue = e.target.value
        if (currentValue !== null || currentValue !== "") {
            currentValue = parseInt(currentValue)
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        setCardNumber(currentValue)
    }

    return (
        <div style={{ backgroundColor: "#f5f6fa" }}>
            <div className="container" style={{ marginTop: "12em", padding: "20px 0" }}>
                <h1 className="heading-cart">Shopping Bag</h1>

                {totalMoney === 0 ? <div className="no-product">
                    <h3>You don't have any products yet</h3>
                    <button className="continue-shopping" onClick={IsComingHome}>continue shopping</button>
                </div> : null}

                <div className="row">
                    <div className="col-8">
                        {totalMoney > 0 ?
                            <div className="">
                                <div className="">
                                    <h5 className="shipping-address">shipping address</h5>
                                    <div className="contact">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="title-insert">First Name</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={takeFirstName} name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="title-insert">Last Name</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={takeLastName} name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ paddingTop: "1.5em" }}>
                                            <div className="col-md-7">
                                                <p className="title-insert">Address</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={takeAddress} name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="title-insert">Phone</p>
                                                <div className="insert-text" style={phone.length < 13 ? { border: "1px solid gray" } : { border: "1px solid red" }}>
                                                    <input type="text" ref={takePhone} value={phone} onInput={(e) => checkPhone(e)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="credit-card">
                                        <p><i className="fad fa-credit-card"></i><span style={{ paddingLeft: "10px" }}>Debit / Credit Card</span></p>
                                        <div className="">
                                            <p className="title-insert">Card Number</p>
                                            <div className="insert-text">
                                                <input type="text" ref={takeCardNumber} value={cardNumber} onInput={(e) => checkCardNumber(e)} />
                                            </div>
                                        </div>
                                        <div className="" style={{ paddingTop: "1.5em" }}>
                                            <p className="title-insert">Valid Date</p>
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="insert-text">
                                                        <input type="text" ref={takeMonth} value={currentMonth} onInput={(e) => checkMonth(e)} placeholder="MM" />
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="insert-text">
                                                        <input type="text" ref={takeYear} value={currentYear} onInput={(e) => checkYear(e)} placeholder="YYYY" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total-money">
                                    <button className="buy-cart" onClick={() => handlePay()}>Pay<span style={{ fontSize: "1em", paddingLeft: "5px" }}> ${totalMoney}</span></button>
                                </div>
                            </div> : null}
                    </div>
                    <div className="col-4" >
                        {totalMoney > 0 ? <h5 style={{ fontWeight: "bold", borderBottom: "1px solid gray", paddingBottom: "10px" }}>Your Order</h5> : null}
                        {arrProCart.map((item, index) => (
                            <div className="row" key={index} style={{ marginTop: "3em", position: "relative", backgroundColor: "#ecf0f1", padding: "5px" }}>
                                <div className="col-md-4" >
                                    <img className="image-cart" src={item.Image} alt="" />
                                </div>
                                <div className="col-md-7">
                                    <p className="name-cart">{item.name}</p>
                                    <i className="fal fa-times remote-pro-cart" onClick={() => remoteItem(item, -1)}></i>
                                    <div>
                                        <span className="size-cart">Color: </span> <span>{item.color}</span>
                                        {item.size !== "" ?
                                            <>
                                                <span className="color-cart active-space">Size: </span>
                                                <span>{item.size}</span>
                                            </>
                                            : null}
                                    </div>
                                    <div >
                                        <div style={{ paddingTop: "1.5em" }}>
                                            $ <span>{item.amount}</span>
                                            <span className="quantity-cart">x</span> <span>{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {totalMoney > 0 ? <p style={{ float: "right", marginTop: "20px" }}>
                            <span>Total money:</span> <span className="total-amount">${totalMoney}</span>
                        </p> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

