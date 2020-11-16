import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import '../../../css/Join.css'

import axios from 'axios'

const baseURL = 'https://k3b101.p.ssafy.io'

const Join = () => {
    const [name, setNickname] = useState();
    const [email, setEmail] = useState();
    const [conemail, setConemail] = useState();
    const [pw, setPassword] = useState();
    const [pwConfirm, setConpassword] = useState();
    const [Lemail, setLeamil] = useState('');
    const [wemail, setWemail] = useState('');
    const [ewriter, setEwriter] = useState(false);

    const setNicknameText = e => {
        setNickname(e.target.value)
    }
    const setEmailText = e => {
        setEmail(e.target.value)
    }
    const setConemailText = e => {
        setConemail(e.target.value)
    }
    const setPasswordText = e => {
        setPassword(e.target.value)
    }
    const setConpasswordText = e => {
        setConpassword(e.target.value)
    }
    const setWemailText = e => {
        setWemail(e.target.value)
    }

    const setLemailText = e =>{
        if(e.target.value === "etc"){
            setEwriter(true)
            setLeamil(e.target.value)
            return setWemail()
        }
        setEwriter(false)
        setLeamil(e.target.value)
    }

    const gojoin = () => {
        // axios({
        //     method: 'POST',
        //     url:'http:localhost:8080/api/users',
        //     data:{
        //         email: email,
        //         pw: pw,
        //         pwConfirm: pwConfirm,
        //         name: name
        //     }
        // })
        // console.log(email);
        axios.post(`${baseURL}/api/users/`,
            {
                email: email,
                pw: pw,
                pwConfirm: pwConfirm,
                name: name
            }
        )
        .then((res)=>{
            if (res.data.data === "EXIST EMAIL"){
                alert('중복')
            }else{
                alert('가입성공')
            }
            // console.log(res.data)
        })
        .catch((err, a)=>{
            // console.log(err)
            // console.log(a)
        })
    }


    return (
        <div>
            <p className="joinheader mb-5">회원가입</p>
            <div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">이메일</span>
                    <input className="input-email" value={email || ''} onChange={setEmailText} type="text" placeholder="이메일을 입력해주세요"></input>
                    <span className="input-e">@</span>
                    {(ewriter && <input className="input-email" value={wemail || ''} onChange={setWemailText} type="text" placeholder="직접 입력해주세요"></input>) || <input className="input-email" value={Lemail} disabled></input> }
                    <select
                        className="select-email ml-2"
                        value={Lemail}
                        onChange={setLemailText}
                    >
                        <option value="" disabled>:: 선택해주세요 ::</option>
                        <option value="naver.com">naver.com</option>
                        <option value="daum.com">daum.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="etc">직접 입력</option>
                    </select>
                    <button className="btn btn-primary mx-2">중복확인</button>
                    <button className="btn btn-primary">인증번호 발송</button>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">이메일 인증번호</span><input className="input" value={conemail || ''} onChange={setConemailText} type="text" placeholder="이메일 인증번호를 입력해주세요"></input>
                    <button className="btn btn-primary ml-2">인증 확인</button>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">닉네임</span><input className="input" value={name || ''} onChange={setNicknameText} placeholder="닉네임을 입력해주세요." ></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">비밀번호</span><input className="input" value={pw || ''} onChange={setPasswordText} type="password" placeholder="비밀번호를 입력해주세요"></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">비밀번호 확인</span><input className="input" value={pwConfirm || ''} onChange={setConpasswordText} type="password" placeholder="비밀번호를 다시 입력해주세요."></input>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/"><button className="btn btn-primary mr-5">돌아가기</button></Link>
                    <button className="btn btn-primary" onClick={gojoin}>가입하기</button>
                </div>
            </div>
            <br />
            이메일 : {email}@{ewriter ? wemail : Lemail}
            <br />
            이메일 인증번호 : {conemail}
            <br />
            닉네임 : {name}
            <br />
            비번 : {pw}
            <br />
            비번확인 : {pwConfirm}
        </div>
    );
}

export default Join;
