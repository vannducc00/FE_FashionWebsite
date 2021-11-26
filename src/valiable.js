// chart revenue by month 
export const dataRevenueByMonth = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Doanh thu sản phẩm theo tháng'
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
}

// chart product
export const dataByProduct = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Doanh thu theo từng sản phẩm'
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
                    name: "Áo choàng",
                    y: 0,
                },
                {
                    name: "Áo",
                    y: 0,
                },
                {
                    name: "Quần",
                    y: 0,
                },
                {
                    name: "Giày",
                    y: 0,
                },
                {
                    name: "Túi xách",
                    y: 0,
                },
                {
                    name: "Balo",
                    y: 0,
                },
                {
                    name: "Jean",
                    y: 0,
                },
            ]
        }
    ]
}

// chart Rate
export const dataByRate = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Xu hướng mua sắm sản phẩm'
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
            name: "Áo choàng",
            y: 0,
        },
        {
            name: "Áo",
            y: 0,
        },
        {
            name: "Quần",
            y: 0,
        },
        {
            name: "Giày",
            y: 0,
        },
        {
            name: "Túi xách",
            y: 0,
        },
        {
            name: "Balo",
            y: 0,
        },
        {
            name: "Jean",
            y: 0,
        },]
    }]
}