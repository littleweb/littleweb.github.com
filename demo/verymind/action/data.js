//数据相关操作
var Data={
	thisData:"demo1",//当前操作文件索引
	mindsList:[]//本地存储索引列表
};
//本地存取
//if(!localStorage.VeryMind){
	//localStorage.VeryMind='{title:"标题",mapStyle:"wise",list:[]}';
//}
//if(!localStorage.VeryMindList){
	//localStorage.VeryMindList=rnd_str(9,true,true,true) + "#";
//}
//var VeryMind=eval('(' + localStorage.VeryMind + ')');
//var data=VeryMind;
//if(!localStorage[localStorage.VeryMindList.split("#")[0]]){
	//localStorage[localStorage.VeryMindList.split("#")[0]]='{title:"标题",mapStyle:"wise",list:[]}';
//}
function renderFiles(id){
	//获取本地存储中文件列表
	if(!localStorage.VeryMindList){
		localStorage.VeryMindList="demo1#";
		localStorage.demo1='{title:"标题",mapStyle:"wise",list:[]}';
	}
	Data.mindsList=localStorage.VeryMindList.split("#");
	Data.mindsList.pop();
	//初始化文件列表
	$(id).html("");
	for(var di=0;di<Data.mindsList.length;di++){
		var _thisMind=eval('(' + localStorage[Data.mindsList[di]] + ')');
		$(id).append('<li><p class="icon"><img src="ui/mind.png" alt="" /></p><p class="name">' + _thisMind.title + '</p></li>');
	}
	//初始化文件点击事件
	var _ms=document.getElementById("mindsList").getElementsByTagName("li");
	for(var i=0;i<_ms.length;i++){
		(function(n){
			_ms[n].onclick=function(){
				Data.thisData=Data.mindsList[n];
				data=eval('(' + localStorage[Data.thisData] + ')');
				document.getElementById("showFiles").style.display="none";
				drawMap[data.mapStyle](data);
			}
		})(i)
	}	
}
renderFiles("#mindsList");
//初始化第一个文件数据
var data=eval('(' + localStorage[Data.thisData] + ')');
//var Data.thisData=JSON.parse(localStorage.VeryMindList.split("#")[0]);