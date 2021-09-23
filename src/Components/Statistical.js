import React, { Component } from 'react'
import { revenuebymonth, revenuebyproduct } from '../Service'
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as dayjs from 'dayjs'

class Statistical extends Component {
    constructor() {
        super()
        this.state = {
            chartRevenueByMonth: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Monthly revenue chart'
                },
                xAxis: {
                    categories: [],
                    crosshair: true
                },
                credits: {
                    enabled: false,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Money ($)'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} $</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Viet Nam',
                    data: [],
                    color: "#ff4757"
                }]
            },
            chartProduct: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Revenue by type product'
                },
                subtitle: {

                },
                credits: {
                    enabled: false,
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Money ($)'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}$'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}$</b><br/>'
                },

                series: [
                    {
                        name: " ",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Shirt",
                                y: 0,
                            },
                            {
                                name: "Trousers",
                                y: 0,
                            },
                            {
                                name: "Shoes",
                                y: 0,
                            },
                            {
                                name: "Handbag",
                                y: 0,
                            },
                            {
                                name: "Belts",
                                y: 0,
                            },
                            {
                                name: "Backpack",
                                y: 0,
                            }
                        ]
                    }
                ]
            },
            chartRate: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Fashion shopping trends'
                },
                credits: {
                    enabled: false,
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Shirt',
                        y: 0
                    }, {
                        name: 'Trousers',
                        y: 0
                    }, {
                        name: 'Shoes',
                        y: 0
                    }, {
                        name: 'Handbag',
                        y: 0
                    }, {
                        name: 'Belt',
                        y: 0
                    }, {
                        name: 'Backpack',
                        y: 0
                    }]
                }]
            },
        }
    }

    componentDidMount() {
        if (localStorage.getItem('username') != 'admin_duc' && localStorage.getItem('iduser') != 1) {
            this.props.history.push('/')
        }

        revenuebymonth().then(res => {
            let arrNewDate = []
            let arrDateTime = []
            let arrRevenuePro = []
            let revenueByMonth = this.state.chartRevenueByMonth
            for (let i = 1; i < 13; i++) {
                let labelTime = i + ""
                if (i < 10) labelTime = 0 + labelTime;
                arrDateTime.push(labelTime);
                arrRevenuePro.push(0)
            }
            // 
            res.data.map(item => {
                let index = parseInt(item.date_payment1)
                arrRevenuePro[index - 1] = item.revenue
            })
            revenueByMonth.series[0].data = arrRevenuePro
            // -------------------------------------

            // 
            arrRevenuePro.map((item, index) => {
                arrNewDate.push(arrDateTime[index])
            })
            revenueByMonth.xAxis.categories = arrNewDate
            // --------------------------------------
            this.setState({ chartRevenueByMonth: revenueByMonth })
            console.log(this.state.chartRevenueByMonth)
        })

        revenuebyproduct().then(res => {
            let chartProduct = this.state.chartProduct
            let chartRate = this.state.chartRate
            res.data.map(item => {
                if (item.type_pr_id == "1") {
                    chartProduct.series[0].data[0].y = (item.revenue)
                    chartRate.series[0].data[0].y = (item.revenue);
                }
                if (item.type_pr_id == "2") {
                    chartProduct.series[0].data[1].y = (item.revenue)
                    chartRate.series[0].data[1].y = (item.revenue);
                }
                if (item.type_pr_id == "3") {
                    chartProduct.series[0].data[2].y = (item.revenue)
                    chartRate.series[0].data[2].y = (item.revenue);
                }
                if (item.type_pr_id == "4") {
                    chartProduct.series[0].data[3].y = (item.revenue)
                    chartRate.series[0].data[3].y = (item.revenue);
                }
                if (item.type_pr_id == "5") {
                    chartProduct.series[0].data[4].y = (item.revenue)
                    chartRate.series[0].data[4].y = (item.revenue);
                }
                if (item.type_pr_id == "6") {
                    chartProduct.series[0].data[5].y = (item.revenue)
                    chartRate.series[0].data[5].y = (item.revenue);
                }
            })
            this.setState({ chartProduct, chartRate })
        })
    }

    render() {
        return (
            <>
                <div style={{ paddingTop: "200px" }}>
                    <div className="">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={this.state.chartRevenueByMonth}
                            updateArgs={[true]}
                            style={{ margin: "20px" }}
                        />
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row" style={{ marginTop: "2em" }}>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="active-border-chart">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.chartProduct}
                                    updateArgs={[true]}
                                    style={{ margin: "20px" }}
                                />
                            </div>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="active-border-chart">
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    options={this.state.chartRate}
                                    updateArgs={[true]}
                                    style={{ margin: "20px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Statistical
