import React from 'react';
import { useHistory } from 'react-router-dom'
import BackgroundSlider from 'react-background-slider'
import image1 from '../../../images/subway1.png'
import image2 from '../../../images/subway2.png'
import image3 from '../../../images/City_subway.jpg'
import Button from '@material-ui/core/Button';

import '../../../css/Introduce.css'


const Introduce = () => {
  const history = useHistory();
  
  const gologin = () =>{
    history.push('/admin/login')
  }
    return (
      <div className="background-bg">
        <div >     
                <BackgroundSlider 
                  images ={[image1, image2, image3]}
                  duration={3} transition={2} />
        </div>
     
        <div className="circle"> 
          <h6 className="title"> ANJA </h6>
          <div className="text-title">안전한 자리, 앉아서 가자</div>
          <Button variant="contained" color="secondary" size="large" onClick={gologin}>
            로그인
          </Button>
          <h6>관리자로 로그인해서 이용해주세요.</h6>
          
        </div>
     </div>
    );
}

export default Introduce;

