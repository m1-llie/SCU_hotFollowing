let Index = {
    init() {
        this.charts = {};
        this.loadData();
        Public.chartsResize(this.charts);
        Public.chartsReDraw(this.charts, null, [
            'ec01_line_tiobe', 'ec06_pie_findSong'
        ], [
            'ec03_barV_timeDistribute', 'ec05_lineBar_timeDistribute', 'ec06_pie_findSong'
        ])
    },
    loadData() {
        this.ec01_line_tiobe();//
        this.ec02_area_accessSource();//
        this.ec03_barV_timeDistribute();//
        this.ec04_pie_computerBroken();//
        this.ec05_lineBar_timeDistribute();//
        this.ec06_pie_findSong();//
    },
    ec01_line_tiobe() {
        let chart = echarts.init($("#ec01_line_tiobe")[0]); //初始化图表，注意命名的规范合理
        this.charts.ec01_line_tiobe = chart; //放入charts对象方便后面的刷新缩放以及其他操作
        chart.setOption(opt_line); // 设置这个类型（折线图）图表的共性
        chart.setOption({
            xAxis: { // 本图表option的个性
                nameLocation: 'start',
                inverse: true,
                data: ['6-12', '6-11', '6-10', '6-09', '6-08', '6-07', '6-06']
            },
            yAxis: { // 本图表option的个性
                nameLocation: 'start',
                min: 0,
                inverse: false
            },
            dataZoom: { // 本图表option的个性
                type: 'inside',
                orient: 'vertical'
            },
            series: [
                {"name": "川大舆情量", data: [74, 92, 85, 115, 88, 90, 84]}, //连接到discussionNum.py
            ].map(item => {
                return $.extend(true, {}, seri_line,// 折线图图表series的共性
                    { // 本图表series的个性
                        symbol:'circle',
                        smooth: false,
                        showSymbol: false,
                    }, item)
            })
        })
    },
    ec02_area_accessSource() {
        let chart = echarts.init($("#ec02_area_accessSource")[0]);
        this.charts.ec02_area_accessSource = chart;
        chart.setOption(opt_line);
        chart.setOption({
            xAxis: {
                data: ['6-06', '6-07', '6-08', '6-09', '6-10', '6-11', '6-12']
            },
            yAxis: {
                name: '指数',
            },
            series: [{
                name: '情感倾向',
                data: [0.72, 0.76, 0.70, 0.81, 0.78, 0.76, 0.80]  //连接到emotion.py
            }].map(item => {
                return $.extend(true, {}, seri_area, {
                    symbol: 'circle',
                }, item)
            })
        });
    },
    ec03_barV_timeDistribute() {
        let chart = echarts.init($("#ec03_barV_timeDistribute")[0]);
        this.charts.ec03_barV_timeDistribute = chart;
        chart.setOption(opt_bar_v);
        chart.setOption({
            xAxis: {
                data: ['6-06', '6-07', '6-08', '6-09', '6-10', '6-11', '6-12']
            },
            yAxis: {
                name: '被讨论次数',
            },
            series: [
                {"name": "“毕业”", data: [30, 39, 47, 21, 37, 50, 37]},
                {"name": "“强基”", data: [37, 42, 20, 54, 30, 37, 33]},
                {"name": "“川大统领”", data: [42, 34, 37, 28, 45, 34, 21]},
                {"name": "“研究生”", data: [33, 36, 28, 35, 32, 26, 41]},
                {"name": "“强基计划”", data: [20, 25, 28, 34, 38, 40, 45]},
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item, {stack: '总时间'})
            })
        })
    },
    ec04_pie_computerBroken() {
        let chart = echarts.init($("#ec04_pie_computerBroken")[0]);
        this.charts.ec04_pie_computerBroken = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            series: [
                {
                    name: "参与用户地域分布",
                    data: [{
                        value: 92,
                        name: '四川'
                    },{
                        value: 45,
                        name: '重庆'
                    }, {
                        value: 20,
                        name: '陕西'
                    }, {
                        value: 19,
                        name: '湖南'
                    },{
                        value: 16,
                        name: '云南'
                    },{
                        value: 12,
                        name: '甘肃'
                    },{
                        value: 8,
                        name: '福建'
                    },{
                        value: 8,
                        name: '江西'
                    },{
                        value: 20,
                        name: '其他'
                    }]
                },
            ].map(item => {
                return $.extend(true, {}, seri_circle, item)
            })
        })
    },
    ec05_lineBar_timeDistribute() {
        let chart = echarts.init($("#ec05_lineBar_timeDistribute")[0]);
        this.charts.ec05_lineBar_timeDistribute = chart;
        chart.setOption(opt_line);
        chart.setOption({
            legend: {
                data: ["顶顶顶", "哎踩了","中立客观"]
            },
            tooltip: {
                formatter: function (param) {
                    return param.map(item => {
                        if (item.seriesName === '补位') {
                            return ''
                        } else {
                            return `${item.seriesName}: ${item.value}<br>`
                        }
                    }).join("").replace(',', '')

                }
            },
            xAxis: {
                boundaryGap: true,
                data: ['6-06', '6-07', '6-08', '6-09', '6-10', '6-11', '6-12']
            },
            yAxis: {
                name: '归一值',
            },
            series: [
                {
                    name: '中立客观',
                    data: [0.22, 0.10, 0.26, 0.27, 0.21, 0.19, 0.14]
                }, {
                    name: '补位',
                    silent: true,
                    itemStyle: {
                        color: c_bg_bar,
                    },
                    barGap: '-100%',
                    data: new Array(7).fill(1)
                }
            ].map(item => {
                return $.extend(true, {}, seri_bar_v, item)
            }).concat([
                {"name": "顶顶顶", data: [0.66, 0.70, 0.58, 0.59, 0.60, 0.66, 0.70]},
                {"name": "哎踩了", data: [0.12, 0.20, 0.16, 0.14, 0.19, 0.15, 0.16]},
            ].map(item => {
                return $.extend(true, {}, seri_line, {
                    symbol: 'emptyCircle'
                }, item)
            }))
        })
    },
    ec06_pie_findSong() {
        let chart = echarts.init($("#ec06_pie_findSong")[0]);
        this.charts.ec06_pie_findSong = chart;
        chart.setOption(opt_pie);
        chart.setOption({
            roseType: 'radius',
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0.3, 1.2]
                }
            },

            series: [
                {
                    name: "参与用户微博注册时长",
                    itemStyle: {
                        normal: {
                            color: colors[0],
                            shadowBlur: 100 * scale,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [{
                        value: 124,
                        name: '2016年及以前'
                    }, {
                        value: 69,
                        name: '2017-2018(含左右)'
                    }, {
                        value: 21,
                        name: '2019年'
                    }, {
                        value: 5,
                        name: '其他'
                    }].sort(function (a, b) {
                        return a.value - b.value;
                    }),
                },
            ].map(item => {
                return $.extend(true, {}, seri_pie, item)
            })
        })
    }
};
Index.init();