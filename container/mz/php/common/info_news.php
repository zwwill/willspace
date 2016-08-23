<?php
header("Content:text/html;charset:utf-8;");
require_once("../../lib/function.php");

$data=get_tuple("news");
if($data)
	echo json_encode($data);
else
	echo json_encode("无新闻信息");
?>