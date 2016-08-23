<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

if($userLevel>=2)
{
	$actName  = $_REQUEST["actName"];
	$actHour  = $_REQUEST["actHour"];
	$actTime = $_REQUEST["actTime"];
	$actIntro  = $_REQUEST["actIntro"];

	
	$r = f_addActDict($actName,$actHour,$actTime,$actIntro);
	//临时解决leftjoin显示无stuID的codeNum为null，将actdict的插入者生成到绑定列表
	foreach($r as $data){}
	$actCodeNum = $data["actCodeNum"];
	$operarion = 'add';
	f_actDictLeader($actCodeNum,$studentID,$operarion);
	echo "<script type='text/javascript'>alert('$data[actName].新增成功');</script>";
}
else
{
	echo "<script type=text/javascript>alert('-1');</script>";
}
?>