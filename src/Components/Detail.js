import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import { getDetailproduct, relatedProduct } from "../Service"

export default class Detail extends Component {
    constructor() {
        super()
        this.state = {
            quantity: 1,
            arrDetail: [],
            selectSize: "",
            isShowImage: "",
            currentClick: "",
            arrRelatedProduct: []
        }
    }


    componentDidMount() {
        this.getProductDetail(this.props)
    }

    getProductDetail = (props) => {
        getDetailproduct(props.match.params.idpro).then(res => {
            let arrDetail = []
            res.data.map(item => {
                arrDetail.push(item)
            })
            let arrRelatedProduct = []
            let a
            arrDetail.map(item => (
                a = item.image_url[0]
            ))
            relatedProduct(res.data[0].type_pr_id).then(res => {
                res.data.map(item => (
                    arrRelatedProduct.push(item)
                ))
                this.setState({ arrDetail: arrDetail, isShowImage: a, arrRelatedProduct: arrRelatedProduct })
            })
        })
    }

    componentWillReceiveProps = (nextprops) => {
        if (nextprops.match.params.idpro != this.props.match.params.idpro) {
            this.getProductDetail(nextprops)
        }
    }

    productRelated = (item) => {
        this.props.history.push('/detail/' + item.id)
    }

    changeQuantity = (e) => {
        this.setState({ quantity: e.target.value });
    }

    changeImage = (e) => {
        this.setState({ isShowImage: e.target.src })
    }

    render() {
        let quantity;
        if (this.state.quantity == "" || this.state.quantity < 1) {
            quantity = 1;
        } else {
            quantity = this.state.quantity;
        }
        return (
            <div className="container-fluid">
                <div className="container" style={{ paddingTop: "13.5em" }}>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-3">
                                    {this.state.arrDetail.map((item) =>
                                    (
                                        item.image_url.map((item, index) => {
                                            if (index < 3) {
                                                return (
                                                    <div className="col-md-12" key={index} >
                                                        <img key={index} src={item} alt="" style={{ width: "100%", padding: "5px", cursor: "pointer" }} onClick={this.changeImage} />
                                                    </div>
                                                )
                                            }
                                        })
                                    ))}

                                </div>
                                <div className="col-md-9" style={{ height: "43.5em" }}>
                                    <img src={this.state.isShowImage} alt="" style={{ width: "100%", height: "100%" }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            {this.state.arrDetail.map((item, index) => (
                                <div className="" key={index}>
                                    <h3 className="name-product">{item.name}</h3>
                                    <p className="price">$ {item.price}</p>
                                    <div className="con-size">
                                        {item.size ? item.size.map((item, index) =>
                                            <button key={index} className={this.state.selectSize == item ? "select-size active-select" : "select-size"} onClick={() => this.setState({ selectSize: item })}>{item}</button>
                                        ) : null}
                                    </div>
                                    <p className="description">{item.description}</p>
                                    <div className="con-color">
                                        {item.color ? item.color.map((item, index) =>
                                            <button key={index} className={this.state.currentClick == item ? "select-color active-select" : "select-color"} onClick={() => this.setState({ currentClick: item })} key={index}>{item}</button>
                                        ) : null}
                                    </div>
                                    <div className="quantity-select">
                                        <TextField
                                            id="standard-basic"
                                            label="Quantity"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={this.state.quantity}
                                            onChange={this.changeQuantity}
                                        />
                                    </div>
                                    <div className="con-buy">
                                        <button className="buy">add to bag</button>
                                    </div>
                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: "130px", paddingTop: "50px", borderTop: "1px solid rgb(197, 197, 197)" }}>
                    <div className="row">
                        {this.state.arrRelatedProduct.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <div className="col-md-2" style={{ height: "", textAlign: "center" }} key={index} onClick={() => this.productRelated(item)} >
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
}
