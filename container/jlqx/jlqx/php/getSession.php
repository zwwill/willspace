<?php
session_start();

$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];
$data[0]=$studentID;
$data[1]=$userLevel;
echo json_encode($data);

?>