<?php
header("Content-type: text/html; charset=utf-8");
session_start();
require_once("../lib/function.php");
if(isset($_SESSION["u_id"])){
	echo json_encode("yes");
}else
{
	echo json_encode("no");
}
?>