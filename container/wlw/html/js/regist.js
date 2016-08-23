// JavaScript Document

$(document).ready(function(){
	var dd=document.getElementById("tt");
    //返回键
	$("#btn_back").click(function(){
		parent.hide_cover();
	});
	$("#regist").click(function () {
		
                    var username = $("#username").val();
                    if (username === null || username === "") {
                        alert("用户名为空");
                        return false;
                    }

                    var passwd = $("#passwd").val();
                    if (passwd === null || passwd === "") {
                        alert("密码为空");
                        return false;
                    }

                    var name = $("#name").val();
                    if (name === null || name === "") {
                        alert("公司名称为空");
                        return false;
                    }

                    var org_code = $("#org_code").val();
                    if (org_code === null || org_code === "") {
                        alert("机构代码为空");
                        return false;
                    }

                    var license = $("#license").val();
                    if (license === null || license === "") {
                        alert("营业执照号码为空");
                        return false;
                    }

                    var license_photo = $("#license_photo").val();
                    if (license_photo === null || license_photo === "") {
                        alert("营业执照照片为空");
                        return false;
                    }

                    var account = $("#account").val();
                    if (account === null || account === "") {
                        alert("账号为空");
                        return false;
                    }

                    var str = username + "\n" + passwd + "\n" + name + "\n" + org_code + "\n" + license + "\n" + license_photo + "\n" + account;
                    alert(str);
                    return true;
                });

                $("#form1").ajaxForm(function (data, status) {
                    alert(data);
                });
});


                
    
