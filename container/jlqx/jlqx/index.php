<?php
session_start();
/*
require_once(dirname(__file__).'/lib/function.php');
require_once(dirname(__file__).'/php/setSession.php');

if($_SESSION["studentID"])
{
	require("html/manage.html");
}
else
{
	require("login.html");
}
*/

require_once(dirname(__file__).'/lib/function.php');
require_once(dirname(__file__).'/php/setSession.php');

if($_SESSION["studentID"])
{
	header("location:html/manage.html");
}
else
{
	header("location:login.html");
}



//第一块SAE用，第二块WAMP用
?>