// JavaScript Document

var xmlHttp

var div_about_us=null;

//关于我们块
function show_about_us()
{ 
div_about_us=document.getElementById("div_about_us");

xmlHttp=GetXmlHttpObject()
if (xmlHttp==null)
 {
 alert ("Browser does not support HTTP Request")
 return
 }
var url="container/about_us/about_us.php"
xmlHttp.onreadystatechange=stateChanged 
xmlHttp.open("GET",url,true)
xmlHttp.send(null)
index++;
}

function stateChanged() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
 { 
 $htm=xmlHttp.responseText;
 if(div_about_us.innerHTML.toString()==""){
	div_about_us.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="400px" scrolling="no" src="'+ $htm +'"></iframe>';
 }
 } 
}

function GetXmlHttpObject()
{
var xmlHttp=null;
try
 {
 // Firefox, Opera 8.0+, Safari
 xmlHttp=new XMLHttpRequest();
 }
catch (e)
 {
 //Internet Explorer
 try
  {
  xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
  }
 catch (e)
  {
  xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 }
return xmlHttp;
}
//刷新保持页面
function fuc_reload(){
	var hash=window.location.hash;
	var div_about_us;
	if(hash=="#about"){
		show_iframe("div_about_us","container/about_us/about_us.html");
	}else if(hash=='#news'){
		show_iframe("div_news","container/news/news.html");
	}else if(hash=='#services'){
		show_iframe("div_service","container/service/service.html");
	}else if(hash=='#link'){
		show_iframe("div_contact","container/link/contact.html");
	}else if(hash=='#case'){
		show_iframe("div_case","container/case/case.html");
	}else if(hash=='#want'){
		show_iframe("div_want","container/want/want.html");
	}else if(hash=='#products'){
		show_iframe("div_products","container/products/products.html");
	}else if(hash=='#message'){
		show_iframe_mess();
	}
}

//iframe复用显示方法
function show_iframe(div_id,htm_src){
	var t_div=document.getElementById(div_id);
 	if(t_div.innerHTML.toString()==""){
		t_div.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="410px" scrolling="no" src="'+htm_src+'"></iframe>';
	}
}


//留言块

function show_iframe_mess()
{ 
 var div_mess=document.getElementById("div_message");
 if(div_mess.innerHTML.toString()==""){
	div_mess.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="500px" height="310px"  src="container/message/message.html#tlt_mess"></iframe>';
 }
}

/*
//新闻块

function show_news()
{ 
 var div_news=document.getElementById("div_news");
 if(div_news.innerHTML.toString()==""){
	div_news.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="400px" scrolling="no" src="container/news/news.html"></iframe>';
 }
}


//服务块

function show_service()
{
 var div_service=document.getElementById("div_service");
 if(div_service.innerHTML.toString()==""){
	div_service.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="400px" scrolling="no" src="container/service/service.html"></iframe>';
 }
}

//联系我们块

function show_contact()
{
 var div_contact=document.getElementById("div_contact");
 if(div_contact.innerHTML.toString()==""){
	div_contact.innerHTML='<iframe frameborder="0" allowTransparency="true"  width="800px" height="400px" scrolling="no" src="container/link/contact.html"></iframe>';
 }
}
*/