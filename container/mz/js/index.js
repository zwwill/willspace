	   if(window.location.hash==""||window.location.hash=="#login"||window.location.hash=="#reg")
	   		window.location.hash="#home";
		checkstat();
		
		//session
		function checkstat(){
            $.ajax({
                url:'php/checkstat.php',
                type:'post',
                dataType:'json',
                success:function(data){
                    if(data=="yes"){
                        document.getElementById("display-lg-on").className="float-right show-on";
                        document.getElementById("display-lg-off").className="float-right show-off";
                    }
                    else
                    {
                        document.getElementById("display-lg-on").className="float-right show-off";
                        document.getElementById("display-lg-off").className="float-right show-on";
                    }

                }
            });
        }
		//块显示
        function display(id){
            document.getElementById(id).className="show-on";
        }
		//url信息抓取
        function getQueryString(name)
        {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)
            {
                var result=decodeURI(r[2]);
                if(result=="登陆成功！"){//登陆成功
                    alert("登录成功！"); 
                    document.getElementById("display-lg-on").className="float-right show-on";
                    document.getElementById("display-lg-off").className="float-right show-off";
                }
                else {
                    alert(result);
                    document.getElementById("display-lg-on").className="float-right show-off";
                    document.getElementById("display-lg-off").className="float-right show-on";
                }
				window.location.search=""; 
            } else {
             // alert("nul");
                }   
        }
		
		
function goCenter()  
{  
	var h = $(window).height();  
	var w = $(window).width();  
	var st = $(window).scrollTop();  
	var sl = $(window).scrollLeft();  
  
	$("#bg_img").css("top", (0)+st);  
	$("#bg_img").css("left",(0)+sl);  
}  
