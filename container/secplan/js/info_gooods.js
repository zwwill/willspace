// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_foot_block();//底部按键组适配
		rfWin_main_pic();//屏幕适配：主图
    });
		rfWin_foot_block();//底部按键组适配
		rfWin_main_pic();//屏幕适配：主图
		
	$(".img_touxiang").click(function(){
		
		wx.previewImage({
			current: '', // 当前显示的图片链接
			urls: [] // 需要预览的图片链接列表
		});
	});
	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h(); //top按钮显隐控制

	});
	//按钮绑定
	btn_listen_phonenum();//：联系电话
	btn_listen_picinfo();//图片详情
	btn_listen_comment();//留言
	collect_listen();//收藏
	btn_listen_add2basket();//加入
	
	
	
		
		
});


/**
*屏幕适配：主图
*@author zhangwei
*/
function rfWin_main_pic(){
	var container_W=$("#container").width();

	//top按键位置
	$("#img_block").css("height",container_W);
	
}
/**
* 按钮绑定：联系电话
*@author zhangwei
*/
function btn_listen_phonenum(){
	$("#seller_block .btn_shownum").click(function(){
		$(this).slideUp();	
		setTimeout(function(){$("#seller_block .btn_shownum").slideDown();},3000)
	});
}
/**
* 按钮绑定：图片详情btn_picinfo
*@author zhangwei
*/
function btn_listen_picinfo(){
	$("#further_block #btn_picinfo").click(function(){
		var is_on=$(this).attr("on");
		if(is_on=="0"){
			$(this).attr("on",1);
			$(this).css("color","#666");
			$(this).css("background","#ddd");
			$("#further_block .comment_block").css("display","none");
			$("#further_block .picinfo_block").css("display","block");
			$("#further_block #btn_comment").attr("on",0);
			$("#further_block #btn_comment").css("color","#fff");
			$("#further_block #btn_comment").css("background","#aaa");
		}else{return;}
	});
}
/**
* 按钮绑定：留言comment_block
*@author zhangwei
*/
function btn_listen_comment(){
	$("#further_block #btn_comment").click(function(){
		var is_on=$(this).attr("on");
		if(is_on=="0"){
			$(this).attr("on",1);
			$(this).css("color","#666");
			$(this).css("background","#ddd");
			$("#further_block .picinfo_block").css("display","none");
			$("#further_block .comment_block").css("display","block");
			$("#further_block #btn_picinfo").attr("on",0);
			$("#further_block #btn_picinfo").css("color","#fff");
			$("#further_block #btn_picinfo").css("background","#aaa");
		}else{return;}
	});
}
/**
*收藏按钮事件
*@author zhangwei
*/
function collect_listen() {
	$("#btn_collect").click(function(){
		var collected_state=$(this).attr("collected");	
		if(collected_state==0){
			$(this).children("img").attr("src","../img/app/ico_star_on.png");
			$(this).attr("collected",1);
		}else{
			$(this).children("img").attr("src","../img/app/ico_star.png");
			$(this).attr("collected",0);
		}
	});
	
}
		
/**
*top按钮显隐控制
*@return
*@author zhangwei
*/
var scrolltop;
function btn_s_h(){
	$("#main_block .top_btn_block").stop(true,true);
	 if(scrolltop<$(document).scrollTop()){
		 $("#main_block .top_btn_block").slideUp(100);
	 }else{
		 $("#main_block .top_btn_block").slideDown(100);
	 }
	 scrolltop = $(document).scrollTop();
  
}

/**
*加入购物车
*@author zhangwei
*/
function btn_listen_add2basket(){
	$("#btn_add2basket").click(function(){
		myalert("已加入购物车");
	});
}

/**
*
*@author zhangwei
*/
function func_(){
	
}

