<?php
session_start();
require_once(dirname(__file__).'/../lib/function.php');
require_once(dirname(__file__).'/setSession.php');

$studentID = $_REQUEST["studentID"];
$password = $_REQUEST["password"];

$isIn = f_login($studentID,$password);

if($isIn)
{
	$userLevel = f_getLevel($studentID);
	
	switch($userLevel)
	{
		case 0: case 1: case 2: case 3:
        	$url = '../html/manage.html';
			echo "<script language='javascript' type='text/javascript'>";
			echo "window.location.href='$url'";
			echo "</script>";
       		session_set($studentID,$userLevel);
			break;
		default:
			echo "<script>alert('权限出错');history.go(-1);</script>";
	}
}
else
{
	echo "<script>alert('  登录失败！！ 用户名【 ".$studentID." 】不存在或密码错误！！');history.go(-1);</script>";

}

?>