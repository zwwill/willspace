// JavaScript Document


//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮
		rf_top_btn_block();//分类按钮
    });
		rfWin_search_block2();//搜索框适配
		rfWin_2Top();//置顶按钮
		rf_top_btn_block();//分类按钮

	
	//滚动条监听
	$(window.document).scroll(function () {
		btn_s_h();
		add_data();//加载数据
	});
	
	
	btn_search_listen();//搜索按钮监听
	btn_class_listen();//分类按钮监听
	btn_sort_listen();//排序按钮监听听
	
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
*分类按钮监听
*@return
*@author zhangwei
*/
function btn_class_listen(){
	$("#btn_class").click(function(){
		var isopen=$(this).attr("isopen");
		if(isopen==0){
			$(".class_block").slideDown("fast");
			$("#main_block_cover").css("display","block");
			$("body").css("overflow","hidden");
			$(this).attr("isopen",1);
		}else{
			$(".class_block").slideUp("fast");
			$("#main_block_cover").css("display","none");
			$("body").css("overflow","auto");
			$(this).attr("isopen",0);
		}
	});
	
	$(".single_class").click(function(){
		var bc=$(this).parent().children(".txt_cc").html();
		var c=$(this).html();
		$("#btn_class .txt_class").html("【"+bc+"】"+c);
		document.title="【"+bc+"】"+c;
		$(".search_in .search_input").attr("placeholder","搜索你想要的"+c);
		$(".class_block").slideUp("fast");
		$("#main_block_cover").css("display","none");
		$("body").css("overflow","auto");
		$("#btn_class").attr("isopen",0);
	});
	$("#main_block_cover").click(function(){
		$(".class_block").slideUp("fast");
		$("#main_block_cover").css("display","none");
		$("body").css("overflow","auto");
		$("#btn_class").attr("isopen",0);
	});
	$("#search_block2").click(function(){
		$(".class_block").slideUp("fast");
		$("#main_block_cover").css("display","none");
		$("body").css("overflow","auto");
		$("#btn_class").attr("isopen",0);
	});
	
}

/**
*排序按钮监听
*@return
*@author zhangwei
*/
function btn_sort_listen(){
	$("#btn_sort").click(function(){
		myalert("抱歉，暂无排序功能");
	});
}


/**
*top_btn_block 适配
*@return
*@author zhangwei
*/
function rf_top_btn_block(){
	 var container_W=$("#container").width();
	 $("#top_btn_block").css("width",container_W);
	 
	var search_block_h=$("#search_block2").height();
	var top_btn_block_h=$("#top_btn_block").height();
	var paddingtop=search_block_h+top_btn_block_h;
	$("#main_block").css("padding-top",paddingtop);
	$(".class_block").css("height",$(window).height()-paddingtop+"px");
}
/**
*main_block_cover 适配
*@return
*@author zhangwei
*/
function rf_main_block_cover(){
	 $("#top_btn_block").css("width",container_W);
	 
	var search_block_h=$("#search_block2").height();
	var top_btn_block_h=$("#top_btn_block").height();
	$("#main_block").css("padding-top",search_block_h+top_btn_block_h);
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


