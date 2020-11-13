import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Chart extends Component {
    render() {
        // const series2 = this.props.data;    //App.js에서 데이터를 보내줄 예정
        const series2 = [['1시',2],['3시',4]];
        const options = {
            chart: {
                type: 'scatter'		// bar차트. 아무 설정이 없으면 line chart가 된다.
            },
            title: {
                text: 'My first bar chart'
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'category'
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
            series: [{ name: "data", data: series2 }]

        }
        return (
            <Fragment>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Fragment>
        );
    }
}
export default Chart;