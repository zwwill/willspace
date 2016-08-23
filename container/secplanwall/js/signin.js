

//全局公共数据
	var signin_cur=1;//当前位置
	var signin_looading_speed=1000;
	var signin_up_speed=500;//向上翻滚用的时间
	var signin_up_wait_real=100;//向上翻滚等待的时间
	var signin_up_move_timeout;
	var signin_add_item_interval;
	var signin_data=[['0','img/pic_head.jpeg','拯旧计划']];

//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		
    });
		
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	signin_loading_data();//加载数据	
	
});



/**
*加载数据
*@return
*@author zhangwei
*/
function signin_loading_data(){

	func_show_signin_item('signin_item_0');
	$("#func_signin_block #show_btn").click(function(){
		var is_start=$(this).attr("started");
		if(is_start==0){
			signin_add_item_interval=setInterval(signin_add_item,signin_looading_speed); 
			$(this).attr("started",1);
			$(this).html("暂停");
		}else{
			$(this).attr("started",0);
			$(this).html("继续");
			clearInterval(signin_add_item_interval);	
		}
	});
	
	function scroll2botttom(id,time){
		var step=10;
		var docm=document.getElementById(id);
		var speed=(docm.scrollHeight-docm.scrollTop)/time*step;
		docm.scrollTop=docm.scrollTop+speed;
		time=time-step;
		if(time<=0){
			return;
		}else{
			setTimeout(function(){scroll2botttom(id,time);},step);
		}
	}
	
	function signin_add_item(){
		var item_txt='<div class="single_signin_item" id="signin_item_'+signin_cur+'">'+
                    	'<img src="'+signin_data[0][1]+'" class="pic_head" />'+
                        '<span class="num">'+signin_cur+'</span>'+
                       ' <span class="name">'+signin_data[0][2]+'_'+signin_cur+'</span>'+
                      '</div>';
		$("#signin_block .signin_container").append(item_txt);
		setTimeout(function(){func_show_signin_item('signin_item_'+signin_cur);signin_cur+=1;},10);
		
		signin_up_move_timeout=setTimeout(function(){scroll2botttom("signin_container",signin_up_speed);},signin_up_wait_real);
	}
	function func_show_signin_item(id){
		$("#signin_block #"+id+" .pic_head").css("height","160px");
		$("#signin_block #"+id+" .pic_head").css("width","160px");
		$("#signin_block #"+id+" .pic_head").css("margin","20px auto 0");
		setTimeout(function(){
			$("#signin_block #"+id+" .num").css("opacity","1");
			$("#signin_block #"+id+" .name").css("opacity","1");
		},300);
	}
}

