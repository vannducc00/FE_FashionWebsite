import React from 'react';
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Footer from './Components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Detail from './Components/Detail';

const history = createBrowserHistory();


function App() {
  return (
    <>
      <Router>
        <div style={{ backgroundColor: "#ffff" }} className="container-fluid scrollbar" style={{ padding: "0 70px" }} id="style-1">
          <div className="row" style={{ marginTop: "10px" }}>
            <Navigation />
          </div>
        </div>
        <Route exact path="/" render={(props) => <Home history={history} {...props} />} />
        <Route exact path="/detail" render={(props) => <Detail history={history} {...props} />} />
      </Router>
      <div className="">
        <Footer />
      </div>
    </>
  );
}

export default App;
