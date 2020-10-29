import React, {Component} from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import SettingsIcon from '@material-ui/icons/Settings';

import '../css/bottombar.css'
import { Link } from 'react-router-dom'

class Bottombar extends Component {
  state = {
    value: 0,
    pathMap: [
      '/mobile/main',
      '/mobile/favorite',
      '/mobile/alarm',
      '/mobile/claim',
      '/mobile/setting'
    ]
  };

  componentWillReceiveProps(newProps) {
    const {pathname} = newProps.location;
    const {pathMap} = this.state;

    const value = pathMap.indexOf(pathname);

    if (value > -1) {
      this.setState({
        value
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const {value, pathMap} = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className="bottom"
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to={pathMap[0]} />
        <BottomNavigationAction label="즐겨찾기" icon={<StarIcon/>} component={Link} to={pathMap[1]} />
        <BottomNavigationAction label="알림" icon={<NotificationsActiveIcon/>} component={Link} to={pathMap[2]}/>
        <BottomNavigationAction label="신고" icon={<RingVolumeIcon/>} component={Link} to={pathMap[3]} />
        <BottomNavigationAction label="설정" icon={<SettingsIcon/>} component={Link} to={pathMap[4]} />
      </BottomNavigation>
    );
  }
}

// const Bottombar = ({history}) =>{
//     const [value, setValue] = React.useState(0);

//     const gofavor = ({history})=>{
//       history.push('/mobile/favorite')
//       }
  
//     return (
//       <BottomNavigation
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         showLabels
//         className="bottom"
//       >
//         <Link to="/mobile/main"><BottomNavigationAction label="Home" icon={<HomeIcon />} /></Link>
//         <Link to="/mobile/favorite"><BottomNavigationAction label="즐겨찾기" icon={<StarIcon />} /></Link>
//         <BottomNavigationAction onClick={gofavor} label="알림" icon={<NotificationsActiveIcon />} />
//         <BottomNavigationAction label="신고" icon={<RingVolumeIcon />} />
//         <BottomNavigationAction label="설정" icon={<SettingsIcon />} />
//       </BottomNavigation>
//     );
// }


export default Bottombar