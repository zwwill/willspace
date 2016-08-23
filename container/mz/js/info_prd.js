show();
function show()
	{
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
				}
			});
		}
		//制表函数
		function tbl(product)
		{
			for(var i=0;i<product.length;i++)
			{
			$("#info").append("<div class='info-block'></br><ul><li class='width2'><span>#</span>"+(i+1)+"</li><li class='width8'><span>产品名：</span>"+product[i].prd_name+"</li><li class='width50'><span>产品描述：</span>"+product[i].prd_dcrt+"</li><li class='width10'><span>上传时间：</br></span>"+product[i].date+"</li><a href='javascript:del_data(\"products\",\"prd_id\","+product[i].prd_id+");'><img class='ico' src='../../images/del.png' /></a> </div>");
			}
		}
		function del_data(tbl_name,id_type,id){
			$.ajax({
				url:"../../php/admin/del_data.php",
				dataType:"json",
				type:"post",
				data:"tbl_name="+tbl_name+"&id_type="+id_type+"&id="+id,
				success: function(data){
					alert(data);
					en("info_prd.html");//删除后立刻刷新信息
					},
				error: function (data){
					alert("错误");
					}
				}); 
			}