import { homecollection } from '../../Service'
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";

export default function Children(props) {
    const history = useHistory()
    const [arrProCollection, setArrProCollection] = useState([])

    useEffect(() => {
        homecollection().then(res => {
            let arrProCollection = []
            res.data.map(item => {
                arrProCollection.push(item)
            })
            setArrProCollection(arrProCollection)
        })
    }, [])


    const detailPro = (value) => {
        history.push("/main/Detail/" + value.id)
    }

    return (
        <div className="container" style={{ marginTop: "13em" }}>
            <div className="row">
                {arrProCollection.map((item, index) => (
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
