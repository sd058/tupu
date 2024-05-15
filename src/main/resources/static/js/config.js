var firstLine = {
    color: '#a0c8ee',
    width: 2
}
var secondLine = {
    color: 'rgba(160,200,238,.3)',
    width: 2
}

//echarts初始化配置
var option = {
    title: {
        text: '',
        top: '5%',
        left: '1%',
        textStyle: {
            color: '#fff',
            fontSize: '24'
        },
        overflow: 'truncate'
    },
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'force',
            symbolSize: 50,
            roam: true,
            draggable: true,
            cursor: 'pointer',
            emphasis: {
                focus: 'adjacency'
            },
            label: {
                show: true,
                position: 'bottom',
                color: '#fff',
                fontSize: 16,
                formatter: function (params) {
                    if (params.name.indexOf(',') != -1) {
                        params.name = params.name.split(',')[0]
                    }
                    if (params.name.length > 15) {
                        return params.name.substring(0, 2) + '...' + params.name.substring(params.name.length - 3, params.name.length);
                    } else {
                        return params.name;
                    }
                }
            },
            force: {
                repulsion: 3000,
                edgeLength: [10, 100],
                friction: 0.1,
                gravity: 0.1,
                initLayout: "circular"
            },
            edgeSymbol: ['circle', 'circle'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                fontSize: 20
            },
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#a6cfec' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#648cff' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
                borderColor: '#79adff',
                borderWidth: 2
            },
            data: [],
			
            links:[],
        }
    ]
}
var chart = echarts.init(document.getElementById('kg'));

var shuxingAll = {};

$.ajax({
    url: "http://localhost:8080/city/all",
    method: "GET",
    dataType: "json",
    success: function(result) {
        // 成功获取数据后的处理
		var result1 = JSON.stringify(result)
        for (let i = 0; i < result.length; i++) {
			shuxingAll[i] = {
				finfo: result[i].finfo,
				sinfo: result[i].sinfo
			}
			//console.log(shuxingAll)
        }
        
    },
    error: function(xhr, status, error) {
        // 获取数据失败时的处理
        console.error("Error fetching data:", error); // 输出错误信息到控制台
        alert("Failed to fetch data. Please try again later."); // 弹出提示框通知用户
    }
});
