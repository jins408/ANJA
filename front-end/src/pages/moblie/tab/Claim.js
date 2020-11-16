import React, { useState } from 'react';
import Button from '@material-ui/core/Button';


import '../../../css/claim.css'

import swal from 'sweetalert';
import axios from 'axios'

const baseURL = 'https://k3b101.p.ssafy.io'

const Claim = () =>{
    const [writer, setWriter] = useState(false);
    const [category, setCategory] = useState('');
    const [inputbox, setInputbox] = useState('');
    const [content, setContent] = useState('');
    const [trainnum, setTrainnum ] = useState('');

    const Claimcontent = e =>{
        // // console.log(e.target.value.length)
        setContent(e.target.value)
        if(e.target.value.length > 50){
            setContent(content)
            return
        }
    }

    const maxLengthCheck = (object) => {
        // // console.log(object.target.value.length)
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
        setTrainnum(object.target.value)
    }

    const setcategoryText = e => {
        setCategory(e.target.value)
    }

    const CheckText = (e) => {
        if(e.target.value === "기타"){
            setWriter(true)
            setInputbox(e.target.value)
            return setCategory()
        }
        setWriter(false)
        setCategory('')
        setInputbox(e.target.value)
    }

    const goclaim = () =>{
        if(category !== ''){
            console.log(0, category, inputbox)
            axios.post(`${baseURL}/api/reports`,{
                category: category,
                id: trainnum,
                contents: content
            }).then((res) =>{
                // console.log(res)
                swal("신고되었습니다!", {
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                  });
                oncancle()
            })
            .catch((error) => {
                // console.log(error)
            })
        }else{
            console.log(1, category, inputbox)
            axios.post(`${baseURL}/api/reports`,{
                category: inputbox,
                id: trainnum,
                contents: content
            }).then((res) =>{
                // console.log(res)
                swal("신고되었습니다!", {
                    icon: "success",
                    buttons: false,
                    timer: 1000,
                  });
                oncancle()
            })
            .catch((error) => {
                // console.log(error)
            })
        }

    }

    const oncancle = () =>{
        setCategory('')
        setInputbox('')
        setTrainnum('')
        setContent('')
    }
      
    return(          
        
        <div >
            {/* <div>
            <h2 className="title-claim">신고</h2>
            </div> */}
            <div className="claim-form">
                <p className="categoty-claim">신고유형</p>
                {(writer && <input className="input-category" value={category || ''} onChange={setcategoryText} type="text" ></input>) || <input className="input-category" value={inputbox} disabled></input> }
                <select className="selectbox" value={inputbox} onChange={CheckText}>
                    <option value="" disabled>선택해주세요</option>
                    <option value="마스크 미착용">마스크 미착용</option>
                    <option value="에어컨,히터">에어컨,히터</option>
                    <option value="잡상인">잡상인</option>
                    <option value="애완동물">애완동물</option>
                    <option value="기타">직접입력</option>
                </select>
            </div>
            <div className="subway-number">
                <p className="categoty-claim">열차번호 </p>
                <input className="number-input" value={trainnum || ''} maxLength = "6" onChange={maxLengthCheck} type="number" placeholder="번호를 입력해주세요."></input>
            </div>
            <div className="mt-3">
                <p className="categoty-claim mr-1">신고내용 </p>
                <div className="subway-claim">
                    <textarea className="claim-content" value={content} onChange={Claimcontent} type="text" placeholder="내용을 입력해주세요."></textarea>
                    <p className="textcount">글자수50자 이하</p>
                </div>
            </div>
            <div className="d-flex justify-content-center ">
                <Button className="mr-3" variant="contained" color="secondary" onClick={oncancle}>취소</Button>
                <Button variant="contained" color="primary" onClick={goclaim}>신고하기</Button>
            </div>
            
        </div>
        );
    }

export default Claim;