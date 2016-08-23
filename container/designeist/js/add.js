// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
		rfWin_preview_block();//上传图块片适配
		rfWin_foot_block();//底部按键组适配
    });
		rfWin_preview_block();//上传图块片适配
		rfWin_foot_block();//底部按键组适配
		
	
	//滚动条监听
	$(window.document).scroll(function () {
		
	});
	
	//图片删除按钮事件
	$("#preview_block .btn_del").click(function(){
		var num=$(this).attr("p");
		$("#img"+num).val("")
		$("#img_b"+num).html("+");
		$(this).css("display","none");
	});
	//是否全新
	$("#goods_isnew_block .btn_checkbox .checkbox").click(function(){
		var isnew=$(this).parent().attr("new");
		if(isnew==1){
			$(this).children(".onoff").attr("class","onoff");
			$(this).parent().attr("new",0);
			$(".target_price").slideDown();
		}else{
			$(this).children(".onoff").attr("class","onoff onoff-on");
			$(this).parent().attr("new",1);
			$(".target_price").slideUp();
		}
	});
	//发布btn_sub
	$("#sub_block #btn_sub").click(function(){
		var val_img1=$("#img1").val();
		if(val_img1==null||val_img1==""){
			$("#img_b1").css("box-shadow","0 0 50px #f00");
			return;
		}else{$("#img_b1").css("box-shadow","0 0 0");}
		var val_img2=$("#img2").val();
		var val_img3=$("#img3").val();
		var val_img4=$("#img4").val();
		var val_img5=$("#img5").val();
		var val_img6=$("#img6").val();
		var val_goods_info=$("#goods_info").val();
		if(val_goods_info==null||val_goods_info==""){
			$("#goods_info_block").css("box-shadow","0 0 50px #f00");
			return;
		}else{$("#goods_info_block").css("box-shadow","0 0 0");}
		
		var val_goods_name=$("#goods_name").val();
		if(val_goods_name==null||val_goods_name==""){
			$("#goods_name_block").css("box-shadow","0 0 50px #f00");
			return;
		}else{$("#goods_name_block").css("box-shadow","0 0 0");}
		
		var val_price=$("#price").val();
		var val_nums=$("#nums").val();
		if(val_price==null||val_price==""||val_nums==null||val_nums==""){
			$("#other_info_block").css("box-shadow","0 0 50px #f00");
			return;
		}else{$("#other_info_block").css("box-shadow","0 0 0");}
		/*
		var val_all="val_img1:"+val_img1+"\n"+
					"val_img2: "+val_img2+"\n"+
					"val_img3: "+val_img3+"\n"+
					"val_img4: "+val_img4+"\n"+s
					"val_img5: "+val_img5+"\n"+
					"val_img6: "+val_img6+"\n"+
					"val_goods_name: "+val_goods_name+"\n"+
					"val_goods_info: "+val_goods_info+"\n"+
					"val_price: "+val_price+"\n"+
					"val_nums: "+val_nums;
		alert(val_all);	
		*/
		location.replace("add_success.html");
	});
	
});

/**
*屏幕适配：上传图块片适配
*@author zhangwei
*/
function rfWin_preview_block(){
	var container_W=$("#container").width();
	var single_pic_W=$("#preview_block .single_pic").width();
	var css_margin_left=(container_W-single_pic_W*3)/4;
	$("#preview_block .single_pic").css("margin-left",css_margin_left);
	$("#preview_block .tips_info").css("margin-left",css_margin_left);
	
}

/**
*textarea适配：
*@author zhangwei
*/
function rfTextarea_goods_info_block(){
	var textarea=$("#goods_info_block #goods_info")
	var t=document.getElementById("goods_info");
	var line_num=Math.round(textarea.val().length/20+0.5)-1;
	line_num=line_num<2?2:line_num;
	line_num=line_num>5?5:line_num;
	textarea.css("height",line_num*20+'px');
}
/**
*数字滚动条监听
*@author zhangwei
*/
function listen_price_o_range_scroll(){
	var price_o_scroll=$("#other_info_block #price_o_scroll");
	var price_o=$("#other_info_block #price_o");
	price_o.val(price_o_scroll.val());
	
}
function listen_price_range_scroll(){
	var price_scroll=$("#other_info_block #price_scroll");
	var price=$("#other_info_block #price");
	price.val(price_scroll.val());
	
}
function listen_nums_range_scroll(){
	var nums_scroll=$("#other_info_block #nums_scroll");
	var nums=$("#other_info_block #nums");
	nums.val(nums_scroll.val());
	
}
function listen_price_t_range_scroll(){
	var price_t_scroll=$("#price_t_scroll");
	var price_t=$("#other_info_block #price_t");
	price_t.val(price_t_scroll.val());
	
}
/**
*图片上传预览  IE是用了滤镜
*@author zhangwei
*/
function previewImage(file,i)
{
	  var MAXWIDTH  = 80; 
	  var MAXHEIGHT = 80;
	  var div = document.getElementById("img_b"+i);
	  if (file.files && file.files[0])
	  {
		  div.innerHTML ='<img id='+i+'_img>';
		  var img = document.getElementById(i+'_img');
		  img.onload = function(){
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
			img.width  =  rect.width;
			img.height =  rect.height;
			img.style.marginLeft = rect.left+'px';
			img.style.marginTop =  rect.top+'px';
		  }
		  var reader = new FileReader();
		  reader.onload = function(evt){img.src = evt.target.result;}
		  reader.readAsDataURL(file.files[0]);
	  }
	  else //兼容IE
	  {
		var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id='+i+'_img>';
		var img = document.getElementById(i+'_img');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
		div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
	  }
	  $("#btn_del"+i).css("display","block");
  
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
	var param = {top:0, left:0, width:width, height:height};
	if( true )
	{
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		 
		if( rateWidth > rateHeight )
		{
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}else
		{
			param.width =  maxWidth;
			param.height = Math.round(height / rateWidth);
		}
	}
	 
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}

