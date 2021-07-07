import React, { Component } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import { Mensellection, productHandbag } from "../Service"

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            arrProductSamples: [],
            arrMensellection: []
        }
    }

    componentDidMount() {
        productHandbag().then((res) => {
            let arrProductSamples = []
            res.data.map(item => {
                arrProductSamples.push(item)
            })
            this.setState({ arrProductSamples: arrProductSamples })
        })

        Mensellection().then((res) => {
            let arrMensellection = []
            res.data.map(item => {
                arrMensellection.push(item)
            })
            this.setState({ arrMensellection: arrMensellection })
        })
    }

    detailProduct = (value) => {
        this.props.history.push("/detail/" + value.id);
    }

    productMen = () => {
        this.props.history.push("/productmen")
    }

    productWomen = () => {
        this.props.history.push("/productwomen")
    }

    Handbag = () => {
        this.props.history.push("/handbag")
    }

    render() {
        return (
            <div style={{ paddingTop: "130px" }}>
                <div className="Slider" style={{ height: "558px" }}>
                    <Swiper slidesPerView={1} spaceBetween={30} loop={true} autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }} pagination={{
                        "clickable": true
                    }} navigation={false} className="mySwiper">
                        <SwiperSlide><img src="/Image/fashion_summer_Dior.jpg" alt="" /></SwiperSlide>
                        <SwiperSlide><img src="/Image/cdc-homme-dior-world-tour23_1440_1200.jpg" alt="" /></SwiperSlide>
                    </Swiper>
                </div>

                <div style={{ textAlign: "center", padding: "35px 80px 58px 80px" }}>
                    <h3 className="title-pro">PRE-FALL 2021</h3>
                    <p className="review">Referencing brand muses, the new collection is all about Fashion essentials for the men and women of today.</p>
                    <button className="button-gender" style={{ borderRight: "0.5px solid black" }} onClick={this.productWomen}>WOMEN</button>
                    <button className="button-gender" style={{ borderLeft: "0.5px solid black" }} onClick={this.productMen}>MEN</button>
                </div>
                <h3 className="title-pro">LA MEDUSA HOBO BAGS</h3>
                <div className="container-fluid" style={{ padding: "0px 4.5rem" }}>
                    <div className="row">
                        {
                            this.state.arrProductSamples.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div className="col-md-3 product-samples" key={index} style={{ padding: "0 8px" }}>
                                            <div className="" style={{ width: "100%", cursor: "pointer" }} onClick={() => this.detailProduct(item)}>
                                                <img src={item.Image} alt="" className="image-pr-samples" />
                                                <div style={{ paddingTop: "10px" }}>
                                                    <p className="name-pr-samples">{item.name}</p>
                                                    <p className="price-pr-samples">{item.price} $</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            )
                        }
                    </div>
                </div>
                <div className="container-fluid bag-moment" style={{ padding: "60px 150px" }}>
                    <div className="row">
                        <div className="col-md-5">
                            <img src="/Image/hp-pre-fall-2021-2-100621-desk.jpg" alt="" style={{ width: "100%" }} />
                        </div>
                        <div className="col-md-7" style={{ position: "relative" }}>
                            <div className="text-content">
                                <h3 className="heading">the bag of the moment</h3>
                                <p style={{ width: "90%" }}>Featuring a contemporary curved silhouette, the new hobo bag is crafted in Italy
                                    from lightly grained calf leather. Available in two sizes and an array of colorways,
                                    the new style boasts the iconic La Medusa plaque.</p>
                                <button className="button-shop-now" onClick={this.Handbag}>shop now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="title-pro">MEN'S SELECTION</h3>
                <div className="container-fluid" style={{ padding: "0px 4.5rem" }}>
                    <div className="row">
                        {
                            this.state.arrMensellection.map((item, index) =>
                                <div className="col-md-3 product-samples" key={index} style={{ padding: "0 8px" }}>
                                    <div className="" style={{ width: "100%", cursor: "pointer" }} onClick={() => this.detailProduct(item)}>
                                        <img src={item.Image} alt="" className="image-pr-samples" />
                                        <div style={{ paddingTop: "10px" }}>
                                            <p className="name-pr-samples">{item.name}</p>
                                            <p className="price-pr-samples">{item.price} $</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="container-fluid bag-moment" style={{ padding: "60px 150px" }}>
                    <div className="row">
                        <div className="col-md-5" style={{ position: "relative" }}>
                            <div className="text-content">
                                <h3 className="heading">A MODERN MAN'S UNIFORM</h3>
                                <p style={{ width: "80%" }}>Menswear from the new collection presents the modern
                                    uniform for the guy of today. Fashion’s version of a camouflage
                                    print – Baroccoflage – pairs perfectly with staple denim and bold footwear.</p>
                                <button className="button-shop-now">shop now</button>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <img src="/Image/hp-pre-fall-2021-3-100621-desk.jpg" alt="" style={{ width: "100%" }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
