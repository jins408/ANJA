import React, { useEffect, useState } from 'react';
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
    const [back, setBack] = useState(false);
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
  
    
    return (
        <div className={classes.root }>
          <AppBar position="static">
            <Toolbar variant="dense">
              {back && <IconButton edge="start" className={classes.menuButton} onClick={goback} color="inherit" aria-label="menu">
                <ArrowBackIosIcon />
              </IconButton>}
              <div className="d-flex justify-content-center w-100">
                <Typography  variant="h6" color="inherit">
                  Subway Alimi
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    
}

export default Headerbar



