// JavaScript Document

$(document).ready(function(){
	

	/*
	父类方法块
	*/
   //p1_func 父方法：源点平台模块
  $("#func_parent #p1_func").click(function(){
    $("#func_parent #p1_func").css("background","#090");
    $("#func_parent #p2_func").css("background","#CCC");
    $("#func_parent #p3_func").css("background","#CCC");
	//$("#bl1").slideDown(0);
	$("#func_block .func_son").css("display","none");
	$("#func_block #s1").slideDown(0);
  });
   //p2_func 父方法：图书馆模块
  $("#func_parent #p2_func").click(function(){
    $("#func_parent #p1_func").css("background","#ccc");
    $("#func_parent #p2_func").css("background","#090");
    $("#func_parent #p3_func").css("background","#CCC");
	//$("#bl1").slideDown(0);
	$("#func_block .func_son").css("display","none");
	$("#func_block #s2").slideDown(0);
  });
   //p3_func 父方法：书店模块
  $("#func_parent #p3_func").click(function(){
    $("#func_parent #p1_func").css("background","#ccc");
    $("#func_parent #p2_func").css("background","#CCC");
    $("#func_parent #p3_func").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#func_block .func_son").css("display","none");
	$("#func_block #s3").slideDown(0);
  });
  
  /*
	s1子类方法块
	*/
   //s1_func1 子方法：书评管理
  $("#s1 #s1_func1").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s1 #s1_func1").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("书评管理");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s1f1").slideDown(0);
  });
  //s1_func2 子方法：共享资源管理
  $("#s1 #s1_func2").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s1 #s1_func2").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("共享资源管理");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s1f2").slideDown(0);
  });
   //s1_func3 子方法：平台信息管理
  $("#s1 #s1_func3").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s1 #s1_func3").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("平台信息管理");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s1f3").slideDown(0);
  });
    /*
	s2子类方法块
	*/
   //s2_func1 子方法：管理图书馆
  $("#s2 #s2_func1").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s2 #s2_func1").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("管理图书馆");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s2f1").slideDown(0);
  });
  //s2_func2 子方法：新增图书馆
  $("#s2 #s2_func2").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s2 #s2_func2").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("新增图书馆");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s2f2").slideDown(0);
  });
   /*
	s3子类方法块
	*/
   //s3_func1 子方法：书店管理
  $("#s3 #s3_func1").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s3 #s3_func1").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("书店管理");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s3f1").slideDown(0);
  });
  //s3_func2 子方法：新增书店
  $("#s3 #s3_func2").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s3 #s3_func2").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("新增书店");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s3f2").slideDown(0);
  });
   //s3_func3 子方法：书店广告
  $("#s3 #s3_func3").click(function(){
    $("#func_block .s_func").css("background","#CCC");
    $("#s3 #s3_func3").css("background","#090");
	//$("#bl1").slideDown(0);
	$("#s_manager_block .title").html("书店广告");
	$("#s_manager_block .manager_frame").css("display","none");
	$("#s_manager_block #mf_s3f3").slideDown(0);
  });
  
  
  
});