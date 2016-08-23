
//url信息抓取
        function getQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)
            {
                var result=decodeURI(r[2]);
              	alert(result);
			}
        }
//vCaseInfor 招聘信息数组 装载后输出
var vCaseInfor = Array();
$.ajax({
				url:"../../php/common/info_recr.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无招聘信息")
						alert(product);
					else
						tbl(product);
				}
			});
		//制表函数
		function tbl(product)
		{
			
			for(var i=0;i<product.length;i++)
			{
			vCaseInfor[i]="<div class=''></br><ul><li class=''><span>#</span>"+(i+1)+"</li><li class=''><span>职位：</span>"+product[i].rcrt_job+"</li><li class=''><span>薪酬：</span>"+product[i].rcrt_money+"</li><li class=''><span>工作地点：</span>"+product[i].rcrt_place+"</li><li class=''><span>学历要求：</span>"+product[i].rcrt_edu+"</li><li class=''><span>工作经验：</span>"+product[i].rcrt_exp+"</li><li class=''><span>发布时间：</br></span>"+product[i].date+"</li> <li class=''><span>详情：</br></span>"+product[i].rcrt_detail+"</li></ul></div>";
			}
			insert();//嵌入招聘
			loadSelect(product); //加载下拉菜单
		}
//#endregion

function insert() {
	//#region Case
	$("#wantInfor").html(vCaseInfor[0]);
	$(".wantControl .txt").html("<i>1</i>/" + vCaseInfor.length)

	$(".wantControl .up").click(function () {
		var vi = parseInt($(".wantControl .txt i").text()) - 1;
		var vcount = vCaseInfor.length - 1;
		if (vi != 0) {
			$(".wantCard").removeClass("a-bouncein");
			$(".wantCard").addClass("a-bounceinT");
			$(".wantControl .txt i").text(vi);
			$("#wantInfor").html(vCaseInfor[vi - 1]);
			setTimeout(function () { $(".wantCard").removeClass("a-bounceinT"); }, 1000);
		}
	});

	$(".wantControl .down").click(function () {
		var vi = parseInt($(".wantControl .txt i").text());
		var vcount = vCaseInfor.length;
		if (vi != vcount) {
			$(".wantCard").removeClass("a-bouncein");
			$(".wantCard").addClass("a-bounceinB");
			$(".wantControl .txt i").text(vi + 1);
			$("#wantInfor").html(vCaseInfor[vi]);
			setTimeout(function () { $(".wantCard").removeClass("a-bounceinB"); }, 1000);
		}
	});
	/*
	//自动跳转
	var vp=0;
	 setInterval(function () {
		if(vp==0){
			var vi = parseInt($(".wantControl .txt i").text());
			var vcount = vCaseInfor.length;
			if (vi != vcount) {
				$(".wantCard").removeClass("a-fadein");
				$(".wantCard").addClass("a-flipinY");
				$(".wantControl .txt i").text(vi + 1);
				$("#wantInfor").html(vCaseInfor[vi]);
				setTimeout(function () { $(".wantCard").removeClass("a-flipinY"); }, 500);
			}else{vp=1}
		}
		if(vp==1){
			var vi = parseInt($(".wantControl .txt i").text()) - 1;
			var vcount = vCaseInfor.length - 1;
			if (vi != 0) {
				$(".wantCard").removeClass("a-fadein");
				$(".wantCard").addClass("a-flipinX");
				$(".wantControl .txt i").text(vi);
				$("#wantInfor").html(vCaseInfor[vi - 1]);
				setTimeout(function () { $(".wantCard").removeClass("a-flipinX"); }, 500);
			}else{vp=0}
		}
	}, 10000);
	//#endregion
*/
}
//加载表单职位对应项
function loadSelect(product){
	var select_job=document.getElementById("select_job");
	if(product.length==0)
		alert(product);
	else
	{
		select_job.options[0]=new Option('请选择',0);
		for(var i=0; i<product.length;i++)
		{
			select_job.options[select_job.length]=new Option(product[i].rcrt_job,product[i].rcrt_id);
		}
	}
}

function name_clear(){
	var u_name=document.getElementById("u_name");
	if(u_name.value=="请输入姓名"){
		u_name.value="";
	}
}
 
 //表单非空验证
 function form_is_null(){	 
 	
 }

//刷新表单
function re_show_iframe(div_id,htm_src){
	var t_div=window.top.document.getElementById(div_id);
	t_div.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="410px" scrolling="no" src="'+htm_src+'"></iframe>';
}
//表单跳转到的iframe信息抓取（表现为异步提交表单）
$(function(){
	 $("#sub").click(function getIframInfo(){
		 //必须设置延迟，否则获取不到更新后的值
		 setTimeout(function(){
		 	 //获取iframe的window对象
			 var topWin = document.getElementById("hidden_frame").contentWindow;
			 //通过获取到的window对象操作HTML元素，这和普通页面一样
			 var result=topWin.document.getElementsByTagName("body");
			alert(result[0].innerText); 
			re_show_iframe("div_want","container/want/want.html");//刷新表单
		 },100);
    });
});

