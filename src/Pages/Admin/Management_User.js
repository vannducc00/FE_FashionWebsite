import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useHistory } from "react-router-dom";
import { admin, ManageUsers, addAccountAdmin, updateAccount, removeAccount, removeAccountUser } from '../../Service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function Management_User() {
    let history = useHistory()
    const [arrAccAdmin, setarrAccAdmin] = useState([])
    const [arrUsers, setarrUsers] = useState([])
    const [keyChart, setkeyChart] = useState(false)
    // ----------------change account--------------
    const [nameVal, setnameVal] = useState('')
    const [usernameVal, setusernameVal] = useState('')
    const [passwordVal, setpasswordVal] = useState('')
    const [keycheckVal, setkeycheckVal] = useState('')
    const [idChange, setidChange] = useState('')

    // ------------------add account--------------
    const [listErr, setListErr] = useState({
        name: "",
        username: "",
        password: "",
        keycheck: "",
    })
    //-------------------add ref-----------------
    const [isShowTooltip, setisShowTooltip] = useState(false)
    const nameRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const keycheckRef = useRef()
    // ------------------change info--------------
    const [listErr1, setListErr1] = useState({
        name: "",
        username: "",
        password: "",
        keycheck: "",
    })
    // ---------------change ref--------------------
    const nameRef1 = useRef()
    const usernameRef1 = useRef()
    const passwordRef1 = useRef()
    const keycheckRef1 = useRef()

    // --------------------------------------------------------------------------------

    useEffect(async () => {
        let arrAdmin = []
        let arrUsers = []
        await Promise.all(
            [
                admin().then(res => {
                    res.data.map(item => {
                        arrAdmin.push({
                            id: item.id,
                            name: item.name,
                            username: item.username,
                            password: item.password,
                            keycheck: item.key_check
                        })
                    })
                    setarrAccAdmin(arrAdmin)
                })
            ],
            [
                ManageUsers().then(res => {
                    res.data.map(item => {
                        arrUsers.push({
                            id: item.id,
                            phone: item.phone,
                            username: item.user_name,
                            password: item.password
                        })
                    })
                    setarrUsers(arrUsers)
                })
            ]
        )
        setkeyChart(!keyChart)
    }, [])

    const handleAddAcc = () => {
        let listErr = {
            name: "",
            username: "",
            password: "",
            keycheck: "",
        }

        if (nameRef.current.value == "") listErr.name = "Tên không được bỏ trống"
        if (usernameRef.current.value == "") listErr.username = "Tài khoản không được bỏ trống"
        if (passwordRef.current.value == "") listErr.password = "Mật khẩu không được bỏ trống"
        if (keycheckRef.current.value == "") listErr.keycheck = "Keycheck không được bỏ trống"

        arrAccAdmin.map(item => {
            if (usernameRef.current.value == item.username) {
                listErr.username = "Tài khoản trùng nhau"
            }
        })

        if (
            listErr.name == '' &&
            listErr.username == '' &&
            listErr.password == '' &&
            listErr.keycheck == ''
        ) {
            let data = {
                name: nameRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                keycheck: keycheckRef.current.value
            }
            addAccountAdmin(data).then()
        }
        setListErr(listErr)
    }

    const handleChangeAcc = (item) => {
        setidChange(item.id)
        setisShowTooltip(true)
        setnameVal(item.name)
        setusernameVal(item.username)
        setpasswordVal(item.password)
        setkeycheckVal(item.keycheck)
    }

    const handleSave = () => {
        let listErr1 = {
            name: "",
            username: "",
            password: "",
            keycheck: "",
        }

        if (nameRef1.current.value == "") listErr1.name = "Tên không được bỏ trống"
        if (usernameRef1.current.value == "") listErr1.username = "Tài khoản không được bỏ trống"
        if (passwordRef1.current.value == "") listErr1.password = "Mật khẩu không được bỏ trống"
        if (keycheckRef1.current.value == "") listErr1.keycheck = "Keycheck không được bỏ trống"

        arrAccAdmin.map(item => {
            if (usernameRef1.current.value == item.username) {
                listErr1.username = "Tài khoản trùng nhau"
            }
        })

        if (
            listErr1.name == '' &&
            listErr1.username == '' &&
            listErr1.password == '' &&
            listErr1.keycheck == ''
        ) {
            let data = {
                name: nameVal,
                username: usernameVal,
                password: passwordVal,
                keycheck: keycheckVal,
                id: idChange
            }
            updateAccount(data).then(res => {

            })
            setisShowTooltip(!isShowTooltip)
        }
        setListErr1(listErr1)
    }

    const handleRemoveAcc = (item, index) => {
        let data = {
            id: item.id
        }
        let arr = Object.assign([], arrAccAdmin)
        removeAccount(data).then(res => {
            arr.splice(index, 1)
        })
        setarrAccAdmin(arr)
    }

    const handleRemoveAccCustomer = (item, index) => {
        let data = {
            id: item.id
        }
        let arr = Object.assign([], arrUsers)
        removeAccountUser(data).then(res => {
            arr.splice(index, 1)
        })
        setarrUsers(arr)
    }

    return (
        <div>
            <div className="flex items-center w-max cursor-pointer" onClick={() => { history.push('/system') }}>
                <i className="fal fa-arrow-left arrown-back" ></i>Quay lại
            </div>
            <div className={isShowTooltip ? 'active-tool' : 'hidden'}></div>
            <div className={isShowTooltip ? "con-form-change block" : "hidden"}>
                <div className="wapper-form-change">
                    <i className="far fa-times text-2xl absolute top-3 right-5 cursor-pointer" onClick={() => {
                        setisShowTooltip(false)
                        setListErr1({
                            name: "",
                            username: "",
                            password: "",
                            keycheck: "",
                        })
                    }}></i>
                    <h3 className='text-center text-2xl mt-2 mb-4'>Thông tin tài khoản</h3>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                value={nameVal}
                                onChange={(e) => setnameVal(e.target.value)}
                                margin='dense'
                                fullWidth
                                inputRef={nameRef1}
                                size='medium'
                                id="outlined-basic"
                                label="Tên"
                                variant="outlined"
                                helperText={listErr1.name}
                                error={listErr1.name != ""}
                            />
                        </div>
                        <div>
                            <TextField
                                value={usernameVal}
                                onChange={(e) => setusernameVal(e.target.value)}
                                margin='dense'
                                fullWidth
                                inputRef={usernameRef1}
                                size='medium'
                                id="outlined-basic"
                                label="Tài khoản"
                                variant="outlined"
                                helperText={listErr1.username}
                                error={listErr1.username != ""}
                            />
                        </div>
                        <div>
                            <TextField
                                value={passwordVal}
                                onChange={(e) => setpasswordVal(e.target.value)}
                                margin='dense'
                                fullWidth
                                inputRef={passwordRef1}
                                size='medium'
                                id="outlined-basic"
                                label="mật khẩu"
                                variant="outlined"
                                type="text"
                                helperText={listErr1.password}
                                error={listErr1.password != ""}
                            />
                        </div>
                        <div>
                            <TextField
                                value={keycheckVal}
                                onChange={(e) => setkeycheckVal(e.target.value)}
                                margin='dense'
                                fullWidth
                                inputRef={keycheckRef1}
                                size='medium'
                                id="outlined-basic"
                                label="keycheck"
                                variant="outlined"
                                helperText={listErr1.keycheck}
                                error={listErr1.keycheck != ""}
                            />
                        </div>
                        <div className='mt-4'>
                            <Button variant="contained" fullWidth onClick={() => handleSave()}>Lưu</Button>
                        </div>
                    </Box>
                </div>
            </div>
            <div className={isShowTooltip ? 'container mt-10 pointer-events-none ' : 'container mt-10'}>
                <div className="add-admin mb-5">
                    <div className="title-add">
                        <i className="fal fa-plus-circle text-lg"></i><span className='mb-3 mx-2 text-lg'>Thêm admin</span>
                    </div>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 2, width: '23ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            inputRef={nameRef}
                            size='medium'
                            id="outlined-basic"
                            label="Tên"
                            variant="outlined"
                            helperText={listErr.name}
                            error={listErr.name != ""}
                        />
                        <TextField
                            inputRef={usernameRef}
                            size='medium'
                            id="outlined-basic"
                            label="Tài khoản"
                            variant="outlined"
                            helperText={listErr.username}
                            error={listErr.username != ""}
                        />
                        <TextField
                            inputRef={passwordRef}
                            size='medium'
                            id="outlined-basic"
                            label="mật khẩu"
                            variant="outlined"
                            type="password"
                            helperText={listErr.password}
                            error={listErr.password != ""}
                        />
                        <TextField
                            inputRef={keycheckRef}
                            size='medium'
                            id="outlined-basic"
                            label="keycheck"
                            variant="outlined"
                            helperText={listErr.keycheck}
                            error={listErr.keycheck != ""}
                        />
                        <Button variant="contained" onClick={() => handleAddAcc()}>Thêm</Button>
                    </Box>
                </div>

                <div className="">
                    <h3 className='mb-5 mx-2 text-lg'>Quản lý tài khoản admin</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" key={keyChart}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Tài khoản</TableCell>
                                    <TableCell>Mật khẩu</TableCell>
                                    <TableCell>Keycheck</TableCell>
                                    <TableCell align='center'>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrAccAdmin.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell >{row.username}</TableCell>
                                        <TableCell >{row.password}</TableCell>
                                        <TableCell >{row.keycheck}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton className='mx-2' onClick={() => handleChangeAcc(row)}> <FontAwesomeIcon icon={faPen} className='text-lg' /></IconButton>
                                            <IconButton onClick={() => handleRemoveAcc(row, index)}> <FontAwesomeIcon icon={faTrash} className='text-lg' /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <div className="my-5">
                    <h3 className='mb-5 mx-2 text-lg'>Quản lý tài khoản người dùng</h3>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" key={keyChart}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Số điện thoại</TableCell>
                                    <TableCell>Tài khoản</TableCell>
                                    <TableCell align='center'>Thao tác</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {arrUsers.map((row, index) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell >{row.phone}</TableCell>
                                        <TableCell >{row.username}</TableCell>
                                        <TableCell align='center'>
                                            <IconButton onClick={() => handleRemoveAccCustomer(row, index)}> <FontAwesomeIcon icon={faTrash} className='text-lg' /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
