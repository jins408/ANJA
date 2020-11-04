import React, { useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';

import { Route, useLocation } from 'react-router-dom' 

import Navigation from './components/Navigation'
// import Introduce from './pages/Introduce'
import Join from './pages/admin/user/Join'
import Home from './pages/admin/user/Home'
import Cctv from './pages/admin/user/Cctv'
import Log from './pages/admin/user/Log'
import AdminClaim from './pages/admin/user/AdminClaim'
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
      paddingTop : '48px',
  },
  navigation:{
    paddingLeft: '210px'
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
    if(preloc){
      if(preloc !== '/admin/login' && preloc !== '/admin/home' && preloc !== '/admin/cctv' && preloc !== '/admin/log' && preloc !== '/admin/adminclaim'){
        setUser('user')
      }else{
        setUser('admin')
      }
    }
  },[preloc, location.pathname])
  
  console.log(preloc)
  console.log(user)

  
  return (
    <>
      {/* 사용자 모바일(아이폰X 사이즈) */}
      {user === 'user' && <div className={classes.mobile}>
        {/* <Route exact path="/apply" component={Apply}></Route> */}
        <Headerbar location={preloc} />
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
         <Bottombar alarm_count={acount} />
        </div>
      </div>}

      {/* 관리자 태블릿(아이패드 사이즈) */}
      {user === 'admin' && <div className={classes.tablet}>
      <Navigation />
      <div className={classes.navigation}>
        <Route exact path="/admin/home" component={Home} />
          <Route exact path="/admin/join" component={Join}></Route>
          <Route exact path="/admin/cctv" component={Cctv}></Route>
          <Route exact path="/admin/log" component={Log}></Route>
          <Route exact path="/admin/adminclaim" component={AdminClaim}></Route>
          <Route exact path="/admin/login" component={Login}></Route>
        </div>
      </div>}
    </>
  );
}

export default App;
