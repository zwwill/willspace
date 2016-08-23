// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_foot_block();//底部按键组适配
    });
		rfWin_foot_block();//底部按键组适配
		
	
	
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	//按钮绑定
	btn_listen_phonenum();//：联系电话
	
	
	
		
		
});


/**
* 按钮绑定：联系电话
*@author zhangwei
*/
function btn_listen_phonenum(){
	$(".info_seller .btn_shownum").click(function(){
		$(this).slideUp();	
		setTimeout(function(){$(".info_seller .btn_shownum").slideDown();},3000)
	});
}

/**
*
*@author zhangwei
*/
function func_(){
	
}


