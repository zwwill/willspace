// JavaScript Document
var dialogue_id;
var talkwith;
var renew_flag=0;
var reply_num=0;//记录最新的对方回复数
var new_reply_num=0;
$(document).ready(function() {
	//get_init_info();
	//get_chatinfo();
	$("#btn_sub").click(function(){
		var content=$("#txt_inp").val();
		if(content==null||content==""){
		}else{
			
			$("#txt_inp").val("");
				var md=new Date();
				var time="";
				var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
				if(h<10){h='0'+h;}
				if(m<10){m='0'+m;}
				if(s<10){s='0'+s;}
				time=h+":"+m+":"+s;
				var str_dialogue=''+
						'<div class="right_dialogue ">'+
            			'<span class="dialogue_r"></span>'+
                		'<span class="dialogue_m r_b">'+content+'</span>'+
                		'<span class="time">'+time+'</span>'+
            			'</div>';
				$("#dialogue_list").append(str_dialogue);
				window.scrollTo(0,document.body.scrollHeight);
			
			//send_msg(content);
			//////////////////////////////////////////////
			if(content.indexOf("众筹",0)!=-1)
				m_check(1);
			else if(content.indexOf("失望",0)!=-1)
				m_check(2);
			else if(content.indexOf("好的",0)!=-1)
				m_check(3);
			else 
				m_check(-1);
				
		}
		 
	});
	
	/*
	//定时刷新回复
	setInterval(function() {
		new_reply_num=0;
		isreply();
    	if(renew_flag==1){
			get_chatinfo();
			renew_flag=0;
		}else{}
	}, 1000);
	*/

	//模拟聊天
	m_check(0);
});
/**
*模拟聊天
*/
function m_check(index){
	if(index==-1){
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">你好，我是【设计学人】机器人管家。</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},1000);
	}else if(index==0){
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">设计学人客服【微笑】为您服务</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},1000);
		
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="time_block">07月05日 周日</div>'
						+'<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">你好！请问有什么可以帮助您的？</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},2500);
	}else if(index==1){
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">由于众筹设计的生产周期稍长，所以将会在众筹结束后的两个工作周内出货，请耐心等待。谢谢你对年轻设计师的支持！</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},4000);
	}else if(index==2){
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">不会的亲，绝对物超所值</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},2000);
	}else if(index==3){
		setTimeout(function(){
			var time="";
			var md=new Date();
			var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
			if(h<10){h='0'+h;}
			if(m<10){m='0'+m;}
			if(s<10){s='0'+s;}
			time=h+":"+m+":"+s;
			var str_html='<div class="left_dialogue ">'
						+'	<span class="dialogue_l"></span>'
						+'	<span class="dialogue_m l_b">OK</span>'
						+'	<span class="time">'+time+'</span>'
						+'</div>';
			$("#dialogue_list").append(str_html);	
		},2000);
	}
	
	
}
function isreply(){
	$.ajax({
         url:'../../../php/getSession.php',
         type:'POST',
         dataType:'json',
         success:function(json){
	     level=json[1];
		 if(level==0||level==1||level==2||level==3){
		  $.ajax({
			 url:'../../../php/user/usermsg.php?actid=checknewdetail',
			 type:'POST',
			 data:'dialogueid='+dialogue_id,
			 dataType:'json',
			 success:function(json){
				 var isrep=json;
				
				if(true==isrep){
					renew_flag=1;
				}else{
					renew_flag= 0;
				}
				 },
			 error:function(){
				 //alert("添加失败，请与店家联系！");
				 }
			 });
		  }else{
			  //alert("请先验证教务网账号！！");
		  }
         }, 
         error:function(){
			//alert("请检查网络！");
         }
	 })
}


$(window).resize(  
	function(){  
		window.scrollTo(0,document.body.scrollHeight); 
	}  
);
function get_init_info(){
	var hf = window.location.href;
	dialogue_id = hf.substring(hf.indexOf('=')+1 ,hf.lastIndexOf('&'));
	talkwith=hf.substring(hf.lastIndexOf('=')+1,hf.length);
	talkwith=chineseFromUtf8Url(talkwith);
	if(talkwith=="null")talkwith="未实名认证用户";
	document.title=talkwith;
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
		 data:"content="+content+"&dialogueid="+dialogue_id,
         dataType:'json',
         success:function(json){
				//alert("发送成功！");
				$("#txt_inp").val("");
				var md=new Date();
				var time="";
				var h=md.getHours(),m=md.getMinutes(),s=md.getSeconds();
				if(h<10){h='0'+h;}
				if(m<10){m='0'+m;}
				if(s<10){s='0'+s;}
				time=h+":"+m+":"+s;
				var str_dialogue=''+
						'<div class="right_dialogue ">'+
            			'<span class="dialogue_r"></span>'+
                		'<span class="dialogue_m r_b">'+content+'</span>'+
                		'<span class="time">'+time+'</span>'+
            			'</div>';
				$("#dialogue_list").append(str_dialogue);
				window.scrollTo(0,document.body.scrollHeight);
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

function get_chatinfo(){
	$.ajax({
         url:'../../../php/getSession.php',
         type:'POST',
         dataType:'json',
         success:function(json){
	     level=json[1];
		 if(level==0||level==1||level==2||level==3){
		  $.ajax({
			 url:'../../../php/user/usermsg.php?actid=getmsgdetail',
			 type:'POST',
			 data:'dialogueid='+dialogue_id,
			 dataType:'json',
			 success:function(json){
				var i,l,data;
			 	l=json.length;
				var dialogue_id;
				var msg_time;
				var msg_content;
				var locate;
				$("#dialogue_list").html("");
				reply_num=0;
			 	for(i=0;i<l;i++){
					data = json[i];
					msg_time=data.msg_time;
					msg_time_short=msg_time.substring(msg_time.length-8,msg_time.length);
					msg_content=data.msg_content;
					locate=data.locate;
					if(locate=='left'){
						reply_num=reply_num+1;
						var str_dialogue=''+
						'<div class="left_dialogue ">'+
            			'<span class="dialogue_l"></span>'+
                		'<span class="dialogue_m l_b">'+msg_content+'</span>'+
                		'<span class="time">'+msg_time_short+'</span>'+
            			'</div>';
						$("#dialogue_list").append(str_dialogue);
					//alert(data.dialogue_id+","+msg_time+","+ msg_content);
					}else{
						var str_dialogue=''+
						'<div class="right_dialogue ">'+
            			'<span class="dialogue_r"></span>'+
                		'<span class="dialogue_m r_b">'+msg_content+'</span>'+
                		'<span class="time">'+msg_time_short+'</span>'+
            			'</div>';
						$("#dialogue_list").append(str_dialogue);
					//alert(data.dialogue_id+","+msg_time+","+ msg_content);
					}
				}
				window.scrollTo(0,document.body.scrollHeight);
				 
				 },
			 error:function(){
				 //alert("添加失败，请与店家联系！");
				 }
			 });
		  }else{
			  alert("请先验证教务网账号！！");
		  }
         }, 
         error:function(){
			alert("请检查网络！");
         }
	 })
}

function comptime() {
    var beginTime = "2009-09-21 00:00:00";
    var endTime = "2009-09-21 00:00:01";
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

    alert(beginTime + "aaa" + endTime);
    alert(Date.parse(endTime));
    alert(Date.parse(beginTime));
    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        alert("endTime小!");
    } else if (a > 0) {
        alert("endTime大!");
    } else if (a == 0) {
        alert("时间相等!");
    } else {
        return 'exception'
    }
}
function   chineseFromUtf8Url(strUtf8)    
{ 
var   bstr   =   ""; 
var   nOffset   =   0; //   processing   point   on   strUtf8 
   
if(   strUtf8   ==   ""   ) 
      return   ""; 
   
strUtf8   =   strUtf8.toLowerCase(); 
nOffset   =   strUtf8.indexOf("%e"); 
if(   nOffset   ==   -1   ) 
      return   strUtf8; 
       
while(   nOffset   !=   -1   ) 
{ 
      bstr   +=   strUtf8.substr(0,   nOffset); 
      strUtf8   =   strUtf8.substr(nOffset,   strUtf8.length   -   nOffset); 
      if(   strUtf8   ==   ""   ||   strUtf8.length   <   9   )       //   bad   string 
          return   bstr; 
       
      bstr   +=   utf8CodeToChineseChar(strUtf8.substr(0,   9)); 
      strUtf8   =   strUtf8.substr(9,   strUtf8.length   -   9); 
      nOffset   =   strUtf8.indexOf("%e"); 
} 
   
return   bstr   +   strUtf8; 
} 
  function   unicodeFromUtf8(strUtf8)    
{ 
var   bstr   =   ""; 
var   nTotalChars   =   strUtf8.length; //   total   chars   to   be   processed. 
var   nOffset   =   0; //   processing   point   on   strUtf8 
var   nRemainingBytes   =   nTotalChars; //   how   many   bytes   left   to   be   converted 
var   nOutputPosition   =   0; 
var   iCode,   iCode1,   iCode2; //   the   value   of   the   unicode. 
   
while   (nOffset   <   nTotalChars) 
{ 
iCode   =   strUtf8.charCodeAt(nOffset); 
if   ((iCode   &   0x80)   ==   0) //   1   byte. 
{ 
if   (   nRemainingBytes   <   1   ) //   not   enough   data 
break; 
   
bstr   +=   String.fromCharCode(iCode   &   0x7F); 
nOffset   ++; 
nRemainingBytes   -=   1; 
} 
else   if   ((iCode   &   0xE0)   ==   0xC0) //   2   bytes 
{ 
iCode1   =     strUtf8.charCodeAt(nOffset   +   1); 
if   (   nRemainingBytes   <   2   || //   not   enough   data 
    (iCode1   &   0xC0)   !=   0x80   ) //   invalid   pattern 
{ 
break; 
} 
   
bstr   +=   String.fromCharCode(((iCode   &   0x3F)   <<   6)   |   (   iCode1   &   0x3F)); 
nOffset   +=   2; 
nRemainingBytes   -=   2; 
} 
else   if   ((iCode   &   0xF0)   ==   0xE0) //   3   bytes 
{ 
iCode1   =     strUtf8.charCodeAt(nOffset   +   1); 
iCode2   =     strUtf8.charCodeAt(nOffset   +   2); 
if   (   nRemainingBytes   <   3   || //   not   enough   data 
    (iCode1   &   0xC0)   !=   0x80   || //   invalid   pattern 
    (iCode2   &   0xC0)   !=   0x80   ) 
{ 
break; 
} 
   
bstr   +=   String.fromCharCode(((iCode   &   0x0F)   <<   12)   |    
((iCode1   &   0x3F)   <<     6)   | 
(iCode2   &   0x3F)); 
nOffset   +=   3; 
nRemainingBytes   -=   3; 
} 
else //   4   or   more   bytes   --   unsupported 
break; 
} 
   
if   (nRemainingBytes   !=   0) 
{ 
//   bad   UTF8   string. 
return   ""; 
} 
   
   
return   bstr; 

} 
function utf8CodeToChineseChar(strUtf8) 
{ 
      var   iCode,   iCode1,   iCode2; 
      iCode   =   parseInt("0x"   +   strUtf8.substr(1,   2)); 
      iCode1   =   parseInt("0x"   +   strUtf8.substr(4,   2)); 
      iCode2   =   parseInt("0x"   +   strUtf8.substr(7,   2)); 
       
      return   String.fromCharCode(((iCode   &   0x0F)   <<   12)   |    
((iCode1   &   0x3F)   <<     6)   | 
(iCode2   &   0x3F)); 
} 
    