// JavaScript Document
var count=0;

$(document).ready(function(){
	$(window).resize(function(e) {
        rfWin();//窗口适配
    });
	rfWin();//窗口适配
	//登陆
	$("#login_info #btn_login").click(function(){
		$("#login_block #ifm_login").attr("src","html/frm_login.html");
		$("#cover").css("display","block");
		var s_widch=document.documentElement.clientWidth;
		var s_height=document.documentElement.clientHeight;
		var div_width=$("#login_block").width();
		var div_heigth=$("#login_block").height();
		$("#login_block").css("left",s_widch*0.5-div_width*0.5); //div块居中
		$("#login_block").css("top",s_height*0.5-div_heigth*0.5); //div块居中
    	$("#login_block").css("display","block");
	});
	//注册
	$("#login_info #btn_regist").click(function(){
		$("#regist_block #ifm_regist").attr("src","html/frm_regist.html");
		$("#cover").css("display","block");
		var s_widch=document.documentElement.clientWidth;
		var s_height=document.documentElement.clientHeight;
		var div_width=$("#regist_block").width();
		var div_heigth=$("#regist_block").height();
		$("#regist_block").css("left",s_widch*0.5-div_width*0.5); //div块居中
		$("#regist_block").css("top",s_height*0.5-div_heigth*0.5); //div块居中
    	$("#regist_block").css("display","block");
	});
	//添加运单
	$("#nav_f_add").click(function(){
		$("#ifm_add_yd").attr("src","html/tianjiayundan.html");
		$("#cover").css("display","block");
		var s_widch=document.documentElement.clientWidth;
		var s_height=document.documentElement.clientHeight;
		var div_width=$("#detail").width();
		var div_heigth=$("#detail").height();
		$("#detail").css("left",s_widch*0.5-div_width*0.5); //div块居中
		$("#detail").css("top",s_height*0.5-div_heigth*0.5); //div块居中
    	$("#detail").css("display","block");
	});
	//收缩功能块
	$("#body_left #flex_btn").click(function(){
		if($("#body_left #func_block").css("display")=="block"){
			$("#body_left #func_block").css("display","none");
			$("#body_left #flex_btn img").attr("src","pic/row_right.png");
			rfWin();
		}else{
			$("#body_left #func_block").css("display","block");
			$("#body_left #flex_btn img").attr("src","pic/row_left.png");
			rfWin();
		}
	});
	//功能块上下滑动按钮
	$("#nav_f1").click(function(){
		$("#func_block #up_btn a").attr("href","#");
		$("#func_block #down_btn a").attr("href","#func_b2");	
	});
	$("#nav_f2").click(function(){
		$("#func_block #up_btn a").attr("href","#func_b1");
		$("#func_block #down_btn a").attr("href","#func_b3");	
	});
	$("#nav_f3").click(function(){
		$("#func_block #up_btn a").attr("href","#func_b2");
		$("#func_block #down_btn a").attr("href","#");	
	});
	$("#func_block #up_btn a").click(function(){
		var a_up_href_str="#func_b";
		var a_down_href_str="#func_b2";
		if($(this).attr("href")=="#func_b1"){
			a_up_href_str="#func_b";
			a_down_href_str="#func_b2";
		}else if($(this).attr("href")=="#func_b2"){
			a_up_href_str="#func_b1";
			a_down_href_str="#func_b3";
		}
		$("#func_block #up_btn a").attr("href",a_up_href_str);
		$("#func_block #down_btn a").attr("href",a_down_href_str);	
	});
	$("#func_block #down_btn a").click(function(){
		var a_up_href_str="#func_b2";
		var a_down_href_str="#func_b";
		if($(this).attr("href")=="#func_b2"){
			a_up_href_str="#func_b1";
			a_down_href_str="#func_b3";
		}else if($(this).attr("href")=="#func_b3"){
			a_up_href_str="#func_b2";
			a_down_href_str="#func_b";
		}
		$("#func_block #up_btn a").attr("href",a_up_href_str);
		$("#func_block #down_btn a").attr("href",a_down_href_str);
	});
	//搜索框下按钮点击样式
	$(".btn_search2").click(function(){
		$(".btn_search2").css("background","#ccc")
		$(this).css("background","#03F");
		$("#btn_search").attr("value",$(this).attr("value")+"搜索");
		
	});
});

//窗口适配
function rfWin(){
	var win_H=$(window).height();
	var win_W=$(window).width();
	var nav_H=$("#nav").height();
	var nav_W=$("#nav").width();
	var body_left_W=$("#body_left").width();
	var body_left_H=$("#body_left").height();
	
	$("#body_right").css("width", nav_W - body_left_W);
	$("#body_left").css("height", win_H - nav_H-1);
	$("#body_right").css("height", win_H - nav_H-1);
	$("#func_container .ifm_fb").css("height", win_H - nav_H-1-100);
	
	$("#body_left #flex_btn").css("margin-top",$("#body_left").height()*0.44); 
}



function log_off(){
	confirm("确定注销？");
}

function hide_cover(){
	var coverObj=document.getElementById("cover");
	var detailObj=document.getElementById("detail");
	coverObj.style.display="none";
	detailObj.style.display="none";
	$("#cover #detail").css("width","550px");
	$("#login_block").css("display","none");
	$("#regist_block").css("display","none");
	
}
function show_cover(){
	var coverObj=document.getElementById("cover");
	var detailObj=document.getElementById("detail");
	coverObj.style.display="block";
	var s_widch=document.documentElement.clientWidth;
		var s_height=document.documentElement.clientHeight;
	var div_width=$("#cover #detail").width();
	$("#cover #detail").css("left",s_widch*0.5-div_width*0.5); //div块居中
	detailObj.style.display="block";
	
}

function hello(idname){
	var Obj=document.getElementById(idname);
	Obj.style.boxShadow="#03F 1px 1px";
}
function bye(idname){
	var Obj=document.getElementById(idname);
	Obj.style.boxShadow="";
}

function show_list(idname,id_child){
	hello(idname);
	var Obj=document.getElementById(id_child);
	Obj.style.display="block";
}
function hide_list(idname,id_child){
	bye(idname);
	var Obj=document.getElementById(id_child);
	Obj.style.display="";
}







