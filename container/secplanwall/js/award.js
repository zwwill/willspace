
	var award_type=0;//抽奖类型 0：默认按签到抽奖 1：数字
	var award_left_w=0;
	var award_left_h=0;
	var award_right_w=0;
	var award_right_h=0;
	var award_cur=1;//当前位置
	var award_up_speed=500;//向上翻滚用的时间
	var award_up_wait_real=100;//向上翻滚等待的时间
	var award_num=1;//参与人数
	var award_p=0;//中奖号
	var award_p_num=1;//一次抽奖人数 默认1
	var award_ps=[];//一次选中的中奖号组
	var award_data=[];//抽奖名单数据
	var award_wait_m=3000;//抽取多名中奖号的间歇时间
	var award_head_rolling_interval;

//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		setTimeout(function(){
			rfW_award_size();//投票长度适配
			rfW_award_long();//获奖名单长度适配
		},500);	
    });
		setTimeout(function(){
			rfW_award_size();//投票长度适配
			rfW_award_long();//获奖名单长度适配
		},500);	
		
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	award_loading_data();//加载数据	
	//按钮监听
	listen_award_num();//抽奖人数加减
	listen_btn_start();//开始
	listen_btn_award_type();//改变抽奖类型
	listen_load_btn();//数据加载
	listen_award_empty_btn();//清空数据
});



/**
*加载数据
*@return
*@author zhangwei
*/
function award_loading_data(){
	func_show_award_item("award_item_0");
	
}
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
	function add_award_item(index){
		if(0==award_type){
			var item_txt='<div class="single_award_item" id="award_item_'+award_cur+'">'+
								'<img src="'+award_data[index-1][1]+'" class="head_pic" />'+
								'<span class="name">'+award_data[index-1][2]+'</span>'+
							'</div>';
		}else if(1==award_type){
			var item_txt='<div class="single_award_item" id="award_item_'+award_cur+'">'+
								'<span class="head_pic" tp="num">'+award_data[index-1][0]+'</span>'+
								'<span class="name">'+award_data[index-1][1]+'</span>'+
							'</div>';
		}
		$("#award_block #award_list").append(item_txt);
		rfW_award_long("award_item_"+award_cur);
		up_move_timeout=setTimeout(function(){
			func_show_award_item("award_item_"+award_cur);
			scroll2botttom("award_list",award_up_speed);
		},award_up_wait_real);
		
	}
	
	function func_show_award_item(id){
		$("#award_block #"+id+" .head_pic").css("height","120px");
		$("#award_block #"+id+" .head_pic").css("width","120px");
		$("#award_block #"+id+" .head_pic").css("margin","10px");
		setTimeout(function(){
			$("#award_block #"+id+" .name").css("opacity",1);
		},700);
	}
/**
*按钮监听：人数加减
*@return
*@author zhangwei
*/
function listen_award_num(){
	
	//翻也速度looading_speed
	$("#award_num_sub").click(function(){
		if(award_p_num>1){
			award_p_num=award_p_num-1;
		}
		$("#award_num_num").html(award_p_num);
	});
	$("#award_num_plus").click(function(){
		award_p_num=award_p_num+1;
		$("#award_num_num").html(award_p_num);
	});
}
/**
*按钮监听：开始
*@return
*@author zhangwei
*/
function listen_btn_start(){
	$("#award_block .btn_start").click(function(){
		if(award_num<1){alert("人数不足，无法启动抽奖");return;}
		var isready=$(this).attr("isready");
		var isstart=$(this).attr("started");
		if(isready==1){
			if(isstart==0){
				head_rolling();//开始滚动
				$(this).html("IS YOU");
				$(this).attr("started",1);
				award_ps=[];
			}else{
				award_ing(award_p_num);//抽奖
				$(this).attr("started",0);
			}
		}
	});
}
/**
*按钮监听：改变抽奖类型
*award_type=0;抽奖类型 0：默认按签到抽奖 1：数字
*@return
*@author zhangwei
*/
function listen_btn_award_type(){
	$("#func_award_block #award_type_btn").click(function(){
		var type=$(this).attr("type");
		if(type==0){
			award_type=1;
			$(this).attr("type",1);
			$(this).html("模式二");
			$("#func_award_block #award_datas_num").slideDown();
		}else if(type==1){
			award_type=0;
			$(this).attr("type",0);
			$(this).html("模式一");
			$("#func_award_block #award_datas_num").slideUp();
		}
	});
}
/**
*抽奖
*@return
*@author zhangwei
*/
function award_ing(award_p_num){
	$("#award_block .btn_start").html("ING");
	$("#award_block .btn_start").attr("isready",0)
	clearInterval(award_head_rolling_interval);
	award_ps.push(award_p);
	add_award_item(award_p+1);
	award_data.splice(award_p,1);//得奖用户踢出抽奖名单
	award_num-=1;					//参与抽奖人数减1
	var n=parseInt(award_p_num);
	n-=1;
	if(n>0){
		setTimeout(function(){
			head_rolling();
			setTimeout(function(){
				award_ing(n);
			},award_wait_m);
		},1000);
	}else{
		$("#award_block .btn_start").html("START");
		$("#award_block .btn_start").attr("isready",1);
		return;
	}
}
/**
*开始抽奖
*@return
*@author zhangwei
*/
function head_rolling(){
	if(0==award_type){
		award_head_rolling_interval=setInterval(function(){
			var cur=Math.floor(Math.random()*award_num);
			$("#award_block #award_head_zone .img").attr("src",award_data[cur][1]);
			award_p=cur;
		},100);
	}else if(1==award_type){
		award_head_rolling_interval=setInterval(function(){
			var cur=Math.floor(Math.random()*award_num);
			$("#award_block #award_head_zone .txt").html(award_data[cur][0]);
			award_p=cur;
		},100);
	}
}
/**
*按钮监听：数据加载
*@return
*@author zhangwei
*/
function listen_load_btn(){
	$("#func_award_block #load_btn").click(function(){
		if(0==award_type){
			$("#award_block #award_head_zone .img").attr("src","img/pic_head.jpeg");
				$("#award_block #award_head_zone .img").slideDown()
				$("#award_block #award_head_zone .txt").slideUp();
			award_data=[];
			for(var i=1;i<=28;i++){
				award_data.push([i,'img/head_pic/wx_default_'+i+'.jpg','参与者_'+i]);
				$("#award_block #h_img_b").append('<img src="'+'img/head_pic/wx_default_'+i+'.jpg'+'" />');
			}
			award_num=award_data.length;
			$("#award_block .total_p_num").html(award_num+"人参与抽奖");
			$("#award_block .total_p_num").slideDown(1500);
			$(this).html("重载数据");
			$("#award_block .btn_start").css("background","rgba(0,255,0,.4)");
			$("#award_block .btn_start").html("START");
			$("#award_block .btn_start").attr("isready",1)
			$("#award_block .btn_start").hover(
				function(){$(this).css("background","rgba(0,255,0,.8)");$(this).css("cursor","pointer");},
				function(){$(this).css("background","rgba(0,255,0,.4)")}
			);
			$("#award_block #award_list").html("");
		}else if(1==award_type){
			award_num=parseInt($("#award_datas_num .num").val());
			if(award_num==0||award_num==null){
				alert("号码上限未设置！不能为0");
			}else{
				$("#award_block #award_head_zone .txt").html("^_^");
				var font_size="17vw";
				if(award_num<10){font_size="15vw";
				}else if(award_num<100){font_size="13vw";
				}else if(award_num<1000){font_size="11vw";
				}else{font_size="11vw";}
				$("#award_block #award_head_zone .txt").css("font-size",font_size);
				$("#award_block #award_head_zone .txt").css("line-height",$("#award_block #award_head_zone").height()+"px");
				$("#award_block #award_head_zone .img").slideUp();
				$("#award_block #award_head_zone .txt").slideDown();
				award_data=[];
				for(var i=1;i<=award_num;i++){
					award_data.push([i,i+"号手卡拥有者"]);
				}
				$("#award_block .total_p_num").html(award_num+"人参与抽奖");
				$("#award_block .total_p_num").slideDown(1500);
				$(this).html("Reload");
				$("#award_block .btn_start").css("background","rgba(0,255,0,.4)");
				$("#award_block .btn_start").html("START");
				$("#award_block .btn_start").attr("isready",1)
				$("#award_block .btn_start").hover(
					function(){$(this).css("background","rgba(0,255,0,.8)");$(this).css("cursor","pointer");},
					function(){$(this).css("background","rgba(0,255,0,.4)")}
				);
				$("#award_block #award_list").html("");
			}
		}
	});
}
/**
*按钮监听：情况数据
*@return
*@author zhangwei
*/
function listen_award_empty_btn(){
	$("#func_award_block #award_empty_btn").click(function(){
		$("#award_block #award_list").html("");
	});
}
/**
*抽奖适配
*@return
*@author zhangwei
*/
function rfW_award_size(){
	award_left_w=$("#award_block .award_container .left").width();
	award_left_h=$("#award_block .award_container .left").height();
	award_right_w=$("#award_block .award_container .right").width();
	award_right_h=$("#award_block .award_container .right").height();
	
	var head_size=award_left_w<award_left_h?award_left_w*0.6:award_left_h*0.6;
	$("#award_block .award_container .award_head_zone").css("width",head_size);
	$("#award_block .award_container .award_head_zone").css("height",head_size);
}

/**
*获奖名单长度适配
*@return
*@author zhangwei
*/
function rfW_award_long(id){
	var w=award_right_w-170;
	if(id==""||id==null){
		$("#award_block .single_award_item .name").css("width",w);
		$("#award_block #award_list").css("height",award_right_h-60);
	}else{
		$("#award_block #"+id+" .name").css("width",w);
	}
}