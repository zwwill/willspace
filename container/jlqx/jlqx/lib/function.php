<?php
require_once(dirname(__file__).'/medoo.php');
//app_njujlxy
//app_njujlxy
//登录函数，成功返回$studentID
function f_login($studentID,$password)
{
	$database = new medoo("app_njujlxy");
	if ($studentID == null||$password == null)
	{
		$r = false;
	}
	else
	{
		$datas = $database->select("users","*",array(
			"AND" => array(
				"studentID" => $studentID, 
				"password" => $password
			)
		));
		if($datas)
		{	
			foreach ( $datas as $data ) {}
			$r = $data["studentID"];
		}
		else
		{
			$r = false;
		}
	}
	return $r;
}

//获取用户等级函数，返回$userLevel
//注：权限等级：0、青协成员1、院青协管理2、校青协管理3、系统管理员
function f_getLevel($studentID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("users","userLevel",array(
		"studentID" => $studentID
	));

	$r =  $datas[0];
	return $r;
}

//查找用户是否存在，存在返回$studentID
function f_checkStudentID($studentID)	
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("users","studentID",array(
		"studentID" => $studentID
	));
	if($datas)
	{
		$r = $datas[0];
	}
	else
	{
		$r = false;
	}
	return $r;
}

//新增用户函数，成功返回用户名，失败返回false，或者输出学号已存在
function f_addUser($studentID,$userName,$sex,$citizenID,
	$naviePlace,$ethnicGroup,$admissionDate,$admissionDepartment,
	$admissionMajor,$phoneNumber,$qqNumber,$email,$userLevel)
{
	$database = new medoo("app_njujlxy");
	$checkStudentID = f_checkStudentID($studentID);
	if($checkStudentID)
	{
		$r = false;
	}
	else
	{	
		$datas = $database->insert("users",array(  
		"studentID" => $studentID,  
		"userName" => $userName,  
		"sex" => $sex,  
		"citizenID" => $citizenID,
		"admissionDate" => $admissionDate,
		"admissionDepartment" => $admissionDepartment,
		"admissionMajor" => $admissionMajor,
		"phoneNumber" => $phoneNumber,
		"qqNumber" => $qqNumber,
		"naviePlace" => $naviePlace,
		"ethnicGroup" => $ethnicGroup,
		"email" => $email,
		"password" => 123456,
		"userLevel" => $userLevel
		));
		$r = f_checkStudentID($studentID);
	}
	return $r;
}

//修改个人信息
function f_updateUserInfo($studentID,$userName,$sex,$citizenID,
$admissionDate,$admissionDepartment,$admissionMajor,
$phoneNumber,$qqNumber,$naviePlace,$ethnicGroup)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->update("users",array(
		"userName" => $userName,
		"sex" => $sex,  
		"citizenID" => $citizenID,
		"admissionDate" => $admissionDate,
		"admissionDepartment" => $admissionDepartment,
		"admissionMajor" => $admissionMajor,
		"phoneNumber" => $phoneNumber,
		"qqNumber" => $qqNumber,
		"naviePlace" => $naviePlace,
		"ethnicGroup" => $ethnicGroup
	),array(
		"studentID" => $studentID
	));
}

//删除用户函数
function f_deleteUser($studentID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->delete("users",array(  
        "studentID" => $studentID 
	));
	if(f_checkStudentID($studentID))
	{
		$r = false;
	}
	else
	{
		$r = $studentID;
	}
	return $r;
}

//修改密码
function f_changePassword($studentID,$oldpwd,$newpwd)
{
	$database = new medoo("app_njujlxy");
	$datas = f_userInfo($studentID);
	foreach($datas as $data){}
	if($oldpwd == $data["password"])
	{
		$datas = $database->update("users",array(
			"password" => $newpwd),array(
			"studentID" => $studentID
		));
		$pwds = f_userInfo($studentID);
		foreach($pwds as $pwd){}
		if($pwd["password"] == $newpwd)
		{
			$r = true;
		}
		else
		{
			$r = false;
		}
	}
	else
	{
		$r = false;
	}
	return $r;
}

//修改个人信息（最低权限）
function f_changeUserInfo($studentID,$phoneNumber,$email)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->update("users",array(
		"phoneNumber" => $phoneNumber,
		"email" => $email
		),array(
		"studentID" => $studentID
	));
	$datas = f_userInfo($studentID);
	foreach($datas as $data){}
	if($data["phoneNumber"] == $phoneNumber && $data["email"] == $email)
	{
		$r = true;
	}
	else
	{
		$r = false;
	}
	return $r;
}


//查看用户信息，返回$datas
function f_userInfo($studentID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("users","*",array(
		"studentID" => $studentID
	));
	return $datas;
}

//用户列表
function f_userList()
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("users","*");
	return $datas;
}

//查找活动字典
function f_searchActDict($actName)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_dict","*",array(
		"actName" => $actName
	));
	return $datas;
}

//*增加活动字典
function f_addActDict($actName,$actHour,$actTime,$actIntro)
{
	$database = new medoo("app_njujlxy");
	$datas = f_searchActDict($actName);
	if(!$datas){
		$datas = $database->insert("act_dict",array(
		"actName" => $actName,
		"actHour" => $actHour,
		"actTime" => $actTime,
		"actIntro" => $actIntro
		));
		$r = f_searchActDict($actName);

	}
	else
	{
		$r = -1;
	}
	return $r;
}

//活动绑定/删除队长
function f_actDictLeader($actCodeNum,$studentID,$operarion)
{
	$database = new medoo("app_njujlxy");
	if($operation = 'add')
	{
		$datas = $database->insert("act_dict_stu",array(
			"actCodeNum" => $actCodeNum,
			"studentID" => $studentID
		));
		$r = $database->select("act_dict_stu","*",array(
			"AND" => array(
				"actCodeNum" => $actCodeNum,
				"studentID" => $studentID
			)
		));
	}
	else if($operation = 'delete')
	{
		$datas = $database->delete("act_dict_stu",array(
			"AND" => array(
				"actCodeNum" => $actCodeNum,
				"studentID" => $studentID
			)
		));
		$r = $database->select("act_dict_stu","*",array(
			"AND" => array(
				"actCodeNum" => $actCodeNum,
				"studentID" => $studentID
			)
		));
	}
	return $r;
}

//*拉取活动字典
function f_getActDict($studentID,$userLevel)
{
	$database = new medoo("app_njujlxy");
	switch($userLevel)
	{
		case 3: case 2:
		$sql = "select * from act_dict left join act_dict_stu on (act_dict.actCodeNum = act_dict_stu.actCodeNum) order by act_dict.actCodeNum asc";
		if($database->query($sql))
		{
			$datas = $database->query($sql)->fetchAll();
		}
		else
		{$datas = -1;}
		break;
		case 1:
		$sql = "select * from act_dict left join act_dict_stu on act_dict.actCodeNum = act_dict_stu.actCodeNum where act_dict_stu.studentID = $studentID order by act_dict.actCodeNum asc";
		if($database->query($sql))
		{
			$datas = $database->query($sql)->fetchAll();
		}
		else
		{$datas = -1;}
	}
	return $datas;
}

//*发布活动
function f_releaseAct($actPRID, $actPRContact, $actCodeNum, $actDept, $actName,
$actDate, $actTime, $actHour, $actLimit, $actPlace, $actDeadline, $actRemark)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->insert("act_release", array(
		"actPRID" => $actPRID,
		"actPRContact" => $actPRContact,
		"actCodeNum" => $actCodeNum,
		"actDept" => $actDept,
		"actName" => $actName,
		"actDate" => $actDate,
		"actTime" => $actTime,
		"actHour" => $actHour,
		"actLimit" => $actLimit,
		"actPlace" => $actPlace,
		"actDeadline" => $actDeadline,
		"actRemark" => $actRemark
	));
	$rs = $database->select("act_release","*",array(
		"AND" => array(
			"actCodeNum" => $actCodeNum,
			"actDate" => $actDate
		)
	));
	if($rs)
	{
		$r = true;
	}
	else
	{
		$r = false;
	}
	return $r;
}

//*拉取可参加活动列表
function f_getActListAvailable()
{
	$database = new medoo("app_njujlxy");
	$currenttime = date("y-m-d h:i:s");
	$sql = "select * from act_release where actState < 2 order by actDeadline ASC";
	if($database->query($sql))
	{
		$datas = $database->query($sql)->fetchAll();
	}
	else
	{
		$datas = -1;
	}
	return $datas;
}

//拉取学生发布的活动ID
function f_getLeaderRlsActList($studentID)
{
	$database = new medoo("app_njujlxy");
	$sql = "select * from act_release where actPRID = $studentID and actState <2 ";
	if($database->query($sql))
	{
		$datas = $database->query($sql)->fetchAll();
	}
	else
	{
		$datas = -1;
	}
	return $datas;
}

//*拉取所有活动
function f_getActListAll()
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_release","*");
	if($datas)
	{
		return $datas;
	}
	else
	{
		return -1;
	}
}

//获取已完成活动
function f_getActFinishedList()
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_release","*",array(
		"actState" => 2
	));
	if($datas)
	{
		return $datas;
	}
	else
	{
		return -1;
	}
}

//*拉取单个活动
function f_getActDetail($actID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_release","*",array(
		"actID" => $actID
	));
	return $datas;
}


//*活动修改操作
function f_actAmend($actPRID, $actPRContact, $actDatetime,
$actHour, $actLimit, $actPlace, $actDeadline, $actRemark)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->update("act_release", array(
		"actPRID" => $actPRID,
		"actPRContact" => $actPRContact,
		"actDatetime" => $actDatetime,
		"actHour" => $actHour,
		"actLimit" => $actLimit,
		"actPlace" => $actPlace,
		"actDeadline" => $actDeadline,
		"actRemark" => $actRemark
	),
	array(
		"actID" => $actID
	));
}

//*参加（取消）活动
function f_actJoin($studentID,$actID,$stuState,$stuRemark)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_release","*",array(
		"actID" => $actID
	));
	foreach($datas as $data){}
	if($data["actSigned"] >= $data["actLimit"] && $stuState ==1)
	{
		$r = false;
	}
	else
	{
		$datas = $database->select("act_relation","*",array(
			"AND" => array(
				"studentID" => $studentID, 
				"actID" => $actID
			)
		));
		if($datas)
		{
			$datas = $database->update("act_relation", array(
			"stuState" => $stuState,
			"stuRemark" => $stuRemark
			),
			array(
				"AND" => array(
					"actID" => $actID,
					"studentID" => $studentID
				)
			));
		}
		else
		{
			$datas = $database->insert("act_relation", array(
			"actID" => $actID,
			"studentID" => $studentID,
			"stuState" => $stuState,
			"stuRemark" => $stuRemark
			));
		}
	}
}

//获取用户活动细节
function f_userActDetail($actID, $studentID)
{
	$database = new medoo('app_njujlxy');
	$datas = $database->select("act_relation","*",array(
		"AND" => array(
			"studentID" => $studentID,
			"actID" => $actID
		)
	));
	return $datas;
}
//用户活动参与状态
function f_userActJoinState($actID, $studentID)
{
	$datas = f_userActDetail($actID, $studentID);
	if($datas)
	{
		foreach($datas as $data){}
		$r = $data["stuState"];
	}
	else{$r=false;}
	return $r;
}



//用户所有活动
function f_userActList($studentID)
{
	$database = new medoo('app_njujlxy');
	$sql = "select * from act_relation  left join act_release on 
	(act_relation.actID = act_release.actID) where studentID = $studentID and stuState <> 0";
	if($database->query($sql))
	{
		$datas = $database->query($sql)->fetchAll();
	}
	else
	{$datas = -1;}			
	return $datas;
}

//拉取报名人员
function f_getActJoinStu($actID)
{
	$database = new medoo("app_njujlxy");
	$sql = "select * from act_relation left join users on (act_relation.studentID = users.studentID)
	where act_relation.stuState =1 and act_relation.actID = $actID";
	if($database->query($sql))
	{
		$datas = $database->query($sql)->fetchAll();
	}
	else
	{$datas = -1;}
	return $datas;
}

//*查找个人（学号或姓名）
function f_searchStu($studentID,$userName)
{
	$database = new medoo("app_njujlxy");
	if($studentID == null && $userName)
	{
		$sql = "select * from users where userName LIKE '%$userName%'";
		$datas = $database->query($sql)->fetchAll();
	}
	else if($userName == null && $studentID)
	{
		$sql = "select * from users where studentID LIKE '%$studentID%'";
		$datas = $database->query($sql)->fetchAll();
	}
	else
	{
		$sql = "select * from users where studentID LIKE '%$studentID%' and userName LIKE '%$userName%'";
		$datas = $database->query($sql)->fetchAll();
	}
	return $datas;
}

//*人员权限管理
function f_setUserLevel($setStudentID, $setUserLevel)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->update("users", array(
		"userLevel" => setUserLevel),
		array(
		"studentID" => $setStudentID
	));
	$r = f_getLevel($setStudentID);
}

//完善个人活动状态，注：必须由活动发起人修改状态
function f_updateActStuState($studentID,$actID,$actPRID,$stuState,
$stuActivityDetail,$stuActivityRemark)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("act_release","*",array(
		"AND" => array(
			"actID" => $actID,
			"actPRID" => $actPRID
		)
	));
	if($datas)
	{
		$update = $database->update("act_relation",array(
			"stuState" => $stuState,
			"stuActivityRemark" => $stuActivityRemark,
			"stuActivityDetail" => $stuActivityDetail
		),array(
			"AND" => array(
				"studentID" => $studentID,
				"actID" => $actID
			)
		));
		$r = true;
	}
	else
	{
		$r = false;
	}
	return $r;
}



//活动记录插入
function f_activityInsert($actID,$studentID)
{
	$database = new medoo("app_njujlxy");
		$updateState = $database->update("act_relation",array(
			"stuState" => 3
		),array(
			"AND" => array(
				"actID" => $actID,
				"studentID" => $studentID
			)
		));
		
		$datas = $database->select("act_release","*",array(
			"actID" => $actID
		));
		foreach($datas as $data){}
		$activityHour = $data["actHour"];
		$activityName = $data["actName"];
		$activityDate = $data["actDate"];
		
		$datas = $database->select("act_relation","*",array(
			"AND" => array(
				"actID" => $actID,
				"studentID" => $studentID
			)
		));
		foreach($datas as $data){}
		$activityRemark = $data["stuActivityRemark"];
		$activityDetail = $data["stuActivityDetail"];
		
		$datas = $database->select("users","*",array(
			"studentID" => $studentID
		));
		foreach($datas as $data){}
		$userName = $data["userName"];
		
		$insertActivity = $database->insert("activities",array(
			"studentID" => $studentID,
			"userName" => $userName,
			"activityName" => $activityName,
			"activityDetail" => $activityDetail,
			"activityDate" => $activityDate,
			"activityHour" => $activityHour,
			"activityRemark" => $activityRemark
		));
}

//新增活动记录，成功返回活动数据
function f_addActivity($studentID,$userName,$activityName,$activityDetail,
$activityDate,$activityHour,$activityGrade,$activityRemark)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->insert("activities", array(  
		"studentID" => $studentID,
		"userName" => $userName,
		"activityName" => $activityName,
		"activityDetail" => $activityDetail,
		"activityDate" => $activityDate,
		"activityHour" => $activityHour,
		"activityGrade" => $activityGrade,
		"activityRemark" => $activityRemark
	));
	f_calcActivityHour($studentID);
	if(!$datas)
	{
		$r = false;
	}
	else
	{
		$r = $studentID;
	}
	return $r;
}

//浏览指定学号活动记录，排序规则：
function f_activityInfo($studentID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("activities","*",array(
		"studentID" => $studentID,
		"ORDER" => "activities.activityName ASC,activities.activityDate ASC"
	));

	$r = $datas;
	return $r;
}

//遍历所有活动，返回$datas
function f_getActivityOrdered()
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("activities","*",array(
		"ORDER" => "activities.studentID ASC,
					activities.activityName ASC,
					activities.activityDate ASC"
		));
	return $datas;
}

//遍历活动ID，返回studentID数组
function f_getactivitystudentIDs()
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("activities","studentID",array(
		"ORDER" => "activities.studentID ASC"
		));
	return $datas;
}

//浏览指定活动ID活动记录
function f_activityIDInfo($activityID)
{
	$database = new medoo("app_njujlxy");
	$datas = $database->select("activities","*",array(
		"activityID" => $activityID
	));
	return $datas;
}

//用户活动状态词典
function f_userActStateDict($state)
{
	switch($state)
	{
		case '-1':$data = 'absent';break;
		case '0': $data = 'cancel';break;
		case '1': $data = 'joined';break;
		case '2': $data = 'accomplished';break;
		case '3': $data = 'success';break;
	}
	return $data;
}


//更新服务时间总时长
function f_calcActivityHour($studentID){
	$database = new medoo("app_njujlxy");
	$sql = "SELECT SUM(activityHour) FROM activities WHERE studentID = $studentID";
	$datas = $database->query($sql)->fetchALL();
	$hours = $datas[0]['SUM(activityHour)'];
	$database->update("users",array(
		"activityHours" => $hours
		),
		array(
		"studentID" => $studentID
		));
	return $hours;
}

//更新报名人数
function f_calcActSignNum($actID)
{
	$database = new medoo('app_njujlxy');
	$sql = "select count(*) from act_relation where actID = $actID and stuState = 1";
	if($database->query($sql))
	{
		$data = $database->query($sql)->fetchAll();
		$num = $data[0]['count(*)'];
		$datas = $database->update("act_release",array(
			"actSigned" => $num
		),array(
			"actID" => $actID
		));
	}
}
//更新完成人数
function f_calcActTakenNum($actID)
{
	$database = new medoo('app_njujlxy');
	$sql = "select count(*) from act_relation where actID = $actID and stuState = 3";
	if($database->query($sql))
	{
		$data = $database->query($sql)->fetchAll();
		$num = $data[0]['count(*)'];
		$datas = $database->update("act_release",array(
			"actTaken" => $num
		),array(
			"actID" => $actID
		));
	}
}

//判断活动有没有完成
function f_isActFinished($actID)
{
	$database = new medoo('app_njujlxy');
	$datas = $database->select("act_relation","studentID",array(
		"AND" => array(
			"actID" => $actID,
			"stuState" => 1
		)
	));
	if(!$datas)
	{
		$database->update("act_release",array(
			"actState" => 2
		),array(
			"actID" => $actID
		));
	}
}

?>