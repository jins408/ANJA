import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import '../css/Apply.css'

const useStyles = makeStyles((theme) => ({
    container:{
        display: 'inline',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    //   marginRight: 50,
    },
  }));

const Apply = () => {
    const classes = useStyles();

    var today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // // console.log(date);
    const [biznum, setBiznum] = useState();
    const [bizname, setBizname] = useState();
    const [phone, setPhone] = useState();
    const [ceo, setCeo] = useState();
    const [location, setLocation] = useState();
    const [sdate, setSdate] = useState(date);
    const [edate, setEdate] = useState(today.getFullYear() + 1 + '-' + (today.getMonth() + 1) + '-' + today.getDate());

    const nowDate = new Date(Date.now());
    nowDate.setDate(nowDate.getDate() + 7);

    const setBiznumText = e => {
        setBiznum(e.target.value)
    }
    const setBiznameText = e => {
        setBizname(e.target.value)
    }
    const setPhoneText = e => {
        setPhone(e.target.value)
    }
    const setCeoText = e => {
        setCeo(e.target.value)
    }
    const setLocationText = e => {
        setLocation(e.target.value)
    }
    const setSdateText = e => {
        // // console.log(e.target.value)
        setSdate(e.target.value)
    }
    const setEdateText = e => {
        // // console.log(e.target.value)
        setEdate(e.target.value)
    }



    // const setSelfsdateText = e => {
    //     setSelfsdate(e.target.value)
    //     setEdate(today.getFullYear() + Number(e.target.value) + '-' + (today.getMonth() + 1) + '-' + today.getDate())
    // }


    // const setSdateText = e =>{
    //     if(e.target.value === "self"){
    //         // console.log(today.getFullYear())
    //         // console.log(e.target.value)
    //         // console.log(e)
            
    //         setSelfwriter(true)
    //         setSdate(e.target.value)
    //         setEdate(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate())
    //         return setSelfsdate()
    //     }
    //     setSelfwriter(false)
    //     setSdate(date)
    //     setEdate(today.getFullYear() + Number(e.target.value) + '-' + (today.getMonth() + 1) + '-' + today.getDate())
    // }


    return (
        <div>
            <p className="joinheader mb-5">서비스 신청 페이지</p>
            <div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">사업자 등록번호</span><input className="input" value={biznum || ''} onChange={setBiznumText} placeholder="사업자 등록번호를 입력해주세요." ></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">상호명</span><input className="input" value={bizname || ''} onChange={setBiznameText} placeholder="상호명를 입력해주세요"></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">휴대폰번호</span><input className="input" value={phone || ''} onChange={setPhoneText} placeholder="휴대폰번호를 입력해주세요."></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">대표자명</span><input className="input" value={ceo || ''} onChange={setCeoText} placeholder="대표자명을 입력해주세요."></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text">주소</span><input className="input" value={location || ''} onChange={setLocationText} placeholder="주소를 입력해주세요."></input>
                </div>
                <div className="mb-4 inputdiv">
                    <span className="input-text mt-2">이용기간</span>
                    <form className={classes.container} noValidate>
                        <TextField
                            id="date"
                            label="서비스 시작 날짜"
                            type="date"
                            defaultValue={sdate}
                            onChange={setSdateText}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <TextField
                            // disabled
                            id="date"
                            label="서비스 종료 날짜"
                            type="date"
                            defaultValue={edate}
                            onChange={setEdateText}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>
                    {/* {(selfwriter && <input className="input-email" value={selfsdate || ''} onChange={setSelfsdateText} type="text" placeholder="직접 입력해주세요"></input>) || <input className="input-email" value={sdate || ''} disabled></input> }
                    <input className="input-email ml-2" value={edate} disabled></input>
                    <select
                        className="select-email ml-2"
                        value={sdate}
                        onChange={setSdateText}
                    >
                        <option value={date} disabled>:: 선택해주세요 ::</option>
                        <option value="1">1년</option>
                        <option value="2">2년</option>
                        <option value="3">3년</option>
                        <option value="self">직접 입력</option>
                    </select> */}
                </div>
                
                <div className="d-flex justify-content-center">
                    <Link to="/"><button className="btn btn-primary mr-5">돌아가기</button></Link>
                    <button className="btn btn-primary">가입하기</button>
                </div>
            </div>
            <br />
            사업자 등록번호 : {biznum}
            <br />
            상호명 : {bizname}
            <br />
            휴대폰 번호 : {phone}
            <br />
            대표자명 : {ceo}
            <br />
            주소 : {location}
            <br />
            이용기간 : {sdate} ~ {edate}
        </div>
    );
}

export default Apply;
