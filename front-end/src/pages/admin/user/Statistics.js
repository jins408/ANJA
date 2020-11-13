import React, { useState, useEffect } from 'react';
import Chart from './Chart'


const Statistics = () => {
    const [date, setDate] = useState(()=>{
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDay();
        return year+'-'+month+'-'+day
    });
    
    useEffect(()=>{
        return () => {
          };
      },[])

// 날자 계산해서(ex: 2020-11-14) Chart로 보내주기
    return (
        <div>
            <Chart data={date}></Chart>
        </div>
    );
}
export default Statistics;