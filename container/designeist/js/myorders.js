// JavaScript Document
var first_nav_id="";
//dom树构造完毕后运行
$(document).ready(function(e) {
	get_info_from_href();//数据初始化：获取入口信息
	//窗口改变大小时
    $(window).resize(function(e) {
		
    });
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	show_order_by_href();//根据入口显示相应订单
	//btn按键监听
	listen_btn_del();//删除键监听
	listen_top_nav();//导航键监听
	
});


/**
*根据入口显示相应订单
*@author zhangwei
*/
function show_order_by_href(){
	if(first_nav_id=="quanbu"||first_nav_id=="fukuan"||first_nav_id=="shouhuo"||first_nav_id=="fahuo"||first_nav_id=="pingjia"){
		$("#order_"+first_nav_id).css("display","block");
		$(".top_nav #"+first_nav_id).css("border-color","#0C0");
	}else{
		$("#order_quanbu").css("display","block");
		$(".top_nav #quanbu").css("border-color","#0C0");
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
		$(".top_nav .btn").css("border-color","#999");
		$(this).css("border-color","#0C0");
		var id=$(this).attr("id");
		$(".order_block").css("display","none");
		$("#order_"+id).css("display","block");
	});
}

/**
*listen_btn_del
*删除键监听
*@author zhangwei
*/
function listen_btn_del(){
	$(".btn_del").click(function(){
		var order=$(this).parent().parent();
		var ans= window.confirm("是否确定删除？", "标题");
		if(ans){
			order.remove();
		}else{
			return;
		}
		//$(this).parent().parent().remove();
	});
	
}