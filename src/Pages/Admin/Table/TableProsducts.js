import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { allproduct, children, delete_product, update_product } from '../../../Service';
import axios from "axios";

const optionsGender = ['Nam', 'Nữ'];
const optionsTypePro = ['Áo', 'Quần', 'Giày', 'Áo choàng', 'Thắt lưng', 'Balo', 'Túi xách'];

export default function TableProducts() {
    const [arrListProducts, setarrListProducts] = useState([])
    const [isShowTooltip, setisShowTooltip] = useState(false)
    const [genderVal, setgenderVal] = React.useState('');
    const [typeProductVal, settypeProductVal] = React.useState('');

    const [currentEdit, setcurrentEdit] = useState('')
    const [indexArr, setindexArr] = useState('')

    const [listErr1, setListErr1] = useState({
        name: '',
        price: '',
        image: '',
        gender: '',
        typeProduct: '',
        desc: ''
    })

    const nameRef = useRef()
    const priceRef = useRef()
    const imageRef = useRef()
    const descRef = useRef()

    useEffect(() => {
        let isMounted = false
        const arrListProducts = [];
        const fetchPost = async () => {
            await Promise.all([
                allproduct().then(res => {
                    res.data.map(item => {
                        arrListProducts.push(item)
                    })
                    if (isMounted == false)
                        setarrListProducts(arrListProducts)
                })
            ])
        }
        fetchPost()

        return () => {
            isMounted = true
        }
    }, [])

    const handleDeleteItem = (item, index) => {
        let arr = Object.assign([], arrListProducts)
        let data = {
            id: item.id
        }
        delete_product(data).then(res => {
            arr.splice(index, 1)
        })
        setarrListProducts(arr)
    }

    const handleOnChange = (item, index) => {
        setindexArr(index)
        setisShowTooltip(true)
        setcurrentEdit(item)
        setgenderVal(item.type_gender_id)
        settypeProductVal(item.type_pr_id)
    }

    const handleSave = () => {
        let listErr1 = {
            name: '',
            price: '',
            image: '',
            gender: '',
            typeProduct: '',
            desc: ''
        }
        let gender
        let typeProduct

        if (genderVal == 'Nam') gender = 1
        if (genderVal == 'Nữ') gender = 2

        if (typeProductVal == 'Áo choàng') typeProduct = 0
        if (typeProductVal == 'Áo') typeProduct = 1
        if (typeProductVal == 'Quần') typeProduct = 2
        if (typeProductVal == 'Giày') typeProduct = 3
        if (typeProductVal == 'Túi xách') typeProduct = 4
        if (typeProductVal == 'Thắt lưng') typeProduct = 5
        if (typeProductVal == 'Balo') typeProduct = 6
        if (typeProductVal == 'Jean') typeProduct = 7

        if (nameRef.current.value == '') listErr1.name = "Tên không được bỏ trống"
        if (priceRef.current.value == '') listErr1.price = "Giá không được bỏ trống"
        if (imageRef.current.value == '') listErr1.image = "Ảnh không được bỏ trống"
        if (descRef.current.value == '') listErr1.desc = "Mô tả không được bỏ trống"

        if (
            listErr1.name == '' &&
            listErr1.price == '' &&
            listErr1.image == '' &&
            listErr1.gender == '' &&
            listErr1.typeProduct == '' &&
            listErr1.desc == ''
        ) {
            let data = {
                name: nameRef.current.value,
                price: priceRef.current.value,
                image: imageRef.current.value,
                gender: gender,
                typeProduct: typeProduct,
                desc: descRef.current.value,
                id: currentEdit.id
            }
            update_product(data).then(() => {
                console.log(data)
            })
            setisShowTooltip(false)
        }
        setListErr1(listErr1)
    }

    return (
        <>
            <div className={isShowTooltip ? 'active-tool' : 'hidden'}></div>
            <div className={isShowTooltip ? "wapper-edit-form block" : "hidden"}>
                <i className="far fa-times text-2xl absolute top-3 right-5 cursor-pointer" onClick={() => {
                    setisShowTooltip(false)
                    setListErr1({
                        name: "",
                        price: "",
                        image: "",
                        gender: "",
                        typeProduct: "",
                        desc: ""
                    })
                }}></i>
                <h3 className='m-3 text-center uppercase text-xl'>Sửa thông tin sản phẩm</h3>
                <div className="edit-form">
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            // value={currentEdit.name}
                            inputRef={nameRef}
                            defaultValue={currentEdit.name}
                            id="outlined-basic"
                            label="Tên"
                            variant="outlined"
                            helperText={listErr1.name}
                            error={listErr1.name != ""}
                        />
                        <TextField
                            // value={currentEdit.price}
                            defaultValue={currentEdit.price}
                            id="outlined-basic"
                            label="Giá"
                            variant="outlined"
                            inputRef={priceRef}
                            helperText={listErr1.price}
                            error={listErr1.price != ""}
                        />
                        <TextField
                            value={currentEdit.Image}
                            defaultValue={currentEdit.Image}
                            id="outlined-basic"
                            label="Ảnh"
                            variant="outlined"
                            inputRef={imageRef}
                            helperText={listErr1.image}
                            error={listErr1.image != ""}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '30ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Autocomplete
                            value={genderVal}
                            onChange={(event, newValue) => {
                                setgenderVal(newValue);
                            }}
                            disablePortal
                            id="combo-box-demo"
                            options={optionsGender}
                            renderInput={(params) => <TextField {...params} label="Giới tính" />}
                            getOptionLabel={(option) => {
                                return option
                            }}
                            helperText={listErr1.gender}
                            error={listErr1.gender != ""}
                        />
                        <Autocomplete
                            value={typeProductVal}
                            onChange={(event, newValue) => {
                                settypeProductVal(newValue);
                            }}
                            id="combo-box-demo"
                            options={optionsTypePro}
                            renderInput={(params) => <TextField {...params} label="Phân loại" />}
                            getOptionLabel={(option) => {

                                return option
                            }}
                            helperText={listErr1.typeProduct}
                            error={listErr1.typeProduct != ""}
                        />
                        <TextField
                            value={currentEdit.description}
                            id="outlined-multiline-static"
                            multiline
                            label="Mô tả"
                            variant="outlined"
                            rows={4}
                            inputRef={descRef}
                            helperText={listErr1.desc}
                            error={listErr1.desc != ""}
                        />
                    </Box>
                </div>
                <div className='text-end m-3'>
                    <Button variant="contained" onClick={() => handleSave()}>Lưu</Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Giá</TableCell>
                            <TableCell>Ảnh</TableCell>
                            <TableCell>Giới tính</TableCell>
                            <TableCell>Phân loại</TableCell>
                            <TableCell>Mô tả</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {arrListProducts.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{item.id}</TableCell>
                                <TableCell><p className='truncate w-40'>{item.name}</p></TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell><p className='truncate w-60'>{item.Image}</p></TableCell>
                                <TableCell>{item.type_gender_id}</TableCell>
                                <TableCell>{item.type_pr_id}</TableCell>
                                <TableCell><p className='truncate w-60'>{item.description}</p></TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOnChange(item, index)} ><FontAwesomeIcon icon={faPen} className='text-lg' /></IconButton>
                                    <IconButton onClick={() => handleDeleteItem(item, index)}><FontAwesomeIcon icon={faTrash} className='text-lg' /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
