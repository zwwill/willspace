<?php
header("Content-type: text/html; charset=utf-8");
require_once("../../lib/function.php");
$rcrt_job=$_REQUEST['rcrt_job'];
$rcrt_money=$_REQUEST['rcrt_money'];
$rcrt_place=$_REQUEST['rcrt_place'];
$rcrt_edu=$_REQUEST['rcrt_edu'];
$rcrt_exp=$_REQUEST['rcrt_exp'];
$rcrt_detail=$_REQUEST['rcrt_detail'];

if($rcrt_job && $rcrt_money && $rcrt_place && $rcrt_edu && $rcrt_exp && $rcrt_detail)
{   
		if(en_rcrt($rcrt_job,$rcrt_money,$rcrt_place,$rcrt_edu,$rcrt_exp,$rcrt_detail))
		{
			echo "发布成功";
		} 
		else
		{
			echo "发布失败";
		}
}
else {
		echo "请填写必填项";
}

echo "</br><a href='javascript:history.back();'>返回管理页面</a>";
?>