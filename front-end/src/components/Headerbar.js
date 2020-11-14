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
    maxWidth: '373px',
    top: 0,
    height: '48px',
    zIndex: '2',
    // border: 'none !important'
  },
  menuButton: {
    position: 'absolute !important'
  },
  menuback: {
    // backgroundImage: `url(${subway1})`,
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    // height: '100%'
    backgroundColor: '#fcfcfc !important'
  },
  font:{
    fontWeight: 'bold'
  }
}));


const  Headerbar = ({location, favorite_edit}) =>{
    const classes = useStyles();
    const nowlocation = useLocation();
    const [back, setBack] = useState(false);
    const [showedit, setShowedit] = useState(false);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('A N J A');
    const editnum = localStorage.length
    let history = useHistory();
     
    const goback = () =>{
      history.goBack()
    }
    
    
    useEffect(()=>{
      if( location !== '/mobile/main' && location !== '/mobile/favorite' && location !== '/mobile/alarm' && location !== '/mobile/claim' && location !== '/mobile/setting'){
        setBack(true)
        setShowedit(false)
      }else{
        setBack(false)
        setShowedit(false)
        if( location === '/mobile/favorite'){
          setShowedit(true)
        }
      }
    },[location])


    useEffect(()=>{
      if(nowlocation.pathname === '/mobile/favorite'){
        setTitle('즐 겨 찾 기')
      }else if(nowlocation.pathname === '/mobile/alarm'){
        setTitle('알 림')
      }else if(nowlocation.pathname === '/mobile/claim'){
        setTitle('신 고')
      }else if(nowlocation.pathname === '/mobile/setting'){
        setTitle('버 전')
      }else{
        setTitle('A N J A')
      }
    },[nowlocation])


    const goedit = () =>{
      setEdit(!edit)
      favorite_edit(!edit)
    }

  
    
    return (
        <div className={classes.root }>
          <AppBar className={classes.menuback} position="static">
            <Toolbar variant="dense">
              {back && <IconButton edge="start" className={classes.menuButton} onClick={goback} color="inherit" aria-label="menu">
                <ArrowBackIosIcon />
              </IconButton>}
              <div className="d-flex justify-content-center w-100">
                <Typography className={classes.font}  variant="h6" color="inherit">
                  {title}
                  {editnum !== 0 && <div>{showedit && <div>{edit ? <button className="btn btn-outline Favorite_edit" onClick={goedit}>완료</button> : <button className="btn btn-outline Favorite_edit" onClick={goedit} >편집</button>}</div>}</div>}
                </Typography>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      );
    
}

export default Headerbar



