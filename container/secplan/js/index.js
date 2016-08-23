// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_search_block();//搜索框适配
        rfWin_menu_block();//底部菜单适配
    });
		rfWin_search_block();//搜索框适配
        rfWin_menu_block();//底部菜单适配
	touchslider_reload();//大广告重新加载
	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h();
		add_data();
	});
	$("#ttttt").click(function(){
		
	});
});


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
*top按钮显隐控制
*@return
*@author zhangwei
*/
var scrolltop;
function btn_s_h(){
	 if(scrolltop<$(document).scrollTop()){
		 $("#search_block").slideUp(100);
	 }else{
		 $("#search_block").slideDown(100);
	 }
	 scrolltop = $(document).scrollTop();
     if(scrolltop>600){
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
    if ($(document).height() <= totalheight+30) 
    { 
	
		setTimeout(function(){
			//加载数据
       		$("#erhuo_block .list_x").append($("#erhuo_block .list_x").html());
		},600);
       	
    } 
}