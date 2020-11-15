import React, { useState, useEffect } from 'react';
import Chart from './Chart'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header:{
        padding:'40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    traininfo: {
        width: '750px',
        margin: 'auto'
    },
    vdeio: {
        width: '375px',
        height: '300px',
    },
    maxvdeio: {
        position: 'absolute',
        left: '18%',
        width: '752px',
        height: '600px',
    },
    table: {
        width: '100%'
    },
    tablecon: {
        width: '750px',
        margin: 'auto'
    },
    tableheadback: {
        backgroundColor: 'gray',
    },
    tableheadfont: {
        color: 'white',
        fontSize: '1.2rem'
    },
    workbtn: {
        width: '10rem',
        fontSize: '2rem',
    }

});

const Statistics = () => {
    const classes = useStyles();
    const [date, setDate] = useState(()=>{
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let day = today.getDate();
        return year+'-'+month+'-'+day
    });
    const [chartType, setChartType] = useState('bar')
    const [chartType2, setChartType2] = useState('pie')
    
    useEffect(()=>{
        return () => {
          };
      },[])

// 날자 계산해서(ex: 2020-11-14) Chart로 보내주기
    return (
        <div>
            <h1 className={classes.header}>통계</h1>
            <div>
                <Chart data={date} chartType={chartType} chartName='시간별 열차 승객 평균'></Chart>
            </div>
            <div>
                <Chart data={date} chartType={chartType2} chartName='최근 이상행동 검출 회수'></Chart>
            </div>
        </div>
    );
}
export default Statistics;