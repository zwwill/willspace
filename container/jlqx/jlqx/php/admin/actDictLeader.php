<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];
if($userLevel>=2)
{
	$actCodeNum = $_REQUEST["actCodeNum"];
	$actStudentID = $_REQUEST["actStudentID"];
	$operation = 'add';//$_REQUEST["operation"];add,delete
	$r = f_actDictLeader($actCodeNum,$actStudentID,$operation);
	if($r)
	{
		if($userLevel == 0)
		{
			$setUserLevel=1;
			f_setUserLevel($actStudentID, $setUserLevel);
		}
		echo "<script type='text/javascript'>alert('添加成功');history.go(-1);</script>";
	}
}
?>