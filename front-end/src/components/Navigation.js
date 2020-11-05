import React from 'react';
// import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import ListIcon from '@material-ui/icons/List';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';

import '../css/navigation.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 200,
      position: 'fixed',
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#90caf9',
    },
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

const Navigation = () =>{
    const classes = useStyles();

        return(
            <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
              <ListItemLink href="/admin/home">
                <ListItemIcon>
                  <HomeIcon color="primary" /> 
                </ListItemIcon>
                <ListItemText primary="HOME" />
                </ListItemLink>
              </ListItem>
              <ListItem button>
              <ListItemLink href="/admin/cctv">
                <ListItemIcon>
                  <VideocamIcon />
                </ListItemIcon>
                <ListItemText primary="CCTV" />
                </ListItemLink>
              </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem button>
              <ListItemLink href="/admin/log">
                <ListItemIcon>
                  <ListIcon /> 
                </ListItemIcon>
                <ListItemText primary="LOG" />
                </ListItemLink>
              </ListItem>
              <ListItem button>
              <ListItemLink href="/admin/adminclaim">
                <ListItemIcon>
                  <HeadsetMicIcon color="secondary"/> 
                </ListItemIcon>
                <ListItemText primary="신고" />
              </ListItemLink>
              </ListItem>
            </List>
          </div>
      
    )
}


export default Navigation;