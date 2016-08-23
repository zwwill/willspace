// JavaScript Document

function show_piece(id){
	var div_piece=document.getElementById(id);
	div_piece.style.opacity=0.6;
}

function hide_piece(id){
	var div_piece=document.getElementById(id);
	div_piece.style.opacity=0;
}

function initial_piece_pic(){
	for(var i=1;i<=10;i++){
		var div_piece=document.getElementById("link_piece_pic"+i);
		if(i>5){
			div_piece.style.background="url(images/lp"+(i-5)+".jpg)";
		}else{
			div_piece.style.background="url(images/lp"+i+".jpg)";
		}
	}
}