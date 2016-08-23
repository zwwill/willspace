// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
        rfWin_menu_block();//底部菜单适配
		rfWin_top_head();//屏幕适配2：头像位置
    });
        rfWin_menu_block();//底部菜单适配
		rfWin_top_head();//屏幕适配2：头像位置
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
});


/**
*屏幕适配2：头像位置
*@author zhangwei
*/
function rfWin_top_head(){
	var top_head_W=$("#top_head").width();
	
	$("#top_head .btn_pic").css("height",top_head_W*0.5);
	
}



