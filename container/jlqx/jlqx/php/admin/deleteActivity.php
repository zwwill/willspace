<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');


$userLevel=$_SESSION["userLevel"];
$studentID=$_SESSION["studentID"];

$delActInfoID=$_REQUEST["delActInfoID"];


if( $delActInfoID == NULL )
{
	//echo '未找到目标';
	echo  "<script>alert('未找到目标');history.go(-1);</script>";

}else
{
	if(0<$userLevel&&$userLevel<=3){
		$r = f_deleteActivity($delActInfoID);
		if($r==NULL){
			echo  "<script>alert('删除失败');history.go(-1);</script>";
		}else{
			echo  "<script>alert('删除成功');history.go(-1);</script>";
		}
	}else{
		//echo '无此权限';
		echo  "<script>alert('无此权限');history.go(-1);</script>";
	}

}
?>