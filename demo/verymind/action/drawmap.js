//绘制结构图
var drawMap={
	wise:function(data){//普通顺时针结构
			var _titleData=data.title;
			if(data.note){
				_titleData+='<span class="note" onclick="ShowNote(this,this.innerHTML);">' + data.note + '</span>';
			}
			$("#title").html(_titleData);
			$("#list").html('');
			if(EditKey){$("#list").contenteditable="true";}
			data.mapStyle="wise";
			var num=data.list.length;
			Lines.clear();
			_trans=function(id,_num,_R,_add){
				var _du=180/(_num+1);//数长
				//_R=40+_r*2*10;
				_R=(document.getElementById("title").offsetWidth/2)+_r*10;
				var _RX=_R+(40*_num)/2;//椭圆长半径
				for(var i=1;i<(_num+1);i++){
					var _top=((DrawState.height/2)-(_RX)*Math.sin(Math.PI/180*(_du*i+_add)));
					var _left=((DrawState.width/2)-_R*Math.cos(Math.PI/180*(_du*i+_add)));
					Lines.draw(DrawState.width/2,DrawState.height/2,_left,_top);
					var _pos=(_add==90)?(i-1):(_r+i-1);
					var _title=data.list[_pos].title;
					var _key=((_add==90))?"right":"left";
					//引入Tips
					var _tips='';
					if(data.list[_pos].tips){
						if(_add==90){
							_tips='<span class="right tips"><nobr><strong class="path">{</strong>' + data.list[_pos].tips + '</nobr></span>';
						}else{
							_tips='<span class="left tips"><nobr>' + data.list[_pos].tips + '<strong class="path">}</strong></nobr></span>';
						}
					}
					$(id).append('<div pos=' + _pos + ' class="F2" style="left:' + _left + 'px;top:' + (_top-20) + 'px;' + _left + 'px;z-index:100' + i + '">' + _title + _tips + '</div>');
					var _f2s=document.getElementById("list").getElementsByTagName("div");
					_f2s[_f2s.length-1].style.left=((_add==90)?_left:(_left-(_f2s[_f2s.length-1].offsetWidth))) + "px";
					//定位Tips
					if(data.list[_pos].tips){TipsPos(_f2s[_f2s.length-1].getElementsByTagName("span")[0])}
				}
			}
			var _r=Math.round(num/2);
			var _l=(num%2==0)?(num/2):(Math.round(num/2)-1);
			_trans("#list",_r,160,90);
			_trans("#list",_l,160,270);	
			var _f2s=document.getElementById("list").getElementsByTagName("div");
			//导图标题赋值
			document.getElementById("title").onblur=function(){
				data.title=this.innerHTML;
				drawMap[data.mapStyle](data);
			}		
			for(var ii=0;ii<_f2s.length;ii++){
				if(EditKey){
					EditBar.loadFloat(_f2s[ii],ii);
				}
			}
			if(EditKey){localStorage[Data.thisData]=JSON.stringify(data);}
			AutoCenter(0);//自动中心定位
		},
	tree:function(data){//树形
			$("#title").html(data.title);
			$("#list").html('');
			data.mapStyle="tree";
			Lines.clear();
			var _H=0;
			for(var i=0;i<data.list.length;i++){
				var _left=((DrawState.width/2)+(document.getElementById("title").offsetWidth/2)+60);
				_H=_H+60;
				var _title=data.list[i].title;
				$("#list").append('<div pos=' + i + ' class="F2" style="left:' + _left + 'px;z-index:100' + i + '">' + _title + '</div>');
			}		
			//导图标题赋值			
			document.getElementById("title").onblur=function(){
				data.title=this.innerHTML;
				drawMap[data.mapStyle](data);
			}
			var _f2s=document.getElementById("list").getElementsByTagName("div");
			var _T=(DrawState.height/2)-(_H/2);
			Lines.draw(_left-40,_T+10+20,_left-40,(DrawState.height/2)+(_H/2)-30);
			Lines.draw(DrawState.width/2,DrawState.height/2,_left-40,DrawState.height/2);
			for(var ii=0;ii<_f2s.length;ii++){
				var _top=(_T+(ii*60)+10);
				_f2s[ii].style.top=_top + "px";
				Lines.draw(_left-40,_top+20,_left,_top+20);
				if(EditKey){EditBar.loadFloat(_f2s[ii],ii);}
			}
			if(EditKey){localStorage[Data.thisData]=JSON.stringify(data);}
			AutoCenter({left:document.getElementById("title").offsetWidth/2});//自动中心定位
		},
	dir:function(data){//目录
			$("#title").html(data.title);
			$("#list").html('');
			data.mapStyle="dir";
			Lines.clear();
			//加载导图项
			for(var i=0;i<data.list.length;i++){
				var _top=(DrawState.height/2)+80;
				var _title=data.list[i].title;
				$("#list").append('<div pos=' + i + ' class="F2" style="top:' + _top + 'px;z-index:100' + (data.list.length-i) + '">' + _title + '</div>');
			}		
			//导图标题赋值
			document.getElementById("title").onblur=function(){
				data.title=this.innerHTML;
				drawMap[data.mapStyle](data);
			}
			var _f2s=document.getElementById("list").getElementsByTagName("div");
			var _W=0;//定义横向总宽度
			for(var ii=0;ii<_f2s.length;ii++){
				var _meW=_f2s[ii].offsetWidth;
				_W=_W+_meW+20;
			}
			var _Lstart=(DrawState.width/2) -(_W/2);
			var _L=_Lstart;
			for(var ii=0;ii<_f2s.length;ii++){
				if(ii==0){var _LL=_f2s[ii].offsetWidth/2}
				if(ii==(_f2s.length-1)){var _RL=_f2s[ii].offsetWidth/2}
				_f2s[ii].style.left=_L + "px";
				Lines.draw(_L+(_f2s[ii].offsetWidth/2),_top-20,_L+(_f2s[ii].offsetWidth/2),_top+10);
				_L=_L+_f2s[ii].offsetWidth+20;
				if(EditKey){EditBar.loadFloat(_f2s[ii],ii);}
			}
			Lines.draw(_Lstart+_LL,_top-20,_Lstart+_W-_RL-20,_top-20);
			Lines.draw(DrawState.width/2,DrawState.height/2,_Lstart+(_W/2),_top-20);
			if(EditKey){localStorage[Data.thisData]=JSON.stringify(data);}
			AutoCenter({top:80});//自动中心定位
		}
}