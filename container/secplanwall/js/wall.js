

//全局公共数据

	var cur=1;//当前位置
	var looading_speed=2000;
	var up_speed=500;//向上翻滚用的时间
	var up_wait=100;//向上翻滚等待的时间（原始数据用于还原）
	var up_wait_real=300;//向上翻滚等待的时间
	var up_move_timeout;
	var add_wall_item_interval;
	var data=[['0','img/pic_head.jpeg','拯旧计划','拯旧计划网络科技有限公司，预祝信工院2015跨年晚会举办圆满成功！']];
	
//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		setTimeout(function(){rfWin_wall_block();},600);
    });
		setTimeout(function(){rfWin_wall_block();},500);
		
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	wall_loading_data();
	single_item_enlarge("item_0");//single_wall_item点击放大显示
	
});

/**
*微信墙适配
*@return
*@author zhangwei
*/
function rfWin_wall_block(id){
	/*头像适配*/
	var item_pic_head;
	if(id==""||id==null){
		item_pic_head=$("#wall_block .single_wall_item .pic_head");
		item_txt=$("#wall_block .single_wall_item .txt");
	}else{
		item_pic_head=$("#wall_block #"+id+" .pic_head");
		item_txt=$("#wall_block #"+id+" .txt");
	}
	var single_wall_item_h=$("#wall_block .single_wall_item").height();
	var single_wall_item_w=$("#wall_block .single_wall_item").width();
	var pic_head_h=single_wall_item_h*0.8;
	item_pic_head.css("width",pic_head_h);
	item_pic_head.css("height",pic_head_h);
	item_pic_head.css("margin-top",(single_wall_item_h-pic_head_h)*0.5);
	
	item_txt.css("height",single_wall_item_h-50);
	item_txt.css("width",single_wall_item_w-pic_head_h-80);
	
	//放大块适配
	$("#wall_block #show_block").css("width",$("#wall_block #wall_list").width());
	$("#wall_block #show_block .pic_head").css("height",$("#wall_block #show_block").height()*0.4);
	$("#wall_block #show_block .pic_head").css("width",$("#wall_block #show_block").height()*0.4);
	$("#wall_block #show_block .txt").css("height",$("#wall_block #show_block").height()-$("#wall_block #show_block .name").height()-20);
	$("#wall_block #show_block .txt").css("width",$("#wall_block #show_block").width()*0.93-$("#wall_block #show_block .pic_head").width());
	
	//提示模块大小
	$("#main_block #mess_shangqiang_block").css("height",$("#main_block").height()-20);
}
/**
*加载数据
*@return
*@author zhangwei
*/
function wall_loading_data(){
	
	
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
	//暂停滚动
	$("#func_wall_block #scroll_btn").click(function(){
		is_move=$(this).attr("move");
		if(is_move==1){
			up_wait_real=up_wait*100000;//延长下一滚动时间，模拟暂停效果
			$(this).attr("move",0);
			$(this).html("继续滚动");
		}else{
			up_wait_real=up_wait;//回复下一滚动时间
			$(this).attr("move",1);
			$(this).html("冻结滚动");
		}
			clearTimeout(up_move_timeout);
	});
	//启动
	$("#func_wall_block #start_btn").click(function(){
		is_start=$(this).attr("started");
		if(is_start==0){
			add_wall_item_interval=setInterval(add_wall_item,looading_speed); 
			$(this).attr("started",1);
			$(this).html("暂停");
		}else{
			$(this).attr("started",0);
			$(this).html("继续");
			clearInterval(add_wall_item_interval);	
		}
	});
	//跳越
	$("#func_wall_block #jump_btn").click(function(){
		is_start=$("#func_wall_block #start_btn").attr("started")
		if(is_start==1){
			clearInterval(add_wall_item_interval);	
			add_wall_item();
			clearTimeout(up_move_timeout);   //清除等待，直接跳跃
			setTimeout(function(){scroll2botttom("wall_list",up_speed);},100);
			add_wall_item_interval=setInterval(add_wall_item,looading_speed); 
		}
	});
	//翻也速度looading_speed
	$("#looading_speed_sub").click(function(){
		if(looading_speed>1000){
			looading_speed=looading_speed-500;
		}
		$("#looading_speed_num").html(looading_speed);
		clearInterval(add_wall_item_interval);
		add_wall_item_interval=setInterval(add_wall_item,looading_speed);
	});
	$("#looading_speed_plus").click(function(){
		looading_speed=looading_speed+500;
		$("#looading_speed_num").html(looading_speed);
		clearInterval(add_wall_item_interval);
		add_wall_item_interval=setInterval(add_wall_item,looading_speed);
	});
	function add_wall_item(){
		var item_txt='<div class="single_wall_item" id="item_'+cur+'" >'+
						  '<img src="'+data[0][1]+'" class="pic_head">'+
						  '<span class="name">'+data[0][2]+'</span>'+
						  '<span class="num">'+cur+'</span>'+
						  '<span class="txt">'+data[0][3]+'</span>'+
					  '</div>';
		$("#wall_block .wall_list").append(item_txt);
		rfWin_wall_block("item_"+cur);
		single_item_enlarge("item_"+cur);
		cur+=1;
		up_move_timeout=setTimeout(function(){scroll2botttom("wall_list",up_speed);},up_wait_real);
		
	}
}
/**
*single_wall_item点击放大显示
*@return
*@author zhangwei
*/
function single_item_enlarge(id){
	$("#"+id+".single_wall_item").click(function(){
		var num=$(this).children(".num").text();
		var name=$(this).children(".name").text();
		var pic_head=$(this).children(".pic_head").attr("src");
		var txt=$(this).children(".txt").text();
		//alert(num+","+name+","+pic_head+","+txt);
		//alert($(this).children(".txt").width());
		$("#wall_block .wall_list #show_block .pic_head").attr("src",pic_head);
		$("#wall_block .wall_list #show_block .name").html(name);
		$("#wall_block .wall_list #show_block .num").html(num);
		$("#wall_block .wall_list #show_block .txt").html(txt);
		$("#wall_block .single_wall_item").css("opacity",0);
		$("#wall_block .wall_list #show_block").slideDown();
		up_wait_real=up_wait*100000;//延长下一滚动时间，模拟暂停效果
		clearTimeout(up_move_timeout);
		$("#wall_block .wall_list #show_block").click(function(){
			$(this).slideUp();
			$("#wall_block .single_wall_item").css("opacity",1);
			up_wait_real=up_wait;//回复下一滚动时间
			clearTimeout(up_move_timeout);
		});
		
		
	});
}


