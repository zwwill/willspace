// JavaScript Document
//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		
    });
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	
	//btn按键监听
	listen_btn_postage_onoff();//包邮
	
});


/**
*按钮监听：包邮
*@author zhangwei
*/
function listen_btn_postage_onoff(){
	$("#btn_postage_onoff").click(function(){
		var ison=$(this).attr("on");
		if(ison==1){
			$(this).children(".checkbox").children(".onoff").attr("class","onoff");
			$(this).attr("on",0);
			$("#goods_info .line .val input[name=price_postage]").removeAttr("readonly");
			$("#goods_info .line .val input[name=price_postage]").attr("value","5.0");
			$("#goods_info .line .val input[name=price_postage]").css("color","#0C0");
			myalert("取消包邮，自定义邮费");
		}else{
			$(this).children(".checkbox").children(".onoff").attr("class","onoff onoff-on");
			$(this).attr("on",1);
			$("#goods_info .line .val input[name=price_postage]").attr("readonly",true);
			$("#goods_info .line .val input[name=price_postage]").attr("value","0.0");
			$("#goods_info .line .val input[name=price_postage]").css("color","#999");
			myalert("包邮");
		}
	});
	
}
