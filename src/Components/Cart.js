import React, { Component } from 'react'
import { showcart, remoteproductcart } from '../Service'

export default class Cart extends Component {
    constructor() {
        super()
        this.state = {
            arrProCart: [],
        }
    }
    componentDidMount() {
        showcart(localStorage.getItem("iduser")).then(res => {
            let arrProCart = []
            res.data.map((item) => (
                arrProCart.push(item)
            ))
            this.setState({ arrProCart: arrProCart })
        })
    }

    remoteItem = (item) => {
        let remoteData = {
            id_cart: item.id_cart
        }
        remoteproductcart(remoteData).then(res => {
            if (res.data == true) {
                let arrProCart = this.state.arrProCart
                let indexDelete = arrProCart.findIndex(pro => pro.id_cart == item.id_cart)
                arrProCart.splice(indexDelete, 1)
                this.setState({ arrProCart: arrProCart })
            }
        })
    }



    render() {
        return (
            <div className="container" style={{ paddingTop: "13em" }}>
                {this.state.arrProCart.map((item, index) => (
                    <div className="row" key={index} style={{ borderBottom: "1px solid #bdc3c7", marginTop: "3em", position: "relative" }}>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-4" style={{ height: "14em", width: "10em" }}>
                                    <img className="image-cart" src={item.Image} alt="" />
                                </div>
                                <div className="col-md-8">
                                    <p className="name-cart">{item.name}</p>
                                    <div>
                                        <span className="size-cart">Size: </span> <span>{item.color}</span>
                                        <span className="color-cart active-space">Color: </span> <span>{item.size}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div style={{ paddingTop: "3.5em" }}>
                                <span className="quantity-cart">Quantity: </span> <span>{item.quantity}</span>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <p className="amount-cart"> <span style={{ fontSize: "14px", paddingRight: "15px" }}>Amount:</span>$ <span>{item.amount}</span></p>
                            <i className="fal fa-times remote-pro-cart" onClick={() => this.remoteItem(item)}></i>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
