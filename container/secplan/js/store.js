// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
       rfWin_big_logo();// 适配：顶部大logo
		rfWin_2Top();//置顶按钮
    });
       rfWin_big_logo();// 适配：顶部大logo
		rfWin_2Top();//置顶按钮
		
	
	//滚动条监听
	$(window.document).scroll(function () {

		btn_s_h();
		add_data();//加载数据
	});
	//按钮监听
	collect_listen();//收藏按钮事件
});
/**
*收藏按钮事件
*@author zhangwei
*/
function collect_listen() {
	$("#top_block .collect").click(function(){
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
*适配：顶部大logo
*@author zhangwei
*/
function rfWin_big_logo(){
	var maxWidth=$("#container").width();
	var maxHeight=2*(maxWidth/5);
	//广告区
	$('#top_block .big_logo').css('height',maxHeight);
	
	var height=$('#top_block .big_logo img').height();
	var width=$('#top_block .big_logo img').width();
	var param=clacImgZoomParam( maxWidth, maxHeight, width, height );
	$('#top_block .big_logo img').css("height",param.height);
	$('#top_block .big_logo img').css("width",param.width);
	$('#top_block .big_logo img').css("margin-top",param.top);
	$('#top_block .big_logo img').css("margin-left",param.left);
	
}
/**
*适配：计算图片位置和大小
*@author zhangwei
*/
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
	var param = {top:0, left:0, width:width, height:height};
	if( true )
	{
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		 
		if( rateWidth > rateHeight )
		{
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}else
		{
			param.width =  maxWidth;
			param.height = Math.round(height / rateWidth);
		}
	}
	 
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}


/**
*top按钮显隐控制
*@return
*@author zhangwei
*/
var scrolltop;
function btn_s_h(){
	/*
	 if(scrolltop<$(document).scrollTop()){
		 $("#top_btn_block").slideUp(100);
	 }else{
		 $("#top_btn_block").slideDown(50);
	 }
	 */
	 scrolltop = $(document).scrollTop();
     if(scrolltop>800){
		 $("#btn_top").css("display","block");
	 }else{
		 $("#btn_top").css("display","none");
	 }
}

/**
*数据异步加载
*@return
*@author zhangwei
*/
function add_data(){
	var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop()); 
    if ($(document).height() <= totalheight) 
    { 
		setTimeout(function(){
			//加载数据
        	$("#list_block .list").append($("#list_block .list").html());	
		},600);
       	
    } 
}