// JavaScript Document

//导航列表
		function showNav(product)
		{
			var id_nav=document.getElementById("nav");
			
			var studentID=product[0].studentID;
			var userName=product[0].userName;
			var activityHours=product[0].activityHours;
			var sex_id=product[0].sex;
			var sex;
			var citizenID=product[0].citizenID;
			var email=product[0].email;
			var admissionDate=product[0].admissionDate;
			var admissionDepartment_id=parseInt(product[0].admissionDepartment);
			var admissionDepartment;
			var admissionMajor=product[0].admissionMajor;
			var phoneNumber=product[0].phoneNumber;
			var qqNumber=product[0].qqNumber;
			var naviePlace=product[0].naviePlace;
			var ethnicGroup=product[0].ethnicGroup;
			var userLevel_id=parseInt(product[0].userLevel);
			var userLevel;
			
			var a_changePassword="<a href=\"changePassword.html\" target=\"tf\">修改密码</a>";
			var a_changeUserInfo="<a href=\"changeUserInfo.html\" target=\"tf\">修改个人信息</a>";
			var a_viewActListNow="<a href=\"getActListNow.html\" target=\"tf\">正在进行的活动</a>";
			var a_viewActListHistory="<a href=\"getActListHistory.php\" target=\"tf\">历史活动</a>";
			var a_viewActListMy="<a href=\"getActListMy.php\" target=\"tf\">我的活动</a>";
			var a_getActivity="<a href=\"getActivity.html\" target=\"tf\">列出所有活动记录</a>";
			var a_Exit="<a href=\"../php/logoff.php\">退出</a>";
			
			var a_searchStu="<a href=\"searchStu.html\" target=\"tf\">查找学生</a>";
			var a_getActDict="<a href=\"getActDict.html\" target=\"tf\">活动队列表</a>";
			var a_addActDict="<a href=\"addActDict.html\" target=\"tf\">新增活动队</a>";
			var a_addActLeader="<a href=\"actDictBind.html\" target=\"tf\">新增活动队领队</a>";
			var a_releaseActivity="<a href=\"releaseAct.php\" target=\"tf\">发布活动</a>";
			var a_actSignedList="<a href=\"actLeaderDo.php\" target=\"tf\">活动操作</a>";
			var a_addUser="<a href=\"addUser.html\" target=\"tf\">新增用户</a>";
			var a_addActivity="<a href=\"addActivity.html\" target=\"tf\">新增活动记录</a>";
			var a_getUser="<a href=\"getUser.html\" target=\"tf\">用户列表</a>";
			
			if(sex_id==0){
				sex="男";
			}else{
				sex="女";
			}
			
			switch(admissionDepartment_id)
			{
				case 1:
					admissionDepartment="传媒学院";
				break;
				case 2:
					admissionDepartment="信息科学与工程学院";
				break;
				case 3:
					admissionDepartment="商学院";
				break;
				case 4:
					admissionDepartment="化学与生命科学学院";
				break;
				case 5:
					admissionDepartment="艺术学院";
				break;
				case 6:
					admissionDepartment="城市与资源学院";
				break;
				case 7:
					admissionDepartment="外国语学院";
				break;
				default:
				break;
			}
			
			switch(userLevel_id)
			{
				case 0:
					userLevel = "普通用户";
				break;
				case 1:
					userLevel = "服务队领队";
				break;
				case 2:
					userLevel = "青协管理员";
				break;
				case 3:
					userLevel = "指导老师";
				break;
				default:
				break;
			}
					
			var str_list="<ul>"
			+"<li>学号："+studentID+"</li>"
			+"<li>姓名："+userName+"</li>"
			+"<li>性别："+sex+"</li>"
			+"<li>服务总时长："+activityHours+"</li>"
			+"<li>身份证号码："+citizenID+"</li>"
			+"<li>入学日期："+admissionDate+"</li>"
			+"<li>"+admissionDepartment+" "+admissionMajor+"</li>"
			+"<li>手机号码："+phoneNumber+"</li>"
			+"<li>QQ号码："+qqNumber+"</li>"
			+"<li>邮箱："+email+"</li>"
			+"<li>籍贯："+naviePlace+"</li>"
			+"<li>民族："+ethnicGroup+"</li>"
			+"<li>用户等级："+userLevel+"</li>"
			+"<li></li>";
			
			if(role>=2 && role<=3){
				str_list=str_list
				
				+"<li>"+a_addUser+"</li>"
				+"<li>"+a_searchStu+"</li>"
				+"<li>"+a_addActivity+"</li>"
				+"<li>"+a_addActDict+"</li>"
				+"<li>"+a_addActLeader+"</li>"
				+"<li>"+a_getUser+"</li>"
				
				+"<li></li>";
			}
			if(role>=1){
				str_list=str_list
				+"<li>"+a_getActDict+"</li>"
				+"<li>"+a_releaseActivity+"</li>"
				+"<li>"+a_actSignedList+"</li>"
				+"<li></li>";
			}

			
			str_list=str_list
			+"<li>"+a_viewActListNow+"</li>"
			+"<li>"+a_viewActListHistory+"</li>"
			+"<li>"+a_viewActListMy+"</li>"
			+"<li>"+a_getActivity+"</li>"
			+"<li>"+a_changeUserInfo+"</li>"
			+"<li>"+a_changePassword+"</li>"
			+"<li></li>"
			+"<li>"+a_Exit+"</li>"
			+"<ul>";	
			
			id_nav.innerHTML=str_list;		
		

		}