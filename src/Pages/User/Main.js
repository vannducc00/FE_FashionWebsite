import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    useHistory
} from "react-router-dom";
import Navigation from '../../Components/Navigation';
import Home from './Home';
import Footer from '../../Components/Footer'
import Men from './Men';
import Women from './Women'
import Detail from './Detail';
import Signin from './Signin';
import Handbag from './Handbag';
import Cart from './Cart';
import Children from './Children';
import Homecollection from './Homecollection';
import Atelierfashion from './Atelierfashion';
import Jeancouture from './Jeancouture';
import { countcart } from '../../Service'
import { createBrowserHistory } from "history";
const history = createBrowserHistory();

export default function Main() {
    const [countBag, setCountBag] = useState(0)
    const [lastCount, setLastCount] = useState(0)
    const [txtUsername, settxtUsername] = useState('')
    const [currentUserName, setcurrentUserName] = useState(null)
    const history = useHistory()
    let isUser = localStorage.getItem('iduser')

    const onChangeCountCart = (value) => {
        setLastCount(lastCount + parseInt(value))
    }

    useEffect(() => {
        history.push('/main/home')
    }, [])

    useEffect(() => {
        let data = {
            customer_id: isUser
        }
        countcart(data).then(res =>
            setCountBag(res.data.count_pro)
        )
    }, [lastCount])
    return (
        <div>
            <div style={{ backgroundColor: "#ffff" }} className="container-fluid scrollbar" style={{ padding: "0 70px" }} id="style-1">
                <div className="row" style={{ marginTop: "10px" }}>
                    <Navigation history={history} countBag={parseInt(countBag)} currentUserName={currentUserName} />
                </div>
            </div>
            <Route path='/main/jeancouture'><Jeancouture /></Route>
            <Route path='/main/home'><Home /></Route>
            <Route path='/main/productmen'><Men /></Route>
            <Route path='/main/productwomen'><Women /></Route>
            <Route path='/main/handbag'><Handbag /></Route>
            <Route path='/main/children'><Children /></Route>
            <Route path='/main/homecollection'><Homecollection /></Route>
            <Route path='/main/atelierfashion'><Atelierfashion /></Route>
            <Route path='/main/detail/:idpro'><Detail countCart={onChangeCountCart} /></Route>
            <Route path='/main/signin'><Signin currentUserName={currentUserName} setcurrentUserName={(username) => setcurrentUserName(username)} /></Route>
            <Route path='/main/cart/:customerid'><Cart countCart={onChangeCountCart} /></Route>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}
