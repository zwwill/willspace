<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');


$userLevel=$_SESSION["userLevel"];
$studentID=$_SESSION["studentID"];

$delStuID=$_REQUEST["delStuID"];


if( $delStuID == NULL )
{
	echo  "<script>alert('未找到目标');history.go(-1);</script>";
}
else
{
	if($userLevel==3){
		$r = f_deleteUser($delStuID);
		if($r==NULL){
			echo  "<script>alert('删除失败');history.go(-1);</script>";
		}else{
			echo  "<script>alert('删除成功');history.go(-1);</script>";
		}
	}else{
		echo  "<script>alert('无此权限');history.go(-1);</script>";
	}

}
?>