// JavaScript Document


window.onselectstart=function()   {return   false;}       //禁用选择
window.oncopy=function()   {return   false;}       //禁止复制
//禁止查看源代码
function stop(){
return false;
}
document.onselectstart=stop;
document.onpaste=stop;
document.oncontextmenu=stop;
document.onkeydown=function(){ 
if(window.event && window.event.keyCode >= 113&&window.event.keyCode<=123&&window.event.keyCode!=116&&window.event.keyCode!=122&&window.event.keyCode!=16&&window.event.keyCode!=17&&window.event.keyCode!=18) { 
return false;
};
}

$(document).ready(function(e) {
	fuc_headbg_rolling();//head背景轮播
    $("#btn_intro").click(function(){
		is_open=$(this).attr("is_open");
		if(0==is_open){
			$(".intro_block").slideDown();
			$(this).attr("is_open",1);
		}else{
			$(".intro_block").slideUp();
			$(this).attr("is_open",0);
		}
	});
});

/**
* head背景轮播
*/
function fuc_headbg_rolling(){
	var num=1;
	setInterval(function(){
		//alert(num);
		$(".header").css("opacity",0);
		setTimeout(function(){
			$(".header").css("background-image","url(images/v"+num+".jpg)");
			$(".header").css("opacity",1);
		},500);
		if(num>=3){
			num=1
		}else{
			num++;	
		}
	},5000);
}