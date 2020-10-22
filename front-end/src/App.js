import React from 'react';
import './App.css';
// import Join from './components/Join'
import { Route } from 'react-router-dom'

import Introduce from './pages/Introduce'
import Join from './components/Join'

const App = () => {
  return (
    <>
      <Route exact path="/" component={Introduce}></Route>
      <Route exact path="/join" component={Join}></Route>
    </>
  );
}

export default App;
