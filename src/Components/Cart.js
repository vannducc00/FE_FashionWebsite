import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showcart, remoteproductcart, payment } from '../Service'
import * as dayjs from 'dayjs'

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            arrProCart: [],
            totalMoney: 0,
            currentMonth: "",
            currentYear: "",
            phone: "",
            cardNumber: ""
        }
        this.takeLastName = React.createRef()
        this.takeFirstName = React.createRef()
        this.takeAddress = React.createRef()
        this.takePhone = React.createRef()
        this.takeCardNumber = React.createRef()
        this.takeMonth = React.createRef()
        this.takeYear = React.createRef()
    }

    componentDidMount() {
        showcart(localStorage.getItem("iduser")).then(res => {
            let arrProCart = []
            res.data.map((item) => (
                arrProCart.push(item)
            ))
            this.updateTotal(arrProCart)
            this.setState({ arrProCart: arrProCart })
        })
    }

    remoteItem = (item, minus) => {
        this.props.reduceCount(minus)
        let remoteData = {
            id_cart: item.id_cart
        }
        remoteproductcart(remoteData).then(res => {
            if (res.data == true) {
                let arrProCart = this.state.arrProCart
                let indexDelete = arrProCart.findIndex(pro => pro.id_cart == item.id_cart)
                arrProCart.splice(indexDelete, 1)
                this.updateTotal(arrProCart)
                this.setState({ arrProCart: arrProCart })
            }
        })
    }

    updateTotal = (arrayCart) => {
        let totalMoney = 0
        arrayCart.map(item => {
            totalMoney += parseInt(item.amount)
        })
        this.setState({ totalMoney })
    }

    IsComingHome = () => {
        this.props.history.push("/")
    }

    handlePay = () => {
        if (this.takeLastName.current.value != "" &&
            this.takeFirstName.current.value != "" &&
            this.takeAddress.current.value != "" &&
            this.takePhone.current.value != "" &&
            this.takeMonth.current.value != "" &&
            this.takeYear.current.value != "" &&
            this.takeCardNumber.current.value != "" &&
            this.takePhone.current.value.length < 13
        ) {
            this.state.arrProCart.map((item) => {
                let data = {
                    cart_id: item.id_cart,
                    customer_id: localStorage.getItem("iduser"),
                    name: this.takeFirstName.current.value + this.takeLastName.current.value,
                    address: this.takeAddress.current.value,
                    phone: this.takePhone.current.value,
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

    checkYear = (e) => {
        let currentValue = e.target.value
        let year = new Date().getFullYear()
        if (currentValue != null || currentValue != "") {
            currentValue = parseInt(currentValue)
            if (currentValue > year || currentValue < 0) {
                currentValue = year
            }
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        this.setState({ currentYear: currentValue })
    }

    checkMonth = (e) => {
        let currentValue = e.target.value
        if (currentValue != null || currentValue != "") {
            currentValue = parseInt(currentValue)
            if (currentValue > 12 || currentValue < 0) {
                currentValue = 12
            }
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        this.setState({ currentMonth: currentValue })
    }

    checkPhone = (e) => {
        let currentValue = e.target.value
        if (currentValue != null || currentValue != "") {
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        this.setState({ phone: currentValue })
    }

    checkCardNumber = (e) => {
        let currentValue = e.target.value
        if (currentValue != null || currentValue != "") {
            currentValue = parseInt(currentValue)
            if (isNaN(currentValue)) {
                currentValue = ""
            }
        }
        this.setState({ cardNumber: currentValue })
    }

    render() {
        return (
            <div style={{ backgroundColor: "#f5f6fa" }}>
                <div className="container" style={{ marginTop: "12em", padding: "20px 0" }}>
                    <h1 className="heading-cart">Shopping Bag</h1>

                    {this.state.totalMoney == 0 ? <div className="no-product">
                        <h3>You don't have any products yet</h3>
                        <button className="continue-shopping" onClick={this.IsComingHome}>continue shopping</button>
                    </div> : null}

                    <div className="row">
                        <div className="col-8">
                            {this.state.totalMoney > 0 ?
                                <div className="">
                                    <div className="">
                                        <h5 className="shipping-address">shipping address</h5>
                                        <div className="contact">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="title-insert">First Name</p>
                                                    <div className="insert-text">
                                                        <input type="text" ref={this.takeFirstName} name="" id="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <p className="title-insert">Last Name</p>
                                                    <div className="insert-text">
                                                        <input type="text" ref={this.takeLastName} name="" id="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" style={{ paddingTop: "1.5em" }}>
                                                <div className="col-md-7">
                                                    <p className="title-insert">Address</p>
                                                    <div className="insert-text">
                                                        <input type="text" ref={this.takeAddress} name="" id="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <p className="title-insert">Phone</p>
                                                    <div className="insert-text" style={this.state.phone.length < 13 ? { border: "1px solid gray" } : { border: "1px solid red" }}>
                                                        <input type="text" ref={this.takePhone} value={this.state.phone} onInput={(e) => this.checkPhone(e)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="credit-card">
                                            <p><i className="fad fa-credit-card"></i><span style={{ paddingLeft: "10px" }}>Debit / Credit Card</span></p>
                                            <div className="">
                                                <p className="title-insert">Card Number</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={this.takeCardNumber} value={this.state.cardNumber} onInput={(e) => this.checkCardNumber(e)} />
                                                </div>
                                            </div>
                                            <div className="" style={{ paddingTop: "1.5em" }}>
                                                <p className="title-insert">Valid Date</p>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <div className="insert-text">
                                                            <input type="text" ref={this.takeMonth} value={this.state.currentMonth} onInput={(e) => this.checkMonth(e)} placeholder="MM" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <div className="insert-text">
                                                            <input type="text" ref={this.takeYear} value={this.state.currentYear} onInput={(e) => this.checkYear(e)} placeholder="YYYY" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="total-money">
                                        <button className="buy-cart" onClick={() => this.handlePay()}>Pay<span style={{ fontSize: "1em", paddingLeft: "5px" }}> ${this.state.totalMoney}</span></button>
                                    </div>
                                </div> : null}
                        </div>
                        <div className="col-4">
                            {this.state.totalMoney > 0 ? <h5 style={{ fontWeight: "bold", borderBottom: "1px solid gray", paddingBottom: "10px" }}>Your Order</h5> : null}
                            {this.state.arrProCart.map((item, index) => (
                                <div className="row" key={index} style={{ marginTop: "3em", position: "relative", backgroundColor: "#ecf0f1", padding: "5px" }}>
                                    <div className="col-md-4" >
                                        <img className="image-cart" src={item.Image} alt="" />
                                    </div>
                                    <div className="col-md-7">
                                        <p className="name-cart">{item.name}</p>
                                        <i className="fal fa-times remote-pro-cart" onClick={() => this.remoteItem(item, -1)}></i>
                                        <div>
                                            <span className="size-cart">Color: </span> <span>{item.color}</span>
                                            {item.size != "" ?
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
                            {this.state.totalMoney > 0 ? <p style={{ float: "right", marginTop: "20px" }}>
                                <span>Total money:</span> <span className="total-amount">${this.state.totalMoney}</span>
                            </p> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
