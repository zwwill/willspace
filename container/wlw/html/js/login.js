// JavaScript Document
var prefix = "/Wuliuwang";

$(document).ready(function(){
    $("#btn_login").click(function(){
        var username = $("#account").val();
        var passwd = $("#pwd").val();
        $.post(prefix + "/company_login.wlw",
                {
                    username: username,
                    passwd: passwd
                },
        function(data) {
            alert(data[0].message);
            if(data[0].status==="ok"){
                // 修改网页title为用户名
                document.title=username;
            }
        }, "json");
    });
	
	
	$("#btn_back").click(function(){
		parent.hide_cover();
	});
});
  