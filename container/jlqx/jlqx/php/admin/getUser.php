<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];


switch($userLevel)
{
	case 3: case 2: case 1:
		if($users = f_userList())
		{				
			echo json_encode($users);		
		}
		else
		{
			echo '没有人员';
		}
	break;	
	case 0:
		
			echo '没有权限';
	
		break;	
}

?>