import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom'

import '../css/Header.css'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    position: 'fixed',
    width: '100%',
    top: 0,
    height: '48px',
    zIndex: '2'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));


const  Headerbar = () =>{
    const classes = useStyles();
    const [back, setBack] = useState(false);
    let history = useHistory();
    // const pre = window.location.href

     
    const goback = () =>{
      history.goBack()
    }

    
    useEffect(()=>{
      if(window.location.href !== 'http://localhost:3000/mobile/main'){
        setBack(true)
      }else{
        setBack(false)
      }
    },[back])
    

    return (
        <div className={classes.root }>
          <AppBar position="static">
            <Toolbar variant="dense">
              {back && <IconButton edge="start" className={classes.menuButton} onClick={goback} color="inherit" aria-label="menu">
                <ArrowBackIosIcon />
              </IconButton>}
              <Typography  variant="h6" color="inherit">
                Subway Alimi
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      );
    
}

export default Headerbar



