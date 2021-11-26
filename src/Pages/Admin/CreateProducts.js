import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import { create_product } from '../../Service'

const optionsGender = ['Nam', 'Nữ'];
const optionsTypePro = ['Áo', 'Quần', 'Giày', 'Áo choàng', 'Thắt lưng', 'Balo', 'Túi xách'];

export default function CreateProducts() {
    const [listErr, setlistErr] = useState({
        name: '',
        image: '',
        price: '',
        desc: '',
        gender: '',
        typeProduct: ''
    })
    const [genderVal, setgenderVal] = React.useState('');
    const [typeProductVal, settypeProductVal] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const nameRef = useRef()
    const imageRef = useRef()
    const priceRef = useRef()
    const descRef = useRef()

    const handleCreate = () => {
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

        let listErr = {
            name: '',
            image: '',
            price: '',
            desc: '',
            gender: '',
            typeProduct: ''
        }

        if (nameRef.current.value == '') listErr.name = 'Không được để trống!'
        if (imageRef.current.value == '') listErr.image = 'Không được để trống!'
        if (priceRef.current.value == '') listErr.price = 'Không được để trống!'
        if (descRef.current.value == '') listErr.desc = 'Không được để trống!'
        if (genderVal == '') listErr.gender = 'Không được để trống!'
        if (typeProductVal == '') listErr.typeProduct = 'Không được để trống!'

        if (isNaN(priceRef.current.value)) listErr.price = 'Giá không hợp lệ!'
        if (!isNaN(nameRef.current.value) && nameRef.current.value != '') listErr.name = 'Tên không hợp lệ!'
        if (!isNaN(descRef.current.value) && descRef.current.value != '') listErr.desc = 'Mô tả không hợp lệ!'


        if (
            listErr.name == '' &&
            listErr.image == '' &&
            listErr.price == '' &&
            listErr.desc == '' &&
            listErr.gender == '' &&
            listErr.typeProduct == ''
        ) {
            let data = {
                name: nameRef.current.value,
                image: imageRef.current.value,
                price: priceRef.current.value,
                desc: descRef.current.value,
                gender: gender,
                typeProduct: typeProduct
            }
            create_product(data).then(() => { })
            nameRef.current.value = ''
            imageRef.current.value = ''
            priceRef.current.value = ''
            descRef.current.value = ''
            setgenderVal('')
            settypeProductVal('')
            setTimeout(() => {
                setOpen(false)
            }, 1500)
            setOpen(true)
        }
        setlistErr(listErr)
    }

    return (
        <>
            <div className="wapper--">
                <div className='text-end py-3 relative' style={{ width: '55%', boxShadow: '0 0 10px rgb(190, 190, 190)', borderRadius: '7px' }}>
                    <h3 className='text-center py-3 uppercase'>Tạo mới sản phẩm</h3>
                    <div className="con-textfield">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '33ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-basic" helperText={listErr.name} error={listErr.name != ''} inputRef={nameRef} label="Tên" variant="outlined" />
                            <TextField id="outlined-basic" helperText={listErr.price} error={listErr.price != ''} inputRef={priceRef} label="Giá" variant="outlined" />
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
                                helperText={listErr.gender}
                                error={listErr.gender != ''}
                            />
                        </Box>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '33ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Autocomplete
                                value={typeProductVal}
                                onChange={(event, newValue) => {
                                    settypeProductVal(newValue);
                                }}
                                disablePortal
                                id="combo-box-demo"
                                options={optionsTypePro}
                                renderInput={(params) => <TextField {...params} label="Giới tính" />}
                                getOptionLabel={(option) => {
                                    return option
                                }}
                                helperText={listErr.typeProduct}
                                error={listErr.typeProduct != ''}
                            />
                            <TextField id="outlined-basic" helperText={listErr.image} error={listErr.image != ''} inputRef={imageRef} label="Ảnh" variant="outlined" />
                            <TextField id="outlined-basic" helperText={listErr.desc} error={listErr.desc != ''} inputRef={descRef} label="Mô tả" variant="outlined" />
                        </Box>
                    </div>
                    <div className='m-4'>
                        {/* <Stack sx={{ width: '70%' }} spacing={2} className={toggleAlert ? 'absolute bottom-0 left-0 hidden' : 'absolute bottom-0 left-0 hidden'}>
                            <Alert onClose={() => { settoggleAlert(false) }}>Tạo mới thành công!</Alert>
                        </Stack> */}
                        <Collapse in={open} className='absolute bottom-0 left-0'>
                            <Alert
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                                sx={{ mb: 2 }}
                            >
                                Tạo mới thành công!
                            </Alert>
                        </Collapse>
                        <Button variant="contained" onClick={() => handleCreate()}>Tạo mới</Button>
                    </div>
                </div>
            </div>
        </>
    )
}
