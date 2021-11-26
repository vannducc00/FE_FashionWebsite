import { Link, useLocation, useHistory } from "react-router-dom";
import * as React from 'react';
import { useEffect } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { showcart } from "../../Service";
let isUser = localStorage.getItem("iduser")
export default function Profile() {
    const history = useHistory()
    useEffect(() => {
        showcart(isUser).then(res => {
            console.log(res.data)
        })
    }, [])

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
            </div>
            <div className=''>

            </div>
        </>
    )
}
