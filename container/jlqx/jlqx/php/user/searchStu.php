<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');

$studentID = $_SESSION["studentID"];
$userLevel = $_SESSION["userLevel"];

	
if(isset($_REQUEST["studentID"]) && !isset($_REQUEST["userName"]))
{
	$searchStudentID = $_REQUEST["studentID"];
	$searchUserName = null;
	$datas = f_searchStu($searchStudentID,$searchUserName);
}
else if(!isset($_REQUEST["studentID"]) && isset($_REQUEST["userName"]))
{
	$searchUserName = $_REQUEST["userName"];
	$searchStudentID = null;
	$datas = f_searchStu($searchStudentID,$searchUserName);
}
else if(isset($_REQUEST["studentID"]) && isset($_REQUEST["userName"]))
{
	$searchStudentID = $_REQUEST["studentID"];
	$searchUserName = $_REQUEST["userName"];
	$datas = f_searchStu($searchStudentID,$searchUserName);
}
else if(!isset($_REQUEST["studentID"]) && !isset($_REQUEST["userName"]))
{
	$datas = -1;
}
echo json_encode($datas);
?>