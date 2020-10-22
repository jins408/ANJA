import React, { useState } from 'react';

function Join() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [conpassword, setConpassword] = useState();

    const setNameText = e => {
        setName(e.target.value)
    }
    const setEmailText = e => {
        setEmail(e.target.value)
    }
    const setPhoneText = e => {
        setPhone(e.target.value)
    }
    const setPasswordText = e => {
        setPassword(e.target.value)
    }
    const setConpasswordText = e => {
        setConpassword(e.target.value)
    }


    return (
        <div>
            <h1>회원가입</h1>
            <p><span>이름</span><input onChange={setNameText} placeholder="이름을 입력해주세요." ></input></p>
            <p><span>이메일</span><input onChange={setEmailText} type="text" placeholder="이메일을 입력해주세요"></input></p>
            <p><span>전화번호</span><input onChange={setPhoneText} type="text" placeholder="전화번호를 입력해주세요"></input></p>
            <p><span>비밀번호</span><input onChange={setPasswordText} type="password" placeholder="비밀번호를 입력해주세요"></input></p>
            <p><span>비밀번호확인</span><input onChange={setConpasswordText} type="password" placeholder="비밀번호를 다시 입력해주세요."></input></p>
            <button className="btn btn-primary">회원가입</button>
            <br />
            {name}
            <br />
            {email}
            <br />
            {phone}
            <br />
            {password}
            <br />
            {conpassword}
        </div>
    );
}

export default Join;
