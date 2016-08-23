<?php
session_start();
require_once(dirname(__file__).'/../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];
global $actID;
$actID = $_REQUEST["actID"];
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>南大金陵青协-已发布的活动</title>
</head>

<body>
<?php
$datas= f_getActJoinStu($actID);
$len = 0;
foreach($datas as $data){$len++;}
echo '<table width="100%" border="1">';
for($i=-1;$i<$len;$i++)
{
	if($i==-1)
	{echo"
	<tr>
    <th scope=col>学号</th>
    <th scope=col>姓名</th>
	<th scope=col>院系</th>
	<th scope=col>手机</th>
	<th scope=col>QQ</th>
    <th scope=col>邮箱</th>
    <th scope=col>活动报名附言</th>
	<th scope=col>活动回馈</th>
    <th scope=col>活动细节</th>
	<th scope=col>操作</th>
	<tr>
	";}
	else
	{$studentID = $datas[$i]["studentID"];
	$userName = $datas[$i]["userName"];
	$admissionMajor = $datas[$i]["admissionMajor"];
	$phoneNumber = $datas[$i]["phoneNumber"];
	$qqNumber = $datas[$i]["qqNumber"];
	$email = $datas[$i]["email"];
	$stuRemark = $datas[$i]["stuRemark"];
	switch($datas[$i]["admissionDepartment"])
	{
		case 0: $admissionDepartment = '金陵学院'; break;
		case 1: $admissionDepartment = '传媒学院'; break;
		case 2: $admissionDepartment = '信息科学与工程学院'; break;
		case 3: $admissionDepartment = '商学院'; break;
		case 4: $admissionDepartment = '化学与生命科学学院'; break;
		case 5: $admissionDepartment = '艺术学院'; break;
		case 6: $admissionDepartment = '城市与资源学院'; break;
		case 7: $admissionDepartment = '外国语学院'; break;
	}
	echo"
	<form id='form1' name='form1' method='post' action='../php/leader/activityConfirm.php'>
	<tr>
    <th scope=col>$studentID</th>
    <th scope=col>$userName</th>
	<th scope=col>$admissionDepartment $admissionMajor</th>
	<th scope=col>$phoneNumber</th>
    <th scope=col>$qqNumber</th>
    <th scope=col>$email</th>
	<th scope=col>$stuRemark</th>
	<th scope=col><select name='stuState'>
    <option value=2>活动完成</option>
    <option value=-1>活动缺席</option>
	</select></th>
    <th scope=col><input type='text' name='stuActivityDetail' /></th>
	<th scope=col><input type='submit' value='提交' name='button'  onclick='window.location.reload()'/></th>
	<input type='hidden'  name='studentID' value='$studentID' >
	<input type='hidden'  name='actID' value='$actID' >
	<tr>
	</form> 
	";}
}
echo '</table>';//style="display:none;"不刷新
?>

</body>

</html>
