checkstat();

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
		//状态验证
		function checkstat(){
            $.ajax({
                url:'../../php/checkstat.php',
                type:'post',
                dataType:'json',
                success:function(data){
                    if(data=="yes"){
                    }
					else if(data=="no")
					{
						alert("无权登录该页面！");
						window.location="../../index.html";
					}
                    else
                    {
						alert("请先登录 !");
						window.location="../../admin.html";
					}

                }
            });
        }

/*模块加载*/
function en(html){
		$("#main").load(html);
	}