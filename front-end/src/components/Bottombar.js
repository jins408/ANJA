import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import SettingsIcon from '@material-ui/icons/Settings';
import Badge from '@material-ui/core/Badge';

import '../css/bottombar.css'
import { Link } from 'react-router-dom'

const Bottombar = () =>{
    const [value, setValue] = React.useState(0);
    const [count, setCount] = React.useState(1);
    const [invisible, setInvisible] = React.useState(false);

    const handleBadgeVisibility = () => {
      setInvisible(true);
    };

  
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
      <BottomNavigationAction onChange={handleBadgeVisibility} onClick={()=>setCount(count+1)}  label="알림" icon={<NotificationsActiveIcon/>} component={Link} to='/mobile/alarm'/><Badge className="badgecount" color="secondary" badgeContent={count} invisible={invisible}></Badge>
      <BottomNavigationAction label="신고" icon={<RingVolumeIcon/>} component={Link} to='/mobile/claim'/>
      <BottomNavigationAction label="설정" icon={<SettingsIcon/>} component={Link} to='/mobile/setting'/>
      </BottomNavigation>
    );
}


export default Bottombar