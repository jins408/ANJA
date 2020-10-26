import React from 'react';
import {Link} from 'react-router-dom'
import '../css/navigation.css'
 
const Navigation = () =>{
    return(
        <nav className="header navbar navbar-expand-sm ">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="navbar-brand">Corona Caps</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/home" className="item mr-3" >Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="item" >About</Link>           
                    </li>
                </ul>
                <ul className="my-auto ml-auto">
                    <button className="navbar_btn1 btn btn-outline-light mr-2" type="submit">Login</button>     
                    <button className="navbar_btn2 btn btn-light" type="submit">서비스 신청하기</button>     
                </ul>
        </nav>

    )
}


export default Navigation;