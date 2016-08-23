
//vCaseInfor 信息数组 装载后输出
var vCaseInfor = Array();
$.ajax({
				url:"../../php/common/info_news.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无新闻信息")
						alert(product);
					else
						tbl(product);
				}
			});
		//制表函数
		function tbl(product)
		{
			
			//填充（只取最新的四条新闻）
			vCaseInfor[0]="<a href='news_details.html?id="+product[0].news_id+"' target='_blank'><img width='370px' height='370px' src='"+product[0].news_picurl+"'/><div id='text1' class='new_txt txt_size_2x2'><h5>"+product[0].news_title+"</h5><p>"+product[0].news_content+"</p></div></a>";
			$("#new1").html(vCaseInfor[0]);
			
				vCaseInfor[1]="<a href='news_details.html?id="+product[1].news_id+"' target='_blank'><img width='370px' height='180px' src='"+product[1].news_picurl+"' /><div id='text1' class='new_txt txt_size_2x1'><h5>"+product[1].news_title+"</h5><p>"+product[1].news_content+"</p></div></a>";
			$("#new2").html(vCaseInfor[1]);
			
				vCaseInfor[2]="<a href='news_details.html?id="+product[2].news_id+"' target='_blank'><img width='180px' height='180px' src='"+product[2].news_picurl+"' /><div id='text1' class='new_txt txt_size_1x1'><h5>"+product[2].news_title+"</h5><p>"+product[2].news_content+"</p></div></a>";
			$("#new3").html(vCaseInfor[2]);
			
				vCaseInfor[3]="<a href='news_details.html?id="+product[3].news_id+"' target='_blank'><img width='180px' height='180px' src='"+product[3].news_picurl+"' /><div id='text1' class='new_txt txt_size_1x1'><h5>"+product[3].news_title+"</h5><p>"+product[3].news_content+"</p></div></a>";
			$("#new4").html(vCaseInfor[3]);

		}


 