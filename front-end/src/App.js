import React from 'react';
import './App.css';

import { Route } from 'react-router-dom'

// import Navigation from './components/Navigation'
// import Introduce from './pages/Introduce'
import Join from './pages/admin/user/Join'
// import Home from './pages/Home'
// import About from './pages/About'
// import Login from './pages/user/Login'
// import Apply from './pages/Apply'

import Favorites from './pages/moblie/tab/Favorites'
import Selectroute from './pages/moblie/detail/SelectRoute'

const App = () => {
  // let location = useLocation()
  // if(location.pathname === "/"){
  //   return <Route exact path="/" component={Introduce}></Route>
  // }
  return (
    <>
    {/* <Navigation /> */}
      {/* <Route exact path="/home" component={Home} />
      <Route path="/about" component={About} /> */}
      <Route exact path="/join" component={Join}></Route>
      {/* <Route exact path="/login" component={Login}></Route>
      <Route exact path="/apply" component={Apply}></Route> */}
      <Route exact path='/favorite' component={Favorites}></Route>
      <Route exact path='/selectroute' component={Selectroute}></Route>
    </>
  );
}

export default App;
