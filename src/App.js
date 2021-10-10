import React, { Component, useEffect, useState } from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Men from './Components/Men';
import Women from './Components/Women'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Detail from './Components/Detail';
import Signin from './Components/Signin';
import Handbag from './Components/Handbag';
import Statistical from './Components/Statistical';
import Cart from './Components/Cart';
import Children from './Components/Children';
import Homecollection from './Components/Homecollection';
import Jeancouture from './Components/Jeancouture';
import Atelierfashion from './Components/Atelierfashion';
import { countcart } from './Service'
const history = createBrowserHistory();

export default function App(props) {
  const [countBag, setCountBag] = useState(0)
  const [lastCount, setLastCount] = useState(0)
  let isUser = localStorage.getItem('iduser')

  const onChangeCountCart = (value) => {
    setLastCount(lastCount + parseInt(value))
  }

  useEffect(() => {
    let data = {
      customer_id: isUser
    }
    countcart(data).then(res =>
      setCountBag(res.data.count_pro)
    )
  }, [lastCount])


  return (
    <>
      <Router>
        <div style={{ backgroundColor: "#ffff" }} className="container-fluid scrollbar" style={{ padding: "0 70px" }} id="style-1">
          <div className="row" style={{ marginTop: "10px" }}>
            <Navigation history={history} countBag={parseInt(countBag)} />
          </div>
        </div>
        <Route exact path="/" render={(props) => <Home history={history} {...props} />} />
        <Route exact path="/detail/:idpro" render={(props) => <Detail history={history} {...props} countCart={onChangeCountCart} />} />
        <Route exact path="/signin" render={(props) => <Signin history={history} {...props} />} />
        <Route exact path="/productmen" render={(props) => <Men history={history} {...props} />} />
        <Route exact path="/productwomen" render={(props) => <Women history={history} {...props} />} />
        <Route exact path="/handbag" render={(props) => <Handbag history={history} {...props} />} />
        <Route exact path="/cart/:customerid" render={(props) => <Cart history={history} {...props} countCart={onChangeCountCart} />} />
        <Route exact path="/statistical" render={(props) => <Statistical history={history} {...props} />} />
        <Route exact path="/children" render={(props) => <Children history={history} {...props} />} />
        <Route exact path="/homecollection" render={(props) => <Homecollection history={history} {...props} />} />
        <Route exact path="/jeancouture" render={(props) => <Jeancouture history={history} {...props} />} />
        <Route exact path="/atelierfashion" render={(props) => <Atelierfashion history={history} {...props} />} />
        <div className="">
          <Footer />
        </div>
      </Router>
    </>
  )
}
