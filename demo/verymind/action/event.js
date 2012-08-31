//操作栅格
document.getElementById("toggleGrid").onclick=function(){
	Grid.toggle("grid");
};
//新增节点
document.getElementById("add").onclick=function(){
	var _f2s=document.getElementById("list").getElementsByTagName("div"); 
	data.list[data.list.length]={title:""};
	drawMap[data.mapStyle](data);
	_f2s[_f2s.length-1].focus();
};
//删除节点
document.getElementById("del").onclick=function(){
	data.list.shift();
	drawMap[data.mapStyle](data);
};
//删除当前节点
document.getElementById("delThis").onclick=function(){	
	data.list[thisPos]="";
	var _data=[];
	for(var i=0;i<data.list.length;i++){
		if(data.list[i]!=""){
			_data.push(data.list[i]);
		}
	}
	data.list=_data;
	drawMap[data.mapStyle](data);
};
//操作浮层
document.getElementById("action").onmouseout=function(){
	//this.style.display="none";
}
//绘制tree结构图
document.getElementById("drawTree").onclick=function(){
	data.mapStyle="tree";
	drawMap[data.mapStyle](data);
};
//绘制普通结构图
document.getElementById("drawWise").onclick=function(){
	data.mapStyle="wise";
	drawMap[data.mapStyle](data);
};
//绘制目录结构图
document.getElementById("drawDir").onclick=function(){
	data.mapStyle="dir";
	drawMap[data.mapStyle](data);
};
//新建文件
document.getElementById("newFile").onclick=function(){
	var _newName=rnd_str(9,true,true,true);
	localStorage.VeryMindList=localStorage.VeryMindList + _newName + "#";
	localStorage[_newName]='{title:"标题",mapStyle:"wise",list:[]}';
	renderFiles("#mindsList");
	Data.thisData=Data.mindsList[Data.mindsList.length-1];
	console.log(Data.thisData);
	data=eval('(' + localStorage[Data.thisData] + ')');
	drawMap[data.mapStyle](data);
}
//打开文件列表
document.getElementById("files").onclick=function(){
	renderFiles("#mindsList");
	document.getElementById("showFiles").style.display="block";
}
//关闭文件列表
document.getElementById("closeFiles").onclick=function(){
	document.getElementById("showFiles").style.display="none";
}