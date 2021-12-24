import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { list_payment } from '../../../Service';

export default function TablePay() {
    const [listPay, setlistPay] = useState([])
    const [selection, setSelection] = useState([])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Tên người mua', width: 170 },
        { field: 'name_product', headerName: 'Tên sản phẩm', width: 320 },
        { field: 'color', headerName: 'Màu', width: 130 },
        {
            field: 'size', headerName: 'Kích cỡ',
            width: 90,
        },
        {
            field: 'quantity', headerName: 'Số lượng',
            width: 160,
        },
        {
            field: 'amount', headerName: 'Thành tiền',
            width: 100,
        },
    ];
    const rows = [];

    useEffect(() => {
        let row = []
        list_payment().then(res => {
            res.data.map((item) => {
                if (item.color == '') item.color = null
                if (item.size == '') item.size = null
                row.push({
                    id: item.id_pay,
                    name: item.name,
                    name_product: item.name_product,
                    color: item.color,
                    size: item.size,
                    quantity: item.quantity,
                    amount: item.amount
                })
            })
            setlistPay(row)
        })
    }, [])

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={listPay}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={itm => console.log(itm)}
                />
            </div>
        </div>
    )
}
