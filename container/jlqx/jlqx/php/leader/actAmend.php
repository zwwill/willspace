<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

if($userLevel >=1 )
{
	$actName  = $_REQUEST["actName"];
	$actCodeNum  = $_REQUEST["actCodeNum"];
	$actDatetime  = $_REQUEST["actDatetime"];
	$actDeadline  = $_REQUEST["actDeadline"];
	$actPRContact  = $_REQUEST["actPRContact"];
	$actPlace  = $_REQUEST["actPlace"];
	$actHour  = $_REQUEST["actHour"];
	$actLimit  = $_REQUEST["actLimit"];
	$actRemark  = $_REQUEST["actRemark"];
	$actPRID = $studentID;

	if( $actPRContact == NULL || $actPlace == NULL || $actLimit == NULL ||
	$actRemark == NULL || $actDatetime == NULL || $actDeadline == NULL)
	{
		echo '空数值，返回重填';
	}
	else
	{
		$r = f_actAmend($actPRID, $actPRContact, $actCodeNum, $actName,
		$actDatetime, $actHour, $actLimit, $actPlace, $actDeadline, $actRemark);
	}
}
else
{}
?>