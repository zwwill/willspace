<?php
header("Content-type: text/html; charset=utf-8");
session_start();
require_once("../../lib/function.php");
if(isset($_SESSION["u_id"])){
		$role=f_get_value("users","u_id",$_SESSION["u_id"],"u_role");
		if($role=="admin")
			echo json_encode("yes");
		else
			echo json_encode("no");
}else
{
	echo json_encode("loginOff");
}
?>