import React, { useState, useEffect, useRef } from 'react'
import * as dayjs from 'dayjs'
import { addtocart, getDetailproduct, relatedProduct, countcart } from "../Service"

export default function Detail(props) {
    const [quantity, setQuantity] = useState(1)
    const [arrDetail, setArrDetail] = useState([])
    const [selectSize, setSelectSize] = useState('')
    const [currentClick, setCurrentClick] = useState('')
    const [arrRelatedProduct, setArrRelatedProduct] = useState([])
    const [isShowImage, setIsShowImage] = useState('')
    const takeQuantity = useRef(null)
    let getIdCustomer = localStorage.getItem("iduser")


    let initialIdProduct = props.match.params.idpro
    useEffect(() => {
        getProductDetail(props)
    }, [])


    const getProductDetail = (props) => {
        getDetailproduct(initialIdProduct).then(res => {
            let arrDetail = []
            res.data.map(item => {
                arrDetail.push(item)
            })
            let imagePro
            let colorPro
            let arrRelatedProduct = []
            arrDetail.map(item => (
                colorPro = item.color[0],
                imagePro = item.image_url[0]
            ))

            let typeProduct = res.data[0].type_pr_id
            relatedProduct(typeProduct).then(res => {
                res.data.map(item => (
                    arrRelatedProduct.push(item)
                ))
                setArrDetail(arrDetail)
                setIsShowImage(imagePro)
                setCurrentClick(colorPro)
                setArrRelatedProduct(arrRelatedProduct)
            })
        })
    }


    useEffect(() => {
        getProductDetail(initialIdProduct)

    }, [initialIdProduct])

    const productRelated = (item) => {
        props.history.push('/detail/' + item.id)
    }

    const changeQuantity = (e) => {
        // lấy quantity hiện tại
        let currentQuantity = e.target.value
        setQuantity(currentQuantity);
    }

    const changeImage = (e) => {
        // lấy ảnh hiện tại
        let currentImage = e.target.src
        setIsShowImage(currentImage)
    }

    const handleAddToBag = (e, plus) => {
        props.countCart(plus)
        let getQuantity = takeQuantity.current.value
        let amountPro = parseInt(e.price) * takeQuantity.current.value
        let currentDateTime = dayjs().format("YYYY-MM-DD")
        let data = {
            product_id: e.id,
            customer_id: getIdCustomer,
            nameProduct: e.name,
            imagePro: isShowImage,
            type_pr_id: e.type_pr_id,
            quantity: getQuantity,
            color: currentClick,
            size: selectSize,
            amount: amountPro,
            create_date: currentDateTime
        }
        if (e.size == null || selectSize !== "") {
            addtocart(data).then()
        }
    }

    const changeMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const changePlus = () => {
        setQuantity(quantity + 1)
    }

    const inputQuantity = (e) => {
        let parseQuantity = e.target.value
        if (!isNaN(parseQuantity)) {
            setQuantity(parseQuantity)
        }
    }

    return (
        <div className="container-fluid">
            <div className="container" style={{ paddingTop: "13.5em" }}>
                <div className="row">
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-3">
                                {arrDetail.map((item) =>
                                (
                                    item.image_url.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <div className="col-md-12" key={index} >
                                                    <img key={index} src={item} alt="" style={{ width: "100%", padding: "5px", cursor: "pointer" }} onClick={changeImage} />
                                                </div>
                                            )
                                        }
                                    })
                                ))}

                            </div>
                            <div className="col-md-9" style={{ height: "43.5em" }}>
                                <img src={isShowImage} alt="" style={{ width: "100%", height: "100%" }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5" style={{ padding: "0 40px" }}>
                        {arrDetail.map((item, index) => (
                            <div className="" key={index}>
                                <h3 className="name-product">{item.name}</h3>
                                <p className="price">$ {item.price}</p>
                                <p className="description">{item.description}</p>
                                <div className="con-size">
                                    {item.size ? item.size.map((item, index) =>
                                        <button key={index} className={selectSize === item ? "select-size active-select" : "select-size"} onClick={() => setSelectSize(item)}>{item}</button>
                                    ) : null}
                                </div>
                                <div className="con-color">
                                    {item.color ? item.color.map((item, index) =>
                                        <button key={index} className={currentClick === item ? "select-color active-select" : "select-color"} onClick={() => setCurrentClick(item)} key={index}>{item}</button>
                                    ) : null}
                                </div>
                                <div className="quantity-select">
                                    <button className="change-number" onClick={changeMinus}><i className="fal fa-minus"></i></button>
                                    <input type="text" value={quantity} ref={takeQuantity} onInput={(e) => inputQuantity(e)} />
                                    <button className="change-number" onClick={changePlus}><i className="fal fa-plus"></i></button>
                                </div>
                                <div className="con-buy">
                                    <button className="buy" onClick={() => handleAddToBag(item, 1)}>add to bag</button>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{ marginTop: "130px", paddingTop: "50px", borderTop: "1px solid rgb(197, 197, 197)" }}>
                <div className="row">
                    {arrRelatedProduct.map((item, index) => {
                        if (index < 6) {
                            return (
                                <div className="col-md-2" style={{ height: "", textAlign: "center" }} key={index} onClick={() => productRelated(item)} >
                                    <img src={item.Image} alt="" style={{ width: "85%", heigh: "80%" }} />
                                    <p className="name-relate">{item.name}</p>
                                    <p className="price-relate">$ {item.price}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
