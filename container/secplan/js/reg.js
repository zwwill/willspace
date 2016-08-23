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
	$("#login_block .in").focus(function(){
		$(this).val("");
		$(this).css("background","rgba(255,255,255,.5)");
	});
	$("#btn_login").click(function(){
		reg();
	});
	
});

/**
*背景适配
*@author zhangwei
*/
function reg(){
	var account=$("#in_account").val();
	var pwd=$("#in_pwd").val();
	var pwd2=$("#in_pwd2").val();
	if(account==""){
		$("#in_account").css("background","rgba(255,0,0,.5)");
		return;
	}else if(pwd==""){
		$("#in_pwd").css("background","rgba(255,0,0,.5)");
		return;
	}else if(pwd2==""){
		$("#in_pwd2").css("background","rgba(255,0,0,.5)");
		return;
	}
	if(pwd!=pwd2){
		myalert("两次输入的密码不一致，请重新输入");
		return;
	}
	
	
}

/**
*背景适配
*@author zhangwei
*/
function rfWin_bacpic(){
	var w_h=window.innerHeight;
	$("#main_block").css("height",w_h);
	
}

