show();
function show()
		{
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
		}
		//制表函数
		function tbl(product)
		{
			for(var i=0;i<product.length;i++)
			{
			$("#info").append("<div class='info-block'></br><ul><li class='width2'><span>#</span>"+(i+1)+"</li><li class='width10'><span>职位：</span>"+product[i].rcrt_job+"</li><li class='width10'><span>薪酬：</span>"+product[i].rcrt_money+"</li><li class='width10'><span>工作地点：</span>"+product[i].rcrt_place+"</li><li class='width10'><span>学历要求：</span>"+product[i].rcrt_edu+"</li><li class='width10'><span>工作经验：</span>"+product[i].rcrt_exp+"</li><li class='width10'><span>发布时间：</br></span>"+product[i].date+"</li><a href='javascript:del_data(\"recruit\",\"rcrt_id\","+product[i].rcrt_id+");'><img class='ico' src='../../images/del.png' /></a> </div>");
			}
		}
		function del_data(tbl_name,id_type,id){
			$.ajax({
				url:"../../php/admin/del_data.php",
				type:"post",
				dataType:"json",
				data:"tbl_name="+tbl_name+"&id_type="+id_type+"&id="+id,
				success: function(data){
					alert(data);
					en("info_recr.html");//删除后立刻刷新信息
					}
				}); 
			}
/* 
		function show_detail(){
			$(".detail-block").toggleClass("block-hidden","block-show");
	  		$(".detail-block").fadeIn();
			}
			function hidden_detail(){
			$(".detail-block").toggleClass("block-show","block-hidden");
	 		$(".detail-block").fadeOut();
			} */