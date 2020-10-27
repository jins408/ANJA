import React from 'react';
import './App.css';
// import Join from './components/Join'
import Navigation from './components/Navigation'
import { Route, useLocation } from 'react-router-dom'

import Introduce from './pages/Introduce'
import Join from './components/Join'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'

const App = () => {
  let location = useLocation()
  if(location.pathname === "/"){
    return <Route exact path="/" component={Introduce}></Route>
  }
  return (
    <>
    <Navigation />
      <Route exact path="/home" component={Home} />
      <Route path="/about" component={About} />
      <Route exact path="/join" component={Join}></Route>
      <Route exact path="/login" component={Login}></Route>
    </>
  );
}

export default App;
