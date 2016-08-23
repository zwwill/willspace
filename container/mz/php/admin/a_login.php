<?php
header("Content-type: text/html; charset=utf-8");
session_start();
require_once("../../lib/function.php");

$ln=$_REQUEST["l_ln"];
$pw=$_REQUEST["l_pw"];
$result="";
$url="";
//登陆
$lg_rs=f_login($ln,$pw);
if($lg_rs){
	if(!isset($_SESSION["u_id"]))
	{
		$_SESSION["u_id"]=$lg_rs;
	}
	//取用户身份
	$u_role=f_get_value("users","u_id",$_SESSION["u_id"],"u_role");

	if($u_role)
	{
		 if($u_role=="admin")
		{   
			$result="管理员登陆成功！";
			$url="location:../../html/admin/admin.html?rlt=".$result;
		}
		else
		{ 
			$result="无权登录页面！";
			$url="location:../../index.html?rlt=".$result;
		 } 
	}
}else{
	$result="用户名或密码错误！";
	$url="location:../../manager.html?rlt=".$result;
  }
  
header($url);          
?>