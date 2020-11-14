import React from 'react';
// import {Link} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import ListIcon from '@material-ui/icons/List';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import swal from 'sweetalert';
import '../css/navigation.css'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 150,
      position: 'fixed',
      height: '100%',
      overflow: 'auto',
      backgroundColor: '#000000b8',
      color: 'white',
      // backgroundColor: '#858484c2',
    },
    // menu1:{
    //   marginLeft: '2.6rem'
    // },
    // menu2:{
    //   marginLeft: '2.2rem'
    // },
    // menu3:{
    //   marginLeft: '2.3rem'
    // },
    // menu4:{
    //   marginLeft:"1.3rem"
    // },
    menulogo:{
      color: 'white'
    },
    logout:{
      marginTop: '15rem',
      padding:0
    },
    icon:{
      '&:hover':{
        color: '#f50057 !important'
      },
      minWidth: 45
    },
    text:{
      '&:hover':{
        color: '#f50057 !important'
      }
    }
  }));
  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

 
const Navigation = () =>{
    const classes = useStyles();
    const history = useHistory();

    
    const onLogout = () =>{
      swal({
        title: "로그아웃 하시겠습니까?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        buttons: {
            cancel: "취소",
            confirm: "확인"
          },
      })
      .then((willDelete) => {
        if (willDelete) {
          sessionStorage.removeItem('uid')
          swal("로그아웃 되었습니다!", {
            icon: "success",
            buttons:false,
            timer: 1500
          });
          setTimeout(()=>{
            history.push('/admin/introduce')
          },1600)
        } else {
          swal("취소되었습니다!",{
              icon: "error",
              buttons:false,
              timer:1500
          });
          
        }
      });
    }
        return(
            <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/home'>
                <ListItemIcon className={classes.icon}>
                  <HomeIcon fontSize="large"  className={classes.menulogo} />
                </ListItemIcon>
                <ListItemText className={classes.text} primary="HOME" />
                </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu1}>홈</p> */}
              </List>

              <List>
              <ListItem  className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/cctv'>
                <ListItemIcon className={classes.icon}>
                  <VideocamIcon fontSize="large" className={classes.menulogo}/>
                </ListItemIcon>
                <ListItemText className={classes.text} primary="CCTV" />
                </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu2}>cctv</p> */}
            </List>

            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/log'>
                <ListItemIcon className={classes.icon}>
                  <ListIcon fontSize="large" className={classes.menulogo}/> 
                </ListItemIcon>
                <ListItemText className={classes.text} primary="기록" />
                </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu3}>로그</p> */}
              </List>

              <List>
              <ListItem className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/adminclaim'>
                <ListItemIcon className={classes.icon}>
                  <HeadsetMicIcon fontSize="large" className={classes.menulogo}/> 
                </ListItemIcon>
                <ListItemText className={classes.text} primary="신고" />
              </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu3}>신고</p> */}
              </List>

              <List>
              <ListItem className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/statistics'>
                <ListItemIcon className={classes.icon}>
                  <EqualizerIcon fontSize="large" className={classes.menulogo}/> 
                </ListItemIcon>
                <ListItemText className={classes.text} primary="통계" />
              </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu3}>통계</p> */}
              </List>

              <List>
              <ListItem className="pb-0"  button>
              <ListItemLink component={Link} to='/admin/setting'>
                <ListItemIcon className={classes.icon}>
                  <SettingsIcon fontSize="large" className={classes.menulogo}/> 
                </ListItemIcon>
                <ListItemText className={classes.text} primary="설정" />
              </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu3}>설정</p> */}
              </List>

              <List>
              {/* <Button className={classes.btn} variant="contained" color="secondary">
                로그아웃
              </Button> */}
              <ListItem className={classes.logout} onClick={onLogout} button>
              <ListItemLink className={classes.icon}>
                <ListItemIcon>
                  <ExitToAppIcon  fontSize="large" color="secondary"/> 
                </ListItemIcon>
                <ListItemText primary="로그아웃" />
              </ListItemLink>
              </ListItem>
              {/* <p className={classes.menu4}>로그아웃</p> */}
            </List>
          </div>
      
    )
}


export default Navigation;