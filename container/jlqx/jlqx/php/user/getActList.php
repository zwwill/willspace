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
	$datas = f_userActList($studentID);//��ȡ�û��
	break;
	case'getactlistall':
	$datas = f_getActListAll();//��ȡ���л
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
	$datas = f_getActJoinStu($actID);//�ѱ�����Ա�굥��������userȫ����Ϣ����ѡ������Ϊ�����Ϣ��
	break;
	case'getleaderrlsactlist':
	$datas = f_getLeaderRlsActList($studentID);
	break;
}
echo json_encode($datas);
?>