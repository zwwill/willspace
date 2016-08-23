<?php
session_start();
require_once(dirname(__file__).'/../../lib/function.php');

$studentID = $_SESSION["studentID"];
$userLevel = $_SESSION["userLevel"];

$actID = $_REQUEST["actID"];
/*这个文件功能比较多
A:stuState = cancel(0)/join(1); stuRemark
B:action = getactjoinstu,getuseractdetail...
	部分需要传递actID.
*/
if(isset($_REQUEST["stuState"]))
{
	if(isset($_REQUEST["stuRemark"]))
	{
		$stuRemark = $_REQUEST["stuRemark"];
	}
	else
	{
		$stuRemark = null;
	}
	switch($_REQUEST["stuState"])
	{
		case 'join':
		$stuState  = 1;
		break;
		case 'cancel':
		$stuState  = 0;
		break;
	}
	f_actJoin($studentID,$actID,$stuState,$stuRemark);
	$state = f_userActJoinState($actID, $studentID);
	$r = f_userActStateDict($state);
		/*最后返回的是参加状态
		case '-1':$data = 'absent';break;
		case '0': $data = 'cancel';break;
		case '1': $data = 'joined';break;
		case '2': $data = 'accomplished';break;
		case '3': $data = 'success';break;
		*/
	f_calcActSignNum($actID);
	echo  "<script>alert('$r');history.go(-1);</script>";
}
else if(isset($_REQUEST["action"]))
{
	$action = $_REQUEST["action"];
	if($action == 'getuseractdetail')//用户参加某一活动的具体资料
	{
		$r = f_userActDetail($actID, $studentID);
	}
	else if($action == 'getuseractjoinstate')
	{
		$data = f_userActJoinState($actID, $studentID);
		$r = f_userActStateDict($data);
		/*最后返回的是用户参加状态
		case '-1':$data = 'absent';break;
		case '0': $data = 'cancel';break;
		case '1': $data = 'joined';break;
		case '2': $data = 'accomplished';break;
		case '3': $data = 'success';break;
		*/
	}
	echo json_encode($r);
}

?>