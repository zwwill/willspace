// JavaScript Document

//测试数据
var goods_datas=[{"pic":"","name":"【测试数据】iWatch","price":"2800.0","xiaoliang":"220","kucun":"1000","shangjiariqi":"02.12","on":"1"},{"pic":"","name":"【测试数据】iWatch","price":"2800.0","xiaoliang":"220","kucun":"1000","shangjiariqi":"02.12","on":"1"},{"pic":"","name":"【测试数据】iWatch","price":"2800.0","xiaoliang":"220","kucun":"1000","shangjiariqi":"02.12","on":"1"}];


//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		
    });
		
	
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	//按钮监听
	listen_btn_store_onoff();//营业打烊
	listen_btn_goods_onoff();//上架下架
	listen_btn_sort();//排序
});



/**
*按钮监听：营业打烊
*@author zhangwei
*/
function listen_btn_store_onoff(){
	$("#btn_store_onoff").click(function(){
		var ison=$(this).attr("on");
		if(ison==1){
			$(this).children(".checkbox").children(".onoff").attr("class","onoff");
			$(this).attr("on",0);
			myalert("开启打烊模式");
		}else{
			$(this).children(".checkbox").children(".onoff").attr("class","onoff onoff-on");
			$(this).attr("on",1);
			myalert("开启营业模式");
		}
	});
	
}
/**
*按钮监听：上架下架
*@author zhangwei
*/
function listen_btn_goods_onoff(){
	$(".single_one .btn_goods_onoff").click(function(){
		var ison=$(this).attr("on");
		if(ison==1){
			$(this).children(".checkbox").children(".onoff").attr("class","onoff");
			$(this).attr("on",0);
			myalert("下架");
		}else{
			$(this).children(".checkbox").children(".onoff").attr("class","onoff onoff-on");
			$(this).attr("on",1);
			myalert("上架");
		}
	});
	
}
/**
*按钮监听：排序
*@author zhangwei
*/
function listen_btn_sort(){
	$(".top_sort .single_sort").click(function(){
		var ison=$(this).attr("on");
		if(ison=="0"){
			$(".top_sort .single_sort").css("color","#fff");
			$(".top_sort .single_sort").attr("on","0")
			$(this).css("color","#0F0");
			$(this).attr("on","1");
		}else{
			return;
		}
		$("")
	});
	$(".top_sort #sort_all").click(function(){
		//do something
	});
	$(".top_sort #sort_shangjia").click(function(){
		//do something
	});
	$(".top_sort #sort_xiajia").click(function(){
		//do something
	});
}


