// JavaScript Document
//ajax跨域请求数据
jQuery.support.cors = true;
//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		//TODO
    });
	//滚动条监听
	$(window.document).scroll(function () {
		//TODO
	});
	/*按钮监听*/
	fuc_top_msg();//top_msg控制
	fuc_focus();//关注控制
	fuc_login();//登录事件控制
	fuc_banner();//横幅轮播
	fuc_tab();//课程tab事件
	fuc_course();//课程事件
	fuc_show_imgs();//滚动图片事件
	fuc_rank();//热门推荐事件
	fuc_video();//视屏观看
});
/**
*@name 视屏观看
*@return
*@author zhangwei
*/
function fuc_video(){
	var my_video=document.getElementById("my_video"); 
	//点击视频按钮
	$("#btn_show_video").click(function(){
		show_video_b();
		my_video.play();
	});
	//点击关闭按钮
	$("#m-video #btn_close").click(function(){
		hidden_video_b();
		my_video.pause();
	});
	
	
}
//显示视频块
function show_video_b(){
	$("#m-mask").css("display","block");
	$("#m-video").css("display","block");
}
//隐藏视频块
function hidden_video_b(){
	$("#m-mask").css("display","none");
	$("#m-video").css("display","none");
}

/**
*@name 热门推荐事件
*@return
*@author zhangwei
*/
var rank_index=1;
var rank_move_step=1;
var rank_item_height=70;
function fuc_rank(){
	fuc_rank_init();
	setInterval(function(){
		var top_val=-1*rank_item_height*rank_index;
		$("#rank_list").css("top",top_val);
		if(rank_index==10){
			rank_move_step=-1;
		}else if(rank_index==0){
			rank_move_step=1;
		}
		rank_index+=rank_move_step;
	},5000);
}
//rank推荐初始化
function fuc_rank_init(){
	$.ajax({
	   type: "GET",
	   url: "http://study.163.com/webDev/hotcouresByCategory.htm",
	   success: function(data_str){
			 var data=JSON.parse(data_str);
			 $("#rank_list").html("");
			 $.each(data,function(rank_index,item){
				//console.log(item);
				$("#rank_list").append(get_rank_item(item['smallPhotoUrl'],item['name'],item['learnerCount']));
			 });
			
	   },
	   error: function (a, b, c) {
       	 console.log(a);
       	 console.log(b);
       	 console.log(c);
        }
	});
	function get_rank_item(pic_url,name,learnerCount){
		return  '<div class="item">'+
				'	<span class="c_img" style="background-image:url('+pic_url+')"></span>'+
				'	<span class="c_tlt">'+name+'</span>'+
				'	<span class="menber"><img src="img/ico_head_l.png"/>'+learnerCount+'</span>'+
				'</div>';	
	}
}

/**
*@name 滚动图片事件
*@return
*@author zhangwei
*/
var show_imgs_index=1;
var show_imgs_move_step=1;
var show_imgs_item_width=324;
function fuc_show_imgs(){
	
	setInterval(function(){
		var left_val=-1*show_imgs_item_width*show_imgs_index;
		$(".m-show_imgs .con").css("left",left_val);
		if(show_imgs_index==8){
			show_imgs_move_step=-1;
		}else if(show_imgs_index==0){
			show_imgs_move_step=1;
		}
		show_imgs_index+=show_imgs_move_step;
	},3000);
}
/**
*@name 课程事件
*@return
*@author zhangwei
*/
var course_index=1;
var course_type=10;
var course_psize=24;
var max_p_count=1;
function fuc_course(){
	fuc_course_init(1,course_psize,10,1);
	//弹窗事件
	$('#c_list').delegate('.c_item', 'mouseover', function(e) { 
		var pageX=e.pageX;
		var pageY=e.pageY;
		$(".m-course #course_popup").css("left",pageX+20);
		$(".m-course #course_popup").css("top",pageY);
		var pic_url=$(this).children(".c_img").css("background-image")
		var name=$(this).children(".tlt").text();
		var learnerCount=$(this).children(".menber").text();
		var provider=$(this).children(".class_name").text();
		var categoryName=$(this).attr("category_name");
		var description=$(this).attr("description");
		reset_course_popup(pic_url,name,learnerCount,provider,categoryName,description);
		$(".m-course #course_popup").css("display","block");
	});
	$('#c_list').delegate('.c_item', 'mousemove', function(e) { 
		var pageX=e.pageX;
		var pageY=e.pageY;
		$(".m-course #course_popup").css("left",pageX+20);
		$(".m-course #course_popup").css("top",pageY);
	}); 
	$('#c_list').delegate('.c_item', 'mouseleave', function() { 
		$(".m-course #course_popup").css("display","none");
	}); 
	
	
	//页码跳转
	$('.m-course .b_page').delegate('.page_i:not(.on)', 'click', function() { 
		course_index=parseInt($(this).text());
		fuc_course_init(course_index,course_psize,course_type);
	}); 
	$('.m-course .b_page').delegate('#btn_page_sub', 'click', function() { 
		if(course_index>1){
			course_index--;
			fuc_course_init(course_index,course_psize,course_type);
		}else{
			alert("已经是首页了!")	
		}
	}); 
	$('.m-course .b_page').delegate('#btn_page_plus', 'click', function() { 
		if(course_index<max_p_count){
			course_index++;
			fuc_course_init(course_index,course_psize,course_type);
		}else{
			alert("已经是尾页了!")	
		}
	}); 
}
//课程列表初始化
function fuc_course_init(pageNo,psize,type,init){
	var data={
			pageNo:pageNo,
			psize:psize,
			type:type
		};
	$.ajax({
	   type: "GET",
	   url: "http://study.163.com/webDev/couresByCategory.htm",
	   data:data,
	   success: function(data_str){
			 var data=JSON.parse(data_str);
			 var totalCount=data['totalCount'];
			 var totalPage=data['totalPage'];
			 if(init==1)
			 	max_p_count=parseInt(totalPage);
			 var pagination=data['pagination'];
			 var list=data['list'];
			 $(".m-course #c_list").html("");
			 $.each(list,function(index,item){
				//console.log(item);
				 $(".m-course #c_list").append(get_course_item(item['middlePhotoUrl'],item['name'],item['provider'],item['learnerCount'],item['price'],item['categoryName'],item['description']));
			 });
			 if(init==1){
				 $(".m-course .b_page .page_con").html('<i id="btn_page_sub" class="btn_row row_left"></i>');
				 for(var i=1;i<=max_p_count;i++){
					 if(max_p_count>7 && i==6){
						$(".m-course .b_page .page_con").append('<i class="page_i">...</i>');
						i=max_p_count-1;
						continue;
					 }
					 if(i==pageNo){
						$(".m-course .b_page .page_con").append('<i class="page_i on">'+i+'</i>');
					 }else{
						$(".m-course .b_page .page_con").append('<i class="page_i">'+i+'</i>');
					 }
				 }
				 $(".m-course .b_page .page_con").append('<i id="btn_page_plus" class="btn_row row_right"></i>');
			 }else{
				 $(".m-course .b_page .page_con").html('<i id="btn_page_sub" class="btn_row row_left"></i>');
				 for(var i=1;i<=max_p_count;i++){
					 if(max_p_count>7 && i==2 && pageNo>=4 && pageNo<max_p_count-3){
						$(".m-course .b_page .page_con").append('<i class="page_i0">...</i>');
						$(".m-course .b_page .page_con").append('<i class="page_i">'+(pageNo-1)+'</i>');
						$(".m-course .b_page .page_con").append('<i class="page_i on">'+pageNo+'</i>');
						$(".m-course .b_page .page_con").append('<i class="page_i">'+(pageNo+1)+'</i>');
						$(".m-course .b_page .page_con").append('<i class="page_i0">...</i>');
						$(".m-course .b_page .page_con").append('<i class="page_i">'+max_p_count+'</i>');
						break;
					 }
					 if(max_p_count>7 && i>5 && i<max_p_count-1 && pageNo<max_p_count-3){
						$(".m-course .b_page .page_con").append('<i class="page_i0">...</i>');
						i=max_p_count-1;
						continue;
					 }					 
					 if(max_p_count>7 && i==2 && pageNo>=max_p_count-4){
						$(".m-course .b_page .page_con").append('<i class="page_i0">...</i>');
						i=max_p_count-5;
						continue;
					 }
					 if(i==pageNo){
						$(".m-course .b_page .page_con").append('<i class="page_i on">'+i+'</i>');
					 }else{
						$(".m-course .b_page .page_con").append('<i class="page_i">'+i+'</i>');
					 }
				 }
				 $(".m-course .b_page .page_con").append('<i id="btn_page_plus" class="btn_row row_right"></i>');
			 }
	   }
	});
	function get_course_item(pic_url,name,provider,learnerCount,price,categoryName,description){
		var price_html='<span class="price">￥'+price.toFixed(2)+'</span>';
		if(price==0)price_html='<span class="price" style="color:#39a030;">免费</span>';
		return  '<div class="c_item" category_name="'+categoryName+'" description="'+description+'">'+
				'	<span class="c_img" style="background-image:url('+pic_url+')"></span>'+
				'	<span class="tlt">'+name+'</span>'+
				'	<span class="class_name">'+provider+'</span>'+
				'	<span class="menber"><img src="img/ico_head_l.png"/>'+learnerCount+'</span>'+
					price_html+
				'</div>';	
	}
}
//更新弹框
function reset_course_popup(pic_url,name,learnerCount,provider,categoryName,description){
	$("#course_popup .c_img").css("background-image",pic_url);
	$("#course_popup .tlt").html(name);
	$("#course_popup #learner_count").html(learnerCount);
	$("#course_popup #provider").html("发布者："+provider);
	if(categoryName=='null'||categoryName==null||categoryName=="")categoryName="未分类";
	$("#course_popup #category_name").html("分类："+categoryName);
	$("#course_popup .info .info_con").html(description);
}
/**
*@name 课程tab事件
*@return
*@author zhangwei
*/
function fuc_tab(){
	//tab事件代理
	$('.m-course .tab').delegate('.tab_i:not(.on)', 'click', function() { 
		$('.m-course .tab .tab_i').removeClass("on");
		$(this).addClass("on");
		var tab_i=$(this).text();
		if(tab_i=="产品设计"){
			fuc_course_init(1,course_psize,10,1);
			course_type=10;
		}else if(tab_i=="汇编语言"){
			fuc_course_init(1,course_psize,20,1);
			course_type=20;
		}
	}); 
}

/**
*@name 横幅轮播
*@return
*@author zhangwei
*/
function fuc_banner(){
	fuc_banner_run();
	
	$("#banner_con").mouseover(function(){
		clearInterval(banner_interval);
	});
	$("#banner_con").mouseleave(function(){
		fuc_banner_run();
	});
}
var max_num=3;//总长度
var banner_index=1;//当前位置
var banner_interval;//轮播全局控制器
function fuc_banner_run(){
	banner_interval=setInterval(function(){
		if(banner_index>=max_num)
			banner_index=0;
		show_banner(++banner_index);
	},5000);
}
//现实banner
function show_banner(target){
	$("#banner_con .item").css("display","none");
	$("#banner_con #item"+target).css("display","block");
	$("#banner_con .item").css("opacity",0);
	$("#banner_i .item_i").removeClass("on");
	$("#banner_i #i"+target).addClass("on");
	setTimeout(function(){$("#banner_con #item"+target).css("opacity",1);},100);
	
}
/**
*@name 关注控制
*@return
*@author zhangwei
*/
function fuc_focus(){
	var followSuc=getCookie("followSuc"); 
	if(1==followSuc){
		$("#focus_default").css("display","none");
		$("#focus_alter").css("display","block");
	}
	$("#btn_focus").click(function(){
		var loginSuc=getCookie("loginSuc"); 
		if(0==loginSuc||!loginSuc){
			//未登录
			show_login_b();
		}else{
			//已登录
			do_focus();//加专注
		}
	});
	//取消关注
	$("#focus_alter .btn_cancel").click(function(){
		cancel_focus();	
	});
}	
//关注
function do_focus(){
	$.ajax({
	   type: "GET",
	   url: "http://study.163.com/webDev/attention.htm",
	   success: function(msg){
		 if(1==msg){
			//alert(1);//关注成功
			setCookie("followSuc",1);
			$("#focus_default").css("display","none");
			$("#focus_alter").css("display","block");
		 }
	   }
	});
}
//取消关注
function cancel_focus(){
	setCookie("followSuc",0);
	$("#focus_default").css("display","block");
	$("#focus_alter").css("display","none");
}

/**
*@name 登录事件控制
*@return
*@author zhangwei
*/
function fuc_login(){
	$("#m-login #btn_close").click(function(){
		hidden_login_b();
	});
	$("#btn_login").click(function(){
		var account=$("#m-login #login_account").val();
		if(account==""||account==null){
			alert("请输入帐号");
			return;
		}
		var pwd=$("#m-login #login_pwd").val();
		if(pwd==""||pwd==null){
			alert("请输入密码");
			return;
		}
		var data={
			userName:$.md5(account),
			password:$.md5(pwd)
		};
		$.ajax({
		   type: "GET",
		   url: "http://study.163.com/webDev/login.htm",
		   data: data,
		   success: function(msg){
			 if(1==msg){
				 login_suc();//登录成功
				 do_focus();//完成关注
			 }else{
				 alert("您输入的帐号或密码有误，请确认后再输入。");
			 }
		   }
		});
		
		
	});
	
}
//显示登录块
function show_login_b(){
	$("#m-mask").css("display","block");
	$("#m-login").css("display","block");
	$("#m-login #login_account")[0].focus();
}
//隐藏登录块
function hidden_login_b(){
	$("#m-mask").css("display","none");
	$("#m-login").css("display","none");
	$("#m-login input").val("");
}
//登录成功
function login_suc(){
	setCookie("loginSuc",1);
	hidden_login_b();
}
	
/**
*@name 封装top_msg控制
*@return
*@author zhangwei
*/
function fuc_top_msg(){
	var top_msg_switch=getCookie("top_msg_switch"); 
	if(0==top_msg_switch){
		$("#top_msg").css("display","none");
	}else{
		$("#top_msg").css("display","block");
	}
	
	$("#btn_top_msg_hidden").click(function(){
		$("#top_msg").css("display","none");
		setCookie("top_msg_switch",0);
	});
}
	
/**
*@name 封装cookie
*@return
*@author zhangwei
*/

function setCookie(name, value, expires, path, domain, secure) {
	if(localStorage){
		localStorage.setItem(name,value);
	}else{
		var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
		if (expires)
			cookie += '; expires=' + expires.toGMTString();
		if (path)
			cookie += '; path=' + path;
		if (domain)
			cookie += '; domain=' + domain;
		if (secure)
			cookie += '; secure=' + secure;
		document.cookie = cookie;
	}
}
function getCookie(key) {
	if(localStorage){
		if(localStorage.getItem(key)){
			return localStorage.getItem(key);
		}else{
			return null;
		}
	}else{
		var cookie = {};//创建cookie对象
		var cookie_data = document.cookie;//获取cookie数据
		if (cookie_data === '')
			return cookie;
		var list = cookie_data.split('; ');
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var p = item.indexOf('=');
			var name = item.substring(0, p);
			name = decodeURIComponent(name);//url解码
			var value = item.substring(p + 1);
			value = decodeURIComponent(value);//url解码
			//cookie[name] = value;
			if(name==key)
				return value;
		}
		return null;
	}
}

