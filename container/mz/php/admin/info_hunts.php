<?php
header("Content-type:text/html;charset=utf-8;");
require_once("../../lib/function.php");

$data=get_tuple("hunts");
if($data)
	echo json_encode($data);
else
	echo json_encode("无求职信息");
?>