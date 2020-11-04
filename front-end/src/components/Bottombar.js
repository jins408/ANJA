import React, { useEffect } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import SettingsIcon from '@material-ui/icons/Settings';
import Badge from '@material-ui/core/Badge';

import '../css/bottombar.css'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = (props) =>{
    const location = useLocation();
    const [value, setValue] = React.useState(0);
    // const [count, setCount] = React.useState(props.alarm_count);
    const [invisible, setInvisible] = React.useState(false);
    const [count, setCount] = React.useState(props.alarm_count)

    if(count !== props.alarm_count){
      setCount(props.alarm_count)
    }

    const handleBadgeVisibility = () => {
      setInvisible(true);
    };


    useEffect(()=>{
      if(location.pathname === '/mobile/alarm'){
        handleBadgeVisibility();
        setCount(0)
      }else{
        if( count === 0 ){
          setInvisible(true)
        }else{
          setInvisible(false)
        }
      }
    },[location.pathname, count])


    return (
      <BottomNavigation
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      showLabels
      className="bottom"
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to='/mobile/main'/>
        <BottomNavigationAction label="즐겨찾기" icon={<StarIcon />} component={Link} to='/mobile/favorite'/>
        <BottomNavigationAction onChange={handleBadgeVisibility}  label="알림" icon={<Badge color="secondary" badgeContent={count} invisible={invisible}><NotificationsActiveIcon/></Badge>} component={Link} to='/mobile/alarm'/>
        <BottomNavigationAction label="신고" icon={<RingVolumeIcon/>} component={Link} to='/mobile/claim'/>
        <BottomNavigationAction label="설정" icon={<SettingsIcon/>} component={Link} to='/mobile/setting'/>
        </BottomNavigation>
    );
}


export default Bottombar