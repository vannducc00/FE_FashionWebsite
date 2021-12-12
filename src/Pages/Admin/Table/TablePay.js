import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { list_payment } from '../../../Service';

export default function TablePay() {
    const [listPay, setlistPay] = useState([])
    // const columns = [
    //     { field: 'id_pay', headerName: 'ID', width: 70 },
    //     { field: 'name', headerName: 'Tên người mua', width: 70 },
    //     { field: 'name_product', headerName: 'Tên sản phẩm', width: 130 },
    //     { field: 'color', headerName: 'Màu', width: 130 },
    //     {
    //         field: 'size', headerName: 'Kích cỡ',
    //         width: 90,
    //     },
    //     {
    //         field: 'quantity', headerName: 'Số lượng',
    //         sortable: false,
    //         width: 160,
    //     },
    //     {
    //         field: 'amount', headerName: 'Thành tiền',
    //         sortable: false,
    //         width: 160,
    //     },
    // ];
    const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
    ];
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "firstName", headerName: "First name", width: 130 },
        { field: "lastName", headerName: "Last name", width: 130 },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            width: 90
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.getValue(params.id, "firstName") || ""} ${params.getValue(params.id, "lastName") || ""
                }`
        }
    ];
    // useEffect(() => {
    //     let row = []
    //     list_payment().then(res => {
    //         res.data.map((item) => {
    //             console.log(item)
    //             if (item.color == '') item.color = null
    //             if (item.size == '') item.size = null
    //             row.push({
    //                 id_pay: item.id_pay,
    //                 name: item.name,
    //                 name_product: item.name_product,
    //                 color: item.color,
    //                 size: item.size,
    //                 quantity: item.quantity,
    //                 amount: item.amount
    //             })
    //         })
    //         setlistPay(row)
    //     })
    // }, [])

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
        </div>
    )
}
