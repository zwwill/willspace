<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

$oldpwd = $_REQUEST["oldpwd"];
$newpwd = $_REQUEST["newpwd"];
$newpwd2 = $_REQUEST["newpwd2"];

if( $oldpwd == NULL || $newpwd == NULL || $newpwd2 == NULL || $newpwd != $newpwd2)
{
	echo '空数值或两次确认密码不同，返回重填';

}
else
{
	$r = f_changePassword($studentID,$oldpwd,$newpwd);
	if($r)
	{
		echo ' 修改密码成功';
	}
	else
	{
		echo ' 修改密码失败，请检查';
	}
}
?>