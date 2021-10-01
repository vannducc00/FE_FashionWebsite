import React, { Component } from 'react'
import { revenuebymonth, revenuebyproduct } from '../Service'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

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
        if (localStorage.getItem('username') !== 'admin_duc' && localStorage.getItem('iduser') !== 1) {
            this.props.history.push('/')
        }

        revenuebymonth().then(res => {
            let arrNewDate = []
            let arrDateTime = []
            let arrRevenuePro = []
            let chartRevenueByMonth = this.state.chartRevenueByMonth
            for (let i = 1; i < 13; i++) {
                let labelTime = i + ""
                if (i < 10) labelTime = 0 + labelTime
                arrDateTime.push(labelTime);
                arrRevenuePro.push(0)
            }
            // 
            res.data.forEach(item => {
                let index = parseInt(item.date_payment1)
                arrRevenuePro[index - 1] = item.revenue
            })
            chartRevenueByMonth.series[0].data = arrRevenuePro
            // -------------------------------------

            // 
            arrRevenuePro.forEach((item, index) => {
                arrNewDate.push(arrDateTime[index])
            })
            chartRevenueByMonth.xAxis.categories = arrNewDate
            // --------------------------------------
            this.setState({ chartRevenueByMonth })
        })

        revenuebyproduct().then(res => {
            let chartProduct = this.state.chartProduct
            let chartRate = this.state.chartRate
            let seriesPro = chartProduct.series[0]
            let seriesRate = chartRate.series[0]
            res.data.forEach(item => {
                if (item.type_pr_id === 1) {
                    seriesPro.data[0].y = (item.revenue)
                    seriesRate.data[0].y = (item.revenue);
                }
                if (item.type_pr_id === 2) {
                    seriesPro.data[1].y = (item.revenue)
                    seriesRate.data[1].y = (item.revenue);
                }
                if (item.type_pr_id === 3) {
                    seriesPro.data[2].y = (item.revenue)
                    seriesRate.data[2].y = (item.revenue);
                }
                if (item.type_pr_id === 4) {
                    seriesPro.data[3].y = (item.revenue)
                    seriesRate.data[3].y = (item.revenue);
                }
                if (item.type_pr_id === 5) {
                    seriesPro.data[4].y = (item.revenue)
                    seriesRate.data[4].y = (item.revenue);
                }
                if (item.type_pr_id === 6) {
                    seriesPro.data[5].y = (item.revenue)
                    seriesRate.data[5].y = (item.revenue);
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
