import React, { Component, Fragment, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = makeStyles({
    header:{
        padding:'40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
})

const Chart = (props) => {
        const classes = useStyles()

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
               var temp = [[,5],[,3],[,0],[,0],[,0],[,0],[,34],[,43],[,21],[,9],[,12],[,13],[,34],[,23],[,15],[,15],[,52],[,48],[,32],[,31],[,28],[,22],[,20],[,14]]
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
                   console.log('data',doc.data())
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
        },[props.data])
        

    

    return (
        <div>
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options()} />
            </Fragment>
        </div>
    );
    
}
export default Chart;