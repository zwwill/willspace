checkstat();
getQueryString("rlt");


//信息抓取
 function getQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)
            {
                var result=decodeURI(r[2]);
                alert(result);
				window.location.search=""; 
            } else {
             // alert("nul");
                }   
            
        }
//session
		function checkstat(){
            $.ajax({
                url:'php/admin/checkAdmin.php',
                type:'post',
                dataType:'json',
                success:function(data){
					if(data=="yes")
					{
						window.location="html/admin/admin.html";
					}
					else if(data=="no")
					{
						alert("无权登录该页面！");
						window.location="index.html"
					}
					else{
						}
				}
            });
        }