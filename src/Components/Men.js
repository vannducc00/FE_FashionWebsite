import React, { Component } from 'react'
import { productmen } from "../Service"

export default class Men extends Component {
    constructor() {
        super()
        this.state = {
            arrProductMen: []
        }
    }

    componentDidMount() {
        productmen().then(res => {
            let arrProductMen = []
            res.data.map(item => {
                arrProductMen.push(item)
            }
            )
            this.setState({ arrProductMen: arrProductMen })
        })
    }

    proMenDetail = (value) => {
        this.props.history.push("/Detail/" + value.id)
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "13em" }}>
                <div className="row">
                    {this.state.arrProductMen.map((item, index) => (
                        <div div className="col-md-3" key={index}>
                            <div className="con-product-gender" onClick={() => this.proMenDetail(item)}>
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
