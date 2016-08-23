// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_top_block();//搜索框适配
		rfWin_nav_class_block();//导航、分类框适配
        rfWin_menu_block();//底部菜单适配
    });
		rfWin_top_block();//搜索框适配
		rfWin_nav_class_block();//导航、分类框适配
        rfWin_menu_block();//底部菜单适配
		touchslider_reload();//大广告重新加载
	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h();
		add_data();
	});
});

		
/**
*大广告重新加载
*@return
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
*导航、分类框适配
*@return
*@author zhangwei
*/
function rfWin_nav_class_block(){
	$("#class_block .single_class").css("height",$("#class_block .single_class").width());
	$('#nav_block').css('height',2*($('#nav_block').width()/9));
	
}
			
/**
*top按钮显隐控制
*@return
*@author zhangwei
*/
var scrolltop=0;
function btn_s_h(){
	 if(scrolltop<$(document).scrollTop()){
		 $("#top_block").slideUp(100);
	 }else{
		 $("#top_block").slideDown(100);
	 }
	 if(scrolltop - $(document).scrollTop()>20||scrolltop - $(document).scrollTop()<-20)scrolltop = $(document).scrollTop();
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
    if ($(document).height() <= totalheight+10) 
    { 
		setTimeout(function(){
			//加载数据
			var txt_htm='<div class="single_d">'+
                '<p class="tlt">【Logo Designer】Elizabeth</p>'+
                '<a class="btn_lock" href="#" ><img src="img/app/ico_eye.png" /></a>'+
                '<span class="photo2d" style=" background-image:url(img/d/d2_photo.jpg);"></span>'+
                '<a class="a_d_work" href="#"><span class="work_img" style="background-image:url(img/d/d2_work1.jpg);"></span></a>'+
                '<a class="a_d_work" href="#"><span class="work_img" style="background-image:url(img/d/d2_work2.jpg);"></span></a>'+
                '<a class="a_d_work" href="#"><span class="work_img" style="background-image:url(img/d/d2_work3.jpg);"></span></a>'+
            '</div>';
       		$("#d_block").append($("#d_block").html());
			
		},1200);
       	
    } 
}