// JavaScript Document
var dialogue_num=0;

$(document).ready(function() {
	$("#error_msg").css("display","none");
	//获取私信列表
   // get_chatlist();
    func_touchslider();
	
	$(".btn_del").click(function(){
	});
});
function get_chatlist(){
	$.ajax({
         url:'../../../php/getSession.php',
         type:'POST',
         dataType:'json',
         success:function(json){
	     level=json[1];
		 if(level==0||level==1||level==2||level==3){
		  $.ajax({
			 url:'../../../php/user/usermsg.php?actid=getmsgskim',
			 type:'POST',
			 data:'',
			 dataType:'json',
			 success:function(json){
				var i,l,data;
			 	l=json.length;
				if(l>0){$("#error_msg").css("display","none");}
				dialogue_num=l;
				var dialogue_id;
				var talkwith;
				if(talkwith==null||talkwith=="null"||talkwith=="")talkwith="未实名认证用户";
				var msg_time;
				var msg_content;
				var is_read;
				var top=-76;
			 	for(i=0;i<l;i++){
					data = json[i];
					dialogue_id=data.dialogue_id;
					talkwith=data.talkwith;
					msg_time=data.msg_time;
					msg_time=msg_time.substring(5,16);
					msg_content=data.msg_content;
					is_read=data.is_read;
					top=top+76;
					/*var str_dialogue=''+
					'<a id="'+dialogue_id+'" href="chatboard.html?d_id='+dialogue_id+'&t_w='+talkwith+'" class="a_single">'+
					'<span class="flag_block"></span>'+
     				'<div id="single" class="single"> '+
    				'<span id="linkman" class="linkman">'+talkwith+'</span> '+
        			'<span id="date" class="date">'+msg_time+'</span> '+
        			'<span id="info" class="info">'+msg_content+'</span> '+
    				'</div>'+ class="dialogue_one" style="top:'+top+'px;"
    				'</a> ';*/
					var str_dialogue=''+
					'<div id="dialogue_'+dialogue_id+'"  class="dialogue_one">'+
					  '<div class="touchslider" >'+
						'<div class="touchslider-viewport"  style="width:100%;overflow:hidden;position:relative;height:76px">'+
							'<div class="touchslider-item">'+
								'<a href="chatboard.html?d_id='+dialogue_id+'&t_w='+talkwith+'" class="a_single" >'+
								'<span class="flag_block"></span>'+
								' <div id="single" class="single"> '+
									'<span id="linkman" class="linkman">'+talkwith+'</span> '+
									'<span class="arrow"></span>'+
									'<span id="date" class="date">'+msg_time+'</span> '+
									'<span id="info" class="info">'+msg_content+'</span>'+ 
								'</div>'+
								'</a>'+
							'</div>'+
							'<div class="touchslider-item">'+
							'<span class="hiden_block">'+
								'<span class="flag_block"></span>'+
								'<a href="#" class="btn_del" dialogue_id='+dialogue_id+'>删除</a>'+
								'<a href="chatboard.html?d_id='+dialogue_id+'&t_w='+talkwith+'" class="btn_info">详情</a>'+
								'</span>'+
							'</div>'+
						'</div>'+
					  '</div>'+
					'</div>';
					//重复数据X3
					$("#dialogue_list").append(str_dialogue);
					if(is_read==0){
						var flag_="#dialogue_"+dialogue_id+" .flag_block";
						$(flag_).css("background","#00da4b");
					}
					//alert(data.dialogue_id+","+talkwith +","+msg_time+","+ msg_content);
				}
				$("#error_msg").css("display","none");
				//实现滑动
				func_touchslider();
				//实现删除键效果
    			func_del();
				 },
			 error:function(){
				$("#error_msg").css("display","block");
				 }
			 });
		  }else{
			  alert("请先验证教务网账号！！");
			  $("#error_msg").css("display","block");
		  }
         }, 
         error:function(){
			alert("请检查网络！");
			$("#error_msg").css("display","block");
         }
	 })
}
function func_touchslider(){
	$(".dialogue_one").touchSlider({
		margin: 0,
		mouseTouch: true,
        autoplay: false, // 自动播放
        duration: 350, // 动画速度
        delay: 1000 // 动画时间间隔
	});
}

function func_del(){
	$(".hiden_block .btn_del").click(function(){
		var dialogue_id=$(this).attr("dialogue_id");
		del_dialogue(dialogue_id);
	});
}
function del_dialogue(dialogue_id){
	$.ajax({
         url:'../../../php/getSession.php',
         type:'POST',
         dataType:'json',
         success:function(json){
	    level=json[1];
		 if(level==0||level==1||level==2||level==3){
	 $.ajax({
         url:'../../../php/user/usermsg.php?actid=deletemsgset',
         type:'POST',
		 data:"dialogueid="+dialogue_id,
         dataType:'json',
         success:function(json){
				//alert("发送成功！");
				$("#dialogue_"+dialogue_id).css("display","none");
				dialogue_num--;
				if(dialogue_num==0){
					$("#error_msg").css("display","block");
				}
		     },
		error:function(){
			 alert("删除失败！");
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