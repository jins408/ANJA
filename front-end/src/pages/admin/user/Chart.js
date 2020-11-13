import React, { Component, Fragment, useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = (props) => {


        const [series, setSeries] = useState([['0시',1],['1시',1],[],[],[],[],[],[],[],[],[],[]]);
        const options = (()=>{
            return {
                chart: {
                    type: 'scatter'		// bar차트. 아무 설정이 없으면 line chart가 된다.
                },
                title: {
                    text: props.data+' 시간별 열차 승객'
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    type: 'column'
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            format: "<b>{point.y}</b>",
                        }
                    }
                },
                series: [{ name: "평균 승객수", data: series }]
            }
        })
        
        const checkEver = (()=>{
             // 시간별 열차 인원 수 평균
           window.db.collection("chart").doc('01').collection("data").get()
           .then((snapshot) =>{
               var temp = [[],[],[],[],[],[],[],[],[],[],[],[]]
               snapshot.forEach((doc) =>{
                   console.log(doc.data())
                   console.log(doc.data().ssid*1)
                   temp[doc.data().timeHour*1] = [doc.data().timeHour+'시',doc.data().people]
                   console.log(temp)
               })
               setSeries(temp)
           });
        })
          
   

        useEffect(()=>{
            checkEver()
            options()
            return () => {
              };
        },[props.data])
        

    

    return (
        <Fragment>
            <HighchartsReact highcharts={Highcharts} options={options()} />
        </Fragment>
    );
    
}
export default Chart;