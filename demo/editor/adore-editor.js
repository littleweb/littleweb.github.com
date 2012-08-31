function adoreEditor(){//adoreEditor编辑器构造函数

}
adoreEditor.prototype={
	_$:{
		ie:!(-[1,]),//判断是否IE
		Q:function(id){//ID查询器
			return document.getElementById(id);
		},
		N:function(tag,css){//新tag
			var T=document.createElement(tag);
			T.style.cssText=css;
			return T;
		},
		paintDom:function(me,css,richText,html){//初始化iframe文档
			var T=richText,
				W=T.offsetWidth,
				H=T.offsetHeight;
			me._temp.height=H + "px";
			var canvas=this.N("div","width:" + W + "px;height:" + H + "px;padding:0px;position:relative;overflow:hidden;background:#FFF;");
			var ifrm=this.N("iframe","width:" + (W-10) + "px;height:" + (H-10) + "px;padding:5px;");
			ifrm.frameBorder=0;
			var codeArea=this.N("textarea","width:" + (W-12) + "px;height:" + (H-12) + "px;padding:5px;border:1px solid #A4B97F;position:absolute;overflow:auto;left:0;top:-500px;");
			canvas.appendChild(ifrm);
			canvas.appendChild(codeArea);
			richText.parentNode.insertBefore(canvas,richText);
			me._EO={/*编辑器对象EO(Editor Object),_EO.dom:编辑器文档对象，_EO.obj：编辑器iframe对象*/
				dom:ifrm.contentDocument || ifrm.contentWindow.document,
				obj:ifrm,
				win:ifrm.contentWindow,
				code:codeArea
			}
			var htmlDoc='<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns=" http://www.w3.org/1999/xhtml"><head><link rel="stylesheet" href="{css}" type="text/css" /><head><body contenteditable="true">{html}</body></html>';
			me._EO.dom.open();
			me._EO.dom.write(htmlDoc.replace("{css}",css).replace("{html}",html));
			me._EO.dom.close();
		}
	},
	_temp:{//临时变量
		height:""//编辑器高度
	},
	birth:function(vo){//初始化编辑器实例
		var T=this._$.Q(vo.id);//页面文本域
		this._$.paintDom(this,vo.css,T,vo.html);//渲染初始化iframe文档
		T.style.display="none";//隐藏页面文本域
		//this.writeHTML(vo.html);//写入初始化html内容
	},
/*基础功能类：插入、读取及一些全局性的控制功能*/
	writeHTML:function(html){//在当前编辑文档中插入html
		this._EO.dom.body.focus();
		if(this._$.ie){
			var range=this._EO.dom.selection.createRange();
			range.pasteHTML(html);
		}else{
			this._EO.dom.execCommand("insertHTML",false,html);
		}
	},
	readHTML:function(key){//--读取编辑文档源码
		return this._EO.dom.body.innerHTML;
	},
	_clear:function(){//隐藏弹出
/* 		for(var i=0;i<this._config.bars.length;i++){
			this._$(this._config.bars[i]).style.display="none";
		} */
	},
	viewCode:function(){//--读取编辑文档源码
		var T=this._EO.code;
		var key=(T.style.top=="-" + this._temp.height);
		key?(T.value=this.readHTML()):(this._EO.dom.body.innerHTML=(T.value));
		key?(T.focus()):(this._EO.dom.body.focus());
 		T.style.top=key?"0":("-" + this._temp.height);
	},
/*样式控制类：文档内容的样式排版功能*/
	css:function(){
		var args=arguments;
		this._style[args[0]][2]=(args.length>1)?args[1]:false;
		this._paintCss(this._style[args[0]]);
	},
	_paintCss:function(o){
		this._clear();
		this._EO.dom.execCommand(o[0],o[1],o[2]);
		this._EO.dom.body.focus();
	},
	_style:{
		"居左":["JustifyLeft",false,false],
		"居中":["JustifyCenter",false,false],
		"居右":["JustifyRight",false,false],
		"字号":['FontSize',false,"$size"],
		"字体":['FontName',false,"$font"],
		"加粗":['Bold',false,false],
		"斜体":['Italic',false,false],
		"下划线":['Underline',false,false],
		"前景色":['ForeColor',false,"$color"],
		"背景色":['BackColor',false,"$color"]
	},
/*RichContent添加类*/
	a:function(url,target){//为选中区域添加超链接，支持新窗口选择
		this._clear();
		var sel=this._$.ie?this._EO.dom.selection:this._EO.win.getSelection();
		if(this._isie){
			var selHtml;
            if (sel.type == "Control") {
				selHtml=(range.createRange().item(0).outerHTML);//弹出选中的图片的html
				sel.clear();
            }else{
				selHtml=range.createRange().htmlText;
			}
			this.writeHTML('<a href="' + url + '" target="' + target + '">' + selHtml + '</a>');
		}else{
			var a=this._EO.dom.createElement("a");
			a.href=url;
			a.setAttribute("taget",target);
			sel.getRangeAt(0).surroundContents(a);
		};
	},
	image:function(url,alt){//插入图片
		this._clear();
		var img='<img src="{imgSrc}" alt="{imgAlt}" />';
		this.writeHTML(img.replace("{imgSrc}",url).replace("{imgAlt}",alt));
	},
	flash:function(vo){//插入flash应用
		this._clear();
		var vHtml='<embed width="{width}" height="{height}" src="{videoSrc}" />';
		this.writeHTML(vHtml.replace("{videoSrc}",vo.url).replace("{width}",vo.width).replace("{height}",vo.height));
	}
}