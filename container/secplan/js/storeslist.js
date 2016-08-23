// JavaScript Document


//dom树构造完毕后运行
$(document).ready(function(e) {
	add_data();//店铺数据加载
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮
    });
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮
	touchslider_reload();//大广告重新加载
	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h();
		add_data();//店铺数据下拉加载
	});
	
	//收藏按钮事件
	collect_listen();
});


/**
*屏幕适配:大广告重新加载
*@author zhangwei
*/
function touchslider_reload() {
	$(window).resize(function(){
		var width=$("#container").width();
		//广告区
		$('#adds_block .touchslider-viewport').css('height',2*(width/5));
		
		//好店推荐区
		$('#weidian_block .touchslider-viewport').css('height',2*(width/5));
		
	}).resize();
	
    $("#adds_block .touchslider").touchSlider({mouseTouch: true, autoplay: true,duration: 400,delay: 4000,});
	$('#weidian_block .touchslider').touchSlider({mouseTouch: true, autoplay: true,duration: 300,delay: 10000,margin: 5});
}


/**
*收藏按钮事件
*@author zhangwei
*/
function collect_listen() {
	$(".collect_block").click(function(){
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
	 
	 scrolltop = $(document).scrollTop();
     if(scrolltop>400){
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
        	$("#stores_block .list").append($("#stores_block .list").html());	
		},600);
       	
    } 
}


