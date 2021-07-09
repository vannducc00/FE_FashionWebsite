import React, { Component } from 'react'
import { handbag } from '../Service'

export default class Handbag extends Component {
    constructor() {
        super()
        this.state = {
            arrHandbag: []
        }
    }

    componentDidMount() {
        handbag().then(res => {
            let arrHandbag = []
            res.data.map(item => (
                arrHandbag.push(item)
            ))
            this.setState({ arrHandbag: arrHandbag })
        })
    }

    handbagDetail = (value) => {
        this.props.history.push("/Detail/" + value.id)
    }

    render() {
        return (
            <div className="container" style={{ marginTop: "13em" }}>
                <div className="row">
                    {this.state.arrHandbag.map((item, index) => (
                        <div div className="col-md-3" key={index}>
                            <div className="con-product-gender" onClick={() => this.handbagDetail(item)}>
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
}
