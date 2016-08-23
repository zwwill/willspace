<?php
header("Content-type: text/html; charset=utf-8");
require_once("../../lib/function.php");
$prd_name=$_REQUEST['prd_name'];
$prd_dcrt=$_REQUEST['prd_dcrt'];
/*文件上传*/
$prd_picname= $_FILES['prd_picurl']['name'] ; //文件名
$tmp_name = $_FILES['prd_picurl']['tmp_name']; //文件存在服务器临时副本文件的名字
$file_type=$_FILES['prd_picurl']['type'];  //是指被上传文件的类型
$file_size=$_FILES['prd_picurl']['size']/1024.0/1024.0 ; //是指被上传文件的大小，单位为字节(B) 此处转换成了M

//$file_error=$_FILES['prd_picurl']["error"] ; //是指由文件上传中有可能出现的错误的状态码，error的错误代码如下：
//0; 文件上传成功。
//1; 超过了文件大小php.ini中。
//2;   超过了文件大小 MAX_FILE_SIZE 选项指定的值。
//3; 文件只有部分被上传。
//4; 没有文件被上传。
//5; 上传文件大小为0。
//echo $systemTime=date("Y-m-d H:i:s");//系统时间
//echo "</br>";
//echo $timeStamp=strtotime($systemTime);//系统时间转时间戳

if($prd_picname && $prd_name && $prd_dcrt)
{   
	if($file_size>5)
	{
		echo "文件大于5M,不能上传";
	}
	else if(!array_key_exists($file_type,array("image/jpeg"=>true,"image/gif"=>true,"image/png"=>true))) 
	{
		echo "图片类型不是jpg、gif、png !";
	}
	else 
	{
		if(en_pro($prd_name,$prd_dcrt,$prd_picname,$tmp_name))
		{
			echo "发布成功";
		} 
		else
		{
			echo "发布失败";
		}
	}
}
else {
		echo "请填写必填项";
}

echo "</br><a href='javascript:history.back();'>返回管理页面</a>";
?>