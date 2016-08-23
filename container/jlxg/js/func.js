// JavaScript Document

var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id)
{	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';

}
// close showed layer
function mclose()
{
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime()
{
	closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

// close layer when click-out
document.onclick = mclose; 


function browser_show(htm_addr)
{
	var elem=document.getElementById('browser');
	elem.innerHTML='<iframe width="770px" height="575px" name="br" src="'+htm_addr+'" frameborder="0" ></iframe>';
	
}

function browser_show2(htm_addr,width)
{
	var elem=document.getElementById('browser');
	elem.innerHTML='<iframe allowTransparency="true" width="'+width+'" height="575px" name="br" src="'+htm_addr+'" frameborder="0" ></iframe>';
	
}