﻿<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
if(isset($_SESSION["userLevel"]))
{
	$studentID=$_SESSION["studentID"];
	$userLevel=$_SESSION["userLevel"];
}
else
{
	$userLevel = 0;
}
$studentID = $_REQUEST["studentID"];
$userName = $_REQUEST["userName"];
$sex = $_REQUEST["sex"];
$citizenID = $_REQUEST["citizenID"];
$naviePlace = $_REQUEST["naviePlace"];
$ethnicGroup = $_REQUEST["ethnicGroup"];
$admissionDate = $_REQUEST["admissionDate"];
$admissionDepartment = $_REQUEST["admissionDepartment"];
$admissionMajor = $_REQUEST["admissionMajor"];
$phoneNumber = $_REQUEST["phoneNumber"];
$qqNumber = $_REQUEST["qqNumber"];
$email = $_REQUEST["email"];

if(isset($_REQUEST["userLevel"]))
{
	$setuserLevel = $_REQUEST["userLevel"];
}
else
{
	$setuserLevel = 0;
}

if($studentID == NULL || $userName == NULL || $citizenID == NULL ||
 $admissionDate == NULL || $admissionMajor == NULL ||
 $phoneNumber == NULL || $qqNumber == NULL || $naviePlace == NULL ||
  $ethnicGroup == NULL)
{
	echo "<script type='text/javascript'>alert('部分空数值，请检查');history.go(-1);</script>";

}
else
{
	if($setuserLevel>=2){
		if($userLevel == 3)
		{
			$r = f_addUser($studentID,$userName,$sex,$citizenID,
			$naviePlace,$ethnicGroup,$admissionDate,$admissionDepartment,
			$admissionMajor,$phoneNumber,$qqNumber,$email,$setuserLevel);
		}
		else
		{
			$r = false;
		}
	}
	else if($setuserLevel == 1)
	{
		if($userLevel >= 2)
		{
			$r = f_addUser($studentID,$userName,$sex,$citizenID,
			$naviePlace,$ethnicGroup,$admissionDate,$admissionDepartment,
			$admissionMajor,$phoneNumber,$qqNumber,$email,$setuserLevel);
		}
		else
		{
			$r = false;
		}
	}
	else
	{
		$r = f_addUser($studentID,$userName,$sex,$citizenID,
		$naviePlace,$ethnicGroup,$admissionDate,$admissionDepartment,
		$admissionMajor,$phoneNumber,$qqNumber,$email,$setuserLevel);
	}
	if($r)
	{
		echo "<script type='text/javascript'>alert('".$r."注册成功');history.go(-1);</script>";
	}
	else
	{
		echo "<script type='text/javascript'>alert('".$r."注册成功失败，请检查');history.go(-1);</script>";
	}
}

?>