<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];


switch($userLevel)
{
	case 3: case 2: case 1: 
		$datas = f_getActDict($studentID,$userLevel);
		echo json_encode($datas);
	break;
	case 0:
		echo '-1';
	break;
}
?>