<?php
header("Content-type: text/html; charset=utf-8");
require_once("../../lib/function.php");
$news_title=$_REQUEST['news_title'];
$news_content=$_REQUEST['news_content'];
/*文件上传*/
$news_picname= $_FILES['news_picurl']['name'] ; //文件名
$tmp_name = $_FILES['news_picurl']['tmp_name']; //文件存在服务器临时副本文件的名字
$file_type=$_FILES['news_picurl']['type'];  //是指被上传文件的类型
$file_size=$_FILES['news_picurl']['size']/1024.0/1024.0 ; //是指被上传文件的大小，单位为字节(B) 此处转换成了M

if($news_picname && $news_title && $news_content)
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
		if(en_news($news_title,$news_content,$news_picname,$tmp_name))
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