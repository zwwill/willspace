<?php
header("Content-type:text/html;charset:utf-8;");
require_once("../../lib/function.php");
$u_name = $_REQUEST["u_name"];
$phone = $_REQUEST["phone"];
$job_id = $_REQUEST["job"];

/*文件上传*/
$filename= $_FILES['file_resume']['name'] ; //文件名
$tmp_name = $_FILES['file_resume']['tmp_name']; //文件存在服务器临时副本文件的名字
$file_type=$_FILES['file_resume']['type'];  //是指被上传文件的类型
$file_size=$_FILES['file_resume']['size']/1024.0/1024.0 ; //是指被上传文件的大小，单位为字节(B) 此处转换成了M

 
if($u_name && $phone && $job_id && $filename)
{
	if($file_size>5)
	{
		echo "文件大于5M,不能上传";
	}
	else if(!array_key_exists($file_type,array("application/octet-stream"=>true,"application/pdf"=>true))) 
	{
		echo "文件类型不是doc或pdf !";
	}
	else 
	{
		if(hunt($u_name,$phone,$job_id,$filename,$tmp_name))
		{
			echo "提交成功";
		} 
		else
		{
			echo "提交失败";
		}
	}
}
else{
	echo "请输入必填项!!";
	} 
?>