// JavaScript Document


//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮
    });
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮

	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h();
		add_data();//加载数据
	});
	
	
	btn_search_listen();//搜索按钮监听
	
});


/**
*搜索按钮监听
*@return
*@author zhangwei
*/
function btn_search_listen(){
	$("#search_block2 .btn_search").click(function(){
		var keyword=$("#search_block2 .search_input").val();
		keyword=keyword.replace(/(^\s*)|(\s*$)/g, "")
		if(keyword==null||keyword==""){
			$("#search_block2 .search_in").css("box-shadow","0 0 30px #ff0");
			return;
		}else{
			$("#search_block2 .search_in").css("box-shadow","0 0 0px #f00");
			myalert(keyword);
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
	/*
	 if(scrolltop<$(document).scrollTop()){
		 $("#top_btn_block").slideUp(100);
	 }else{
		 $("#top_btn_block").slideDown(50);
	 }
	 */
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
        	$("#erhuo_block .list_x").append($("#erhuo_block .list_x").html());	
		},600);
       	
    } 
}


