<?php
session_start();
require_once(dirname(__file__).'/../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>南大金陵青协-已发布的活动</title>
</head>

<body>
<?php
$datas= f_getLeaderRlsActList($studentID);
$len = 0;
$id = array();
foreach($datas as $data){$len++;}
echo '<table width="100%" border="1">';
for($i=-1;$i<$len;$i++)
{
	if($i==-1)
	{echo"
	<tr>
    <th scope=col>活动名称</th>
    <th scope=col>活动时间</th>
	<th scope=col>截止时间</th>
	<th scope=col>时长</th>
    <th scope=col>地点</th>
    <th scope=col>备注</th>
	<th scope=col>实际/已报/上限</th>
	<th scope=col>状态</th>
    <th scope=col>名单</th>
	<th scope=col>新闻稿</th>
	<tr>
	";}
	else
	{$actID = $datas[$i]["actID"];
	$actName = $datas[$i]["actName"];
	$actDate = $datas[$i]["actDate"];
	$actTime = $datas[$i]["actTime"];
	$actDeadline = $datas[$i]["actDeadline"];
	$actPlace = $datas[$i]["actPlace"];
	$actRemark = $datas[$i]["actRemark"];
	$actTaken = $datas[$i]["actTaken"];
	$actSigned = $datas[$i]["actSigned"];
	$actLimit = $datas[$i]["actLimit"];
	$actHour = $datas[$i]["actHour"];
	$actDeadline = $datas[$i]["actDeadline"];
	$actArticle = $datas[$i]["actArticle"];
	switch($datas[$i]["actState"])
	{
		case 0: $actState = '未开始'; break;
		case 0: $actState = '未生成活动记录'; break;
		case 0: $actState = '已完成'; break;
	}
	echo"
	<tr>
    <th scope=col>$actName</th>
    <th scope=col>$actDate $actTime</th>
	<th scope=col>$actDeadline</th>
	<th scope=col>$actHour</th>
    <th scope=col>$actPlace</th>
    <th scope=col>$actRemark</th>
	<th scope=col>$actTaken/$actSigned/$actLimit</th>
	<th scope=col>$actState</th>
    <th scope=col><a href='getActJoinStuList.php?actID=";echo $actID."'>查看名单</a></th>
	<th scope=col><a href='#'>编辑</a></th>
	<tr>
	";}
}
echo '</table>';
?>

</body>

</html>
