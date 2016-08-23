// JavaScript Document
var first_nav_id="";
//dom树构造完毕后运行
$(document).ready(function(e) {
	
	get_info_from_href();//数据初始化：获取入口信息
	//窗口改变大小时
    $(window).resize(function(e) {
        rfWin_menu_block();//底部菜单适配
    });
        rfWin_menu_block();//底部菜单适配
        
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	show_order_by_href();//根据入口显示相应订单
	//btn按键监听
	listen_top_nav();//导航键监听
	listen_collect();//收藏键监听
	
});


/**
*根据入口显示相应订单
*@author zhangwei
*/
function show_order_by_href(){
	if(first_nav_id=="theme"||first_nav_id=="design"){
		$("#"+first_nav_id+"_block").css("display","block");
		$(".top_nav #"+first_nav_id).css("border-color","#F00");
	}else{
		$("#theme_block").css("display","block");
		$(".top_nav #theme").css("border-color","#F00");
	}
}


/**
*数据初始化：获取入口信息
*@author zhangwei
*/
function get_info_from_href(){
	var hf = window.location.href;
	if(hf.indexOf('?')!='-1'){
		first_nav_id = hf.substring(hf.indexOf('=')+1 ,hf.length);
		//hf.substring(hf.indexOf('=')+1 ,hf.lastIndexOf('&'));
		//hf.substring(hf.lastIndexOf('=')+1,hf.length);
	}
}

/**
*listen_top_nav
*导航键监听
*@author zhangwei
*/
function listen_top_nav(){
	$(".top_nav .btn").click(function(){
		$(".top_nav .btn").css("border-color","#000");
		$(this).css("border-color","#F00");
		var id=$(this).attr("id");
		$(".show_block").css("display","none");
		$("#"+id+"_block").css("display","block");
	});
}

/**
*listen_collect
*收藏键监听
*@author zhangwei
*/
function listen_collect(){
	$("#theme_block .collect").click(function(){
		var isclt=$(this).attr("isclt");
		if('0'==isclt){
			var num= parseInt($(this).children(".num").html());
			$(this).children(".num").html(num+1);
			$(this).attr("isclt","1");
			$(this).css("background-color","rgba(222,0,0,0.8)");
		}else{
			var num= parseInt($(this).children(".num").html());
			$(this).children(".num").html(num-1);
			$(this).attr("isclt","0");
			$(this).css("background-color","rgba(25,25,25,0.8)");
		}
		
	});
}

