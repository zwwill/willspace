<?php
header('Content-type: text/html; charset=utf-8');
require_once("medoo.php");
//注册
function f_reg($userName,$password)
{
	$db = new medoo(SAE_MYSQL_DB);
	if ($userName == null||$password == null)
	{
		$r = false;
	}
	else 
	{
		$sql = "INSERT INTO users(u_name,u_pw) VALUES ('$userName','$password')";
		$rq = $db->query($sql);
		$rs = $db->error();
		if ($rs[0] == 0000)
			$r = true;
		else{
			$r = false;
		}
	}

	return $r;
}
//登录
function f_login($userName,$password)
{
	$db = new medoo(SAE_MYSQL_DB);
	if ($userName == null||$password == null)
	{
		$r = false;
	}
	else
	{
		$sql = "SELECT u_id FROM users WHERE u_name = '$userName' AND u_pw = '$password'";
		$data = $db->query($sql)->fetchAll();
		if (count($data) == 1)
			return $data[0]['u_id'];
		else
			$r =  false;
	}
	return $r;
}
//根据en_type列（值为en_value）,取out_type列信息
function f_get_value($tbl_name,$en_type,$en_value,$out_type)
{
	$db=new medoo(SAE_MYSQL_DB);
	$sql="SELECT $out_type FROM $tbl_name WHERE $en_type = '$en_value'";
	$data = $db->query($sql)->fetchAll();


	return $data[0][$out_type];
}

//获取用户信息结果集数组
function f_AlluserInfo($u_id){
	$db = new medoo(SAE_MYSQL_DB);
	
	$sql = "SELECT * FROM users WHERE u_id = '$u_id'";
	$data = $db->query($sql)->fetchAll();
	
	return $data;
}

//文件上传方法{$tem_name:服务器临时存放副本名,$file_dest:最终存放位置及名字} 返回存储路径
function file_upload($file_name,$tmp_name,$relative)
{
	if(is_uploaded_file($tmp_name))
	{
		$res_name=time()."_".$file_name;//为了避免重复提交，将每次上传的文件名前加上时间戳
		$file_dest=$relative.$res_name;   //上传用相对路径+存储名  注意与取出的编码统一
 		$r=move_uploaded_file($tmp_name,iconv("utf-8","gb2312//IGNORE",$file_dest)/*本地默认gb2312编码*/);  
	
		if($r)
			$r=$res_name;//返回存储文件名
		else
			$r = false;
	}
	else 
	{  
		$r = false;
	}  	
	return $r;
}

//插入产品信息{$prd_name:产品名,$prd_dcrt:产品描述,$file_name:图片名$tmp_name:服务器临时存储名,$file_dest:图片目标存储地址及名称}
function en_pro($prd_name,$prd_dcrt,$file_name,$tmp_name)
{
	if(!($prd_name && $prd_dcrt && $file_name && $tmp_name))
	{
		$r = false;
	}
	else
	{
		$relative="../../upLoadFile/pic/";																			//相对路径
		$absolute=$_SERVER['REMOTE_ADDR'] ."/mzorz_web"."/upLoadFile/pic/";		//绝对路径
		$res_name=file_upload($file_name,$tmp_name,$relative);
		if(!$res_name)//上传失败则发布失败
			$r = false;			
		else
		{
			$db=new medoo(SAE_MYSQL_DB);
			/* date_default_timezone_set ('Asia/Shanghai');  若php.ini中未设置时区则用此函数初始化 */ 
			$systemTime=date("Y-m-d H:i:s");
			$sql="INSERT INTO products(prd_name,prd_dcrt,prd_picurl,date) VALUES('$prd_name','$prd_dcrt','$relative$res_name','$systemTime')";//图片存绝对路径
			$rq=$db->query($sql);
			$rs = $db->error();
			if ($rs[0] == 0000)
			{
				$r = true;
			}
			else{
				$r = false;
			}
		}
	}
	return $r;
}

//插入新闻信息{$news_title:产品名,$news_content:新闻内容,$file_name:图片名$tmp_name:服务器临时存储名,$file_dest:图片目标存储地址及名称}
function en_news($news_title,$news_content,$file_name,$tmp_name)
{	
	if(!($news_title&&$news_content&&$tmp_name))
	{
		$r = false;
	}
	else
	{
		$relative="../../upLoadFile/pic/";																			//相对路径
		$absolute=$_SERVER['REMOTE_ADDR'] ."/mzorz_web"."/upLoadFile/pic/";		//绝对路径
		$res_name=file_upload($file_name,$tmp_name,$relative);
		if(!$res_name)//上传失败则发布失败
			$r = false;			
		else
		{
			$db=new medoo(SAE_MYSQL_DB);
			$systemTime=date("Y-m-d H:i:s");
			$sql="INSERT INTO news(news_title,news_content,news_picurl,date) VALUES('$news_title','$news_content','$relative$res_name','$systemTime')";//图片存相对路径
			$rq=$db->query($sql);
			$rs = $db->error();
			if ($rs[0] == 0000)
			{
				$r = true;
			}
			else{
				$r = false;
			}
		}
	}
	return $r;
}

//插入招聘信息
function en_rcrt($rcrt_job,$rcrt_money,$rcrt_place,$rcrt_edu,$rcrt_exp,$rcrt_detail)
{	
	if(!($rcrt_job && $rcrt_money && $rcrt_place && $rcrt_edu && $rcrt_exp && $rcrt_detail))
	{
		$r = false;
	}
	else
	{
			$db=new medoo(SAE_MYSQL_DB);
			$systemTime=date("Y-m-d H:i:s");
			$sql="INSERT INTO recruit(rcrt_job,rcrt_money,rcrt_place,rcrt_edu,rcrt_exp,rcrt_detail,date) VALUES('$rcrt_job','$rcrt_money','$rcrt_place','$rcrt_edu','$rcrt_exp','$rcrt_detail','$systemTime')";
			$rq=$db->query($sql);
			$rs = $db->error();
			if ($rs[0] == 0000)
			{
				$r = true;
			}
			else{
				$r = false;
			}
	}
	return $r;
}

//插入求职信息
function hunt($u_name,$phone,$job_id,$file_name,$tmp_name)
{
	if(!($u_name && $phone && $job_id && $file_name && $tmp_name))
	{
		$r = false;
	}
	else
	{
		$relative="../../upLoadFile/resume/";																			//相对路径
		$absolute=$_SERVER['REMOTE_ADDR'] ."/mzorz_web"."/upLoadFile/resume/";		//绝对路径
		$res_name=file_upload($file_name,$tmp_name,$relative);
		if(!$res_name)//上传失败则发布失败
			$r = false;			
		else
		{
			$db=new medoo(SAE_MYSQL_DB);
			/* date_default_timezone_set ('Asia/Shanghai');  若php.ini中未设置时区则用此函数初始化 */ 
			$systemTime=date("Y-m-d H:i:s");
			$sql="INSERT INTO hunts(u_name,phone,rcrt_id,hunt_fileurl,date) VALUES('$u_name','$phone','$job_id','$relative$res_name','$systemTime')";//图片存绝对路径
			$rq=$db->query($sql);
			$rs = $db->error();
			if ($rs[0] == 0000)
			{
				$r = true;
			}
			else{
				$r = false;
			}
		}
	}
	return $r;
}

//插入留言信息
function en_message($u_id,$msg)
{	
	if(!($u_id && $msg))
	{
		$r = false;
	}
	else
	{
			$db=new medoo(SAE_MYSQL_DB);
			$systemTime=date("Y-m-d H:i:s");
			$sql="INSERT INTO message(u_id,msg_content,date) VALUES('$u_id','$msg','$systemTime')";
			$rq=$db->query($sql);
			$rs = $db->error();
			if ($rs[0] == 0000)
			{
				$r = true;
			}
			else{
				$r = false;
			}
	}
	return $r;
}

//取各个表元组
function get_tuple($tbl_name)
{
	$db=new medoo(SAE_MYSQL_DB);
	if($tbl_name=="hunts")
		$sql="SELECT hunt_id,hunts.u_name,hunts.phone,recruit.rcrt_job,hunts.hunt_fileurl,hunts.date FROM hunts JOIN recruit WHERE hunts.rcrt_id=recruit.rcrt_id ORDER BY date DESC";
	else if($tbl_name=="message")
		$sql="SELECT message.msg_id,users.u_name,message.msg_content,message.date FROM message JOIN users WHERE message.u_id=users.u_id ORDER BY message.date DESC";
	else
		$sql="SELECT * FROM $tbl_name ORDER BY date DESC";//按时间新旧程度排序
	$rq=$db->query($sql)->fetchAll();
	$rs=$db->error();
	if($rs[0]==0000)
	{
		$r=$rq;
	}
	else
	{
		$r=false;
	}
	return $r;
}

//删除各表元组
function del_data($tbl_name,$id_type,$id)
{
	$db = new medoo(SAE_MYSQL_DB);
	$sql="DELETE FROM $tbl_name WHERE $id_type = '$id'";
	$rq=$db->query($sql);
	$rs=$db->error();
	if($rs[0]==0000)
		$r=true;
	else
		$r=false;
	return $r;
}


?>