// JavaScript Document

$(document).ready(function(){
	var uid=$("#login_af #user_id").text();
	userInfoGet(uid);
	

	//增加图书证
	$('#add_libcard #btn_sub').click(function() {
		var card_account=$("#add_libcard #account").val();
		setTimeout(function(){},"3000");
			setTimeout(function(){
				if(card_account=="2012020100051"){
				alert("已经检索到您的账户，图书证新增成功！\n持卡人：张威，欢迎您！");	
				$("#l_r").css("display","none");
				$("#add_libcard").css("display","none");
				$(".card_list #card2").slideDown(1000);
				}else{
					alert("抱歉您输入的卡号不存在！或是密码有误。")
				}
				
			},2000);
		//AddCard();
	});
	
	 //注册
	   $("#libcard_block #btn_addcard").click(function(){
	    $("#l_r").slideDown(100);
		var s_widch=document.body.clientWidth;
		var s_height=document.body.clientHeight;
		var div_width=$("#add_libcard").width();
		var div_height=$("#add_libcard").height();
	    var s_top = getScrollTop();
		$("#add_libcard").css("left",s_widch*0.5-div_width*0.5); //div块居中
		$("#add_libcard").css("top",s_height*0.5-div_height*0.5+s_top); 
	    $("#add_libcard").slideDown(1000);
	  });
	  
	  	
	  //取消
	  $("#add_libcard #btn_back").click(function(){
	    $("#l_r").css("display","none");
	    $("#add_libcard").css("display","none");
		document.documentElement.style.overflow='auto';  //回复滚动条
	  });
	  //取消2:点击空白
	  $("#l_r #lr_mask").click(function(){
	    $("#l_r").css("display","none");
	    $("#add_libcard").css("display","none");
	  });
	  
	  //借阅证隐藏按钮显示
	  $("#libcard_block #card1").mouseover(function(){
	    $(" #card1 #alter").slideDown(300);
	    $(" #card1 #del").slideDown(300);
	    setTimeout(
	    function(){
	    	$("#card1 #alter").slideUp(300);
	    	$("#card1 #del").slideUp(300);
	    },3000);
	  });
	  $("#libcard_block #card2").mouseover(function(){
		    $(" #card2 #alter").slideDown(300);
		    $(" #card2 #del").slideDown(300);
		    setTimeout(
		    function(){
		    	$("#card2 #alter").slideUp(300);
		    	$("#card2 #del").slideUp(300);
		    },3000);
		  });
	  $("#card1 #del").click(function(){
		  var mes=confirm("您确定要删除此图书证吗？");
			if(mes==true){ 
				$("#libcard_block #card1").slideUp(500);
			}else{
				
			}
	  });
	  
});

/**
 * 
 */
function AddCard(){
	
}


/**
 * 通过Uid查找用户
 */
function userInfoGet(uid) {
	var param = {
		"op" : "userinfoget",
		"uid" : uid,
		"requestuid" : uid
	};
	$.post("UserServlet", param, userInfoGet_render, "xml");
}
function userInfoGet_render(data) {
	var flag = $(data).find("result").attr("check");
	if (flag == "true") {
		var uid = $(data).find("result").attr("uid");
		var nickname = $(data).find("result").attr("nickname");
		var account = $(data).find("result").attr("account");
		var professionid = $(data).find("result").attr("professionid");
		var email = $(data).find("result").attr("email");
		var gender = $(data).find("result").attr("gender");
		var age = $(data).find("result").attr("age");
		var headimg = $(data).find("result").attr("headimg");
		var createdtime = $(data).find("result").attr("createdtime");
		var userlevel = $(data).find("result").attr("userlevel");
		
		var sex=""
			if(gender=="male"){
				sex="男";
			}else if(gender=="female"){
				sex="女";
			}else{
				sex="未知";
			}
		var role="";
		if(userlevel=="0"){
			role="普通用户";
		}else if(userlevel=="2"){
			role="管理员";
		}
		var info_str="<dl>"+
        "<dt></dt>"+
        "<dd class='account'>"+account+"</dd>"+
        "<dt>昵称：</dt><dd>"+nickname+"</dd>"+
        "<dt>性别：</dt><dd>"+sex+"</dd>"+
        "<dt>个人邮箱：</dt><dd>"+email+"</dd>"+
        "<dt>所在领域：</dt><dd>计算机软件</dd>"+
        "<dt>身份：</dt><dd>"+role+"</dd>"+
      "</dl>";
		$("#self_info .info_list").html(info_str);
		
	} else {
		alert("查找失败！");
	}
}


/**
 * 通过Uid更新用户信息
 */
function UserInfoUpdate() {
	var param = {
		"op" : "userinfoupdate",
		"uid" : 5,
		"nickname" : "update_test",
		"email" : "update_test@",
		"professionid" : 1111,
		"gender" : "male",
		"age" : 0,
		"headimg" : "/update_test/img"
	};
	$.post("UserServlet", param, UserInfoUpdate_render, "xml");
}
function UserInfoUpdate_render(data) {
	var flag = $(data).find("result").attr("check");
	if (flag == "true") {
		var uid = $(data).find("result").attr("uid");
		alert(uid+"更新成功");
	} else {
		alert("更新失败！");
	}
}

/**
 * 用户更改密码
 */
function UserChangePwd() {
	var param = {
		"op" : "userchangepwd",
		"uid" : 5,
		"oldpwd":"123",
		"newpwd":"changepwd_test"
	};
	$.post("UserServlet", param, UserChangePwd_render, "xml");
}
function UserChangePwd_render(data) {
	var flag = $(data).find("result").attr("check");
	if (flag == "true") {
		var newpwd = $(data).find("result").attr("newpwd");
		alert("用户更改密码成功,newpwd: "+newpwd);
	} else {
		alert("用户更改密码失败！");
	}
}
//获取滚动条高度
function getScrollTop() {
	var scrollPos; 
	if (window.pageYOffset) {
		scrollPos = window.pageYOffset; 
	} else if (document.compatMode && document.compatMode != 'BackCompat') {
		scrollPos = document.documentElement.scrollTop; 
	} else if (document.body) { 
		scrollPos = document.body.scrollTop; 
	} 
	return scrollPos; 
}



