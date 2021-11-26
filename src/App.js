import React, { Component, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
  Redirect,
  Route
} from "react-router-dom";
import Main from './Pages/User/Main';
import Statistical from './Pages/Admin/Statistical';
import System from './Pages/Admin/System';
import Management_User from './Pages/Admin/Management_User';
import CRUD_Products from './Pages/Admin/CRUD_Products';
import Profile from './Pages/User/Profile';

export default function App(props) {

  return (
    <>
      <Router>
        <Route path='/main'><Main /></Route >
        <Route path='/profile'><Profile /></Route >
        <Route path='/statistical'><Statistical /></Route>
        <Route path='/system'><System /></Route>
        <Route path='/manageuser'><Management_User /></Route>
        <Route path='/CRUD_Products'><CRUD_Products /></Route>
        <Redirect to="/main" />
      </Router>
    </>
  )
}
