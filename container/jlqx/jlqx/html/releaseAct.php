<?php
session_start();
require_once(dirname(__file__).'/../lib/function.php');
$studentID=$_SESSION["studentID"];
$userLevel=$_SESSION["userLevel"];
global $len,$now_len,$datas;
$datas = f_getActDict($studentID,$userLevel);
$len = 0;$now_len=0;
foreach($datas as $data){$len++;}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>发布活动</title>
</head>
<style>
*{
	margin:0px auto;
	padding:0px;
	font-size:14px;
}
.title{
	margin:10px 0px;
	font:bold 18px "Adobe 黑体 Std R";
	color:#069;
	text-align:center;
}
#add{
	width:500px;
	height:auto;
	background:#e3e3e3;
	margin-top:50px;
}
table{
	line-height:30px;
	border-top:2px solid #fff;
}
.sub{
	border-top:1px solid #aaa;
	text-align:center;
}


</style>

<body style="background:#e3e3e3">
<div id="add">
<p class="title">发&nbsp;布&nbsp;活&nbsp;动</p>
	<form action="../php/leader/releaseAct.php" method="post" enctype="multipart/form-data" >
    	<table width="500px" border="0" >
        	<tr>
            	<td width="152" align="right">活动名称：</td>
            	<td width="338">
				<label for="select"></label>
            	<select name="actCodeNum" >
				<?php
				for($i=0; $i<$len; $i++)
				{
					if($i==0)
					{	$num = $datas[$i]["actCodeNum"];$name = $datas[$i]["actName"];
					echo "<option value= $num selected='selected'>$name</option>";}
					else
					{	$num = $datas[$i]["actCodeNum"];$name = $datas[$i]["actName"];
					echo "<option value=$num >$name</option>";}
				}
				?>
				</select>
                </td>
            </tr>
            <tr>
            	<td align="right">活动日期：</td>
            	<td>
                <script language="javascript" type="text/javascript" src="../../js/DatePicker/WdatePicker.js"></script>
				<input class="Wdate" type="text" onClick="WdatePicker()" name="actDate" />
                </td>
            </tr>
			<tr>
            	<td align="right">活动院系：</td>
            	<td>
				<label for="select"></label>
            	  <select name="actDept" id="userLevel">
                  <option value="0" selected="selected">金陵学院</option>
				  <option value="1" >传媒学院</option>
                  <option value="2" >信息科学与工程学院</option>
                  <option value="3" >商学院</option>
                  <option value="4" >化学与生命科学学院</option>
				  <option value="5" >艺术学院</option>
				  <option value="6" >城市与资源学院</option>
				  <option value="7" >外国语学院</option>
          	    </select>
                </td>
            </tr>
            <tr>
            	<td align="right">报名截至时间：</td>
            	<td>
                <script language="javascript" type="text/javascript" src="../../js/DatePicker/WdatePicker.js"></script>
				<input class="Wdate" type="text" onClick="WdatePicker()" name="actDeadline" />
                </td>
            </tr>
			<tr>
            	<td align="right">负责人联系方式：</td>
            	<td><input name="actPRContact" type="text" class="text" />
                </td>
            </tr>
        	<tr>
            	<td align="right">地点：</td>
            	<td><input name="actPlace" type="text" class="text" />
                </td>
            </tr>
			<!--
            <tr>
            	<td align="right">时长：</td>
            	<td>
                <input name="actHour" type="text" class="text" />
                </td>
            </tr>
			-->
        	<tr>
            	<td align="right">是否为周期性活动：</td>
            	<td>
				<input name="isCycle" type="radio" id="radio" value="1" checked="checked" />是&nbsp;&nbsp;<input type="radio" name="isCycle" id="radio2" value="0" />否
                </td>
            </tr>
            <tr>
            	<td align="right">人数限制：</td>
            	<td>
                <input name="actLimit" type="number" class="text" />
                </td>
            </tr>
            <tr>
            	<td align="right">海报发布：</td>
            	<td><input type="file" name="actPoster" id="poster" /></td>
            </tr>
            <tr>
            	<td align="right">备注：</td>
               	<td>
           	    <textarea name="actRemark" cols ="30" rows = "8"></textarea></td>
            </tr>
            <tr>
            	<td colspan="2" class="sub">
                	<input type="submit" value="提交" name="button" />
                	<input type="reset" value="重置" name="reset" />
                </td>
            </tr>
        </table>
    </form>
</div>
</body>
</html>
