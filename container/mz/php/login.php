<?php
header("Content-type: text/html; charset=utf-8");
session_start();
require_once("../lib/function.php");

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
	$result="登陆成功！";
	$url="location:../index.html?rlt=".$result;
}else{
	$result="用户名或密码错误！";
	$url="location:../index.html?rlt=".$result;
  }
  
header($url);          
?>