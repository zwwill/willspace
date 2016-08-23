<?php
header("Content-type:text/html; charset=utf-8;");
require_once("../../lib/function.php");
session_start();

$u_id=$_SESSION['u_id'];
$mess=$_REQUEST['txt_mess'];

if(!$u_id)
{
	echo json_encode("请先登录！");
}
else{
	if($mess=="")
	{
		echo json_encode("请输入留言！");
	}
	else
	{
		if(en_message($u_id,$mess))
		{
			echo json_encode("留言成功！");
		}
		else
		{
			echo json_encode("留言失败！");
		}
	}
}
?>