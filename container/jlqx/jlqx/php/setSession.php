<?php
function session_set($studentID,$userLevel)
{
	$_SESSION["studentID"]=$studentID;
	$_SESSION["userLevel"]=$userLevel;
}
?>