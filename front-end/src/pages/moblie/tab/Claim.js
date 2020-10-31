import React, { useState } from 'react';

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
        
        <div>
            <h3 className="text-center">신고</h3>
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
        );
    }

export default Claim;