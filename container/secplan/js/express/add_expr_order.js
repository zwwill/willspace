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
	listen_btn_urgent_onoff();//包邮
	
});


/**
*按钮监听：包邮
*@author zhangwei
*/
function listen_btn_urgent_onoff(){
	$("#btn_urgent_onoff").click(function(){
		var ison=$(this).attr("on");
		if(ison==1){
			$(this).children(".checkbox").children(".onoff").attr("class","onoff");
			$(this).attr("on",0);
			myalert("不要求时间，不加急");
		}else{
			$(this).children(".checkbox").children(".onoff").attr("class","onoff onoff-on");
			$(this).attr("on",1);
			myalert("急需件，申请加急<br />注意：加急件费用加成");
		}
	});
	
}
