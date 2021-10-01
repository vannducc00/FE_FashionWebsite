import React, { Component } from 'react'
import { productwomen } from "../Service"

export default class Women extends Component {
    constructor() {
        super()
        this.state = {
            arrProductWomen: []
        }
    }

    componentDidMount() {
        productwomen().then(res => {
            let arrProductWomen = []
            res.data.forEach(item => {
                arrProductWomen.push(item)
            }
            )
            this.setState({ arrProductWomen: arrProductWomen })
        })
    }

    proWomenDetail = (value) => {
        this.props.history.push("/Detail/" + value.id)
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "13em" }}>
                <div className="row">
                    {this.state.arrProductWomen.map((item, index) => (
                        <div div className="col-md-3" key={index}>
                            <div className="con-product-gender" onClick={() => this.proWomenDetail(item)}>
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
}
