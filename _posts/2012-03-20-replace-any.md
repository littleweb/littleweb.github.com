---
layout:   post
title:    replace多项替换
description: replace多页替换的两种方法
category: js
keywords: replace
---

## replace多项替换的两种写法
###循环替换
	console.log("abcde".replace("a","1").replace("b","2").replace("c","3").replace("d","4").replace("e","5"));
###一次性替换
	console.log("abcde".replace(/a|b|c|d|e/g,function(a){
		return {
			"a":"1",
			"b":"2",
			"c":"3",
			"d":"4",
			"e":"5"
		}[a];
	}));
