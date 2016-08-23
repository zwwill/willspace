<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$actPRID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

if($userLevel>=1&&$userLevel<=3)
{
	$actID = $_REQUEST["actID"];
	$studentID = $_REQUEST["studentID"];
	$stuState = $_REQUEST["stuState"];
	$stuActivityDetail = $_REQUEST["stuActivityDetail"];
	if(isset($_REQUEST["stuActivityRemark"])){
		$stuActivityRemark = $_REQUEST["stuActivityRemark"];
	}
	else
	{
		$stuActivityRemark = null;
	}

	f_updateActStuState($studentID,$actID,$actPRID,$stuState,
	$stuActivityDetail,$stuActivityRemark);

	if($stuState == 2)
	{
		f_activityInsert($actID,$studentID);
		f_calcActivityHour($studentID);
	}
	f_isActFinished($actID);
	f_calcActTakenNum($actID);
}
?>