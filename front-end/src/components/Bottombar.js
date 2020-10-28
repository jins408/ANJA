import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import SettingsIcon from '@material-ui/icons/Settings';

import '../css/bottombar.css'


const Bottombar = () =>{
    const [value, setValue] = React.useState(0);
  
    return (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className="bottom"
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="즐겨찾기" icon={<StarIcon />} />
        <BottomNavigationAction label="알림" icon={<NotificationsActiveIcon />} />
        <BottomNavigationAction label="신고" icon={<RingVolumeIcon />} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
}


export default Bottombar