<?php
header("Content-type: text/html; charset=utf-8");
require_once("../lib/function.php");
$ln=$_REQUEST["r_ln"];
$pw=$_REQUEST["r_pw"];
$pw_2=$_REQUEST["r_pw_2"];
if($pw==$pw_2)
{
	//注册
	$reg_rs=f_reg($ln,$pw);
	if($reg_rs)
	{
		$result="注册成功！";	
	}else
	{
		$result="注册失败！";
	}
}else{
	$result="两次密码不一致！";
}



$url="location:../index.html?rlt=".$result;
header($url);
?>