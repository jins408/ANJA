import React, { useState } from 'react';
import Button from '@material-ui/core/Button';


import '../../../css/claim.css'

const Claim = () =>{
    const [writer, setWriter] = useState(false);
    const [category, setCategory] = useState('');
    const [inputbox, setInputbox] = useState('');

    const setcategoryText = e => {
        setCategory(e.target.value)
    }

    const CheckText = (e) => {
        if(e.target.value === "other"){
            setWriter(true)
            setInputbox(e.target.value)
            return setCategory()
        }
        setWriter(false)
        setInputbox(e.target.value)
    }
      
    return(          
        
        <div >
            <div>
            <h3 className="title-claim">신고</h3>
            </div>
            <div className="claim-form">
                <span className="categoty-claim">신고유형: </span>
                {(writer && <input className="input-category" value={category || ''} onChange={setcategoryText} type="text" ></input>) || <input className="input-category" value={inputbox} disabled></input> }
                <select className="selectbox" value={inputbox} onChange={CheckText}>
                    <option value="" disabled>선택해주세요</option>
                    <option value="마스크 미착용">마스크 미착용</option>
                    <option value="에어컨,히터">에어컨,히터</option>
                    <option value="잡상인">잡상인</option>
                    <option value="애완동물">애완동물</option>
                    <option value="other">직접입력</option>
                </select>
            </div>
            <div className="subway-number">
                <span className="categoty-claim">열차번호: </span>
                <input className="number-input" type="text" placeholder="번호를 입력해주세요."></input>
            </div>
            <div className="content d-flex justify-content-start">
                <span className="categoty-claim mr-1">신고내용: </span>
                <div>
                    <textarea className="claim-content" type="text" placeholder="내용을 입력해주세요."></textarea>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
                <Button className="mr-3" variant="contained" color="secondary">취소</Button>
                <Button variant="contained" color="primary">신고하기</Button>
            </div>
            
        </div>
        );
    }

export default Claim;