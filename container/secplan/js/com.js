// JavaScript Document

//判断是否是微信登陆,非微信浏览器屏蔽
//shield_browser();

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_square_pic();//方图适配
    });
		rfWin_square_pic();//方图适配
		rfWin_square_bac();//方图随机派背景色
	
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	//监听A便签实践是否删除上一记录
	a_listen();
	
	//基础功能
	listen_back_gesture();//侧滑返回监听
});

/**
*侧滑返回监听
*@author zhangwei
*/
function listen_back_gesture(){
	var s_x;
	var s_y;
	var e_x;
	var e_y;
	
    $(document).on('touchstart',function(e) {
      	var touch = e.originalEvent.targetTouches[0]; 
		s_x=touch.pageX;
		s_y=touch.pageY;
		if(s_x<10){
			$(document).on('touchend',function(e) {
				var touch = e.originalEvent.changedTouches[0];
				e_x=touch.pageX;
				e_y=touch.pageY;
				var c_x=(e_x-s_x);
				var c_y=(e_y-s_y);
				c_y=c_y>0?c_y:-c_y;
				if(c_x>50){
					if(c_y/c_x<1){
						window.history.go(-1);
					}
				}
			});
		}
	});

/*
	$(document).mousedown(function(e){
		s_x=e.pageX;
		s_y=e.pageY;
		if(s_x*4<$(document).width()){
			$(document).mouseup(function(e){
				e_x=e.pageX;
				e_y=e.pageY;
				var c_x=(e_x-s_x);
				var c_y=(e_y-s_y);
				c_y=c_y>0?c_y:-c_y;
				if(c_x>0){
					if(c_y/c_x<1){
						window.history.go(-1);
					}
				}else if(c_x==0){
						window.history.go(-1);
				}
			});
		}
	});	
	*/
}
/**
*非微信浏览器屏蔽
*@author zhangwei
*/
function shield_browser(){ 
	 if(isWeiXin()){
		 
	 }else{
	 	alert("非微信浏览器，请切换浏览器进行浏览");
		window.close();
	 }
}
/**
*判断是否是微信浏览器
*@return true/false
*@author zhangwei
*/
function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	} 
}
/**
*监听A便签实践是否删除上一记录
*@return true/false
*@author zhangwei
*/
function a_listen(){
	$(".a_del_back").click(function(){
		location.replace(this.href);
		event.returnValue=false;
	});
}

/**
*自定义提示框myalert()
*@author zhangwei
*/
var alert_flag=0;
function myalert(txt){
	if($("#alert_block").attr("show")=='1'){
		$("#alert_block").css("bottom",0-$("#alert_block").height());
		$("#alert_block").css("opacity","0");
		$("#alert_block").attr("show","0");
		alert_flag++;
	}
	$("#alert_block .txt").html(txt);
	var bottom=$("#menu_block").height()+$("#sub_block").height()+$("#bar .inp_block").height();
	$("#alert_block").css("bottom",bottom+10+"px");
	$("#alert_block").css("opacity","1");
	$("#alert_block").attr("show","1");
	setTimeout(function(){
		if(alert_flag==0){
			$("#alert_block").css("bottom",0-$("#alert_block").height());
			$("#alert_block").css("opacity","0");
			$("#alert_block").attr("show","0");
		}else{
			alert_flag--;
		}
	},4000);
}
/**
*屏幕适配1：搜索框适配
*@author zhangwei
*/
function rfWin_search_block(){
	var container_W=$("#container").width();
	
	$("#search_block").css("width",container_W);
	var search_block_h=container_W/8;
	$("#search_block").css("height",search_block_h);
	$("#main_block").css("padding-top",search_block_h);
	
}
/**
*屏幕适配1：搜索框适配2
*@author zhangwei
*/
function rfWin_search_block2(){
	var container_W=$("#container").width();
	
	$("#search_block2").css("width",container_W);
	var search_block_h=$("#search_block2").css("height");
	$("#main_block").css("padding-top",search_block_h);
	
}
/**
*屏幕适配2：底部菜单适配
*@author zhangwei
*/
function rfWin_menu_block(){
	var container_W=$("#container").width();
	
	$("#menu_block").css("width",container_W);
	var menu_block_h=container_W/6.5>76?76:container_W/6.5;
	$("#menu_block").css("height",menu_block_h);
	
	//调整menu_padding_block的高
	$(".menu_padding_block").css("height",menu_block_h);
	
	//top按键位置
	$("#btn_top").css("height",menu_block_h/1.3);
	$("#btn_top").css("width",menu_block_h/1.3);
	$("#btn_top").css("line-height",menu_block_h/1.3+"px");
	$("#btn_top").css("bottom",menu_block_h+10);
	
}
/**
*屏幕适配：置顶按键
*@author zhangwei
*/
function rfWin_2Top(){
	var container_W=$("#container").width();
	
	var menu_block_h=container_W/6.5>76?76:container_W/6.5;

	//top按键位置
	$("#btn_top").css("height",menu_block_h/1.3);
	$("#btn_top").css("width",menu_block_h/1.3);
	$("#btn_top").css("line-height",menu_block_h/1.3+"px");
	$("#btn_top").css("bottom",10);
	
}


/**
*屏幕适配3：底部按键组适配
*@author zhangwei
*/
function rfWin_foot_block(){
	var container_W=$("#container").width();
	
	$(".foot_block").css("width",container_W);
	//调整menu_padding_block的高
	$(".menu_padding_block").css("height",$(".foot_block").height()+"px");
	
	
}
/**
*屏幕适配4：rfWin_square_pic();//方图适配
*@author zhangwei
*/
function rfWin_square_pic(){
	$(".square_pic").each(function() {
       $(this).css("height",$(this).width()); 
    });
}
/**
*屏幕适配4：rfWin_square_bac();//方图随机派背景色
*@author zhangwei
*/
function rfWin_square_bac(){
	$(".square_bac").each(function() {
		var color_list=["#B6DAD7","#E7E6CF","#DED3E7","#D7E092","#E7D6D6","#BBDFBB","#C5D6F1","#C2F3B1"];
		var color_index=parseInt(Math.random()*color_list.length);
		$(this).css("background-color",color_list[color_index]);
    });
}

// 设置cookie
function setCookie(name,value)
{
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();

    
//    var strsec = getsec(time);
//    var exp = new Date();
//    exp.setTime(exp.getTime() + strsec*1);
//    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return (arr[2]);
    else
        return null;
}



window.onselectstart=function()   {return   false;}       //禁用选择
window.oncopy=function()   {return   false;}       //禁止复制
//禁止查看源代码
function stop(){
return false;
}
document.oncontextmenu=stop;
document.onkeydown=function(){ 
if(window.event && window.event.keyCode >= 113&&window.event.keyCode<=123&&window.event.keyCode!=116) { 
return false;
};
}
