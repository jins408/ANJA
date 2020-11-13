import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
// import TrainIcon from '@material-ui/icons/Train';
import ForwardIcon from '@material-ui/icons/Forward';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import TrainIcon from '../../../images/train_885831.png'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import axios from 'axios'

import '../../../css/selectroute.css'

const useStyles = makeStyles(() => ({
    good: {
        width:'80px !important',
        height: '80px !important',
        margin:'0.5em',
        marginLeft: '2rem',
        backgroundColor: '#6be96b69',
        borderRadius: '50%'
    },
    soso: {
        width:'80px !important',
        height: '80px !important',
        margin:'0.5em',
        marginLeft: '2rem',
        backgroundColor: '#f8f82a85',
        borderRadius: '50%'
    },
    bad: {
        width:'80px !important',
        height: '80px !important',
        margin:'0.5em',
        marginLeft: '2rem',
        backgroundColor: '#ff0000a3',
        borderRadius: '50%'
    },
    arrow:{
        marginTop:'0.3em',
        marginLeft:'0.5em',
        fontSize: '0.8rem'
    },
    font:{
        fontSize: '1.3rem'
    },
    dot1:{
        color: '#6be96b69'
    },
    dot2:{
        color: '#f8f82a85'
    },
    dot3:{
        color: '#ff0000a3'
    },
    trainnow: {
        color: '#f50057',
        fontSize: '0.875rem',
        marginBottom: '6px',
    },
}));


const SelectRoute = ({ match }, props) => {
    const classes = useStyles();
    const [star, setStar] = useState(false);
    const [id, setId] = useState(0)
    const [traininfo, setTraininfo] = useState();
    const [sinfo, setSinfo] = useState();
    const [showtrain, setShowtrain] = useState(false);
    const [showdetail1, setShowdetail1] = useState(false);
    const [showdetail2, setShowdetail2] = useState(false);
    const [chairs, setChairs] = useState([]);
    const [rechairs, setRechairs] = useState([]);
    const [line, setLine] = useState([]);
    const [station, setStation] = useState([]);
    const [transfer, setTransfer] = useState([]);
    const [minline, setMinline] = useState([]);
    const [minstation, setMinstation] = useState([]);
    const [mintransfer, setMintransfer] = useState([]);
    const [arrive, setArrive] = useState([]);
    var [nextid, setNextid] = useState(0)


    const start = match.params.start
    const end = match.params.end
    

    useEffect(() => {
        const arr = []
        axios.get(`http://127.0.0.1:8080/api/subways/estimate?from=${start}&to=${end}`)
            .then((res) => {
                // console.log(res.data.data)
                setTraininfo(res.data.data)
                setStation(res.data.data['최단거리'].transLines.station)
                setLine(res.data.data['최단거리'].transLines.line)
                setMinstation(res.data.data['최소환승'].transLines.station)
                setMinline(res.data.data['최소환승'].transLines.line)
            }).catch((err) => {
                console.log(err)
            })
        axios.get(`https://k3b101.p.ssafy.io/api/subways/approach?station=${start}`)
            .then((res) => {
                // console.log(res.data.data)
                setSinfo(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        getchairs()
    }, [start, end])

    useEffect(()=>{
        const arr = []
        if(sinfo && traininfo){
            for(let i=0; i<sinfo.length; i++){
                if(sinfo[i].statnId === traininfo['최단거리'].shtStatnId.split(',')[0]){
                    arr.push(sinfo[i])
                }
            }
            setArrive(arr)
        }
    },[sinfo,traininfo])

    useEffect(() => {
        const checkid = []
        const checknextid = [0]
        for (let i = 0; i < localStorage.length; i++) {
            var getvalue = String(localStorage.getItem(localStorage.key(i))).split(',')
            if (getvalue[0] === start && getvalue[1] === end) {
                checkid.push(localStorage.key(i))
            }
            if (Number(checknextid[0]) < localStorage.key(i)) {
                checknextid.pop()
                checknextid.push(localStorage.key(i))
            }
        }
        setId(checkid[0])
        setNextid(Number(checknextid[0]))
        if (checkid.length) {
            setStar(true)

        }
    }, [star, start, end])

    useEffect(()=>{
        if(station && line){
            const arr = []
            for(let i=1; i < line.length; i++){
                arr.push(station[i]+"("+line[i]+")"+" ")
            }
            setTransfer(arr)
        }
        if(minstation && minline){
            const arr = []
            for(let i=1;i < minline.length; i++){
                arr.push(minstation[i]+"("+minline[i]+")"+" ")
            }
            setMintransfer(arr)
        }
    },[line, station, minline, minstation])


    const getchairs = (()=>{
        const arr = []
        window.db.collection("passengers").doc("01").collection("messages").get
        ().then(snapshot =>{
                setChairs(snapshot.docs.map(doc=>doc.data()))
        })
        window.db.collection("passengers").doc("01").collection("messages").orderBy("seat","desc").get
        ().then(snapshot =>{
                setRechairs(snapshot.docs.map(doc=>doc.data()))
        })
        setChairs(arr)
    })

    const order = chairs.map((chair)=>
    <div className="d-flex justify-content-start mb-3 chairdiv" key={chair.ssid}>
        {(chair.seat >= 30 && <img src={TrainIcon} alt="원활" className={classes.good}/>) || 
        (chair.seat < 30 && chair.seat >= 6 && <img src={TrainIcon} alt="보통" className={classes.soso}/>) ||
        (chair.seat <= 5 && <img src={TrainIcon} alt="혼잡" className={classes.bad}/>)}
        <div className="chairs">
            <p className="selectroute_chair">열차번호 : {chair.id}</p> 
            <p className="selectroute_chair">남은 좌석 수 : {chair.seat}</p>
        </div>
    </div>
    ) 

    const recommend = rechairs.map((rechair)=>
        <div className="d-flex justify-content-start mb-3 chairdiv" key={rechair.ssid}>
            {(rechair.seat >= 30 && <img src={TrainIcon} alt="원활" className={classes.good}/>) || 
            (rechair.seat < 30 && rechair.seat >= 6 && <img src={TrainIcon} alt="보통" className={classes.soso}/>) ||
            (rechair.seat <= 5 && <img src={TrainIcon} alt="혼잡" className={classes.bad}/>)}
            <div className="chairs">
                <p className="selectroute_chair">열차번호 : {rechair.id}</p> 
                <p className="selectroute_chair">남은 좌석 수 : {rechair.seat}</p>
            </div>
        </div>
    )

    const arvmsg = arrive.map((arv, index)=>
        <p className="mb-0" key={index}>
            <span>{arv.trainLineNm} : </span>
            {(arv.arvlCd === "0" || arv.arvlCd === "1" || arv.arvlCd === "2" || arv.arvlCd === "3" || arv.arvlCd === "4" || arv.arvlCd === "5")
            && <span>{arv.arvlMsg2}</span>
            }
            {arv.arvlCd === "99" 
            && <span>
                {arv.arvlMsg2[3] !== ']' && <span>
                    {arv.arvlMsg2[1]}{arv.arvlMsg2.slice(3)}</span>
                }
                {arv.arvlMsg2[3] === ']' && <span>
                    {arv.arvlMsg2.slice(1,3)}{arv.arvlMsg2.slice(4)}</span>
                }
            </span>
            }
            {/* {arv.arvlMsg2}{arv.arvlMsg2.slice(3)} */}
        </p>
    )


    const starHandler = () => {
        if (star) {
            setStar(false)
            localStorage.removeItem(id)
        } else {
            setStar(true)
            const addfavname = {
                id: ++nextid,
                content: [start, end]
            };
            localStorage.setItem(addfavname.id, addfavname.content)
        }
    }
    


    return (
        <div>
            <div className="selectroute_box">
                {traininfo && 
                <div className="d-flex justify-content-end mr-2 mt-2">
                    <p className="selectroute_location mb-0">{start}({traininfo['최단거리'].transLines.line[0]}) <ForwardIcon className="mb-1" /> {end}</p>
                    {star ? <StarIcon className="selectroute_star" onClick={starHandler} /> : <StarBorderIcon className="selectroute_star" onClick={starHandler} />}
                </div>}
                {line && 
                <div className="d-flex justify-content-end">
                    <Button href={`/subwaytime/${start}/${line[0]}`}  color="primary" className="timebtn">TIME</Button>
                </div>}

                <div className="ml-3 mb-3">
                    <p className={classes.trainnow}>현재 위치</p>
                    {arvmsg}
                </div>
                

                {traininfo && 
                <div className="mx-auto mb-3 selectroute_updown">
                <Button className="ml-2" onClick={()=>setShowdetail1(!showdetail1)} color="secondary">최단시간</Button>
                    <p className="ml-3">소요시간 : {traininfo['최단거리'].shtTravelTm}분({traininfo['최단거리'].shtTransferCnt}회 환승)</p>
                    {traininfo['최단거리'].shtTransferCnt !== "0" && 
                    <p className="ml-3">
                        환승구역 : {transfer}
                    </p>
                    }
                    {showdetail1 && 
                    <div className="ml-3">
                        {traininfo['최단거리'].shtStatnNm.split(',').map((shttrain, index)=>
                        <span key={index}>
                            {shttrain !== '' && index !== traininfo['최단거리'].shtStatnNm.split(',').length-2 && <span>{shttrain} <ArrowRightAltIcon className={classes.arrow}/></span>}
                            {index === traininfo['최단거리'].shtStatnNm.split(',').length-2 && <span>{shttrain} </span>}
                        </span>
                    )}({traininfo['최단거리'].shtStatnCnt}개)
                    </div>}
                <Button className="ml-2" onClick={()=>setShowdetail2(!showdetail2)} color="secondary">최소환승</Button>
                    <p className="ml-3">소요시간 : {traininfo['최소환승'].minTravelTm}분({traininfo['최소환승'].minTransferCnt}회 환승)</p>
                    {traininfo['최소환승'].minTransferCnt !== "0" && 
                    <p className="ml-3">
                        환승구역 : {mintransfer}
                    </p>}
                    {showdetail2 && 
                    <div className="ml-3">
                        {traininfo['최소환승'].minStatnNm.split(',').map((mintrain, index)=>
                        <span key={index}>
                            {mintrain !== '' && index !== traininfo['최소환승'].minStatnNm.split(',').length-2 && <span>{mintrain} <ArrowRightAltIcon className={classes.arrow}/></span>}
                            {index === traininfo['최소환승'].minStatnNm.split(',').length-2 && <span>{mintrain}</span>}
                        </span>
                    )}({traininfo['최소환승'].minStatnCnt}개)
                    </div>}
                </div>}
            </div>
            <div className="selectroute_box2">
            <div className="d-flex justify-content-end">
                    <p><FiberManualRecordIcon className={classes.dot1}/>원활 <FiberManualRecordIcon className={classes.dot2}/>보통 <FiberManualRecordIcon className={classes.dot3}/>혼잡</p>
                </div>
                <div className="d-flex justify-content-between pb-3">
                    <div>
                        <span className={classes.font}>실시간 좌석 현황</span>
                    </div>
                    <div className="d-flex justify-content-end pt-1">
                        {showtrain ? 
                            <Button className="p-0" onClick={() => setShowtrain(false)}>추천</Button> : 
                            <Button className="p-0" color="secondary" onClick={() => setShowtrain(false)}>추천</Button>
                        }
                        {showtrain ? 
                        <Button className="p-0" color="secondary" onClick={() => setShowtrain(true)}>순서</Button> : 
                        <Button className="p-0" onClick={() => setShowtrain(true)}>순서</Button>
                        }
                    </div>
                </div>
                
                {showtrain ? <div>{order}<br/></div> : <div> {recommend}<br/></div>}
            </div>
        </div>
    )
}

export default SelectRoute