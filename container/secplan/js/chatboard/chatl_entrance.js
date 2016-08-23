// JavaScript Document
var s_t_seller='';
$(document).ready(function(e) {

	$("#msg_block .btn_sub").click(function(){
		var content=$("#msg_block .msg_info").val();
		if(content==""||content==null){
			alert("请输入私信");
		}else{
			send_msg(content);
		}
	});
	$("#msg_block .btn_back").click(function(){
		$("#msg_block .msg_info").val("");
		$("#msg_block").css("display","none");
		$(".com-content-area").css("display","block");
		$(".com-footer-area").css("display","block");
		document.documentElement.style.overflow='auto';  //禁用滚动
		document.body.style.overflow='auto';
	});

})

//发送私信
	function show_send_msg_block(seller){
		s_t_seller=seller;
		$("#msg_block").css("display","block");
		$("body").css("background","#eee");
		$(".com-content-area").css("display","none");
		$(".com-footer-area").css("display","none");
		document.documentElement.style.overflow='hidden';  //禁用滚动
		document.body.style.overflow='hidden';
		//window.onmousewheel=function(){return false}; 
	}
	
	function send_msg(content){
		$.ajax({
         url:'../../../php/getSession.php',
         type:'POST',
         dataType:'json',
         success:function(json){
	    level=json[1];
		 if(level==0||level==1||level==2||level==3){
	 $.ajax({
         url:'../../../php/user/usermsg.php?actid=sendmsg',
         type:'POST',
		 data:"content="+content+"&seller="+s_t_seller,
         dataType:'json',
         success:function(json){
				alert("发送成功！进入站内信等待回复。。。");
				$("#msg_block .msg_info").val("");
				window.location.href="../chatblock/chatlist.html";
		     },
		error:function(){
			 alert("收藏失败！");
		     }
	     });}else
		 {alert("请先验证教务网账号！！");
		}
     }, 
         error:function(){
			alert("请检查网络！");
         }
	 })
		
	}