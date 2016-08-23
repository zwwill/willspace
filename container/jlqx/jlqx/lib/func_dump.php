<?php
//*未审核活动列表
function f_actUncheckList()
{
	$database = new medoo("jlqx");
	$sql = "select * from act_release where actCheckState < 2 order by actDeadline ASC";
	if($result = $database->query($sql))
	{
		$datas = $result->fetchAll();
		return $datas;
	}
	else
	{
		return false;
	}
}

//活动记录待审核列表
function f_activityUncheckList($actID)
{
	$database = new medoo("jlqx");
	$datas = $database->select("act_relation","*",array(
		"actID" => $actID,
		"stuState" => 2
	));
	return $datas;
}

//*活动审核操作
function f_actDoCheck($studentID,$actID,$actCheckState,$actCheckInfo)
{
		$database = new medoo("jlqx");
		$datas = $database->update("act_release",array(
			"actCheckPersonID" => $studentID,
			"actCheckState" => $actCheckState,
			"actCheckInfo" => $actCheckInfo
		),
		array(
			"actID" => $actID			
		));
		$datas = f_getActDetail($actID);
		if($datas[0]["actCheckState"] == $actCheckState)
		{
			$r = true;
		}
		else
		{
			$r = false;
		}
		return $r;
}

//*活动点赞
function f_actLike($studentID,$actID)
{
	$database = new medoo("jlqx");
	$datas = $database->select("act_relation","*",array(
		"actID" => $actID,
		"studentID" => $studentID
	));
	if($datas)
	{
		$datas = $database->update("act_relation", array(
		"stuLike" => 1),
		array(
			"actID" => $actID,
			"studentID" => $studentID
		));
	}
	else
	{
		$datas = $database->insert("act_relation", array(
		"actID" => $actID,
		"studentID" => $studentID,
		"stuLike" => 1
	));
	}
}

//拉取点赞人员
function f_getActLikeStu($actID)
{
	$database = new medoo("jlqx");
	$sql = "select userName from act_relation where act_relation.stuLike = 1 and 
	act_relation.actID = $actID left join users on (act_relation.studentID = users.studentID)";
	$datas = $database->query($sql)->fetchAll();
	return $datas;
}
//拉取评论
function f_getActComments($actID)
{
	$database = new medoo("jlqx");
	$sql = "select * from act_relation where act_relation.actID = act_relation.$actID 
	left join users on (act_relation.studentID = users.studentID)";
	$datas = $database->query($sql)->fetchAll();
	return $datas;
}

//*评论（回复）活动
function f_actComment($studentID,$userLevel,$actID,$stuComment,$stuCommentReplay)
{
	$database = new medoo("jlqx");
	$datas = $database->select("act_relation","*",array(
		"actID" => $actID,
		"studentID" => $studentID
	));
	if($datas)
	{
		switch($userLevel){
			case 0:
			$datas = $database->update("act_relation", array(
			"stuComment" => $stuComment),
			array(
				"actID" => $actID,
				"studentID" => $studentID
			));
			break;
			case 1: case 2: case 3:
			$datas = $database->update("act_relation", array(
			"stuCommentReply" => $stuCommentReply),
			array(
				"actID" => $actID,
				"studentID" => $studentID
			));
			break;
		}
	}
	else
	{
		$datas = $database->insert("act_relation", array(
		"actID" => $actID,
		"studentID" => $studentID,
		"stuComment" => $stuComment
	));
	}
}
?>