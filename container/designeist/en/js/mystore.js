// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
       	rfWin_bacpic();//背景适配
    });
		rfWin_bacpic();//背景适配
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	
	listen_entrance();//入口监听
	
});

/**
*入口监听
*@author zhangwei
*/
function listen_entrance(){
	$("#nav_block .single_nav").click(function(){
		var href=$(this).children("a").attr("href");
		if(href=="#"){
			var function_name=$(this).children("a").children(".txt_nav").text();
			myalert("【"+function_name+"】功能即将开放");	
		}
	});
}

/**
*背景适配
*@author zhangwei
*/
function rfWin_bacpic(){
	var w_h=window.innerHeight;
	$("#main_block").css("height",w_h);
	
}


