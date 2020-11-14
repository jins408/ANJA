import React, { Component, Fragment, useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";


const Chart = (props) => {

        const [series, setSeries] = useState([['0시',1],['1시',1],[],[],[],[],[],[],[],[],[],[]]);
        const options = (()=>{
            return {
                chart: {
                    type: props.chartType		// bar차트. 아무 설정이 없으면 line chart가 된다.
                },
                title: {
                    text: props.data+' '+props.chartName
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
                series: [{ name: props.chartName, data: series }]
            }
        })
        
        const checkEver = (()=>{
             // 시간별 열차 인원 수 평균
           window.db.collection("chart").doc('01').collection("data").get()
           .then((snapshot) =>{
               var temp = [["1시",5],["2시",3],["3시",0],["4시",0],["5시",0],["6시",0],["7시",34],["8시",43],["9시",21],["10시",9],["11시",12],["12시",13],["13시",34],["14시",23],["15시",15],["16시",15],["17시",52],["18시",48],["19시",32],["20시",31],["21시",28],["22시",22],["23시",20],["24시",14]]
               snapshot.forEach((doc) =>{
                    temp[doc.data().timeHour*1] = [doc.data().timeHour+'시',doc.data().people]
               })
                   setSeries(temp)
           });
        })

        const checkChart = (()=>{
            window.db.collection("chart2").doc('01').collection("data").get()
           .then((snapshot) =>{
               var temp =[['nomask',0],['pet',0],['smoke',0],['bicycle',0],['miscellaneous',0]]
               snapshot.forEach((doc) =>{
                   // console.log('data',doc.data())
                   temp[0][1] += doc.data().nomask
                   temp[1][1] += doc.data().pet
                   temp[2][1] += doc.data().smoke
                   temp[3][1] += doc.data().bicycle
                   temp[4][1] += doc.data().micellaneous
               })
                setSeries(temp)
           });
        })
          
   

        useEffect(()=>{
            if(props.chartType === 'bar'){
                checkEver()
            }
            else if(props.chartType === 'pie'){
                checkChart()
            }
            options()
            return () => {
              };
        },[props.chartType])
        

    

    return (
        <div>
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options()} />
            </Fragment>
        </div>
    );
    
}
export default Chart;