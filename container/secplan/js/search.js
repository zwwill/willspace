// JavaScript Document


//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
        rfWin_menu_block();//底部菜单适配
		rfWin_search_block2();//搜索框适配
		rf_top_btn_block();//分类按钮
    });
        rfWin_menu_block();//底部菜单适配
		rfWin_search_block2();//搜索框适配
		rf_top_btn_block();//分类按钮

	
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	
	btn_search_listen();//搜索按钮监听
	btn_class_listen();//分类按钮监听
	btn_sort_listen();//排序按钮监听
	load_history_kw();//加载记录按钮监听
	btn_del_listen();//删除单条记录按钮监听
	btn_clear_listen();//清空记录按钮监听
	
	listen_history_rec_click();//历史搜索记录监听
	listen_suggest_click();//推荐搜索按钮监听
});


/**
*历史搜索记录监听
*@return
*@author zhangwei
*/
function listen_history_rec_click(){
	$("#history_block .single_h").click(function(){
		myalert($(this).children("p").text());	
	});
}
/**
*推荐搜索按钮监听
*@return
*@author zhangwei
*/
function listen_suggest_click(){
	$("#suggest_block .single_sug").click(function(){
		myalert($(this).text());	
	});
}
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
			//myalert(keyword);
			if(localStorage.historykeywords==null||localStorage.historykeywords==""){
				var historykws=[keyword];
				localStorage.historykeywords=JSON.stringify(historykws);
				var html_newkw='<span class="single_h"><p>'+keyword+'</p><span class="del" h_kw_i="0">×</span></span>';
			}else{
				var historykws=eval(localStorage.historykeywords);
				historykws.push(keyword);
				var num=parseInt(historykws.length)-1;
				localStorage.historykeywords=JSON.stringify(historykws);
				var html_newkw='<span class="single_h"><p>'+keyword+'</p><span class="del" h_kw_i="'+num+'">×</span></span>';
			}
			$("#history_block .list").append(html_newkw);
			
		}
		btn_clear_s_h();
	});
}

/**
*删除单条记录按钮监听
*@return
*@author zhangwei
*/
function btn_del_listen(){
	$("#history_block .del").click(function(){
		var hkw_index=$(this).attr("h_kw_i");
		if(hkw_index==""){
			
		}else{
			var historykws=eval(localStorage.historykeywords);
			historykws[hkw_index]="";
			localStorage.historykeywords=JSON.stringify(historykws);
		}
		$(this).parent().remove();
		btn_clear_s_h();
	});
}
/**
*清空记录按钮监听
*@return
*@author zhangwei
*/
function btn_clear_listen(){
	$("#history_block .btn_clear").click(function(){		
		localStorage.historykeywords="";
		$(this).parent().children(".list").html("");
		btn_clear_s_h();
	});
}
/**
*检测数据控制清空按钮的显隐
*@return
*@author zhangwei
*/
function btn_clear_s_h(){
	var list_txt=$("#history_block .list").text();
	list_txt=list_txt.replace(/(^\s*)|(\s*$)/g, "");
	if(list_txt==""){
		$("#history_block .btn_clear").css("display","none");
		$("#history_block .remind_b").css("display","block");
	}else{
		$("#history_block .btn_clear").css("display","block");
		$("#history_block .remind_b").css("display","none");
	}
	btn_del_listen();
}

/**
*load_history_kw加载记录按钮监听
*@return
*@author zhangwei
*/
function load_history_kw(){
	if(localStorage.historykeywords==null||localStorage.historykeywords==""){
	  return;
	}else{
		var historykws=eval(localStorage.historykeywords);
		for(var i=0;i<historykws.length;i++){
			var txt=historykws[i].replace(/(^\s*)|(\s*$)/g, "");
			if(txt==''){continue;}
			var html_newkw='<span class="single_h"><p>'+txt+'</p><span class="del" h_kw_i="'+i+'">×</span></span>';
			$("#history_block .list").append(html_newkw);
		}
		
	}
		btn_clear_s_h();
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
	var paddingbottom=$("#menu_block").height();
	$("#main_block").css("padding-top",paddingtop);
	$(".class_block").css("height",$(window).height()-paddingtop-paddingbottom+"px");
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






