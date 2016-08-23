// JavaScript Document

//dom树构造完毕后运行
$(document).ready(function(e) {
	
	//窗口改变大小时
    $(window).resize(function(e) {
        rfWin_menu_block();//底部菜单适配
		rfWin_sub_block();
    });
        rfWin_menu_block();//底部菜单适配
		rfWin_sub_block();
	
	//滚动条监听
	$(window.document).scroll(function () {

	});
	
	//全选事件
	$("#btn_selectall").click(function(){
		var btn_selectall=$(".btn_selectall");
		if(btn_selectall.attr("s_all")==0){
			//全选按钮变色
			btn_selectall.css("background-color","#F40");	
			btn_selectall.css("border-color","#F40");
			btn_selectall.attr("s_all",1);
			//全部按钮变状态
			$(".btn_select").css("background-color","#F40");
			$(".btn_select").css("border-color","#F40");
			$(".btn_select_group").attr("s_group",1);
			$(".btn_select_this").attr("s",1);
		}else{
			//全选按钮变色
			btn_selectall.css("background-color","#fff");	
			btn_selectall.css("border-color","#999");
			btn_selectall.attr("s_all",0);
			
			//全部按钮变状态
			$(".btn_select").css("background-color","#fff");	
			$(".btn_select").css("border-color","#999");
			$(".btn_select_group").attr("s_group",0);
			$(".btn_select_this").attr("s",0);
		}
		calculate_price();//合计总金额
	});
	
	//单选事件
	$(".btn_select_this").click(function(){
		var btn_select=$(this);
		if(btn_select.attr("s")==0){
			//按钮变色
			btn_select.css("background-color","#F40");	
			btn_select.css("border-color","#F40");
			btn_select.attr("s",1);
		}else{
			btn_select.css("background-color","#fff");	
			btn_select.css("border-color","#999");
			btn_select.attr("s",0);
			
		}
		//纠正组选按钮状态
		correct_btn_selectgroup(btn_select);
		//纠正全选按钮状态
		correct_btn_selectall();
		calculate_price();//合计总金额
	});
	
	//组选事件
	$(".btn_select_group").click(function(){
		var btn_select_group=$(this);
		var sid=$(this).attr("sid");
		if(btn_select_group.attr("s_group")==0){
			//按钮变色
			btn_select_group.css("background-color","#F40");	
			btn_select_group.css("border-color","#F40");
			btn_select_group.attr("s_group",1);
			
			$("#"+sid+" .btn_select").css("background-color","#F40");
			$("#"+sid+" .btn_select").css("border-color","#F40");
			$("#"+sid+" .btn_select_this").attr("s",1);
		}else{
			btn_select_group.css("background-color","#fff");	
			btn_select_group.css("border-color","#999");
			btn_select_group.attr("s_group",0);
			
			$("#"+sid+" .btn_select").css("background-color","#fff");
			$("#"+sid+" .btn_select").css("border-color","#999");
			$("#"+sid+" .btn_select_this").attr("s",0);
			
		}
		//纠正全选按钮状态
		correct_btn_selectall();
		calculate_price();//合计总金额
	});
	
	
	//按钮+事件
	$(".edit_plus").click(function(){
		var edit_nums=$(this).parent().children(".edit_nums");
		var txt_nums=$(this).parent().parent().parent().children(".btn_block_in").children(".block_right").children(".txt_nums").children(".nums");
		var nums = parseInt(edit_nums.val());
		nums=nums+1;
		edit_nums.val(nums);
		txt_nums.html(nums);
		calculate_price();
	});
	
	//按钮-事件
	$(".edit_minus").click(function(){
		var edit_nums=$(this).parent().children(".edit_nums");
		var txt_nums=$(this).parent().parent().parent().children(".btn_block_in").children(".block_right").children(".txt_nums").children(".nums");
		var nums = parseInt(edit_nums.val());
		nums=nums-1
		if(nums>0){
			edit_nums.val(nums);
			txt_nums.html(nums);
			calculate_price();
		}else{
			return
		}
	});
	
	//按钮del事件
	$(".edit_del").click(function(){
		var parent_single_goods=$(this).parent().parent().parent();
		var ans= window.confirm("是否确定删除？", "标题");
		if(ans){
			parent_single_goods.remove();
			calculate_price();
			clearup_blocks();
		}else{
			return;
		}

	});
	
	//按钮edit事件
	$(".btn_edit").click(function(){
		$(this).parent().parent().find(".info_hidden_show").css("display","none");
		$(this).parent().parent().find(".edit_hidden_show").css("display","block");
		
	});
	//按钮ok事件
	$(".btn_ok").click(function(){
		$(this).parent().parent().find(".single_goods").each(function(index, element){
            var txt_nums=$(this).children(".btn_block_in").children(".block_right").children(".txt_nums").children(".nums");
			var nums=$(this).children(".edit_block").children(".left").children(".edit_nums").val();
			txt_nums.html(nums);
        });
		$(this).parent().parent().find(".info_hidden_show").css("display","block");
		$(this).parent().parent().find(".edit_hidden_show").css("display","none");
		calculate_price();//合计总金额
	});
	
});
/**
*计算总额
*@author zhangwei
*/
function calculate_price(){
	var price=0;
	var nums=0;
	var single_price=0;
	var single_nums=0;
	var group_flag="";
	$(".block_right").each(function(index, element) {
		var s=$(this).parent().parent().children(".btn_select_this").attr("s");
		if(s==1){
			single_price=parseFloat($(this).children(".txt_xianjia").children(".nums").html());
			single_nums=parseFloat($(this).children(".txt_nums").children(".nums").html());
			price+=single_price*single_nums;
			var group=$(this).parent().parent().parent().children(".top_b").children(".btn_store_in").children(".txt_tlt");
			if(group_flag!=group.html()){
				nums+=1;
				group_flag=group.html();
			}
		}else{
			return;
		}
	});
	$("#sub_block .price").html("￥"+price);
	$("#sub_block #btn_sub").html("结算("+nums+")");
	
	
}
/**
*清理多余的块
*@author zhangwei
*/
function clearup_blocks(){
	
	$(".group_block").each(function(index, element) {
		var nums=$(this).find(".single_goods").length;
		if(nums==0){
			$(this).remove();
		}else{
			return;
		}
	});
	
}
/**
*纠正全选按钮状态
*@author zhangwei
*/
function correct_btn_selectall(){
	var num_selected=0;
	var num_all=$(".btn_select_group").length;
	$(".btn_select_group").each(function(index, element) {
		if($(this).attr("s_group")==1)num_selected++;
	});
	var btn_selectall=$(".btn_selectall");
	if(num_all==num_selected){
		//满足全选条件，全选按钮变色
		btn_selectall.css("background-color","#F40");	
		btn_selectall.css("border-color","#F40");
		btn_selectall.attr("s_all",1);
	}else{
		//不满足全选条件，变灰
		btn_selectall.css("background-color","#fff");	
		btn_selectall.css("border-color","#999");
		btn_selectall.attr("s_all",0);
	}
}
/**
*纠正组选按钮状态
*@author zhangwei
*/
function correct_btn_selectgroup(elemt){
	var sid=elemt.parent().parent(".group_block").attr("id");
	var num_selected=0;
	var g_select=$("#"+sid+" .btn_select_this");
	var num_all=g_select.length;
	g_select.each(function(index, element) {
		if($(this).attr("s")==1)num_selected++;
	});
	var btn_select_group=$("#"+sid+" .btn_select_group");
	if(num_all==num_selected){
		//满足全选条件，全选按钮变色
		btn_select_group.css("background-color","#F40");	
		btn_select_group.css("border-color","#F40");
		btn_select_group.attr("s_group",1);
	}else{
		//不满足全选条件，变灰
		btn_select_group.css("background-color","#fff");	
		btn_select_group.css("border-color","#999");
		btn_select_group.attr("s_group",0);
	}
}

/**
*屏幕适配4：结算按钮块适配
*@author zhangwei
*/
function rfWin_sub_block(){
	var container_W=$("#container").width();
	
	$("#sub_block").css("width",container_W);
	var menu_block_h=$("#menu_block").height();
	$("#sub_block").css("bottom",menu_block_h);
	
	
}

