<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');

if($_SESSION["studentID"])
{
	$studentID=$_SESSION["studentID"];
	$userLevel=$_SESSION["userLevel"];
	$datas=f_userInfo($studentID);
	echo json_encode($datas);
}
else
{
}
?>