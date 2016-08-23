<?php
header("Content-type:text/html; charset=utf-8;");
require_once("../../lib/function.php");

$data=get_tuple("message");
if($data)
	echo json_encode($data);
else
	echo json_encode("无招聘信息");
?>