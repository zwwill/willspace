<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];

$action  = $_REQUEST["action"];
if(isset($_REQUEST["actID"]))
{
	$actID = $_REQUEST["actID"];
}
switch($action){
	case 'useractlist':
	$datas = f_userActList($studentID);//获取用户活动
	break;
	case'getactlistall':
	$datas = f_getActListAll();//获取所有活动
	break;
	case'getactlistavailable';
	$datas = f_getActListAvailable();
	break;
	case 'getactdetail':
	$datas = f_getActDetail($actID);
	break;
	case'getactfinished':
	$datas = f_getActFinishedList();
	break;
	case'getactjoinstu':
	$datas = f_getActJoinStu($actID);//已报名人员详单（包涵了user全部信息，挑选部分作为表格信息）
	break;
	case'getleaderrlsactlist':
	$datas = f_getLeaderRlsActList($studentID);
	break;
}
echo json_encode($datas);
?>