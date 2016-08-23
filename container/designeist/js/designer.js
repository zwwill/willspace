// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
        rfWin_menu_block();//底部菜单适配
		rfWin_single_d('all');//设计师框适配
    });
        rfWin_menu_block();//底部菜单适配
		rfWin_single_d('all');//设计师框适配
	
	//滚动条监听
	$(window.document).scroll(function () {
		//btn_s_h();
		add_data();
	});
});


			
/**
*设计师框适配
*@return
*@author zhangwei
*/
function rfWin_single_d(id){
	if(id=='all'){
		$('#d_list .single_d').css('height',$('#d_list .single_d').width()/3);
	}else{
		$('#d_list #'+id).css('height',$('#d_list .single_d').width()/3);
	}
}
			
/**
*top按钮显隐控制
*@return
*@author zhangwei
*/
var scrolltop;
function btn_s_h(){
	 if(scrolltop<$(document).scrollTop()){
		 $("#top_block").slideUp(100);
	 }else{
		 $("#top_block").slideDown(100);
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
    if ($(document).height() <= totalheight) 
    { 
		setTimeout(function(){
			//加载数据
			/*
			var txt_htm=' <a href="#"><div class="single_d" id="d_item_0">'+
            	'<span class="d_photo" style="background-image:url(../img/d/d3_photo.jpg);"></span>'+
               ' <span class="red_line"></span>'+
                '<div class="d_info">'+
                	'<p class="d_name">BOB</p>'+
                    '<p class="d_district">美国·洛杉矶</p>'+
                    '<p class="d_profession">UI设计师</p>'+
                '</div>'+
            '</div></a>';
       		$("#d_list").append(txt_htm);
			rfWin_single_d('d_item_0');
			*/
			$("#d_list").append($("#d_list").html());
		
		},1200);
    } 
}