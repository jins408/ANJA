import React from 'react';
// import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import ListIcon from '@material-ui/icons/List';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Button from '@material-ui/core/Button';

import '../css/navigation.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 100,
      position: 'fixed',
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#858484c2',
    },
    menu1:{
      marginLeft: '2.6rem'
    },
    menu2:{
      marginLeft: '2rem'
    },
    menu3:{
      marginLeft: '2.3rem'
    },
    menu4:{
      marginLeft:"1.3rem"
    },
    logout:{
      marginTop: '16rem',
      paddingBottom:0
    }
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

 
const Navigation = () =>{
    const classes = useStyles();
    const history = useHistory();

    
    const onLogout = () =>{
      sessionStorage.removeItem('uid')
      history.push('/admin/introduce')
    }
        return(
            <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem className="pb-0"  button>
              <ListItemLink href="/admin/home">
                <ListItemIcon>
                  <HomeIcon fontSize="large"  color="primary" />
                </ListItemIcon>
                {/* <ListItemText primary="HOME" /> */}
                </ListItemLink>
              </ListItem>
              <p className={classes.menu1}>홈</p>
              <ListItem  className="pb-0"  button>
              <ListItemLink href="/admin/cctv">
                <ListItemIcon >
                  <VideocamIcon fontSize="large" />
                </ListItemIcon>
                {/* <ListItemText primary="CCTV" /> */}
                </ListItemLink>
              </ListItem>
              <p className={classes.menu2}>cctv</p>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem className="pb-0"  button>
              <ListItemLink href="/admin/log">
                <ListItemIcon>
                  <ListIcon fontSize="large" /> 
                </ListItemIcon>
                {/* <ListItemText primary="LOG" /> */}
                </ListItemLink>
              </ListItem>
              <p className={classes.menu3}>로그</p>
              <ListItem className="pb-0"  button>
              <ListItemLink href="/admin/adminclaim">
                <ListItemIcon>
                  <HeadsetMicIcon fontSize="large" /> 
                </ListItemIcon>
                {/* <ListItemText primary="신고" /> */}
              </ListItemLink>
              </ListItem>
              <p className={classes.menu3}>신고</p>
              {/* <Button className={classes.btn} variant="contained" color="secondary">
                로그아웃
              </Button> */}
              <ListItem className={classes.logout} onClick={onLogout} button>
              <ListItemLink className="pb-1">
                <ListItemIcon>
                  <ExitToAppIcon  fontSize="large" color="secondary"/> 
                </ListItemIcon>
              </ListItemLink>
              </ListItem>
              <p className={classes.menu4}>로그아웃</p>
            </List>
          </div>
      
    )
}


export default Navigation;