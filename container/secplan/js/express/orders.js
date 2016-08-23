// JavaScript Document
//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		
    });
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	show_order_by_href("");//根据入口显示相应订单
	//btn按键监听
	listen_btn_del();//删除键监听
	listen_top_nav();//导航键监听
	
});


/**
*根据入口显示相应订单
*@author zhangwei
*/
function show_order_by_href(first_nav_id){
	if(first_nav_id=="shouli"||first_nav_id=="qujian"||first_nav_id=="paisong"||first_nav_id=="wancheng"||first_nav_id=="all"){
		$("#order_"+first_nav_id).css("display","block");
		$(".top_nav #"+first_nav_id).css("border-color","#0C0");
	}else{
		$("#order_all").css("display","block");
		$(".top_nav #all").css("border-color","#0C0");
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