<?php
 	$con = mysql_connect('localhost', 'mzorz', 'mzorz');
	if (!$con)
	{
 	die('Could not connect: ' . mysql_error());
 	}

	mysql_select_db("mzdb", $con);

	$sql="SELECT abus_htm FROM about_us ";

   	$result = mysql_query($sql);

	$htm = mysql_fetch_array($result);
	
	
	//Set output to "no suggestion" if no hint were found
	//or to the correct values
	if ($htm == "")
	{
	$response="no suggestion";
	}
	else
	{
	$response=$htm['abus_htm'];
	}

	//output the response
	echo $response;
	
	mysql_close($con);
?>