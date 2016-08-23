<?php
require_once("../../lib/function.php");

$data=get_tuple("recruit");
if($data)
	echo json_encode($data);
else
	echo json_encode("无招聘信息");
?>