<?php
header("Content-type: text/html; charset=utf-8");
require_once("../lib/function.php");
session_start();
$u_id=$_SESSION['u_id'];
$role=f_get_value("users","u_id",$u_id,"u_role");
session_destroy();
if($role != "admin")
	$url="../index.html";
else
	$url="../manager.html";
header("location:".$url);
?>