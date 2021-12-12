import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useHistory } from 'react-router';
import TableProducts from './Table/TableProsducts';
import CreateProducts from './CreateProducts';
import TablePay from './Table/TablePay';


export default function CRUD_Products() {
    const history = useHistory()
    const [currentTab, setcurrentTab] = React.useState('1');

    const handleChangeTabs = (event, newValue) => {
        setcurrentTab(newValue);
    };

    return (
        <>
            <div className="flex items-center w-max cursor-pointer" onClick={() => { history.push('/system') }}>
                <i className="fal fa-arrow-left arrown-back" ></i>Quay lại
            </div>
            <div className="container mt-3">
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={currentTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChangeTabs} aria-label="lab API tabs example">
                                <Tab label="Danh sách sản phẩm" value="1" />
                                <Tab label="Thêm sản phẩm" value="2" />
                                <Tab label="Danh sách đơn hàng" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <TableProducts />
                        </TabPanel>
                        <TabPanel value="2">
                            <CreateProducts />
                        </TabPanel>
                        <TabPanel value="3">
                            <TablePay />
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    )
}
