<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

switch($userLevel)
{
	case 3: case 2: case 1:
		if($activities = f_getActivityOrdered())
		{	
			//$len = count($activities);
			//$result = f_arrayUnique($activities);
			echo json_encode($activities);
			
		}
		else
		{
			echo '没有活动记录';
		}
	break;	
	case 0:
		$activities = f_activityInfo($studentID);
		if($activities)
		{
			echo json_encode($activities);
		}
		else
		{
			echo '没有活动记录';
		}	
		break;	
}

?>