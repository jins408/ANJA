import React from 'react';
import Search from '../../../components/Search';

import '../../../css/subway.css'


const Main = () =>{

    return(
            <div>
                {/* <h3 className="text-center">Hello main Page</h3> */}
                <Search />
                <div className="subway-wrapper">
                    <div className="subway">
                        <img src={require('../../../images/img_subway.png')} alt="이미지"  ></img>
                    </div>
                </div>
            </div>
        );
    }

export default Main;