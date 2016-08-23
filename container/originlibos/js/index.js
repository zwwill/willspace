// JavaScript Document

$(document).ready(function(){
	//当前页样式控制
 	$("#nav_list #nav1").css("background","#093");
	
 
  

  
  
});

  /*图书推荐块JS*/
 
/*图书推荐块JS*/
var x2 = 'right';
var x3 = 'right';
var x4 = 'right';
  $(document).ready(function(){    
  $("#TodayBook1").mouseover( function(){
   

	  if( x2 == 'left' )
	  {
		x2 = null;
	    $("#TodayBook2").animate({"left": "+=210px"}, "fast", null, function() {
			x2 = 'right';
			todayBookImg1.src = "img/b_tbLeft.gif";
		});
	  }
	  if( x3 == 'left' )
	  {
		x3 = null;
	    $("#TodayBook3").animate({"left": "+=210px"}, "fast", null, function() {
			x3 = 'right';
			todayBookImg2.src = "img/b_tbLeft2.gif";
		});
	  }
	  if( x4 == 'left' )
	  {
		x4 = null;
	    $("#TodayBook4").animate({"left": "+=210px"}, "fast", null, function() {
			x4 = 'right';
			todayBookImg3.src = "img/b_tbLeft.gif";
		});
	  }
	  
    });

    $("#TodayBook2").mouseover(function(){

	 
	  if( x2 == 'right' )
	  {
		x2 = null;
	    $("#TodayBook2").animate({"left": "-=210px"}, "fast", null, function() {
			x2 = 'left';
			todayBookImg1.src = "img/b_tbRight.gif";
		});
	  }
	  if( x3 == 'left' )
	  {
		x3 = null;
	    $("#TodayBook3").animate({"left": "+=210px"}, "fast", null, function() {
			x3 = 'right';
			todayBookImg2.src = "img/b_tbLeft2.gif";
		});
	  }
	  if( x4 == 'left' )
	  {
		x4 = null;
	    $("#TodayBook4").animate({"left": "+=210px"}, "fast", null, function() {
			x4 = 'right';
			todayBookImg3.src = "img/b_tbLeft.gif";
		});
	  }
    });
    $("#TodayBook3").mouseover(function(){

	 
	  if( x2 == 'right' )
	  {
		x2 = null;
	    $("#TodayBook2").animate({"left": "-=210px"}, "fast", null, function() {
			x2 = 'left';
			todayBookImg1.src = "img/b_tbRight.gif";
		});
	  }
	  if( x3 == 'right' )
	  {
		x3 = null;
	    $("#TodayBook3").animate({"left": "-=210px"}, "fast", null, function() {
			x3 = 'left';
			todayBookImg2.src = "img/b_tbRight2.gif";
		});
	  }
	  if( x4 == 'left' )
	  {
		x4 = null;
	    $("#TodayBook4").animate({"left": "+=210px"}, "fast", null, function() {
			x4 = 'right';
			todayBookImg3.src = "img/b_tbLeft.gif";
		});
	  }
    });
	 $("#TodayBook4").mouseover(function(){

	 
	  if( x2 == 'right' )
	  {
		x2 = null;
	    $("#TodayBook2").animate({"left": "-=210px"}, "fast", null, function() {
			x2 = 'left';
			todayBookImg1.src = "img/b_tbRight.gif";
		});
	  }
	  if( x3 == 'right' )
	  {
		x3 = null;
	    $("#TodayBook3").animate({"left": "-=210px"}, "fast", null, function() {
			x3 = 'left';
			todayBookImg2.src = "img/b_tbRight2.gif";
		});
	  }
	  if( x4 == 'right' )
	  {
		x4 = null;
	    $("#TodayBook4").animate({"left": "-=210px"}, "fast", null, function() {
			x4 = 'left';
			todayBookImg3.src = "img/b_tbRight.gif";
		});
	  }
    });


  });



function nav_on_top(){
	
}
//滚动条滚动  
	$(window).scroll(  
		function(){  
			//goTop();  
		}
	);  
	//拖动浏览器窗口  
	$(window).resize(  
		function(){  
			//goTop();  
		}  
	);  

function goTop()  
{  
	var h = $(window).height();  
	var nav_h=$("nav").height();
	var st = $(window).scrollTop();  
  	if(st>nav_h){
		$("#nav").css("top", st);  
	}
	
}  