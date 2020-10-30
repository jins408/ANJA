import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    root: {
      fontWeight: "bold",
      marginTop: "1rem",
    },
    firstline:{
        color: "#283593",
    },
    secondline:{
        color:"#4caf50"
    },
    thirdline:{
        color: "#ef6c00"
    },
    fourthline:{
        color:"#2196f3"
    },
    fifthline:{
        color:"#7e57c2"
    },
    sixthline:{
        color:"#B8860B"
    },
    seventhline:{
        color:"#556B2F"
    },
    eighthline:{
        color:"#FF1493"
    },
    ninthline:{
        color:"#DAA520"
    },
    gyeongchun:{
        color:"#7CFC00"
    },
    gyeonguicenter:{
        color:"#48D1CC"
    },
    airport:{
        color:"#1E90FF"
    },
    shinbundang:{
        color:"#FF4500"
    },
    inchone:{
        color:"#87CEFA"
    },
    wuyihsin:{
        color:"#6B8E23"
    },
    suinbundang:{
        color:"#000000"
    }
}));


const Alarm = () =>{
    const classes = useStyles();

    return(
            <div>
                <h6 className={classes.root}>지하철 호선</h6>
                <Button className={classes.firstline} variant="outlined" size="large" >1호선</Button>
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
                <Button className={classes.suinbundang} variant="outlined" size="large">수인분당선</Button>
            </div>
        );
    }

export default Alarm;