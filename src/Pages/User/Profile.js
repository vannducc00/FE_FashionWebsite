import { Link, useLocation, useHistory } from "react-router-dom";
import * as React from 'react';
import { useEffect, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { list_paymen, cancel_order } from "../../Service";
export default function Profile() {
    const [listBuy, setlistBuy] = useState([])
    const [toogleBtn, settoogleBtn] = useState(false)
    const [arr, setarr] = useState([])
    const history = useHistory()
    let isUser = localStorage.getItem("iduser")

    useEffect(() => {
        let data = {
            customer_id: isUser
        }
        let listBuys = []
        list_paymen(data).then(res => {
            res.data.map(item => listBuys.push(item))
            setlistBuy(listBuys)
            clean(listBuys)
        })
    }, [])

    const clean = (listBuys) => {
        if (listBuys.length == 0) {
            settoogleBtn(true)
        }
    }

    const handleCancelOrder = () => {
        let data = {
            customer_id: isUser
        }
        let arrA = []
        cancel_order(data).then(res => {
            setlistBuy(arrA)
            settoogleBtn(true)
        })
    }

    return (
        <>
            <div className="flex items-center cursor-pointer bg-gray-100" onClick={() => { history.push('/main/home') }}>
                <i className="fal fa-arrow-left arrown-back" ></i>Trang chủ

            </div>
            <div className="content-page-profile">
                <div className="border-r-2">
                    <p className='m-3 text-xl text-center'>Trạng thái đơn hàng</p>
                    <div className="overflow-hidden w-100">
                        <Timeline position="left" className='mt-16'>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Đang chuẩn bị hàng</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Chờ vận chuyển</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Đang vận chuyển</TimelineContent>
                            </TimelineItem>
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot />
                                </TimelineSeparator>
                                <TimelineContent>Đã giao thành công</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </div>
                </div>
                <div className="con-card">
                    {listBuy.map((item, index) =>
                        <div className="card-products container-fluid" key={index}>
                            <div className="row py-3 border-b-2 mx-3">
                                <div className="col-lg-3 col-md-3 col-sm-3">
                                    <img src={item.image} className='h-60' alt="" />
                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-9">
                                    <p className='product-name'>Tên sản phẩm: {item.name_product}</p>
                                    <p className='product-quantity'>Số lượng: {item.quantity}</p>
                                    <p className='product-amount'>Giá: {item.amount}đ</p>
                                    <p className='product-color'>Màu: {item.color}</p>
                                    {
                                        item.size != '' ?
                                            <p className='product-size'>Kích cỡ: {item.size}</p> : null
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                    {toogleBtn ? null :
                        <div className="operation">
                            <button className="button-cancel" onClick={() => handleCancelOrder()}>Huỷ đơn hàng</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
