//编辑开关开启
var EditKey=true;
//画布设置
var DrawState={
	width:2400,
	height:1600
}
//编辑bar
var EditBar={
	loadFloat:function(me,n){
		me.onblur=function(){
			data.list[n].title=this.innerHTML;
			drawMap[data.mapStyle](data);
		}
		me.onmouseover=function(){
			this.contenteditable="true";
			document.getElementById("action").style.display="block";
			document.getElementById("action").style.left=me.style.left;
			document.getElementById("action").style.top=parseInt(me.style.top)-35 + "px";
			thisPos=this.attributes["pos"].nodeValue;
		}		
	}
}
//节点线绘制层
var Lines={
	me:function(x){//dom对象
		var _c = document.getElementById("lines");
		return (x=="d2")?(_c.getContext("2d")):(_c);
	},
	draw:function(x,y,x2x,y2y){//画线
		this.me("d2").moveTo(x,y);//起始点
		this.me("d2").lineTo(x2x,y2y);//终点
		this.me("d2").lineWidth=1;
		this.me("d2").strokeStyle='#A1A1A2';
		this.me("d2").stroke();		
	},
	clear:function(){//重置
		this.me("d").width=0;
		this.me("d").width=DrawState.width;
	}
};
//纵横阡陌绘制栅格线
var Grid={
	draw:function(canvas){
		var C = document.getElementById(canvas);
		C.style.display="block";
		var C2D = C.getContext("2d");
		for(var i=0;i<Math.floor(DrawState.width/20);i++){
			C2D.lineWidth=1;
			C2D.moveTo((i+1)*20,0);//起始点
			C2D.lineTo((i+1)*20,DrawState.height);//终点
			C2D.strokeStyle='#D9E0E9';
			C2D.stroke();
		}
		for(var i=0;i<Math.floor(DrawState.height/20);i++){
			C2D.lineWidth=1;
			C2D.moveTo(0,(i+1)*20);//起始点
			C2D.lineTo(DrawState.width,(i+1)*20);//终点
			C2D.strokeStyle='#D9E0E9';
			C2D.stroke();
		}		
	},
	toggle:function(canvas){
		var C = document.getElementById(canvas);
		C.style.display=(C.style.display=="block")?"none":"block";
	}
};
//中心画圆
(function(id){
	var C = document.getElementById(id);
	var C2D = C.getContext("2d");
	C2D.fillStyle="#FF0000";
	C2D.beginPath();
	C2D.arc(1200,800,20,0,Math.PI*2,true);
	C2D.closePath();
	C2D.fill();
})("map");
//画布中心定位
function AutoCenter(move){
	var _F1=document.getElementById("title");
	_F1.style.marginLeft="-" + (_F1.offsetWidth/2) + "px";
	var _left=((DrawState.width-document.documentElement.clientWidth)/2)+(move.left?move.left:0);
	var _top=((DrawState.height-document.documentElement.clientHeight)/2)+(move.top?move.top:0);
	document.documentElement.scrollTop=_top;
	document.body.scrollTop=_top;
	document.documentElement.scrollLeft=_left;
	document.body.scrollLeft=_left;
}
//画布拖动
var Drag=function(title,live){
	var X,Y;var Q=function(id){return document.getElementById(id);}  
	Q(title).onmousedown=function(e){
		e=e?e:window.event;   //如果是IE
		//记录框拖动跟随
		var _n=Q("showNote");
		if(_n){
			_nX = e.clientX - _n.offsetLeft;
			_nY = e.clientY - _n.offsetTop;			
		}
		X = e.clientX - Q(live).offsetLeft;
		Y = e.clientY - Q(live).offsetTop;
		document.onmousemove = function(e){
			e=e?e:window.event;
			Q(live).style.left = (e.clientX - X) + "px";
			Q(live).style.top = (e.clientY - Y) + "px";
			//记录框拖动跟随
			if(_n){
				_n.style.left = (e.clientX - _nX) + "px";
				_n.style.top = (e.clientY - _nY) + "px";			
			}
			return false;
		};           
	}
	document.onmouseup = function(){document.onmousemove = null;}
}
//显示记事
var ShowNote=function(src,string){
	var _src=src;
	var _pos=_src.getBoundingClientRect();
	var _sTop=document.documentElement.scrollTop || document.body.scrollTop;//垂直滚动条滚动高度；
	var _sLeft=document.documentElement.scrollLeft || document.body.scrollLeft;//垂直滚动条滚动高度；
	var _n=document.getElementById("showNote");
	_n.getElementsByTagName("p")[0].innerHTML=string;
	_n.style.absolute="absolute";
	_n.style.display="block";
	_n.style.left=_pos.left+_sLeft + 25 +"px";
	_n.style.top=_pos.top+_sTop -_n.offsetHeight + "px";
}
var HideNote=function(){
	var _n=document.getElementById("showNote");
	_n.style.display="none";
}
//tips定位
var TipsPos=function(me){
	var _css=me.className;
	if(_css=="left tips"){
		me.style.right=me.parentNode.offsetWidth + "px";
	}else{
		me.style.left=me.parentNode.offsetWidth + "px";
	}
}
//随机数
function rnd_str(str_0,str_1,str_2,str_3){
//str_0 长度
//str_1 是否大写字母
//str_2 是否小写字母
//str_3 是否数字
	var Seed_array=new Array();
	var seedary;
	var i;
	Seed_array[0]=""
	Seed_array[1]= "a b c d e f g h i j k l m n o p q r s t u v w x y z";
	Seed_array[2]= "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
	Seed_array[3]= "A";
	if (!str_1&&!str_2&&!str_3){str_1=true;str_2=true;str_3=true;}
	if (str_1){Seed_array[0]+=Seed_array[1];}
	if (str_2){Seed_array[0]+=" "+Seed_array[2];}
	if (str_3){Seed_array[0]+=" "+Seed_array[3];}
	Seed_array[0]= Seed_array[0].split(" ");
	seedary=""
	for (i=0;i<str_0;i++)
	{
	seedary+=Seed_array[0][Math.round(Math.random( )*(Seed_array[0].length-1))]
	}
	return(seedary);
}