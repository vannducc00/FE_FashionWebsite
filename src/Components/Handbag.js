import React, { Component, useState, useEffect } from 'react'
import { handbag } from '../Service'

export default function Handbag(props) {
    const [arrHandbag, setArrHandbag] = useState([])

    useEffect(() => {
        handbag().then(res => {
            let arrHandbag = []
            res.data.map(item => (
                arrHandbag.push(item)
            ))
            setArrHandbag(arrHandbag)
        })
    }, [])

    const handbagDetail = (value) => {
        props.history.push("/Detail/" + value.id)
    }

    return (
        <div className="container" style={{ marginTop: "13em" }}>
            <div className="row">
                {arrHandbag.map((item, index) => (
                    <div div className="col-md-3" key={index}>
                        <div className="con-product-gender" onClick={() => handbagDetail(item)}>
                            <img src={item.Image} alt="" className="list-image" />
                            <p className="list-name">{item.name}</p>
                            <p className="list-price">$ {item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

