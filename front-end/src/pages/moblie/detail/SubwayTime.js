import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from 'axios';

import SubwayTimeRadio from '../../../components/SubwayTimeRadio'
import SubwayTimeTable from '../../../components/SubwayTimeTable'

const useStyles = makeStyles({
    subwaytime_header: {
        textAlign: 'center',
        fontSize: '3rem'
    },
    firstline:{
        color: "#283593",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #283593 !important'
    },
    secondline:{
        color:"#4caf50",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #4caf50 !important'
    },
    thirdline:{
        color: "#ef6c00",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #ef6c00 !important'
    },
    fourthline:{
        color:"#2196f3",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #2196f3 !important'
    },
    fifthline:{
        color:"#7e57c2",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #7e57c2 !important'
    },
    sixthline:{
        color:"#B8860B",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #B8860B !important'
    },
    seventhline:{
        color:"#556B2F",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #556B2F !important'
    },
    eighthline:{
        color:"#FF1493",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #FF1493 !important'
    },
    ninthline:{
        color:"#DAA520",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #DAA520 !important'
    },
    gyeongchun:{
        color:"#7CFC00",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #7CFC00 !important'
    },
    gyeonguicenter:{
        color:"#48D1CC",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #48D1CC !important'
    },
    airport:{
        color:"#1E90FF",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #1E90FF !important'
    },
    shinbundang:{
        color:"#FF4500",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #FF4500 !important'
    },
    inchone:{
        color:"#87CEFA",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #87CEFA !important'
    },
    wuyihsin:{
        color:"#6B8E23",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #6B8E23 !important'
    },
    suinbundang:{
        color:"#000000",
        padding: '3px 0',
        marginRight: '5px',
        border: '1px solid #000000 !important'
    },
});


const SubwayTime = ({match}) =>{
    const classes = useStyles();
    const [radio, setRadio] = useState('1');
    const [upwardlist, setUpwardlist] = useState([]);
    const [downwardlist, setDownwardlist] = useState([]);
    const [line, setLine] = useState(match.params.line);
    const [allline, setAllline] = useState([]);

    const station = match.params.station

    useEffect(()=>{
        axios
            .get(`http://127.0.0.1:8080/api/subways/stationInfo?station=${station}`)
            .then((res)=>{
                // console.log(res.data.data)
                setAllline(res.data.data)
            })
            .catch((err)=>{
                console.log(err)
            })
        axios
            .get(`http://127.0.0.1:8080/api/subways/timetable?station=${station}&line=${line}&day=${radio}`)
            .then((res)=>{
                // console.log(res.data)
                setUpwardlist(res.data.data['상행'])
                setDownwardlist(res.data.data['하행'])
            })
            .catch((err)=>{
                console.log(err)
            })
    },[radio, station, line])

    // console.log(allline)
    const line_button = allline.map((line,index)=>
            // {line==="1호선" && <Button className={classes.subway_line} size="small" variant="outlined" onClick={()=>setLine(line)}>{line}</Button>}
            <span key={index}>
            {line === "1호선" && <Button onClick={()=>setLine(line)} className={classes.firstline} variant="outlined" size="small" >{line}</Button>}
            {line === "2호선" && <Button onClick={()=>setLine(line)} className={classes.secondline} variant="outlined" size="small">{line}</Button>}
            {line === "3호선" && <Button onClick={()=>setLine(line)} className={classes.thirdline} variant="outlined" size="small">{line}</Button>}
            {line === "4호선" && <Button onClick={()=>setLine(line)} className={classes.fourthline} variant="outlined" size="small">{line}</Button>}
            {line === "5호선" && <Button onClick={()=>setLine(line)} className={classes.fifthline} variant="outlined" size="small">{line}</Button>}
            {line === "6호선" && <Button onClick={()=>setLine(line)} className={classes.sixthline} variant="outlined" size="small">{line}</Button>}
            {line === "7호선" && <Button onClick={()=>setLine(line)} className={classes.seventhline} variant="outlined" size="small">{line}</Button>}
            {line === "8호선" && <Button onClick={()=>setLine(line)} className={classes.eighthline} variant="outlined" size="small">{line}</Button>}
            {line === "9호선" && <Button onClick={()=>setLine(line)} className={classes.ninthline} variant="outlined" size="small">{line}</Button>}
            {line === "경춘선" && <Button onClick={()=>setLine(line)} className={classes.gyeongchun} variant="outlined" size="small">{line}</Button>}
            {line === "경의중앙선" && <Button onClick={()=>setLine(line)} className={classes.gyeonguicenter} variant="outlined" size="small">{line}</Button>}
            {line === "공항철도" && <Button onClick={()=>setLine(line)} className={classes.airport} variant="outlined" size="small">{line}</Button>}
            {line === "신분당선" && <Button onClick={()=>setLine(line)} className={classes.shinbundang} variant="outlined" size="small">{line}</Button>}
            {line === "인천" && <Button onClick={()=>setLine(line)} className={classes.inchone} variant="outlined" size="small">{line}</Button>}
            {line === "우이신설" && <Button onClick={()=>setLine(line)} className={classes.wuyihsin} variant="outlined" size="small">{line}</Button>}
            {line === "수이분당" && <Button onClick={()=>setLine(line)} className={classes.suinbundang} variant="outlined" size="small">{line}</Button>}
            </span>
    )


    return (
        <div>
            <div className="ml-2 mb-3">
                {line_button}
            </div>
            <p className={classes.subwaytime_header}>{match.params.station}({line})</p>
            <div className="d-flex justify-content-end">
                <SubwayTimeRadio radio_value={(value) => setRadio(value)}/>
            </div>
            <SubwayTimeTable radio_value={radio} upward={upwardlist} downward={downwardlist} />
            <br />
            <br />
            <br />
            <br />
        </div>
      );
}

export default SubwayTime;