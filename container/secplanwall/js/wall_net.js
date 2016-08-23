

//全局公共数据

	var wall_cur=0;//当前位置
	var wall_lastid=0;//标记最后显示都序号
	var looading_speed=3000;
	var up_speed=500;//向上翻滚用的时间
	var up_wait=100;//向上翻滚等待的时间（原始数据用于还原）
	var up_wait_real=300;//向上翻滚等待的时间
	var up_move_timeout;
	var add_wall_item_interval;
	var wall_datas=[];
	
//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		setTimeout(function(){rfWin_wall_block();},600);
    });
		setTimeout(function(){
			rfWin_wall_block();
			rfWin_wall_txt("");//文字适配
		},500);
		
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
	
	item_txt.css("height",single_wall_item_h-60);
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
			$(this).html("Scrolling");
		}else{
			up_wait_real=up_wait;//回复下一滚动时间
			$(this).attr("move",1);
			$(this).html("ScrollPause");
		}
			clearTimeout(up_move_timeout);
	});
	//启动
	$("#func_wall_block #start_btn").click(function(){
		is_start=$(this).attr("started");
		if(is_start==0){
			add_wall_datas_interval=setInterval(add_wall_datas,looading_speed-1000);
			add_wall_item_interval=setInterval(add_wall_item,looading_speed); 
			is_start=1;
			$(this).attr("started",1);
			$(this).html("STOP");
		}else{
			is_start=0;
			$(this).attr("started",0);
			$(this).html("START");
			clearInterval(add_wall_datas_interval);	
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
		if(is_start==1){
			clearInterval(add_wall_datas_interval);
			add_wall_datas_interval=setInterval(add_wall_datas,looading_speed-200);
			clearInterval(add_wall_item_interval);
			add_wall_item_interval=setInterval(add_wall_item,looading_speed);
		}
	});
	$("#looading_speed_plus").click(function(){
		looading_speed=looading_speed+500;
		$("#looading_speed_num").html(looading_speed);
		if(is_start==1){
			clearInterval(add_wall_datas_interval);
			add_wall_datas_interval=setInterval(add_wall_datas,looading_speed-500);
			clearInterval(add_wall_item_interval);
			add_wall_item_interval=setInterval(add_wall_item,looading_speed);
		}
	});
	//显示数据
	function add_wall_item(){
		var item_txt='<div class="single_wall_item" id="item_'+wall_cur+'" >'+
						  '<img src="'+wall_datas[wall_cur][1]+'" class="pic_head">'+
						  '<span class="name">'+wall_datas[wall_cur][2]+'</span>'+
						  '<span class="num">'+wall_datas[wall_cur][0]+'</span>'+
						  '<span class="txt">'+wall_datas[wall_cur][3]+'</span>'+
					  '</div>';
		$("#wall_block .wall_list").append(item_txt);
		rfWin_wall_block("item_"+wall_cur);
		rfWin_wall_txt("item_"+wall_cur);
		single_item_enlarge("item_"+wall_cur);
		if(wall_cur+1<wall_datas.length)wall_cur+=1;
		up_move_timeout=setTimeout(function(){scroll2botttom("wall_list",up_speed);},up_wait_real);
		
	}
	//加载数据
	function add_wall_datas(){
		var url='http://wxhzj.sinaapp.com/php/admin/wx_wall.php?actid=getnotes';
		$.getJSON(url,{'lastid':wall_lastid},function(d) {
			//alert(d);
			if(d['ret']==1)
			{
				$.each(d['data'], function(i,v){
					wall_datas.push(new Array(v['num'],v['avatar'],v['nickname'],v['content']));
					wall_lastid=v['num'];
					
				});
			}else{
					//	alert('木有新消息..每5秒ajax一次');
			}
		});
	}
}
/**
*文字适配 rfWin_wall_txt
*@return
*@author zhangwei
*/
function rfWin_wall_txt(id){
	var elem;
	if(id==""){
		elem=$(".single_wall_item");
		elem.each(function(index, element) {
			var elem_txt=$(this).children(".txt");
			var con_h=elem_txt.height();//文本域的高
			var con_w=elem_txt.width();//文本域的宽
			var win_w=window.innerWidth;
            var txt=elem_txt.text();
			var txt_len=parseInt(txt.length);
	 		var chinese = cLength(txt);//中文字数
    		var other = txt_len - chinese;//英文或者数字数
    		var total_length = chinese*2+other;//中文字权重*2 ，算比例
			
			var goal_lineheight=con_h;
			var goal_fontsize=elem_txt.css("font-size");
			//alert($(this).children(".txt").css("font-size")+","+total_length+","+con_w);
			if(total_length<=20*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*2/win_w*100-0.1;
				goal_fontsize=goal_fontsize<7?goal_fontsize:7;
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=40*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/20/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/2+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=70*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*3.9/win_w*100;
				elem_txt.css("line-height",goal_lineheight/2+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=105*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/70*2.05/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=150*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*6.2/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=210*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/150*3.14/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else{
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*8.3/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}
			
			
        });
	}else{
		elem=$("#"+id);
		var elem_txt=elem.children(".txt");
			var con_h=elem_txt.height();//文本域的高

			var con_w=elem_txt.width();//文本域的宽
			var win_w=window.innerWidth;
            var txt=elem_txt.text();
			var txt_len=parseInt(txt.length);
	 		var chinese = cLength(txt);//中文字数
    		var other = txt_len - chinese;//英文或者数字数
    		var total_length = chinese*2+other;//中文字权重*2 ，算比例
			
			var goal_lineheight=con_h;
			var goal_fontsize=elem_txt.css("font-size");
			//alert($(this).children(".txt").css("font-size")+","+total_length+","+con_w);
			if(total_length<=20*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*2/win_w*100-0.1;
				goal_fontsize=goal_fontsize<7?goal_fontsize:7;
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=40*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/20/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/2+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=70*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*3.9/win_w*100;
				elem_txt.css("line-height",goal_lineheight/2+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=105*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/70*2.05/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=150*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*6.2/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=210*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/150*3.14/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else{
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*8.3/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}
	}
	
}
/**
*计算汉字个数
*@return
*@author zhangwei
*/
function cLength(str){ 
  var reg = /[^\u4E00-\u9FA5\uf900-\ufa2d]/g;  
  var temp = str.replace(reg,''); 
  return temp.length; 
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
			
			var elem_txt=$("#wall_block .wall_list #show_block .txt");
			var con_h=elem_txt.height();//文本域的高
			var con_w=elem_txt.width();//文本域的宽
			var win_w=window.innerWidth;
            var txt=elem_txt.text();
			var txt_len=parseInt(txt.length);
	 		var chinese = cLength(txt);//中文字数
    		var other = txt_len - chinese;//英文或者数字数
    		var total_length = chinese*2+other;//中文字权重*2 ，算比例
			
			var goal_lineheight=con_h;
			var goal_fontsize=elem_txt.css("font-size");
			if(total_length<=8*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*2/win_w*100-0.1;
				goal_fontsize=goal_fontsize<11?goal_fontsize:11;
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=16*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/8/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/2+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=24*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/8/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=36*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*5.6/win_w*100;
				elem_txt.css("line-height",goal_lineheight/3+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=50*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/12/win_w*100-0.1;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=64*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*7.6/win_w*100;
				elem_txt.css("line-height",goal_lineheight/4+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else if(total_length<=80*2){
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/16/win_w*100;
				elem_txt.css("line-height",goal_lineheight/5+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}else{
				elem_txt.css("line-height",goal_lineheight+"px");
				goal_fontsize=con_w/total_length*9.5/win_w*100;
				elem_txt.css("line-height",goal_lineheight/5+"px");
				elem_txt.css("font-size",goal_fontsize+"vw");
			}
			
		
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


