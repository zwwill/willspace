
//vCaseInfor 信息数组 装载后输出
var vCaseInfor = Array();
$.ajax({
				url:"../../php/common/info_prd.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无产品信息")
						alert(product);
					else
						tbl(product);
					//内容装载好开始切换
			 	 	toggle(); 
				}
			});
		//制表函数
		function tbl(product)
		{
			//填充（只取最新的五条产品）
			var size=5;
			if(product<=5)
			{
				size=product.length;
			}
			
				for(var i=0;i<product.length;i++)
				{
					switch(i)
					{
						case 0:
							vCaseInfor[0]="<img class='show' src='"+product[0].prd_picurl+"'/><div class='hidden'  ><span class='text'>"+product[0].prd_name+"</br>"+product[0].prd_dcrt+"</span></div>";
							$("#prd1").html(vCaseInfor[0]);
							break;
						case 1:
							vCaseInfor[1]="<img class='show' src='"+product[1].prd_picurl+"'/><div class='hidden' ><span class='text'>"+product[1].prd_name+"</br>"+product[1].prd_dcrt+"</span></div>";
							$("#prd2").html(vCaseInfor[1]);
							break;
						case 2:
							vCaseInfor[2]="<img class='show' src='"+product[2].prd_picurl+"'/><div class='hidden'><span class='text'>"+product[2].prd_name+"</br>"+product[2].prd_dcrt+"</span></div>";
							$("#prd3").html(vCaseInfor[2]); 
							break;
						case 3:
							vCaseInfor[3]="<img class='show' src='"+product[3].prd_picurl+"'/><div class='hidden' ><span class='text'>"+product[3].prd_name+"</br>"+product[3].prd_dcrt+"</span></div>";
			$("#prd4").html(vCaseInfor[3]);
							break;
						case 4:
							vCaseInfor[4]="<img class='show' src='"+product[4].prd_picurl+"'/><div class='hidden' ><span class='text'>"+product[4].prd_name+"</br>"+product[4].prd_dcrt+"</span></div>"; 
							$("#prd5").html(vCaseInfor[4]); 
							break;
						default:break;
					}
				}
		}
/* 图文切换 */
 function toggle(){
   $(".toggle-list .show").mouseover(function(){
	   $(this).parent(".toggle-list").children(".show").animate({opacity: '0' },500);
      $(this).parent(".toggle-list").children(".show").css("display","none");
	  $(this).parent(".toggle-list").children(".hidden").stop().animate({opacity: '1' },500);
      $(this).parent(".toggle-list").children(".hidden").css("display","block");
    })  ;
   $(".toggle-list .hidden").mouseout(function(){
	    $(this).parent(".toggle-list").children(".hidden").stop().animate({opacity: '0' },500);
      $(this).parent(".toggle-list").children(".hidden").css("display","none");
	   $(this).parent(".toggle-list").children(".show").animate({opacity: '1' },500);
      $(this).parent(".toggle-list").children(".show").css("display","block");
   }) ;
} 
//块显示
function display(id){
            document.getElementById(id).className="show-on";
        }

 