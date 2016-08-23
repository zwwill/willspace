

//全局公共数据
	var vote_cur=1;//当前位置
	var vote_num=0;//当前位置
	var vote_max_width;
	var vote_looading_speed=3000;
	var vote_totalnum=0;
	var vote_maxnum=0;
	var vote_add_item_interval;
	var vote_data=[['1','img/pic_head.jpeg','拯旧计划_1','98'],['2','img/logo.png','拯旧计划_2','87'],['3','img/pic_head.jpeg','拯旧计划_3','36'],['4','img/logo.png','拯旧计划_4','0']];

//dom树构造完毕后运行
$(document).ready(function(e) {
	//窗口改变大小时
    $(window).resize(function(e) {
		rfW_vote_long();//投票长度适配
    });
		rfW_vote_long();//投票长度适配
		
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	
	vote_loading_data();//加载数据	
	
});



/**
*加载数据
*@return
*@author zhangwei
*/
function vote_loading_data(){
	func_show_vote_item("vote_item_0",100);
	$("#func_vote_block #show_btn").click(function(){
		for(var i=0;i<vote_data.length;i++){
			vote_totalnum+=parseInt(vote_data[i][3]);
			vote_maxnum=parseInt(vote_data[i][3])>vote_maxnum?parseInt(vote_data[i][3]):vote_maxnum;
		}
		var is_start=$(this).attr("started");
		if(is_start==0){
			$("#vote_container #vote_item_0").css("display","none");
			vote_add_item();
			setTimeout(function(){
				vote_add_item();
			},1000);
			vote_add_item_interval=setInterval(vote_add_item,vote_looading_speed); 
			$(this).attr("started",1);
			$(this).html("暂停");
		}else{
			$(this).attr("started",0);
			$(this).html("继续");
			clearInterval(vote_add_item_interval);	
		}
	});
	
	function vote_add_item(){
		if(vote_cur>=vote_data.length){clearInterval(vote_add_item_interval);}
		var bar_long=(vote_data[vote_num][3]/vote_maxnum*(vote_max_width-150)+150)/vote_max_width*100;
		var vote_html='<div class="single_vote_item" id="vote_item_'+vote_cur+'" style=" top:'+200*(vote_cur-1)+'px">'+
                    	'<span class="num">NO.'+vote_data[vote_num][0]+'</span>'+
                    	'<img src="'+vote_data[vote_num][1]+'" class="pic_head" />'+
                        '<span class="name">'+vote_data[vote_num][2]+'</span>'+
                        '<span class="bar_container"><span class="bar"></span></span>'+
                        '<span class="vote_num">'+vote_data[vote_num][3]+'票</span>'+
                    '</div>';
	
		$("#vote_block .vote_container").append(vote_html);
		rfW_vote_long("vote_item_"+vote_cur);
		setTimeout(function(){func_show_vote_item('vote_item_'+vote_cur,bar_long);vote_cur+=1;},10);
		vote_num+=1;
	}
	function func_show_vote_item(id,bar_long){
		$("#vote_block #"+id+" .num").css("opacity","1");
		setTimeout(function(){
			$("#vote_block #"+id+" .pic_head").css("height","160px");
			$("#vote_block #"+id+" .pic_head").css("width","160px");
			$("#vote_block #"+id+" .pic_head").css("margin","20px");
		},1000);
		setTimeout(function(){
			$("#vote_block #"+id+" .name").css("opacity","1");
			$("#vote_block #"+id+" .bar").css("opacity","1");
		},2000);
		setTimeout(function(){
			$("#vote_block #"+id+" .bar").css("width",bar_long+"%");
		},2500);
		setTimeout(function(){
			$("#vote_block #"+id+" .vote_num").css("opacity","1");
		},3500);
	}
	
}
/**
*投票长度适配
*@return
*@author zhangwei
*/
function rfW_vote_long(id){
	if(id==""||id==null){
		vote_max_width=$("#vote_item_0").width()-$("#vote_item_0 .num").width()-160-100;
		$(".single_vote_item .name").css("width",vote_max_width);
		$(".single_vote_item .bar_container").css("width",vote_max_width);
	}else{
		$("#"+id+" .name").css("width",vote_max_width);
		$("#"+id+" .bar_container").css("width",vote_max_width);
	}
}