import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";
import { productmen } from "../../Service"

export default function Men(props) {
    const history = useHistory()
    const [arrProductMen, setArrProductMen] = useState([])


    useEffect(() => {
        productmen().then(res => {
            let arrProductMen = []
            res.data.map(item => {
                arrProductMen.push(item)
            }
            )
            setArrProductMen(arrProductMen)
        })
    }, [])

    const proMenDetail = (value) => {
        history.push("/main/Detail/" + value.id)
    }
    return (
        <div className="container" style={{ marginTop: "13em" }}>
            <div className="row">
                {arrProductMen.map((item, index) => (
                    <div div className="col-md-3" key={index}>
                        <div className="con-product-gender" onClick={() => proMenDetail(item)}>
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
