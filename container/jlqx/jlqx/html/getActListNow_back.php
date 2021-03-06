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
<link href="css/table.css" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="../js/jquery-2.0.3.min.js"></script>
<script type="text/javascript" src="../js/bootstrap.min.js"></script>

<script type="text/javascript">
var role=0;//全局变量用于存放取得的身份
function show_actlist()
{	
	$.ajax({
		url:"../php/getSession.php",
		datatype:"json",
		type:"post",
		success:function(data){
			 role=eval("("+data+")")[1];
		}
	});
	$.ajax({
		url: '../php/user/getActList.php?action=getactlistall',   
		datatype:"json",
		type: "post",
		success:function(data){
			var product = eval(data);
			if(product=="-1")//没有数据
				alert(product);
			else{
				mk_acttable(product);
			}
		}
	}); 

	function mk_acttable(product)
	{
		var tab=document.getElementById("table");
		for(var i=0;i<=product.length;i++)
		{	
			var tr=tab.insertRow(tab.rows.length);
			var td1=tr.insertCell(0);
			var td2=tr.insertCell(1);
			var td3=tr.insertCell(2);
			var td4=tr.insertCell(3);
			var td5=tr.insertCell(4);
			var td6=tr.insertCell(5);
			var td7=tr.insertCell(6);
			var td8=tr.insertCell(7);
			var td_act;
			if(role>=0 && role<=3)
			{
				td_act=tr.insertCell(8);
				td_act.align="center";td_act.width="70";
			}
			td1.align="center";td1.width="100";
			td2.align="center";td2.width="80";
			td3.align="center";td3.width="130";
			td4.align="center";td4.width="50";
			td5.align="center";td5.width="100";
			td6.align="center";td6.width="80";
			td7.align="center";td7.width="60";
			td8.align="center";td8.width="260";
				
			if(i==0)
			{	
				td1.innerHTML="活动名称";
				td1.setAttribute("class","tab_h");
				td2.innerHTML="活动时间";
				td2.setAttribute("class","tab_h");
				td3.innerHTML="开展院系";
				td3.setAttribute("class","tab_h");
				td4.innerHTML="时长";
				td4.setAttribute("class","tab_h");
				td5.innerHTML="已报名/限额";
				td5.setAttribute("class","tab_h");
				td6.innerHTML="报名截止";
				td6.setAttribute("class","tab_h");
				td7.innerHTML="联系人";
				td7.setAttribute("class","tab_h");
				td8.innerHTML="活动备注";
				td8.setAttribute("class","tab_h");
				if(role>=0 && role<=3){
					td_act.innerHTML="操作";
					td_act.setAttribute("class","tab_h");
				}
			}
			else
			{
				td1.innerHTML=product[i-1].actName;
				td2.innerHTML=product[i-1].actDate+" "+product[i-1].actTime;
				td4.innerHTML=product[i-1].actHour;
				td5.innerHTML=product[i-1].actSigned+"/"+product[i-1].actLimit;
				td6.innerHTML=product[i-1].actDeadline;
				td7.innerHTML=product[i-1].actPRID;
				td8.innerHTML=product[i-1].actRemark;
					
				if(i%2==0){
					td1.setAttribute("class","tab_l");
					td2.setAttribute("class","tab_l");
					td3.setAttribute("class","tab_l");
					td4.setAttribute("class","tab_l");
					td5.setAttribute("class","tab_l");
					td6.setAttribute("class","tab_l");
					td7.setAttribute("class","tab_l");
					td8.setAttribute("class","tab_l");
					if(role>=0 && role<=3)
						td_act.setAttribute("class","tab_l");
				}
					
				if(product[i-1].actDept==0){
					td3.innerHTML="金陵学院";
				}else if(product[i-1].actDept==1){
					td3.innerHTML="传媒学院";
				}else if(product[i-1].actDept==2){
					td3.innerHTML="信息科学与工程学院";
				}else if(product[i-1].actDept==3){
					td3.innerHTML="商学院";
				}else if(product[i-1].actDept==4){
					td3.innerHTML="化学与生命科学学院";
				}else if(product[i-1].actDept==5){
					td3.innerHTML="艺术学院";
				}else if(product[i-1].actDept==6){
					td3.innerHTML="城市与资源学院";
				}else if(product[i-1].actDept==7){
					td3.innerHTML="外国语学院";
				}
					//../php/user/actOperation.php?action=getuseractjoinstate&actID=
				if(role>=0 && role<=3){
					
					td_act.innerHTML = "<a href='#'>报名</a>";
				}
				else
				{

				}
					
			}	
		}
	}
}		
</script>



<style>
#show{
	width:auto;
	height:auto;
}
</style>

<body onload="show_actlist()">
	<div id="continer">
        <div id="show">
    		<table id="table" >		
            </table>
         
        </div>
 
	</div>

</body>

</html>
