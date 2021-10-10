import React, { useState, useEffect } from 'react'
import { productwomen } from "../Service"


export default function Women(props) {
    const [arrProductWomen, setArrProductWomen] = useState([])
    useEffect(() => {
        productwomen().then(res => {
            let arrProductWomen = []
            res.data.forEach(item => {
                arrProductWomen.push(item)
            }
            )
            setArrProductWomen(arrProductWomen)
        })
    }, [])


    const proWomenDetail = (value) => {
        props.history.push("/Detail/" + value.id)
    }

    return (
        <div className="container" style={{ marginTop: "13em" }}>
            <div className="row">
                {arrProductWomen.map((item, index) => (
                    <div div className="col-md-3" key={index}>
                        <div className="con-product-gender" onClick={() => proWomenDetail(item)}>
                            <div className="" style={{ overflow: "hidden" }}>
                                <img src={item.Image} alt="" className="list-image image-pr-samples" />
                            </div>
                            <p className="list-name">{item.name}</p>
                            <p className="list-price">$ {item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )

}
