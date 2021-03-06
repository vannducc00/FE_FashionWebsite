import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import { Mensellection, productHandbag } from "../../Service"

export default function Home(props) {
    const history = useHistory()
    const [arrProductSamples, setArrProductSamples] = useState([])
    const [arrMensellection, setArrMensellection] = useState([])

    useEffect(() => {
        productHandbag().then((res) => {
            let arrProductSamples = []
            res.data.map(item => {
                arrProductSamples.push(item)
            })
            setArrProductSamples(arrProductSamples)
        })

        Mensellection().then((res) => {
            let arrMensellection = []
            res.data.map(item => {
                arrMensellection.push(item)
            })
            setArrMensellection(arrMensellection)
        })
    }, [])


    const detailProduct = (value) => {
        history.push("/main/detail/" + value.id);
    }


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
                <p className="review">Tham kh???o th????ng hi???u Italy, b??? s??u t???p m???i l?? t???t c??? v??? th???i trang thi???t y???u cho nam gi???i v?? ph??? n??? ng??y nay.</p>
                <button className="button-gender" style={{ borderRight: "0.5px solid black" }} onClick={() => history.push("/main/productwomen")}>N???</button>
                <button className="button-gender" style={{ borderLeft: "0.5px solid black" }} onClick={() => history.push("/main/productmen")}>NAM</button>
            </div>
            <h3 className="title-pro">T??I X??CH LA MEDUSA </h3>
            <div className="container-fluid" style={{ padding: "0px 4.5rem" }}>
                <div className="row">
                    {
                        arrProductSamples.map((item, index) => {
                            if (index < 4) {
                                return (
                                    <div className="col-md-3 product-samples" key={index} style={{ padding: "0 8px" }}>
                                        <div className="" style={{ width: "100%", cursor: "pointer" }} onClick={() => detailProduct(item)}>
                                            <div className="" style={{ overflow: "hidden" }}>
                                                <img src={item.Image} alt="" className="image-pr-samples" />
                                            </div>
                                            <div style={{ paddingTop: "10px" }}>
                                                <p className="name-pr-samples">{item.name}</p>
                                                <p className="price-pr-samples">{item.price} ??</p>
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
                            <h3 className="heading">T??i x??ch th???i nay</h3>
                            <p style={{ width: "90%" }}>V???i h??nh d??ng cong hi???n ?????i, chi???c t??i hobo m???i ???????c l??m th??? c??ng t???i ??
                                t??? da b?? s???n nh???. C?? s???n ??? hai k??ch th?????c v?? m???t lo???t c??c ???????ng m??u,
                                phong c??ch m???i t??? h??o c?? t???m b???ng La Medusa mang t??nh bi???u t?????ng.</p>
                            <button className="button-shop-now" onClick={() => history.push("/main/handbag")}>mua s???m ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="title-pro">L???A CH???N D??NH CHO NAM</h3>
            <div className="container-fluid" style={{ padding: "0px 4.5rem" }}>
                <div className="row">
                    {
                        arrMensellection.map((item, index) =>
                            <div className="col-md-3 product-samples" key={index} style={{ padding: "0 8px" }}>
                                <div className="" style={{ width: "100%", cursor: "pointer" }} onClick={() => detailProduct(item)}>
                                    <div className="" style={{ overflow: "hidden" }}>
                                        <img src={item.Image} alt="" className="image-pr-samples" />
                                    </div>
                                    <div style={{ paddingTop: "10px" }}>
                                        <p className="name-pr-samples">{item.name}</p>
                                        <p className="price-pr-samples">{item.price} ??</p>
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
                            <h3 className="heading">TH???I TRANG NAM GI???I HI???N ?????I</h3>
                            <p style={{ width: "80%" }}>Trang ph???c nam t??? b??? s??u t???p m???i th??? hi???n s??? hi???n ?????i
                                ?????ng ph???c cho ch??ng trai c???a ng??y h??m nay. Phi??n b???n ng???y trang c???a th???i trang
                                print - Baroccoflage - k???t h???p ho??n h???o v???i denim ch??? l???c v?? gi??y d??p ?????m.</p>
                            <button className="button-shop-now" onClick={() => history.push("/main/productmen")}>mua s???m ngay</button>
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

