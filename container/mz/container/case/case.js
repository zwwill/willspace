 
    //#region 初始化参数
    var vCaseInfor = Array();
vCaseInfor[0] = "<p class='casetitle'>Case1</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p><p class='casetitle'>Point</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>";
vCaseInfor[1] = "<p class='casetitle'>Case2</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p><p class='casetitle'>Point</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>";
vCaseInfor[2] = "<p class='casetitle'>Case3</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p><p class='casetitle'>Point</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>";
vCaseInfor[3] = "<p class='casetitle'>Case4</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p><p class='casetitle'>Point</p><p>。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。</p>";
//#endregion

$(document).ready(function () {


    //#region Case
    $("#caseInfor").html(vCaseInfor[0]);
    $("#caseImg").css("top", "0px");
    $(".caseControl .txt").html("<i>1</i>/" + vCaseInfor.length)

    $(".caseControl .left").click(function () {
        var vi = parseInt($(".caseControl .txt i").text()) - 1;
        var vcount = vCaseInfor.length - 1;
        if (vi != 0) {
            //$(".caseCard").removeClass("a-fadeout");
            $(".caseCard").addClass("a-flipinX");
            $(".caseControl .txt i").text(vi);
            $("#caseImg").animate({ top: "-" + (vi - 1) * 252 + "px" }, 500);
            $("#caseInfor").html(vCaseInfor[vi - 1]);
            setTimeout(function () { $(".caseCard").removeClass("a-flipinX"); }, 500);
        }
    });

    $(".caseControl .right").click(function () {
        var vi = parseInt($(".caseControl .txt i").text());
        var vcount = vCaseInfor.length;
        if (vi != vcount) {
            //$(".caseCard").removeClass("a-fadein");
            $(".caseCard").addClass("a-flipinY");
            $(".caseControl .txt i").text(vi + 1);
            $("#caseImg").animate({ top: "-" + (vi) * 252 + "px" }, 500);
            $("#caseInfor").html(vCaseInfor[vi]);
            setTimeout(function () { $(".caseCard").removeClass("a-flipinY"); }, 500);
        }
    });
	
	//自动跳转
	var vp=0;
	 setInterval(function () {
		if(vp==0){
        	var vi = parseInt($(".caseControl .txt i").text());
        	var vcount = vCaseInfor.length;
			if (vi != vcount) {
           	 	$(".caseCard").removeClass("a-fadein");
          	  	$(".caseCard").addClass("a-flipinY");
          	  	$(".caseControl .txt i").text(vi + 1);
            	$("#caseImg").animate({ top: "-" + (vi) * 252 + "px" }, 500);
            	$("#caseInfor").html(vCaseInfor[vi]);
            	setTimeout(function () { $(".caseCard").removeClass("a-flipinY"); }, 500);
        	}else{vp=1}
		}
		if(vp==1){
			var vi = parseInt($(".caseControl .txt i").text()) - 1;
        	var vcount = vCaseInfor.length - 1;
			if (vi != 0) {
            	$(".caseCard").removeClass("a-fadein");
            	$(".caseCard").addClass("a-flipinX");
            	$(".caseControl .txt i").text(vi);
            	$("#caseImg").animate({ top: "-" + (vi - 1) * 252 + "px" }, 500);
            	$("#caseInfor").html(vCaseInfor[vi - 1]);
            	setTimeout(function () { $(".caseCard").removeClass("a-flipinX"); }, 500);
        	}else{vp=0}
		}
    }, 10000);
    //#endregion



});
 