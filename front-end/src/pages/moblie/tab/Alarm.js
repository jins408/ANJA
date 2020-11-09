import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/lab/Timeline';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';
import DirectionsBikeRoundedIcon from '@material-ui/icons/DirectionsBikeRounded';
import PetsRoundedIcon from '@material-ui/icons/PetsRounded';
import SmokingRoomsRoundedIcon from '@material-ui/icons/SmokingRoomsRounded';
import Moment from 'react-moment';

import '../../../css/alarm.css' 
import 'moment/locale/ko';

const useStyles = makeStyles((theme) => ({
    root: {
      fontWeight: "bold",
      marginTop: "1rem",
    },
    firstline:{
        color: "#283593",
        padding: '7px',
        width: '93px'
    },
    secondline:{
        color:"#4caf50",
        padding: '7px',
        width: '93px'
    },
    thirdline:{
        color: "#ef6c00",
        padding: '7px',
        width: '93px'
    },
    fourthline:{
        color:"#2196f3",
        padding: '7px',
        width: '93px'
    },
    fifthline:{
        color:"#7e57c2",
        padding: '7px',
        width: '93px'
    },
    sixthline:{
        color:"#B8860B",
        padding: '7px',
        width: '93px'
    },
    seventhline:{
        color:"#556B2F",
        padding: '7px',
        width: '93px'
    },
    eighthline:{
        color:"#FF1493",
        padding: '7px',
        width: '93px'
    },
    ninthline:{
        color:"#DAA520",
        padding: '7px',
        width: '93px'
    },
    gyeongchun:{
        color:"#7CFC00",
        padding: '7px',
        width: '93px'
    },
    gyeonguicenter:{
        color:"#48D1CC",
        padding: '7px',
        width: '93px'
    },
    airport:{
        color:"#1E90FF",
        padding: '7px',
        width: '93px'
    },
    shinbundang:{
        color:"#FF4500",
        padding: '7px',
        width: '93px'
    },
    inchone:{
        color:"#87CEFA",
        padding: '7px',
        width: '93px'
    },
    wuyihsin:{
        color:"#6B8E23",
        padding: '7px',
        width: '93px'
    },
    suinbundang:{
        color:"#000000",
        padding: '7px',
        width: '93px'
    },
    paper: {
        padding: '6px 16px',
        width: '200px',
        height: '92px'
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    timetime:{
        width: '100px',
        margin: '15px 0 0 10px'
    },

}));


const Alarm = (props) =>{
    const classes = useStyles();
    const [selectline, setSelectline] = useState('0');
    const [alarmlist, setAlarmlist] = useState([]);

    const changline = (line) =>{
        setSelectline(line)
        props.alarm_line(line)
        props.lastReadTime(timestamp)
    }

    var timestamp = + new Date();
    
    useEffect(()=>{
        getAlarmData(selectline)
        return () => {
          };
    },[selectline])
    
    const getAlarmData = ((line=>{
        window.db.collection("logs").doc(line).collection("messages").orderBy('time','desc').onSnapshot
        (snapshot =>{
                setAlarmlist(snapshot.docs.map(doc=>doc.data()))
            });
        }))
        console.log(alarmlist)

    const listItems = alarmlist.map((alarm ,index) =>
        <div key={index} className="timetitle d-flex justify-content-left ">
            <TimelineSeparator>
                {alarm.category === 'nomask' && <TimelineDot color="secondary">
                   <SentimentDissatisfiedRoundedIcon />  
                </TimelineDot>}  
                {alarm.category === 'pet' && <TimelineDot color="primary" variant="outlined">
                    <PetsRoundedIcon /> 
                </TimelineDot>}
                 {alarm.category === 'bicycle' && <TimelineDot color="primary" >
                    <DirectionsBikeRoundedIcon />
                </TimelineDot> }
                {alarm.category === 'smoke' && <TimelineDot color="secondary" variant="outlined" >
                    <SmokingRoomsRoundedIcon />
                </TimelineDot>}
                <TimelineConnector />
                </TimelineSeparator>              
                 <Typography  className={classes.timetime} variant="body2" color="textSecondary">
                    {/* {(alarm.time.seconds * 1000).valueOf("ko-KR")} */}
                    <Moment fromNow>{(alarm.time.seconds * 1000)}</Moment>
                </Typography>

                <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                <Typography className="title-h6" variant="h6" component="h1">
                        {alarm.sid}번 열차
                    </Typography>
                        <Typography> {alarm.category} 의심 문제 발생 </Typography>
                </Paper>
            </TimelineContent>
        </div>
    
    );

    return(
            <div>
                <h6 className={classes.root}>지하철 호선</h6>
                <Button onClick={()=>changline('01')} className={classes.firstline} variant="outlined" size="large" >1호선</Button>
                <Button onClick={()=>changline('02')} className={classes.secondline} variant="outlined" size="large">2호선</Button>
                <Button onClick={()=>changline('03')} className={classes.thirdline} variant="outlined" size="large">3호선</Button>
                <Button onClick={()=>changline('04')} className={classes.fourthline} variant="outlined" size="large">4호선</Button>
                <Button onClick={()=>changline('05')} className={classes.fifthline} variant="outlined" size="large">5호선</Button>
                <Button onClick={()=>changline('06')} className={classes.sixthline} variant="outlined" size="large">6호선</Button>
                <Button onClick={()=>changline('07')} className={classes.seventhline} variant="outlined" size="large">7호선</Button>
                <Button onClick={()=>changline('08')} className={classes.eighthline} variant="outlined" size="large">8호선</Button>
                <Button onClick={()=>changline('09')} className={classes.ninthline} variant="outlined" size="large">9호선</Button>
                <Button onClick={()=>changline('경춘')} className={classes.gyeongchun} variant="outlined" size="large">경춘</Button>
                <Button onClick={()=>changline('경의중앙')} className={classes.gyeonguicenter} variant="outlined" size="large">경의중앙</Button>
                <Button onClick={()=>changline('공항')} className={classes.airport} variant="outlined" size="large">공항</Button>
                <Button onClick={()=>changline('신분당')} className={classes.shinbundang} variant="outlined" size="large">신분당</Button>
                <Button onClick={()=>changline('인천')} className={classes.inchone} variant="outlined" size="large">인천</Button>
                <Button onClick={()=>changline('우이신설')} className={classes.wuyihsin} variant="outlined" size="large">우이신설</Button>
                <Button onClick={()=>changline('수인분당')} className={classes.suinbundang} variant="outlined" size="large">수인분당</Button>

                <h6 className={classes.root}>지하철 알림 정보</h6>
                <hr className="mb-1"></hr>

            
            {selectline && <div>
                <Timeline align="left" className="timeline">           
                {listItems}
                <div className="timetitle d-flex justify-content-left ">
         
             
                </div>
                </Timeline>
            </div>}
        </div>
        );
    }

export default Alarm;
