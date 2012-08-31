var VeryMinds=function(data){
	console.log(data);
	//是否可编辑开关
	window.EditKey=false;
	//画栅格线
	//Grid.draw("grid");
	//初始化数据
	drawMap[data.mapStyle](data);
	//自动中心定位
	AutoCenter(0);
	//拖动
	Drag("widgets","widgets");
}