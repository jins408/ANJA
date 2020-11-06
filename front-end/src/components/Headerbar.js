import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom'

import '../css/Header.css'

const useStyles = makeStyles(() => ({
  root: {
    // flexGrow: 1,
    position: 'fixed',
    width: '100%',
    maxWidth: '375px',
    top: 0,
    height: '48px',
    zIndex: '2'
  },
  menuButton: {
    position: 'absolute !important'
  },
}));


const  Headerbar = ({location}) =>{
    const classes = useStyles();
    const nowlocation = useLocation();
    const [back, setBack] = useState(false);
    const [title, setTitle] = useState('Subway Alimi');
    let history = useHistory();
     
    const goback = () =>{
      history.goBack()
    }

    
    useEffect(()=>{
      if( location !== '/mobile/main' && location !== '/mobile/favorite' && location !== '/mobile/alarm' && location !== '/mobile/claim'){
        setBack(true)
      }else{
        setBack(false)
      }
    },[location])

    useEffect(()=>{
      if(nowlocation.pathname === '/mobile/favorite'){
        setTitle('즐겨찾기')
      }else if(nowlocation.pathname === '/mobile/alarm'){
        setTitle('알림')
      }else if(nowlocation.pathname === '/mobile/claim'){
        setTitle('신고')
      }else if(nowlocation.pathname === '/mobile/setting'){
        setTitle('설정')
      }else{
        setTitle('Subway Alimi')
      }
    },[nowlocation])

  
    
    return (
        <div className={classes.root }>
          <AppBar position="static">
            <Toolbar variant="dense">
              {back && <IconButton edge="start" className={classes.menuButton} onClick={goback} color="inherit" aria-label="menu">
                <ArrowBackIosIcon />
              </IconButton>}
              <div className="d-flex justify-content-center w-100">
                <Typography  variant="h6" color="inherit">
                  {/* Subway Alimi */}
                  {title}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    
}

export default Headerbar



