import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    useHistory
} from "react-router-dom";


export default function Permission() {
    const history = useHistory();
    let listTask = [
        {
            name: 'Trang chủ',
            img: 'Image/home_octe.svg',
            path: '/main/home'
        },
        {
            name: 'Quản lý người dùng',
            img: 'Image/add_user.svg',
            path: '/manageuser'
        },
        {
            name: 'Quản lý sản phẩm',
            img: 'Image/CRUD.svg',
            path: '/CRUD_products'
        },
        {
            name: 'Thống kê',
            img: 'Image/statiscal.svg',
            path: '/statistical'
        }

    ]

    return (
        <div className='flex justify-center items-center h-96'>
            <div className="wapper-form mt-5">
                <h1 className='text-center text-3xl uppercase mb-5'>Hệ thống</h1>
                <div className="task-tool">
                    {listTask.map((item, index) =>
                        <div className="text-center task-items" key={index} onClick={() => history.push(item.path)}>
                            <img src={item.img} alt="" />
                            <p className='mt-3'>{item.name}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
