<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

$phoneNumber = $_REQUEST["phoneNumber"];
$email = $_REQUEST["email"];

if( $phoneNumber == NULL || $email == NULL)
{
	echo '空数值，返回重填';

}
else
{
	$r = f_changeUserInfo($studentID,$phoneNumber,$email);
	if($r)
	{
		echo ' 修改信息成功';
	}
	else
	{
		echo ' 修改信息失败，请检查';
	}
}
?>