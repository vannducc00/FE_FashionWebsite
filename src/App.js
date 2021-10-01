import React, { Component, useEffect } from 'react';
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
import Newsfashion from './Components/Newsfashion';
import Jeancouture from './Components/Jeancouture';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countBag: 0,
      userName: localStorage.getItem("username")
    }
  }

  onChangeCountCart = (value) => {
    this.setState({ countBag: value })
  }

  render() {
    return (
      <>
        <Router>
          <div style={{ backgroundColor: "#ffff" }} className="container-fluid scrollbar" style={{ padding: "0 70px" }} id="style-1">
            <div className="row" style={{ marginTop: "10px" }}>
              <Navigation history={history} countBag={parseInt(this.state.countBag)} setUser={this.state.userName} />
            </div>
          </div>
          <Route exact path="/" render={(props) => <Home history={history} {...props} />} />
          <Route exact path="/detail/:idpro" render={(props) => <Detail history={history} {...props} />} />
          <Route exact path="/signin" render={(props) => <Signin history={history} {...props} />} />
          <Route exact path="/productmen" render={(props) => <Men history={history} {...props} />} />
          <Route exact path="/productwomen" render={(props) => <Women history={history} {...props} />} />
          <Route exact path="/handbag" render={(props) => <Handbag history={history} {...props} />} />
          <Route exact path="/cart/:customerid" render={(props) => <Cart history={history} {...props} counCart={this.onChangeCountCart} />} />
          <Route exact path="/statistical" render={(props) => <Statistical history={history} {...props} />} />
          <Route exact path="/children" render={(props) => <Children history={history} {...props} />} />
          <Route exact path="/homecollection" render={(props) => <Homecollection history={history} {...props} />} />
          <Route exact path="/newsfashion" render={(props) => <Newsfashion history={history} {...props} />} />
          <Route exact path="/jeancouture" render={(props) => <Jeancouture history={history} {...props} />} />
          <div className="">
            <Footer />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
