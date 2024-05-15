// 回主图按钮
$('.backHome').click(function () {
    chart.clear();
    genRoot()
    genL1()
})
$(document).ready(function() {
    genRoot();
    genL1();
});


//右侧导航栏隐藏显示切换
$('.kgR').click(function () {
    if ($('.kgRight').hasClass('hide')) {
        $('.kgRight').removeClass('hide');
        $('.kgLeft').removeClass('hide');
        $('.kgR').removeClass('hide');
        $('body').removeClass('hide');
    } else {
        $('.kgRight').addClass('hide');
        $('.kgLeft').addClass('hide');
        $('.kgR').addClass('hide');
        $('body').addClass('hide');
    }
    chart.resize();
})

//全局变量
let data = [];
let links = [];

//生成根节点
function genRoot() {
    //根节点0
    data = [{
        name: '河北传统文化知识图谱', 
		symbolSize: 115, 
		level: 0,
		symbol: 'image://img/河北.png'
    }];
    links = [];
}
//生成一级节点（城市）
function genL1() {
    // 通过 AJAX 请求获取地点数据
    $.getJSON("http://localhost:8080/city/all", function (cityAll) {
        // 如果没有获取到数据或者数据为空，直接返回，不执行后续操作
        if (!cityAll || cityAll.length === 0) {
            return;
        }
		// 移除现有的节点和标题
		$(".node-tmp").nextAll().remove();
		$(".child-node-title-tmp").siblings().remove();
		
		for (i = 0; i < cityAll.length; i++){
			var city1 = cityAll[i]				
			var city1 = JSON.stringify(city1)
			var dataq = JSON.parse(city1)

			var existingNode = data.find(node => node.name === dataq.cityname);
			
        // 设置页面标题和节点标题
        $(".title").html("河北传统文化知识图谱");
        $(".node-title").html("城市");
		
		if (!existingNode) {
			 // 创建节点对象
			var node = {
				//id: dataq.id,
				name: dataq.cityname,
				symbolSize: 90,
				symbol: 'image://img/城市.png' ,
				level: 1
			};

			// 创建链接对象
			var link = {
				source: "河北传统文化知识图谱",
				target: dataq.cityname ,
				lineStyle: firstLine
			};
		
       
	
        // 更新右侧导航栏内容
        var nodeTitle = $(".child-node-title-tmp").clone();
		//console.log(nodeTitle)
        nodeTitle.html(dataq.cityname);
        nodeTitle.css("display", "block");
        nodeTitle.removeClass("child-node-title-tmp");
        nodeTitle.appendTo(".child-nodes");
        
        // 绑定点击事件，点击时展开对应的三级节点
        nodeTitle.bind("click", {title: dataq.cityname}, function (event) {
			
			option.series[0].data.forEach(function(item, index) {
			    if (item.name === event.data.title) {
			        genL2(event.data.title, index); // 展开对应的三级节点
			    }
			});

        });
		
        // 更新图表数据
        data = data.concat(node);
        links = links.concat(link);
        option.series[0].data = data;
        option.series[0].links = links;	
        chart.setOption(option);
	}	
	}
    });

}
//根据城市生成二级节点（人物景点）
function genL2(name, dataIndex,  refreshLeft = true) {
    $.getJSON("http://localhost:8080/city/all", { city: name }, function(renwu) {
        $(".node-tmp").nextAll().remove();
        $(".child-node-title-tmp").siblings().remove();
        $(".title").html(name);
        $(".node-title").html("人物&景点");
		$(".nav-item").remove();
        var nodes = [],
            links = [];
		
        for (var i = 0; i < renwu.length; i++) {
			
            if (refreshLeft) {
				
                // 如果人物的城市与指定城市匹配，则创建人物节点和连接
                if (renwu[i].cityname === name && renwu[i].fname) {
					
                    nodes.push({
                        name: renwu[i].fname,
                        symbolSize: 60,
                        symbol: 'image://img/人物.png',
                        level: 2
                    });
					
                    // 更新右侧导航栏内容
                    let nodeTitle1 = $(".child-node-title-tmp").clone();
                    nodeTitle1.html(renwu[i].fname);
                    nodeTitle1.css("display", "block");
                    nodeTitle1.removeClass("child-node-title-tmp");
                    nodeTitle1.attr("id", "node" + i); // 这里最好修改成另一个ID，避免和景点节点重复
                    nodeTitle1.appendTo(".child-nodes");
                    $("#node" + i).bind("click", { name: renwu[i].fname }, function(event) {
                        genL3(event.data.fname, i); // 展开对应的三级节点
                    });
					
                    // 创建连接
                    links.push({
                        source:	name,
                        target: renwu[i].fname,
                        lineStyle: secondLine
                    });
					
                }

                // 如果景点的城市与指定城市匹配，则创建景点节点和连接
                if (renwu[i].cityname === name && renwu[i].sname) {
					
                    nodes.push({
                        name: renwu[i].sname,
                        symbolSize: 60,
                        symbol: 'image://img/景点.png',
                        level: 2
                    });
					
                    // 创建连接，连接城市和景点
                    links.push({
                        source: name, // 使用城市的 ID 作为源
						target: renwu[i].sname, // 使用景点的 ID 作为目标
                        lineStyle: secondLine
                    });

                    // 更新右侧导航栏内容
                    let nodeTitle2 = $(".child-node-title-tmp").clone();
                    nodeTitle2.html(renwu[i].sname);
                    nodeTitle2.css("display", "block");
                    nodeTitle2.removeClass("child-node-title-tmp");
                    nodeTitle2.attr("id", "node_s" + i); // 这里最好修改成另一个ID，避免和人物节点重复
                    nodeTitle2.appendTo(".child-nodes");
                    $("#node_s" + i).bind("click", { name: renwu[i].sname }, function(event) {
                        genL3(event.data.sname, i); // 展开对应的三级节点
                    });
                }
            }
        }
		
        option.series[0].data = option.series[0].data.concat(nodes);
        option.series[0].links = option.series[0].links.concat(links);
        option.series[0].data[dataIndex].show = true; // 标记当前节点为已展开
        chart.setOption(option);
    });
}


//根据人物生成三级节点（属性）
function genL3(dataIndex, refreshLeft = true, refreshRight = "all") {
    $.getJSON("http://localhost:8080/city/all", function (shuxing) {
		var shuxing = JSON.stringify(shuxing)
		var shuxing = JSON.parse(shuxing)
		
        // 清空节点
        $(".node-title").html("");
        $(".node-tmp").nextAll().remove();
        $(".child-node-title-tmp").siblings().remove();
        $(".title").html(dataIndex); // Assuming dataIndex is the clicked name

        var nodes = [],
            links = [];
        $(".child-node-title-tmp").html("");
		
        for (let i in shuxing) {
			//alert(dataIndex)
            if (dataIndex === shuxing[i].fname) {
                let navItem = $("<div></div>")
					.addClass("nav-item")
					.html(
						"地址: " + shuxing[i].faddress + 
						"<br>祖籍: " + shuxing[i].fancestral + 
						"<br>身份: " + shuxing[i].fidentity + 
						"<br>介绍: " + shuxing[i].finfo
					);
                $(".child-node-title-tmp").append(navItem);
				
            } else if (dataIndex === shuxing[i].sname) {
                let navItem = $("<div></div>")
					.addClass("nav-item")
					.html(
						"地址: " + shuxing[i].saddress + 
						"<br>介绍: " + shuxing[i].sinfo
					);	
                $(".child-node-title-tmp").append(navItem);
				
            }
        }
    });
}


chart.on('click', function (params) {
    // 控制台打印数据的名称
    // console.log(params);

    //如果点击的为级别1
    if (params.data.level == 1) {
        if (!params.data.show) { //如果未展开，生成关系图和导航
            genL2(params.name, params.dataIndex, true);
        } else { //如果已展开，只生成导航
            genL2(params.name, params.dataIndex, false);
        }

    }

    //如果点击的为级别2
    if (params.data.level == 2) {
        if (!params.data.show) { //如果未展开，生成关系图和导航
            genL3(params.name, params.dataIndex, true);
        } else { //如果已展开，只生成导航
            genL3(params.name, params.dataIndex, false);
        }

    }

});



