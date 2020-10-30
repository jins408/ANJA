import React from 'react';

const Home = () =>{
    return(
        <div>
            <div className="d-flex justify-content-center">
            <img src={require('../images/mainpage.jpg')} alt="이미지" height="700rem"></img>
            </div>
            <p className="scroll" onClick={function () {
                var ll = document.querySelector("#skill1").offsetTop;
                window.scrollTo({ top: ll, behavior: "smooth" })
            }}><i className="fas fa-chevron-down"></i></p>
            <div className="d-flex justify-content-center">
                <p className="skill" id="skill1">기능1</p>
                <img src={require('../images/logo512.png')} alt="이미지" height="700rem"></img>
            </div>
            <p className="scroll" onClick={function () {
                var ll = document.querySelector("#skill2").offsetTop;
                window.scrollTo({ top: ll, behavior: "smooth" })
            }}><i className="fas fa-chevron-down"></i></p>
            <div className="d-flex justify-content-center">
                <p className="skill" id="skill2">기능2</p>
                <img src={require('../images/logo512.png')} alt="이미지" height="700rem"></img>
            </div>
            <p className="scroll" onClick={function () {
                var ll = document.querySelector("#skill3").offsetTop;
                window.scrollTo({ top: ll, behavior: "smooth" })
            }}><i className="fas fa-chevron-down"></i></p>
            <div className="d-flex justify-content-center">
                <p className="skill" id="skill3">기능3</p>
                <img src={require('../images/logo512.png')} alt="이미지" height="700rem"></img>
            </div>
            <p className="scroll" onClick={function () {
                var ll = document.querySelector("#skill4").offsetTop;
                window.scrollTo({ top: ll, behavior: "smooth" })
            }}><i className="fas fa-chevron-down"></i></p>
            <div className="d-flex justify-content-center">
                <p className="skill" id="skill4">기능4</p>
                <img src={require('../images/logo512.png')} alt="이미지" height="700rem"></img>
            </div>
        </div>
        );
    }
export default Home;