import React from 'react';
import './App.css';
// import Join from './components/Join'
import { Route } from 'react-router-dom'

import Main from './pages/Main'
import Join from './components/Join'

const App = () => {
  return (
    <>
      <Route exact path="/" component={Main}></Route>
      <Route exact path="/join" component={Join}></Route>
    </>
  );
}

export default App;
