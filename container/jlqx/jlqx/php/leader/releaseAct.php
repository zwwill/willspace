<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

if($userLevel >= 1)
{
	$actCodeNum  = $_REQUEST["actCodeNum"];
	$actDate  = $_REQUEST["actDate"];
	$actDeadline  = $_REQUEST["actDeadline"];
	$actDept = $_REQUEST["actDept"];
	$actPRContact  = $_REQUEST["actPRContact"];
	$actPlace  = $_REQUEST["actPlace"];
	$actLimit  = $_REQUEST["actLimit"];
	$actRemark  = $_REQUEST["actRemark"];
	$actPRID = $studentID;

	if( $actPRContact == NULL || $actPlace == NULL || $actLimit == NULL ||
	$actRemark == NULL || $actDate == NULL || $actDeadline == NULL)
	{
		echo '空数值，返回重填';
	}
	else
	{
		$datas = f_getActDict($studentID,$userLevel);
		$j = 0;
		foreach($datas as $data)
		{
			echo $data["actCodeNum"];
			if($data["actCodeNum"] == $actCodeNum)
			{
				$actName = $data["actName"];
				$actTime = $data["actTime"];
				$actHour = $data["actHour"];
			}
		}
		$r = f_releaseAct($actPRID, $actPRContact, $actCodeNum, $actDept, $actName,
					$actDate, $actTime, $actHour, $actLimit, $actPlace, $actDeadline, $actRemark);
	}
}
else
{$r = false;}
?>