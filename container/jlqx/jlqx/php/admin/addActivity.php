<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

$studentID  = $_REQUEST["studentID"];
$userName  = $_REQUEST["userName"];
$activityName  = $_REQUEST["activityName"];
$activityDetail  = $_REQUEST["activityDetail"];
$activityDate  = $_REQUEST["activityDate"];
$activityHour  = $_REQUEST["activityHour"];
$activityGrade  = $_REQUEST["activityGrade"];
$activityRemark  = $_REQUEST["activityRemark"];

if( $studentID == NULL || $activityName == NULL || $activityDetail == NULL ||
 $activityDate == NULL || $activityHour == NULL || $activityGrade == NULL)
{
	echo '空数值，返回重填';

}
else
{
	if(0<$userLevel&&$userLevel<=3){
	$r = f_addActivity($studentID,$userName,$activityName,$activityDetail,
	$activityDate,$activityHour,$activityGrade,$activityRemark);

	if($r)
	{
		echo $r.' 新增活动记录成功';
	}
	else
	{
		echo $r.' 新增活动记录失败，请检查';
	}
	}
}
?>