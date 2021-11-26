import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";
import { allproduct } from "../../Service"

export default function Atelierfashion(props) {
    const [arrAllPro, setArrAllPro] = useState([])
    const history = useHistory()
    const [arrProJean, setArrJean] = useState([])

    useEffect(() => {
        allproduct().then(res => {
            let arrAtelier = []
            res.data.map(item => {
                arrAtelier.push(item)
            })
            setArrAllPro(arrAtelier)
        })
    }, [])


    const detailPro = (value) => {
        history.push("/main/Detail/" + value.id)
    }

    return (
        <div className="container" style={{ marginTop: "13em" }}>
            <div className="row">
                {arrAllPro.map((item, index) => (
                    <div div className="col-md-3" key={index}>
                        <div className="con-product-gender" onClick={() => detailPro(item)}>
                            <div className="" style={{ overflow: "hidden" }}>
                                <img src={item.Image} alt="" className="list-image image-pr-samples" />
                            </div>
                            <p className="list-name">{item.name}</p>
                            <p className="list-price">{item.price} đ</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
