<?php
header('Content-type: text/html; charset=utf-8');
require_once("../../lib/function.php");
$tbl_name=$_REQUEST["tbl_name"];
$id_type=$_REQUEST["id_type"];
$id=$_REQUEST["id"];
if(array_key_exists($tbl_name,array("recruit"=>true,"message"=>true)))
{
	//如果所删除的表名无关联文件则不执行删除
}
else{//有需要删除关联文件的执行删除操作
		if($tbl_name=="news")
				$file_path=f_get_value($tbl_name,$id_type,$id,"news_picurl");
		else if($tbl_name=="products")
				$file_path=f_get_value($tbl_name,$id_type,$id,"prd_picurl");
		else if($tbl_name=="hunts")
				$file_path=f_get_value($tbl_name,$id_type,$id,"hunt_fileurl");
		$file_path=iconv("utf-8","gb2312//IGNORE",$file_path);/*本地默认gb2312编码*///注意与存储的编码统一
		$del_file_rs=unlink($file_path); //删除文件
}
if(del_data($tbl_name,$id_type,$id))//删除数据库元组
{
	if( ! isset($del_file_rs))
	{	//无关联文件删除结果则删除元组即为成功删除
		echo json_encode("删除成功！");
	}
	else{
		if($del_file_rs)
			echo json_encode("删除成功！");
		else
			echo json_encode("关联文件删除失败！");
	}
}
else
{
	echo json_encode("删除失败！");
}     
?>