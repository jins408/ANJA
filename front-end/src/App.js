import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Route, useLocation } from 'react-router-dom' 

// import Navigation from './components/Navigation'
// import Introduce from './pages/Introduce'
import Join from './pages/admin/user/Join'
// import Home from './pages/Home'
// import About from './pages/About'
import Login from './pages/admin/user/Login'
// import Apply from './pages/Apply'

import Favorites from './pages/moblie/tab/Favorites'
import Main from './pages/moblie/tab/Main'
import Alarm from './pages/moblie/tab/Alarm'
import Claim from './pages/moblie/tab/Claim';
import Setting from './pages/moblie/tab/Setting';
import Bottombar from './components/Bottombar';
import Selectroute from './pages/moblie/detail/SelectRoute'
import Headerbar from './components/Headerbar';
import SubwayTime from './pages/moblie/detail/SubwayTime';

const useStyles = makeStyles(() => ({
  mobile:{
    width: '375px',
    height: '812px'
  },
  tablet:{
    width: '1024px',
    height: '768px'
  },
  header: {
      paddingTop : '48px'
  }
}));

const App = () => {
  const classes = useStyles();
  const location = useLocation();
  const [preloc, setPreloc] = React.useState();
  const [user, setUser] = React.useState('user');
  const [acount, setAcount] = React.useState(0);
 
  useEffect(()=>{
    setPreloc(location.pathname) 
    // console.log(preloc)
    if(preloc){
      if(preloc !== '/login'){
        setUser('user')
      }else{
        setUser('admin')
      }
    }
  },[preloc, location.pathname])

  
  return (
    <div className={classes.mobile}>
    {/* <Navigation /> */}
      {/* <Route exact path="/home" component={Home} />
      <Route path="/about" component={About} /> */}
      {/* <Route exact path="/apply" component={Apply}></Route> */}
      {user === 'user' && <Headerbar location={preloc} />}
      <Route exact path="/join" component={Join}></Route>
      <Route exact path="/login" component={Login}></Route>
      <div className={classes.header}>
        <Route exact path='/mobile/favorite' component={Favorites}></Route>
        <Route exact path='/mobile/main' component={Main}></Route>
        <Route exact path={'/mobile/alarm'}
        render={()=>(
          <Alarm alarm_count={(value)=>setAcount(value)} />
        )}/>
        <Route exact path='/mobile/claim' component={Claim}></Route>
        <Route exact path='/mobile/setting' component={Setting}></Route>
        <Route exact path='/selectroute/:start/:end' component={Selectroute}></Route>
        <Route exact path='/subwaytime/:subway' component={SubwayTime}></Route>
        {user === 'user' && <Bottombar alarm_count={acount} />}
      </div>

    </div>
  );
}

export default App;
