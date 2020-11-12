import React, { useState } from 'react';
import Search from '../../../components/Search';

import '../../../css/subway.css'


const Main = () =>{
    const [plusimg, setPlusimg] = useState(false);

    const changeimg = (e) =>{
        if(!plusimg){
            e.target.width =e.target.width * 2
            setPlusimg(true)
        }else{
            e.target.width =e.target.width / 2
            setPlusimg(false)
        }
    }

    return(
            <div>
                {/* <h3 className="text-center">Hello main Page</h3> */}
                <Search  />
                <div className="subway-wrapper">
                    <div className="subway">
                        <img onClick={changeimg} src={require('../../../images/img_subway.png')} alt="이미지"  ></img>
                    </div>
                </div>
            </div>
        );
    }

export default Main;