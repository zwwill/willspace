<?php
header("Content-type: text/html; charset=utf-8");
require_once("../../lib/function.php");

$tbl_name=$_REQUEST["tbl_name"];
$file_id=$_REQUEST["file_id"];

//取出改文件路径
$file_path = f_get_value($tbl_name,"hunt_id",$file_id,"hunt_fileurl");
echo json_encode($file_path);
?>