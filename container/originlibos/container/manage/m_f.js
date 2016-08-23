// JavaScript Document

$(document).ready(function(){
	//////////////////
	$('#mf_s1f1 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号评论记录");
			$('#mf_s1f1 #tr1').slideUp(0);
		},1000);
	});

	$('#mf_s1f1 #btn2').click(function() {
		setTimeout(function (){
			alert("已屏蔽2号评论记录");
			$('#mf_s1f1 #state2').html("已屏蔽");
			$('#mf_s1f1 #btn2').css("background","#070");
			$('#mf_s1f1 #btn2').html("开放");
		},1000);
	});

	$('#mf_s1f1 #btn3').click(function() {
		setTimeout(function (){
			alert("已开放3号评论记录");
			$('#mf_s1f1 #state3').html("开放中");
			$('#mf_s1f1 #btn3').css("background","#ccc");
			$('#mf_s1f1 #btn3').html("屏蔽");
		},1000);
	});
	//////////////////////////
	$('#mf_s1f2 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号资源数据");
			$('#mf_s1f2 #tr1').slideUp(0);
		},1000);
	});

	$('#mf_s1f2 #update2').click(function() {
		setTimeout(function (){
			alert("已审核2号评论记录");
			$('#mf_s1f2 #state2').html("已审核");
			$('#mf_s1f2 #update2').html("更新");
		},1000);
	});
	//////////////////////////
	$('#mf_s1f3 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号数据");
			$('#mf_s1f3 #tr1').slideUp(0);
		},1000);
	});
	//////////////////////
	$('#mf_s2f1 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号图书馆数据");
			$('#mf_s2f1 #tr1').slideUp(0);
		},1000);
	});
	/////////////////////////
	$('#mf_s2f2 #submit').click(function() {
		var name=$("#mf_s2f2 #name").val();
		var addr=$("#mf_s2f2 #addr").val();
		var link=$("#mf_s2f2 #link").val();
		var intro=$("#mf_s2f2 #intro").val();
		var file_logo=$("#mf_s2f2 #file_logo").val();
		var file_codescript=$("#mf_s2f2 #file_codescript").val();
		var str=""+
		'<tr>'+
      	'<td>3</td>'+
      	'<td>'+name+'</td>'+
      	'<td>'+addr+'</td>'+
      	'<td>'+intro+'</td>'+
      	'<td>'+link+'</td>'+
      	'<td>'+
          '<a href="#" id="update" class="btn">更新</a>'+
          '<a href="#" id="del" class="btn del">删除</a>'+
        '</td>'+
      '</tr>';
		setTimeout(function (){
			alert("新图书馆添加成功！\n----------------\n名称："+name+"\n地址："+addr+"\n连接："+link+"\n简介："+intro+"\nLogo文件："+file_logo+"\n脚本文件："+file_codescript+'\n----------------');
			$('#mf_s2f1 #table').html($('#mf_s2f1 #table').html()+str);
			
			$("#func_block .s_func").css("background","#CCC");
		    $("#s2 #s2_func1").css("background","#090");
			//$("#bl1").slideDown(1000);
			$("#s_manager_block .title").html("管理图书馆");
			$("#s_manager_block .manager_frame").css("display","none");
			$("#s_manager_block #mf_s2f1").slideDown(0);
		},1000);
		
	});
	////////////////////////
	$('#mf_s3f1 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号书店数据");
			$('#mf_s3f1 #tr1').slideUp(0);
		},1000);
	});
/////////////////////////
	$('#mf_s3f2 #submit').click(function() {
		var name=$("#mf_s3f2 #name2").val();
		var manager_account=$("#mf_s3f2 #manager_account").val();
		var file_logo=$("#mf_s3f2 #file_logo2").val();
		var addr=$("#mf_s3f2 #addr2").val();
		var link=$("#mf_s3f2 #link2").val();
		var addrmap=$("#mf_s3f2 #addrmap2").val();
		var intro=$("#mf_s3f2 #intro2").val();
		var str=""+
		'<td>2</td>'+
      	'<td>'+name+'</td>'+
      	'<td>'+addr+'</td>'+
      	'<td>'+intro+'</td>'+
      	'<td>'+link+'</td>'+
      	'<td>'+
          '<a href="#" id="update" class="btn">更新</a>'+
          '<a href="#" id="del2" class="btn del">删除</a>'+
        '</td>';
		setTimeout(function (){
			alert("新图书添加成功！\n----------------\n名称："+name+"\n管理员账号："+manager_account+"\nLogo文件："+file_logo+"\n连接："+link+"\n地址："+addr+"\n坐标或地图链接："+addrmap+"\n简介："+intro+'\n----------------');
			$('#mf_s3f1 #table').html($('#mf_s3f1 #table').html()+str);
			$("#func_block .s_func").css("background","#CCC");
		    $("#s3 #s3_func1").css("background","#090");
			//$("#bl1").slideDown(1000);
			$("#s_manager_block .title").html("书店管理");
			$("#s_manager_block .manager_frame").css("display","none");
			$("#s_manager_block #mf_s3f1").slideDown(0);
		},1000);
		
	});
	////////////////////////
	$('#mf_s3f3 #del1').click(function() {
		setTimeout(function (){
			alert("已删除1号广告数据");
			$('#mf_s3f3 #tr1').slideUp(0);
		},1000);
	});
	$('#mf_s3f3 #btn2').click(function() {
		setTimeout(function (){
			alert("开始推广2号广告");
			$('#mf_s3f3 #state2').html("推广中");
			$('#mf_s3f3 #btn2').html("取消");
		},1000);
	});
	$('#mf_s3f3 #btn3').click(function() {
		setTimeout(function (){
			alert("取消推广3号广告");
			$('#mf_s3f3 #state3').html("取消");
			$('#mf_s3f3 #btn3').html("推广");
		},1000);
	});
});




