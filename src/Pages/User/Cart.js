import React, { Component, useRef, useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom";
import { showcart, remoteproductcart, payment } from '../../Service'
import * as dayjs from 'dayjs'

export default function Cart(props) {
    const history = useHistory()
    const [arrProCart, setArrProCart] = useState([])
    const [totalMoney, setTotalMoney] = useState(0)
    const [countCart, setCountCart] = useState(0)
    const [phone, setPhone] = useState('')
    const LastNameRef = useRef()
    const FirstNameRef = useRef()
    const AddressRef = useRef()
    const PhoneRef = useRef()
    const [isShowTooltip, setisShowTooltip] = useState(false)
    const [selectValue, setselectValue] = useState('Nhận hàng thanh toán')
    let arrMethod = ['Nhận hàng thanh toán', 'Ví điện tử']
    let arrIcon = [
        {
            src: '/Image/paypal.png',
            name: 'Paypal'
        },
        {
            src: '/Image/momo.png',
            name: 'Momo'
        }
    ]
    let isUser = localStorage.getItem("iduser")
    const [currentSelect, setcurrentSelect] = useState('/Image/paypal.png')

    useEffect(() => {
        showcart(isUser).then(res => {
            let arrProCart = []
            res.data.map((item, key) => {
                arrProCart.push(item)
            })
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
        arrayCart.map(item => {
            totalMoney += parseInt(item.amount)
        })
        setTotalMoney(totalMoney)
        setCountCart(arrayCart.length)
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

    const handlePay = () => {
        if (LastNameRef.current.value != '' &&
            FirstNameRef.current.value != '' &&
            AddressRef.current.value != '' &&
            PhoneRef.current.value != '' &&
            PhoneRef.current.value.length < 13
        ) {
            arrProCart.map((item) => {
                let data = {
                    product_id: item.product_id,
                    customer_id: localStorage.getItem("iduser"),
                    name: FirstNameRef.current.value + LastNameRef.current.value,
                    address: AddressRef.current.value,
                    phone: PhoneRef.current.value,
                    date_payment: dayjs().format("YYYY-MM-DD"),
                    name_product: item.name,
                    image: item.Image,
                    quantity: item.quantity,
                    amount: item.amount,
                    color: item.color,
                    size: item.size,
                    typeProduct: item.type_pr_id,
                    pay_method: selectValue
                }
                payment(data).then(() => { })
            })
            setisShowTooltip(true)
        } else {
            alert("Payment failed !!!")
        }
    }

    return (
        <div style={{ backgroundColor: "#f5f6fa" }}>
            <div className={isShowTooltip ? 'active-tool' : 'hidden'}></div>
            <div className={!isShowTooltip ? 'hidden' : 'wapper-pay-form block'}>
                <div className="payment-form">
                    <i className="far fa-times text-2xl absolute top-3 right-5 cursor-pointer" onClick={() => {
                        setisShowTooltip(false)
                    }}></i>
                    <div className={selectValue == 'Nhận hàng thanh toán' ? 'face-money block' : 'hidden'}>
                        <div className="text-center">
                            <img src="/Image/undraw_order_confirmed_re_g0if.svg" alt="" className='w-48 h-auto mb-5 my-0 mx-auto' />
                            <h3 className='text-2xl'>Đặt hàng thành công</h3>
                        </div>
                    </div>
                    <div className={selectValue == 'Ví điện tử' ? 'electronic-wallet block' : 'hidden'}>
                        <div className="text-center">
                            <h3 className='text-2xl mb-3'>{currentSelect}</h3>
                            <img src="/Image/QR_code.jpg" alt="" className='w-48 h-auto mb-5 my-0 mx-auto' />
                            <h3 className='text-md'>Mời bạn quét mã thanh toán</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ marginTop: "12em", padding: "20px 0" }}>
                <h1 className="heading-cart">Giỏ hàng mua sắm</h1>

                {totalMoney === 0 ? <div className="no-product">
                    <h3>Bạn chưa có sản phẩm nào</h3>
                    <button className="continue-shopping" onClick={() => history.push("/main/home")}>tiếp tục mua sắm</button>
                </div> : null}

                <div className="row">
                    <div className="col-8">
                        {totalMoney > 0 ?
                            <div className="">
                                <div className="">
                                    <h5 className="shipping-address">thông tin giao hàng</h5>
                                    <div className="contact">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="title-insert">Họ đệm</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={FirstNameRef} name="" id="" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="title-insert">Tên</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={LastNameRef} name="" id="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ paddingTop: "1.5em" }}>
                                            <div className="col-md-6">
                                                <p className="title-insert">Địa chỉ nhận hàng</p>
                                                <div className="insert-text">
                                                    <input type="text" ref={AddressRef} name="" id="" />
                                                </div>
                                                <div className="insert-text mt-4">
                                                    <input type="text" ref={AddressRef} placeholder='Toà nhà, tầng,..' name="" id="" />
                                                </div>
                                                <div className="options">
                                                    <select id="options__box" value={selectValue} onChange={(e) => setselectValue(e.target.value)} >
                                                        {
                                                            arrMethod.map((item, index) =>
                                                                <option value={item} key={index}>{item}</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                                {selectValue == 'Ví điện tử' ?
                                                    <div className="icon-wallet flex mt-3">
                                                        {arrIcon.map((item, index) =>
                                                            <div key={index} className={currentSelect == item.name ? "wallet-icon mx-2 active-border-icon" : "wallet-icon mx-2"} >
                                                                <img src={item.src} className='w-10' onClick={() => setcurrentSelect(item.name)} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    : null}
                                            </div>
                                            <div className="col-md-6">
                                                <p className="title-insert">Số điện thoại</p>
                                                <div className="insert-text" style={phone.length < 13 ? { border: "1px solid gray" } : { border: "1px solid red" }}>
                                                    <input type="text" ref={PhoneRef} value={phone} onInput={(e) => checkPhone(e)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total-money">
                                    <button className="buy-cart" onClick={() => handlePay()}>Thanh toán<span style={{ fontSize: "1em", paddingLeft: "5px" }}> {totalMoney}đ</span></button>
                                </div>
                            </div> : null
                        }
                    </div >
                    <div className="col-4" >
                        {totalMoney > 0 ? <h5 className='uppercase font-bold pb-3' style={{ borderBottom: "1px solid gray" }}>Giỏ hàng của bạn</h5> : null}
                        <div className="" style={{ overflow: 'auto', height: '34em' }}>
                            {arrProCart.map((item, index) => (
                                <div className="row" key={index} style={{ marginTop: "3em", position: "relative", backgroundColor: "#ecf0f1", padding: "5px", width: '100%' }}>
                                    <div className="col-md-4" >
                                        <img className="image-cart" src={item.Image} alt="" />
                                    </div>
                                    <div className="col-md-7">
                                        <p className="name-cart">{item.name}</p>
                                        <i className="fal fa-times remote-pro-cart" onClick={() => remoteItem(item, -1)}></i>
                                        <div>
                                            <span className="size-cart">Màu: </span> <span>{item.color}</span>
                                            {item.size !== "" ?
                                                <>
                                                    <span className="color-cart active-space">Kích cỡ: </span>
                                                    <span>{item.size}</span>
                                                </>
                                                : null}
                                        </div>
                                        <div >
                                            <div style={{ paddingTop: "1.5em" }}>
                                                <span>{item.amount}</span> đ
                                                <span className="quantity-cart">x</span> <span>{item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {totalMoney > 0 ? <p className='mt-5' style={{ float: "right" }}>
                            <span>Tổng tiền:</span> <span className="total-amount">{totalMoney} đ</span>
                        </p> : null}
                    </div>
                </div >
            </div >
        </div >
    )
}

