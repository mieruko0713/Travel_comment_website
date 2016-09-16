//全局变量
var oIndex = document.getElementById("index");
var oWelcome = document.getElementById("welcome");
var oMask = document.getElementById("mask");
var oNews = document.getElementById("news");
//工具函数
function bind(obj,ev,fn) {
	if(obj.addEventListener) {
		obj.addEventListener(ev,fn);
	} else {
		obj.attachEvent(ev,fn);
	}
}
function addClass(obj,sClass) {
	if(!obj.className) {
		obj.className = sClass;
		return ;
	} 
	var aClass = obj.className.split(" ");
	for(var i=0;i<aClass.length;i++) {
		if(aClass[i]==sClass){
			return ;
		}
	}
	obj.className += " " + sClass;
} 
function removeClass(obj,sClass) {
	if(!obj.className) {
		return ;
	}
	var aClass = obj.className.split(" ");
	for(var i=0;i<aClass.length;i++) {
		if(aClass[i]==sClass){
			aClass.splice(i,1);
			obj.className = aClass.join(" ");
			return ;
		}
	}
}
function getByClass(obj,sClass){
	var all = obj.getElementsByTagName("*");
	var result = [];
	for(var i=0;i<all.length;i++) {
		aClass = all[i].className.split(" ");
		for(var j=0;j<aClass.length;j++) {
			if(aClass[j] == sClass){
				result.push(all[i]);
			}
		}
	}
	return result;
}
function fnInfo(obj, str) {
	obj.innerHTML = str;
	obj.style.opacity = 1;
	obj.style.WebkitTransform = "scale(1)";
	setTimeout(function(){
		obj.style.WebkitTransform = "scale(0)";
	},1000);
}
// 页面内容设置
function fnLoad() {
	bind(oWelcome,"transitionend",end);
	setTimeout(function(){
		oWelcome.style.opacity = 0;
	},5000);
	function end() {
	    removeClass(oWelcome,"pageShow");
	    fnIndex();
	}
}
function fnIndex() {
	var oIndexBtn = document.getElementById("indexBtn");
	var oScore = document.getElementById("score");
	var aScore = getByClass(oScore,"stars");
	var indexTags = document.getElementById("indexTags")
	var aTags = indexTags.getElementsByTagName("label");
	var oInfo  = getByClass(oIndex,"hint")[0];
	// 给评分的小星星添加点击事件
	for(var i=0;i<aScore.length;i++) {
		fnStar(aScore[i]);
	}
	function fnStar(score) {
		var aStars = score.getElementsByTagName("span");
		for(var i=0;i<aStars.length;i++) {
			aStars[i].index = i;
		}
		bind(score,"click",function(event) {
			if(event.target.index!== undefined) {
				var oInput = score.getElementsByTagName("input")[0];
				for(var i=0;i<aStars.length;i++) {
					removeClass(aStars[i],"active");
				}
				for(var i=0;i<=event.target.index;i++) {
					addClass(aStars[i],"active");
					oInput.value = event.target.index + 1;
				}
			}
		});
	}
	// 给标签添加点击事件
	for(var i=0;i<aTags.length;i++) {
		bind(aTags[i],"click",function(){
			addClass(this,"active");
		});
	}
	function fnScore() {
		for(var i = 0 ;i<aScore.length;i++) {
			var inputValue = aScore[i].getElementsByTagName("input")[0].value;
			console.log(inputValue);
			if(inputValue == 0) {
				console.log(inputValue);
				return false;
			}
		}
		return true;
	}
	function fnTags() {
		for(var i=0;i<aTags.length;i++) {
			var checked = aTags[i].getElementsByTagName("input")[0].checked;
			if(checked) {
				return true;
			}
		}
		return false;
	}
    bind(oIndexBtn,"click",function() {
    	// if()
    	
    	// 验证checkbox可以顺利输出
    	// for(var i=0;i<aTags.length;i++){
    	// 	var oInput = aTags[i].getElementsByTagName("input")[0];
    	// 	if(oInput.checked){
    	// 		console.log(oInput.value);
    	// 	}
    	// }
    	var onScore = fnScore();
    	var onTags = fnTags();
    	if(onScore&&onTags){
    		fnIndexOut();
    	} else if(onScore) {
    		fnInfo(oInfo,"给景区添加标签^_^");
    	} else {
    		fnInfo(oInfo,"给景区评分^_^");
    	} 
    	
    });

}
function fnIndexOut() {
	addClass(oNews,"pageShow");
	addClass(oMask,"pageShow");
    oIndex.style.WebkitFilter="blur(5px)";
    oIndex.style.filter="blur(5px)";
    oNews.style.transition="0.5s";
    setTimeout(function(){
    	oMask.style.opacity=1;
    },14);
    setTimeout(function(){
    	removeClass(oIndex,"pageShow");
	    oIndex.style.WebkitFilter=oIndex.style.filter="blur(0px)";	
	    oNews.style.opacity=1;
	    removeClass(oMask,"pageShow");
	},3000);
}