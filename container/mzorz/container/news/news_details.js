
var id=getQueryString("id");

var getdetails = function (id){
	$.ajax({
		url:"../../php/common/news_details.php",
		type:"post",
		dataType:"json",
		data:"id="+id+"&type=news",
		success: function(data){
			$("body").html(data[0].news_title+"</br></hr>"+data[0].news_content+"</br></hr><img src='"+data[0].news_picurl+"'>");
			},
		error:function(){
				alert("back error!");
				}
		});
}
getdetails(id);
//取得url中获得的错误信息
function getQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)");//^|&和[^&]*是两个子正则表达式,即（）中的为子正则表达式
	var r = window.location.search.substr(1).match(reg);
	if(!r)
	{
		alert("未知错误！！");
	}else{
		return decodeURI(r[2]);
	}
}