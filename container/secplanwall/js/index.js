// JavaScript Document

var hash_txt="";//存放锚地址	

//dom树构造完毕后运行
$(document).ready(function(e) {
	hash_txt=window.location.hash;
	if(sessionStorage.isCheck!=1){ document.location="index.html";}
	//get_info_from_href();//数据初始化：获取入口信息
	refresh_show();//初始化加载，刷新上下浮现


	//窗口改变大小时
    $(window).resize(function(e) {
       	rfWin_bacpic();//背景适配
		rfWin_main_block();//main_block适配
		rfWin_hash_s();//适配:锚链接锁定
    });
       	rfWin_bacpic();//背景适配
		rfWin_main_block();//main_block适配
		
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	
	/*按钮监听*/
	listen_bottom_show_btn();//底部伸缩按钮
	listen_fullscreens();//全屏按钮
	listen_bottom_nav();//底部导航按钮
	listen_btn_qr_code_logo();//二维码按钮
	
});
	
/**
*二维码按钮
*@return
*@author zhangwei
*/
function listen_btn_qr_code_logo(){
	$("#top_block #qr_code_logo").click(function(){
		$("#main_block #mess_shangqiang_block").slideDown();
	});
	$("#main_block #mess_shangqiang_block").click(function(){
		$("#main_block #mess_shangqiang_block").slideUp();
	});
}
	
/**
*底部导航按钮
*@return
*@author zhangwei
*/
function listen_bottom_nav(){
	$("#btns_g .single_btn").click(function(){
		if($(this).attr("id")=="fullscreen"){
			//
			return;
		}else if("#"+$(this).attr("id")+"_block"==hash_txt){
			return;
		}else{
				$("#bottom_block .fonc_b").css("display","none");
				$("#btns_g .single_btn").css("box-shadow","none");
				var id=$(this).attr("id");
				$("#func_"+id+"_block").slideDown(1000);
				hash_txt="#"+$(this).attr("hash");
				$(this).css("box-shadow","0 0 15px #000");
		}
	});
}
	
/**
*底部伸缩按钮
*@return
*@author zhangwei
*/
function listen_bottom_show_btn(){
	$("#bottom_show_btn").click(function(){
		var is_show=$(this).attr("show");
		if(is_show==1){
			$("#bottom_block").css("height","0px");
			$(this).children(".bottom_show_btn_img").attr("src","img/arrow_up.png");
			$("#main_block").css("height",$("#main_block").height()+80);
			$(this).css("bottom",0);
			$(this).attr("show",0);
		}else{
			$("#bottom_block").css("height","80px");
			$(this).children(".bottom_show_btn_img").attr("src","img/arrow_down.png");
			$("#main_block").css("height",$("#main_block").height()-80);
			$(this).css("bottom","45px");
			$(this).attr("show",1);
		}	
		setTimeout(function(){rfWin_wall_block();},500);	//头像适配 
	});
}
/**
*刷新上下浮现
*@return
*@author zhangwei
*/
function refresh_show(){
	rfWin_main_block();
	$("#top_block").css("margin-top",0);
	setTimeout(function(){
		$("#bottom_block").css("height","80px");
		$("#bottom_show_btn").css("opacity","1");
		$("#bottom_show_btn").css("bottom","45px");
		
	},500);
	if(hash_txt!=""){
		$("#bottom_block .fonc_b").css("display","none");
		$("#func_"+hash_txt.substring(1)).css("display","block");
	}else{
		$("#bottom_block .fonc_b").css("display","none");
		$("#func_signin_block").css("display","block");
	}
}

/**
*背景适配
*@author zhangwei
*/
function rfWin_bacpic(){
	var w_h=window.innerHeight;
	var w_w=window.innerWidth;
	$("#container").css("height",w_h);
	$("#container").css("width",w_w);
	
}

/**
*适配:main_block
*@author zhangwei
*/
function rfWin_main_block(){
	var w_h=window.innerHeight;
	var w_w=window.innerWidth;
	$("#main_block").css("height",w_h-($("#bottom_show_btn").attr("show")=="1"?200:120));
	$("#main_block").css("width",w_w);
	$("#main_block .single_block").css("width",w_w);
}
/**
*适配:锚链接锁定
*@author zhangwei
*/
function rfWin_hash_s(){
	var hash=window.location.hash;
	if(hash_txt!=""&&hash!="#signin_block"){
		window.location.hash="#blank_hash_block";
		setTimeout(function(){window.location.hash=hash_txt;},700);
		
	}else{
		
	}
}
/**
*监听：全屏按钮
*@author zhangwei
*/
function listen_fullscreens(id){
	$("#fullscreen").click(function(){
       	var elem=document.documentElement; 
		is_full=$(this).attr("full");
		if(is_full==0){ 
			if(elem.webkitRequestFullScreen){  
				elem.webkitRequestFullScreen();     
			}else if(elem.mozRequestFullScreen){  
				elem.mozRequestFullScreen();  
			}else if(elem.requestFullScreen){  
				elem.requestFullscreen();  
			}else{  
				//浏览器不支持全屏API或已被禁用
				return;  
			}
			$(this).attr("full",1);
		}else{
			elem=document;  
			if(elem.webkitCancelFullScreen){  
				elem.webkitCancelFullScreen();      
			}else if(elem.mozCancelFullScreen){  
				elem.mozCancelFullScreen();  
			}else if(elem.cancelFullScreen){  
				elem.cancelFullScreen();  
			}else if(elem.exitFullscreen){  
				elem.exitFullscreen();  
			}else{  
				//浏览器不支持全屏API或已被禁用
				return;  
			}  
			$(this).attr("full",0);
		}
		       
	});
	
	
}

/**
*数据初始化：获取入口信息
*@author zhangwei
*/
function get_info_from_href(){
	var hf = window.location.href;
	if(hf.indexOf('#')!='-1'){
		//hf.substring(hf.indexOf('=')+1 ,hf.lastIndexOf('&'));
		//hf.substring(hf.lastIndexOf('=')+1,hf.length);
	}
}
