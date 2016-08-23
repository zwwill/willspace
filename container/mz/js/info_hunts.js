show();
function show()
	{
			$.ajax({
				url:"../../php/admin/info_hunts.php",
				datatype:"json",
				type:"post",
				success:function(data){
					var product = eval("(" + data + ")");
					if(product == "无求职信息")
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
			$("#info").append("<div class='info-block'></br><ul><li class='width2'><span>#</span>"+(i+1)+"</li><li class='width8'><span>姓名：</span>"+product[i].u_name+"</li><li class='width12'><span>联系方式：</span>"+product[i].phone+"</li><li class='width12'><span>职位：</span>"+product[i].rcrt_job+"</li><li class='width10'><span>简历：</span><a href='"+download_file("hunts",product[i].hunt_id)+"'>下载</a></li><li class='width10'><span>上传时间：</br></span>"+product[i].date+"</li><a href='javascript:del_data(\"hunts\",\"hunt_id\","+product[i].hunt_id+");'><img class='ico' src='../../images/del.png' /></a> </div>");
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
					en("info_hunts.html");//删除后立刻刷新信息
					}
				}); 
			}
	 		//tbl_name下载文件路径存储表名 , file_id下载文件对应编号
		function download_file(tbl_name,file_id){
			/* 	tbl_name=encodeURIComponent(tbl_name);
				file_id=encodeURIComponent(file_id); */
				var url;
				$.ajax({
						url:"../../php/admin/download_file.php",
						type:"get",
						dataType:"json",
						async:false,
						data:"tbl_name="+tbl_name+"&"+"file_id="+file_id,
						success: function(data){
							url=data;
						}	
				});
				return url;
			} 