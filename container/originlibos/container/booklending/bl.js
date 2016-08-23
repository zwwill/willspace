// JavaScript Document

$(document).ready(function(){
	//当前页样式控制
 	$("#nav_list #nav3").css("background","#093");

   //btn_bl1 当前借阅按钮
  $("#bl_block_top #btn_bl1").click(function(){
    $(".bl_show").css("display","none");
	$("#bl1").slideDown(0);
	
  });
  
   //btn_bl2 借阅历史按钮
  $("#bl_block_top #btn_bl2").click(function(){
    $(".bl_show").css("display","none");
	$("#bl2").slideDown(0);
	
  });
  
   //btn_bl3 借阅违章按钮
  $("#bl_block_top #btn_bl3").click(function(){
    $(".bl_show").css("display","none");
	$("#bl3").slideDown(0);
	
  });
  
   //btn_bl4 我的书评按钮
  $("#bl_block_top #btn_bl4").click(function(){
    $(".bl_show").css("display","none");
	$("#bl4").slideDown(0);
	
  });
  
});