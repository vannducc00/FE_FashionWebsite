import React from 'react';
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
import Cart from './Components/Cart';

const history = createBrowserHistory();


function App() {
  return (
    <>
      <Router>
        <div style={{ backgroundColor: "#ffff" }} className="container-fluid scrollbar" style={{ padding: "0 70px" }} id="style-1">
          <div className="row" style={{ marginTop: "10px" }}>
            <Navigation history={history} />
          </div>
        </div>
        <Route exact path="/" render={(props) => <Home history={history} {...props} />} />
        <Route exact path="/detail/:idpro" render={(props) => <Detail history={history} {...props} />} />
        <Route exact path="/signin" render={(props) => <Signin history={history} {...props} />} />
        <Route exact path="/productmen" render={(props) => <Men history={history} {...props} />} />
        <Route exact path="/productwomen" render={(props) => <Women history={history} {...props} />} />
        <Route exact path="/handbag" render={(props) => <Handbag history={history} {...props} />} />
        <Route exact path="/cart" render={(props) => <Cart history={history} {...props} />} />
      </Router>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

export default App;
