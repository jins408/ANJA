import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Timeline from '@material-ui/lab/Timeline';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import '../../../css/alarm.css' 

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


const Alarm = () =>{
    const classes = useStyles();
    const [selectline, setSelectline] = useState(false);

    const changline = () =>{
        if (!selectline){
            setSelectline(true)
        }else{
            setSelectline(false)
        }
    }
    console.log(selectline)

    return(
            <div>
                <h6 className={classes.root}>지하철 호선</h6>
                <Button onClick={changline} className={classes.firstline} variant="outlined" size="large" >1호선</Button>
                <Button className={classes.secondline} variant="outlined" size="large">2호선</Button>
                <Button className={classes.thirdline} variant="outlined" size="large">3호선</Button>
                <Button className={classes.fourthline} variant="outlined" size="large">4호선</Button>
                <Button className={classes.fifthline} variant="outlined" size="large">5호선</Button>
                <Button className={classes.sixthline} variant="outlined" size="large">6호선</Button>
                <Button className={classes.seventhline} variant="outlined" size="large">7호선</Button>
                <Button className={classes.eighthline} variant="outlined" size="large">8호선</Button>
                <Button className={classes.ninthline} variant="outlined" size="large">9호선</Button>
                <Button className={classes.gyeongchun} variant="outlined" size="large">경춘</Button>
                <Button className={classes.gyeonguicenter} variant="outlined" size="large">경의중앙</Button>
                <Button className={classes.airport} variant="outlined" size="large">공항</Button>
                <Button className={classes.shinbundang} variant="outlined" size="large">신분당</Button>
                <Button className={classes.inchone} variant="outlined" size="large">인천</Button>
                <Button className={classes.wuyihsin} variant="outlined" size="large">우이신설</Button>
                <Button className={classes.suinbundang} variant="outlined" size="large">수인분당</Button>

                <h6 className={classes.root}>지하철 알림 정보</h6>
                <hr className="mb-1"></hr>

            
            {selectline && <div>         
                <Timeline align="left" className="timeline">           
                <div className="timetitle d-flex justify-content-left ">
                <TimelineSeparator>
                    <TimelineDot>
                        <FastfoodIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>              
                    <Typography  className={classes.timetime} variant="body2" color="textSecondary">
                        9:30 am
                    </Typography>
            
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography className="title-h6" variant="h6" component="h1">
                        Eat
                        </Typography>
                        <Typography>Because you need strength</Typography>
                    </Paper>
                    </TimelineContent>
                </div>
          
                <div className="timetitle d-flex justify-content-left ">
                <TimelineSeparator>
                    <TimelineDot color="primary">
                        <LaptopMacIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>                       
                    <Typography className={classes.timetime} variant="body2" color="textSecondary">
                        10:00 am
                    </Typography>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography className="title-h6" variant="h6" component="h1">
                        Code
                        </Typography>
                        <Typography>Because it&apos;s awesome!</Typography>
                    </Paper>
                    </TimelineContent>
                </div>           
                <div className="timetitle d-flex justify-content-left ">
                    <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined">
                        <HotelIcon />
                    </TimelineDot>
                    <TimelineConnector className={classes.secondaryTail} />
                    </TimelineSeparator>
                    <Typography className={classes.timetime} variant="body2" color="textSecondary">
                        9:30 am
                    </Typography>    
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography className="title-h6" variant="h6" component="h1">
                        Sleep
                        </Typography>
                        <Typography>Because you need rest</Typography>
                    </Paper>
                    </TimelineContent>
                </div>
                
                <div  className="timetitle d-flex justify-content-left ">
                    <TimelineSeparator>
                    <TimelineDot color="secondary">
                        <RepeatIcon />
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>   
                    <Typography className={classes.timetime} variant="body2" color="textSecondary">
                        9:30 am
                    </Typography> 
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography className="title-h6" variant="h6" component="h1">
                        Repeat
                        </Typography>
                        <Typography>Because this is the life you love!</Typography>
                    </Paper>
                    </TimelineContent>
                </div>
                </Timeline>
            </div>}
            </div>
        );
    }

export default Alarm;