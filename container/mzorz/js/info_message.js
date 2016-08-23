show();
function show()
		{
			$.ajax({
				url:"../../php/common/info_message.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无留言信息")
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
			$("#info").append("<div class='info-block'></br><ul><li class='width2'><span>#</span>"+(i+1)+"</li><li class='width10'><span>留言人：</span>"+product[i].u_name+"</li><li class='width20'><span>联系方式：</span>"+product[i].u_contact+"</li><li class='width40'><span>内容：</span>"+product[i].msg_content+"</li><li class='width10'><span>发布时间：</br></span>"+product[i].date+"</li><a href='javascript:del_data(\"message\",\"msg_id\","+product[i].msg_id+");'><img class='ico' src='../../images/del.png' /></a> </div>");
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
					en("info_message.html");//删除后立刻刷新信息
					}
				}); 
			}