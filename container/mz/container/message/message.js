// JavaScript Document

//回复块的显示和隐藏
function show_reply_sub(id){
	var div_rs=document.getElementById(id);
	if(div_rs.style.display=='block'){
		div_rs.style.display='none';
	}else{
		div_rs.style.display='block'
	}
}

//输入块提示文字的显示和清除
/* function clr_tlt_mess() {
	var tlt_mess=document.getElementById("tlt_mess");
	if(tlt_mess.value=="请输入留言标题"){
		tlt_mess.value="";
	}
	tlt_mess.style.borderColor='#0af';
} */
/*  function re_tlt_mess() {
	var tlt_mess=document.getElementById("tlt_mess");
	var txt_mess=document.getElementById("txt_mess");
	if(tlt_mess.value==""){
		tlt_mess.value="请输入留言标题";
		txt_mess.value="留言区";
	}else{
		txt_mess.value="请撰写留言";
	}
	tlt_mess.style.borderColor='#e3e3e3';
}  */

function clr_txt_mess() {
	var txt_mess=document.getElementById("txt_mess");
	if(txt_mess.value=="留言区" || txt_mess.value=="请撰写留言"){
		txt_mess.value="";
	}
	txt_mess.style.borderColor='#0af';
}
function re_txt_mess() {
	/* var tlt_mess=document.getElementById("tlt_mess"); */
	var txt_mess=document.getElementById("txt_mess");
	if(txt_mess.value=="")
	{
		txt_mess.value="请撰写留言";
	}
	/* if(tlt_mess.value=="请输入留言标题"){
		txt_mess.value="留言区";
	}else {//if(tlt_mess.value!="请输入留言标题")
		txt_mess.value="请撰写留言";
	} */
	txt_mess.style.borderColor='#e3e3e3';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//刷新表单
function re_show_iframe(div_id,htm_src){
	var t_div=window.top.document.getElementById(div_id);
	t_div.innerHTML='<iframe frameborder="0" allowTransparency="true" width="500px" height="310px" src="'+htm_src+'"></iframe>';
}
//格式化显示
function tbl(product){
	var vCaseInfor = Array();
	for(var i=0;i<product.length;i++)
		{
			vCaseInfor[i]="<div class='mess_block' id='mb1'><div id='user'><img src='user.jpg' />"+product[i].u_name+"</div><div  id='mess_con'><div id='mess_txt'>"+product[i].msg_content+"</div><div id='mess_time'>时间："+product[i].date+"<!--<a href='#none' onclick='show_reply_sub('rps1')'>回复</a><a href='#'> 删除</a></div><div id='mess_reply'><div id='reply_block'> <img src='manager.png' /><div id='mess_p'> 回复test 回复test 回复test 回复test 回复test 回复test 回复test 回复test 回复test </div><div id='reply_time'>时间：2014-07-11 11:11</div></div><div class='reply_sub' id='rps1'><form action='' method='get'><textarea name='reply_sub' class='reply_ta' ></textarea><a href='#'><div class='input_btn_sub'>发 布</div></a></form></div></div></div>--></div>";
			$("#show_mess_h").append(vCaseInfor[i]);
		}	
		
}
 $(function(){
	 //数据拉取
	$.ajax({
				url:"../../php/common/info_message.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无留言信息")
						alert(product);
					else
						tbl(product);
				}
			});
	 //异步提交表单
	 $("#sub").click(function() {
		 var txt_mess=document.getElementById("txt_mess");
		 if(txt_mess.value=="" || txt_mess.value=="请撰写留言" ||  txt_mess.value=="留言区")
		{
			alert("请撰写留言");
		}else{
			var txt_mess=$("textarea#txt_mess").val();
			var dataString="txt_mess="+txt_mess;
	 		$.ajax({
				type:"post",
				url:"../../php/common/message.php",
				data:dataString,
				dataType:"json",
				success:function(data){
					alert(data);
					if(data=="留言成功！")//刷新
						 re_show_iframe("div_message","container/message/message.html"); 
				}
			}); 
			return false;
		}
	 });
}); 
