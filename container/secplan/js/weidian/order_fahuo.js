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
	listen_btn_express_onoff();//快递
	
});


/**
*按钮监听：快递
*@author zhangwei
*/
function listen_btn_express_onoff(){
	$("#btn_express_onoff").click(function(){
		var ison=$(this).attr("on");
		if(ison==1){
			$(this).children(".checkbox").children(".onoff").attr("class","onoff");
			$(this).attr("on",0);
			$("#goods_info .line .val input[name=price_postage]").removeAttr("readonly");
			$("#goods_info .line .val input[name=price_postage]").attr("value","5.0");
			$("#goods_info .line .val input[name=price_postage]").css("color","#0C0");
			express_block_show(0);
			myalert("客户自取");
		}else{
			$(this).children(".checkbox").children(".onoff").attr("class","onoff onoff-on");
			$(this).attr("on",1);
			$("#goods_info .line .val input[name=price_postage]").attr("readonly",true);
			$("#goods_info .line .val input[name=price_postage]").attr("value","0.0");
			$("#goods_info .line .val input[name=price_postage]").css("color","#999");
			express_block_show(1);
			myalert("商家送货");
		}
	});
	
	function express_block_show(flag){
			if(flag=='0'){
				$("#express_info .express_block").slideUp();
				$("#express_info .express_block").attr("on",0);
			}else{
				$("#express_info .express_block").slideDown();
				$("#express_info .express_block").attr("on",1);
			}
	}
	
}
