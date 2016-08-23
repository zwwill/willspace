// JavaScript Document

$(document).ready(function(){

  /*
  *登陆效果
  */
	//登陆
  $("#header_right #btn_login").click(function(){
    $("#l_r").slideDown(100);
	var s_widch=document.body.clientWidth;
	var div_width=$("#l_r #login").width();
	$("#l_r #login").css("left",s_widch*0.5-div_width*0.5); //div块居中
    $("#l_r #login").slideDown(0);
	document.documentElement.style.overflow='hidden';  //禁用滚动条
  });
  //注册
   $("#header_right #btn_reg").click(function(){
    $("#l_r").slideDown(100);
	var s_widch=document.body.clientWidth;
	var div_width=$("#l_r #reg").width();
	$("#l_r #reg").css("left",s_widch*0.5-div_width*0.5); //div块居中
    $("#l_r #reg").slideDown(0);
	document.documentElement.style.overflow='hidden';  //禁用滚动条
  });
  
  	
  //取消
  $("#l_r #btn_back").click(function(){
    $("#l_r").css("display","none");
    $("#login").css("display","none");
    $("#reg").css("display","none");
	document.documentElement.style.overflow='auto';  //回复滚动条
  });
  
  
});



window.onselectstart=function()   {return   false;}       //禁用选择
window.oncopy=function()   {return   false;}       //禁止复制
//禁止查看源代码
function stop(){
return false;
}
document.oncontextmenu=stop;
document.onkeydown=function(){ 
if(window.event && window.event.keyCode >= 113&&window.event.keyCode<=123&&window.event.keyCode!=116) { 
return false;
};
}
