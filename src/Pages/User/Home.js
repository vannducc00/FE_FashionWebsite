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
                <p className="review">Tham khảo thương hiệu Italy, bộ sưu tập mới là tất cả về thời trang thiết yếu cho nam giới và phụ nữ ngày nay.</p>
                <button className="button-gender" style={{ borderRight: "0.5px solid black" }} onClick={() => history.push("/main/productwomen")}>NỮ</button>
                <button className="button-gender" style={{ borderLeft: "0.5px solid black" }} onClick={() => history.push("/main/productmen")}>NAM</button>
            </div>
            <h3 className="title-pro">TÚI XÁCH LA MEDUSA </h3>
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
                                                <p className="price-pr-samples">{item.price} đ</p>
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
                            <h3 className="heading">Túi xách thời nay</h3>
                            <p style={{ width: "90%" }}>Với hình dáng cong hiện đại, chiếc túi hobo mới được làm thủ công tại Ý
                                từ da bê sần nhẹ. Có sẵn ở hai kích thước và một loạt các đường màu,
                                phong cách mới tự hào có tấm bảng La Medusa mang tính biểu tượng.</p>
                            <button className="button-shop-now" onClick={() => history.push("/main/handbag")}>mua sắm ngay</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="title-pro">LỰA CHỌN DÀNH CHO NAM</h3>
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
                                        <p className="price-pr-samples">{item.price} đ</p>
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
                            <h3 className="heading">THỜI TRANG NAM GIỚI HIỆN ĐẠI</h3>
                            <p style={{ width: "80%" }}>Trang phục nam từ bộ sưu tập mới thể hiện sự hiện đại
                                đồng phục cho chàng trai của ngày hôm nay. Phiên bản ngụy trang của thời trang
                                print - Baroccoflage - kết hợp hoàn hảo với denim chủ lực và giày dép đậm.</p>
                            <button className="button-shop-now" onClick={() => history.push("/main/productmen")}>mua sắm ngay</button>
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

